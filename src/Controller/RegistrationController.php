<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\MailAndPasswordType;
use App\Form\RegistrationFormType;
use App\Form\RegistrationStepTwoType;
use App\Security\EmailVerifier;
use App\Service\FormService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
    public function __construct(private EmailVerifier $emailVerifier)
    {
    }

    #[Route('/connect', name: 'app_connect')]
    public function connect(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, AuthenticationUtils $authenticationUtils): Response
    {
        
        
        $connectType = $request->query->getString('type', 'login');
        
        if ($connectType == 'register') {
             // get the login error if there is one
             
             $form = $this->createForm(RegistrationFormType::class, null, [
                'validation_groups' => ['Default', 'registration']
             ]);
             $errors = $form->getErrors(true);

             if ($form->isSubmitted() ) {
                return $this->redirectToRoute('app_home');
             }
        
             return $this->render('registration/connect.html.twig', [
                 'registrationForm' => $form,
                 'formType' => 'register',
                 'errors' => $errors
             ]);
        } else {            
            $errors = $authenticationUtils->getLastAuthenticationError();

            // last username entered by the user
            $lastUsername = $authenticationUtils->getLastUsername();

            return $this->render('registration/connect.html.twig', [
                'formType' => 'login',
                'last_username' => $lastUsername,
                'errors' => $errors,
            ]);
            
        }
        
        
        

    }

    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SessionInterface $session): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, null,[
            'validation_groups' => ['Default', 'registration']
        ]);
        $form->handleRequest($request);
        $errors = $form->getErrors(true);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                /** @var string $plainPassword */
                $plainPassword = $form->get('password')->getData();
                $email = $form->get('email')->getData();


                $hashedPassword = $userPasswordHasher->hashPassword($user, $plainPassword);

                // encode the plain password

                // $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

                // $entityManager->persist($user);
                // $entityManager->flush();

                // generate a signed url and email it to the user
                // $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
                //     (new TemplatedEmail())
                //         ->from(new Address('yvanrobert974@gmail.com', 'EcoRide'))
                //         ->to((string) $user->getEmail())
                //         ->subject('Please Confirm your Email')
                //         ->htmlTemplate('registration/confirmation_email.html.twig')
                // );

                // do anything else you need here, like send an email
                

                $session->set('registration_data', [
                    'email' => $email,
                    'hashedPassword' => $hashedPassword,
                ]);

                return $this->redirectToRoute('app_register2');
            }  else {
                return $this->render('registration/connect.html.twig', [
                    'errors' => $errors,
                    'registrationForm' => $form,
                    'formType' => 'register'
                ]);

            }
        }

        return $this->render('registration/register_form.html.twig', [
            'formType' => 'register',
            'registrationForm' => $form->createView(),
            'errors' => $errors
        ]);
    }

    #[Route('/register2', name: 'app_register2')]
    public function register2(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SessionInterface $session, Security $security): Response 
    {
        $user = new User();
        $form = $this->createForm(RegistrationStepTwoType::class);
        $form->handleRequest($request);
        $errors = $form->getErrors(true);

        // $session->set('registration_data', [
        //     'email' => 'test',
        //     'hashedPassword' =>'password',
        // ]);

        $data = $session->get('registration_data');

        if (!$data) {
            return $this->redirectToRoute('app_connect', ['type' => 'register']);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            

            $user->setPassword($data['hashedPassword']);
            $user->setEmail($data['email']);
            $user->setNom($form->get('nom')->getData());
            $user->setPrenom($form->get('prenom')->getData());

            $dateNaissanceImmutable = \DateTimeImmutable::createFromMutable($form->get('date_naissance')->getData());
            $user->setDateNaissance($dateNaissanceImmutable);
            $user->setAdresse($form->get('adresse')->getData());

            //definir photo profil par défaut
            $photoProfilUploaded = $form->get('photo_profil')->getData();

            if ($photoProfilUploaded ) {
                // Ouvre le fichier et lis son contenu en binaire
                $photoData = file_get_contents($photoProfilUploaded->getRealPath());
                $user->setPhotoProfil($photoData);
            }

            // $user->setPhotoProfil($form->get('photo_profil')->getData());

            if ($form->get('telephone')->getData()) {
                $user->setTelephone($form->get('telephone')->getData());
            }
            

            $entityManager->persist($user);
            $entityManager->flush();

            $session->remove('registration_data');
            $security->login($user);

            return $this->redirectToRoute('app_home');
        }

        return $this->render('registration/register2.html.twig', [
            'registrationStepTwoForm' => $form,
            'errors' => $errors
        ]);

    }

    #[Route('/edit-mail-password', name: 'app_edit_mail_password')]
    public function editMailPassword(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, Security $security, FormService $formService)
    {
        $userEmail = $security->getUser()->getUserIdentifier();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);

        $originalUser = clone $security->getUser();
        $form = $this->createForm(MailAndPasswordType::class, $originalUser, [
            'validation_groups' => ['Default']
        ]);

        $form->handleRequest($request);
        // $errors = $form->getErrors(true);

        if ($form->isSubmitted()) {

            if ($form->isValid()) {
                /** @var string $plainPassword */
                $plainPassword = $form->get('password')->getData();
                $email = $form->get('email')->getData();

                $hashedPassword = $userPasswordHasher->hashPassword($user, $plainPassword);

                $user->setPassword($hashedPassword);
                $user->setEmail($email);

                // $entityManager->persist($user);
                $entityManager->flush();
                $security->login($user);

                

                return new JsonResponse(['status' => 'success']);



            }  else {
                $errors = $formService->convertFormErrorsToJson($form);
                
                $html =  $this->renderView('registration/connect.html.twig', [
                    'errors' => $errors,
                    'registrationForm' => $form->createView(),
                    'formType' => 'register'
                ]);

                return new JsonResponse([
                    'status' => 'error',
                    'errors' => $errors
                    // 'html' => $html
                ]);

            }
        }

        return $this->render('registration/register_form.html.twig', [
            'formType' => 'register',
            'registrationForm' => $form->createView(),
        ]);
        
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request, TranslatorInterface $translator): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            /** @var User $user */
            $user = $this->getUser();
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));

            return $this->redirectToRoute('app_register');
        }

        // @TODO Change the redirect on success and handle or remove the flash message in your templates
        $this->addFlash('success', 'Your email address has been verified.');

        return $this->redirectToRoute('app_register');
    }
}
