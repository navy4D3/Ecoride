<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\EditMailType;
use App\Form\EditPasswordType;
use App\Form\MailAndPasswordType;
use App\Form\RegistrationFormType;
use App\Form\RegistrationStepTwoType;
use App\Service\ImageService;
use App\Security\EmailVerifier;
use App\Service\FormService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
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
    public function connect(Request $request, UserPasswordHasherInterface $userPasswordHasher, SessionInterface $sessionInterface, Security $security): Response
    {
        if ($security->getUser()) {
            return $this->redirectToRoute('app_home');
        }
        
        $connectType = $request->query->getString('type', 'login');
        
        if ($connectType == 'register') {
             // get the login error if there is one
             
             $form = $this->createForm(RegistrationFormType::class, null, [
                'validation_groups' => ['Default', 'registration']
             ]);
             $form->handleRequest($request);
             $form->handleRequest($request);
             $errors = $form->getErrors(true);

             if ($form->isSubmitted() ) {
                return $this->register($request, $userPasswordHasher, $sessionInterface, $security);
             }
        
             return $this->render('registration/connect.html.twig', [
                 'registrationForm' => $form,
                 'formType' => 'register',
                 'errors' => $errors
             ]);
        } else {      
            return $this->redirectToRoute('app_login');

        }
        
        
        

    }

    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, SessionInterface $session, Security $security): Response
    {
        if ($security->getUser()) {
            return $this->redirectToRoute('app_home');
        }

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

        return $this->render('registration/connect.html.twig', [
            'formType' => 'register',
            'registrationForm' => $form->createView(),
            'errors' => $errors
        ]);

        
    }

    #[Route('/register2', name: 'app_register2')]
    public function register2(Request $request, ImageService $imageService, EntityManagerInterface $entityManager, SessionInterface $session, Security $security): Response 
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
            return $this->redirectToRoute('app_register');
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

                $imageService->resize($photoData);

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

    #[Route('/edit-mail', name: 'app_edit_mail')]
    public function editMail(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, Security $security, FormService $formService)
    {
        $userEmail = $security->getUser()->getUserIdentifier();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);

        $originalUser = clone $security->getUser();
        $form = $this->createForm(EditMailType::class, $originalUser, [
            'validation_groups' => ['Default']
        ]);

        $form->handleRequest($request);
        // $errors = $form->getErrors(true);

        if ($form->isSubmitted()) {

            if ($form->isValid()) {
                $email = $form->get('email')->getData();


                $isEmailAvailable = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

                if ($isEmailAvailable){
                    
                    return new JsonResponse([
                        'status' => 'error',
                        'errors' => [['message' => "Cette adresse mail est déja utilisée."]]
                    ]);
                }

                $user->setEmail($email);

                // $entityManager->persist($user);
                $entityManager->flush();
                $security->login($user);

                return new JsonResponse(['status' => 'success']);



            }  else {
                $errors = $formService->convertFormErrorsToJson($form);

                return new JsonResponse([
                    'status' => 'error',
                    'errors' => $errors
                ]);

            }
        }

        // return $this->render('registration/register_form.html.twig', [
        //     'formType' => 'register',
        //     'registrationForm' => $form->createView(),
        // ]);
        
    }
    #[Route('/edit-password', name: 'app_edit_password')]
    public function editPassword(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, Security $security, FormService $formService)
    {
        $userEmail = $security->getUser()->getUserIdentifier();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);

        $originalUser = clone $security->getUser();
        $form = $this->createForm(EditPasswordType::class, $originalUser, [
            'validation_groups' => ['Default']
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {

            if ($form->isValid()) {
                /** @var string $plainPassword */
                $plainPassword = $form->get('password')->getData();
                $hashedPassword = $userPasswordHasher->hashPassword($user, $plainPassword);

                $user->setPassword($hashedPassword);

                $entityManager->flush();
                $security->login($user);

                return new JsonResponse(['status' => 'success']);

            }  else {
                $errors = $formService->convertFormErrorsToJson($form);

                return new JsonResponse([
                    'status' => 'error',
                    'errors' => $errors
                    // 'html' => $html
                ]);

            }
        }

        // return $this->render('registration/register_form.html.twig', [
        //     'formType' => 'register',
        //     'registrationForm' => $form->createView(),
        // ]);
        
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

    #[Route('/test-mail', name: 'app_test_mail')]
    public function testMail(MailerInterface $mailer): Response
    {
        $email = (new TemplatedEmail())
            ->from('yvanrobert974@gmail.com')
            ->to('test@example.com')
            ->subject('Test Mailtrap')
            ->text('Ceci est un test');

        try {
            $mailer->send($email);
        } catch (\Throwable $e) {
            return new Response('Erreur : ' . $e->getMessage());
        }
        

        return new Response('Email envoyé (vérifie Mailtrap)');
    }

}
