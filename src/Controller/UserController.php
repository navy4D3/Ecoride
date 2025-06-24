<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Reservation;
use App\Entity\Trajet;
use App\Entity\User;
use App\Enum\Preference;
use App\Enum\Statut;
use App\Form\AvisType;
use App\Form\DevenirChauffeurType;
use App\Form\MailAndPasswordType;
use App\Form\RegistrationFormType;
use App\Form\RegistrationStepTwoType;
use App\Repository\TrajetRepository;
use App\Service\FormService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;

final class UserController extends AbstractController {

    private $em;
    private $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    #[Route('/profil', name: 'app_user_profil')]
    public function profil(Request $request, Security $security, EntityManagerInterface $em, TrajetRepository $trajetRepository, TrajetController $trajetController): Response
    {
        $userId = $request->query->get('id');

        if ($userId) {
            $user = $this->em->getRepository(User::class)->find($userId);

            return $this->render('user/autre_profil.html.twig', [
                'user' => $user
            ]);
        }
        $currentUserEmail = $security->getUser()->getUserIdentifier();

        $currentUser = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        //faire une requete dans le repository pour avoir tous les trajets concernant l'utilisateur connecté ordonné par datetime

        // $trajetsAVenir = $currentUser->getTrajetsAsChauffeur();
        // $trajetsAVenir = $trajetRepository->findAllTrajetsByUser($currentUser->getId(), 'Planifié');
        //inclure condition si vide

        $userReservations = $currentUser->getReservations();
        $trajetsPassager = [];

        foreach ($userReservations as $reservation) {
            $trajetsPassager[] = $reservation->getTrajet();
        }

        $trajetsChauffeur = $currentUser->getTrajetsEnTantQueChauffeur();

        $trajetsAVenirDatasToDisplay = [];
        $trajetsPassesDatasToDisplay = [];

        $trajets = array_merge($trajetsChauffeur->toArray(), $trajetsPassager);

        // Trier par heureDépart (ordre croissant)
        usort($trajets, function ($a, $b) {
            return $b->getHeureDepart() <=> $a->getHeureDepart();
        });

        //inclure condition si vide
        foreach ($trajets as $trajet) {

            // $isChauffeur = false;
            // if ($trajet->getChauffeur() == $currentUser) {
            //     $isChauffeur = true;
            // }
            
            $timeDatas = $trajetController->showTrajetDateAndTime($trajet);
            $reservations = $trajet->getReservations();
            $currentReservation = new Reservation();

            foreach ($reservations as $reservation) {
                if ($reservation->getUser() == $currentUser) {
                    $currentReservation = $reservation;
                    $data['reservation'] = $currentReservation;
                }
            }

            // Formatage final pour le front
            $data['datas'] = $trajet;
            $data['timeDatas'] = $timeDatas;

            if ($trajet->getStatut() == Statut::Termine) {
                array_push($trajetsPassesDatasToDisplay, $data);
            } else {
                array_push($trajetsAVenirDatasToDisplay, $data);
            }

            
        }

        // $trajetsPasses = $trajetRepository->findAllTrajetsByUser($currentUser->getId());
        

        // return new Response($trajetsPasses[0]->getId());

        // foreach ($trajetsPasses as $trajet) {
            
        //     $timeDatas = $trajetController->showTrajetDateAndTime($trajet);

        //     // Formatage final pour le front
        //     $data = [
        //         'datas' => $trajet,
        //         'timeDatas' => $timeDatas,
        //     ];

        //     array_push($trajetsPassesDatasToDisplay, $data);
        // }

        $myDataForm = $this->createForm(RegistrationStepTwoType::class, $currentUser);
        $driverSpaceForm = $this->createForm(DevenirChauffeurType::class, $currentUser);
        $mailAndPasswordForm = $this->createForm(MailAndPasswordType::class, $currentUser);
        $preferences = Preference::cases();

        $avisRecus = $currentUser->getAvisRecus();
        $avisPublies = $currentUser->getAvisPublies();


        return $this->render('user/profil.html.twig', [
            'trajetsAVenir' =>  $trajetsAVenirDatasToDisplay,
            'trajetsPasses' => $trajetsPassesDatasToDisplay,
            'myDataForm' => $myDataForm,
            'driverSpaceForm' =>$driverSpaceForm,
            'mailAndPasswordForm' => $mailAndPasswordForm,
            'preferences' => $preferences,
            'avisRecus' => $avisRecus,
            'avisPublies' => $avisPublies
        ]);
    }

    #[Route('/user/{id}/photo_profil', name: 'user_profil_photo')]
    public function getPhotoProfil(User $user): Response
    {
        $photoBlob = $user->getPhotoProfil();

        if (!$photoBlob) {
            throw $this->createNotFoundException('Photo non trouvée.');
        }

        // $photoData = is_resource($photoBlob) ? stream_get_contents($photoBlob) : $photoBlob;
        $photoData = stream_get_contents($photoBlob);

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $photoExtension = $finfo->buffer($photoData);

        if (!$photoExtension) {
            throw $this->createNotFoundException('Format d\'image inconnu.');
        }

        return new Response($photoData, 200, [
            'Content-Type' => $photoExtension,
            'Content-Disposition' => 'inline',
            'Cache-Control' => 'max-age=3600',
        ]);
    }

    #[Route('/devenir-chauffeur', name: 'app_devenir_chauffeur')]
    public function devenirChauffeur(Request $request, Security $security, EntityManagerInterface $em, UserAuthenticatorInterface $userAuthenticatorInterface): Response 
    {
        $redirectRoute = $request->query->get('redirect', 'app_profil');

        $preferences = Preference::cases();

        $form = $this->createForm(DevenirChauffeurType::class);
        $form->handleRequest($request);
        $errors = $form->getErrors(true);

        $currentUserEmail = $security->getUser()->getUserIdentifier();
        $user = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        if ($form->isSubmitted() && $form->isValid()) {
            // return new Response($form->get('preferences')->getData());
            $preferencesArray = json_decode($form->get('preferences')->getData());

            // Transformation en tableau d'Enum Preference
            $preferencesEnumArray = [];


            if (is_array($preferencesArray)) {
                foreach ($preferencesArray as $preferenceValue) {
                    $enum = Preference::tryFrom($preferenceValue);
                    if ($enum !== null) {
                        $preferencesEnumArray[] = $enum;
                    }
                }
            }


            $user->setPreferences($preferencesEnumArray);
            $user->setDescription($form->get('description')->getData());
            $user->addRole('ROLE_CHAUFFEUR');

            $security->login($user);

            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute($redirectRoute);
        }

        return $this->render('user/devenir_chauffeur.html.twig', [
            'form' => $form,
            'preferences' => $preferences,
            'errors' => $errors
        ]);
    }

    #[Route('/ajouter-credits', name: 'app_ajouter_credits')]
    public function ajouterCredits(Request $request, Security $security, EntityManagerInterface $em): JsonResponse
    {
        $nbCreditsToAdd = $request->get('credits', 0);

        $currentUserEmail = $security->getUser()->getUserIdentifier();
        $currentUser = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);
        $currentUserNbCredits = $currentUser->getCredits();

        $currentUser->setCredits($currentUserNbCredits + $nbCreditsToAdd);

        $em->persist($currentUser);
        $em->flush();

        return new JsonResponse(['status' => 'success', 'credits' => $currentUser->getCredits()]);
        // return $this->render('user/ajouter_credits.html.twig', []);
    }

    #[Route('/user/update-data', name: 'app_user_update_data')]
    public function updateUserData(Request $request, FormService $formService): JsonResponse
    {
        
        // $data = json_decode($request->getContent(), true);
        
        $currentUserEmail = $this->security->getUser()->getUserIdentifier();
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        $form = $this->createForm(RegistrationStepTwoType::class, $user);
        $form->handleRequest($request);

        // $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();
            
            $photoProfilUploaded = $form->get('photo_profil')->getData();

            if ($photoProfilUploaded ) {
                // Ouvre le fichier et lis son contenu en binaire
                $photoData = file_get_contents($photoProfilUploaded->getRealPath());
                $user->setPhotoProfil($photoData);
            }

            $this->em->persist($user);
            $this->em->flush();

            $data = [
                'status' => 'success',
            ];

        } else {
            $errors = $formService->convertFormErrorsToJson($form);

            // foreach ($form->getErrors(true) as $error) {
            //     $formField = $error->getOrigin(); // champ du formulaire (FormInterface)
            //     $errors[] = [
            //         'field' => $formField->getName(),
            //         'message' => $error->getMessage(),
            //     ];
            // }

            $data = [
                'status' => 'error',
                'errors' => $errors
            ];
            
        }

        return new JsonResponse($data);
    }

    #[Route('/user/update-chauffeur-data', name: 'app_user_update_chauffeur_data')]
    public function updateUserChauffeurData(Request $request): JsonResponse
    {
        
        // $data = json_decode($request->getContent(), true);
        
        $currentUserEmail = $this->security->getUser()->getUserIdentifier();
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        $form = $this->createForm(DevenirChauffeurType::class, $user);
        $form->handleRequest($request);

        // $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $preferencesArray = json_decode($form->get('preferences')->getData());

            // Transformation en tableau d'Enum Preference
            $preferencesEnumArray = [];


            if (is_array($preferencesArray)) {
                foreach ($preferencesArray as $preferenceValue) {
                    $enum = Preference::tryFrom($preferenceValue);
                    if ($enum !== null) {
                        $preferencesEnumArray[] = $enum;
                    }
                }
            }


            $user->setPreferences($preferencesEnumArray);
            $user->setDescription($form->get('description')->getData());
            

            $this->em->persist($user);
            $this->em->flush();

            $data = [
                'status' => 'success',
            ];

        } else {
            $errors = [];

            foreach ($form->getErrors(true) as $error) {
                $formField = $error->getOrigin(); // champ du formulaire (FormInterface)
                $errors[] = [
                    'field' => $formField->getName(),
                    'message' => $error->getMessage(),
                ];
            }

            $data = [
                'status' => 'error',
                'errors' => $errors
            ];
            
        }

        return new JsonResponse($data);
    }

    #[Route('/user/reset-photo-profil', name: 'app_user_reset-photo-profil')]
    public function resetProfilPicture(Request $request): JsonResponse
    {
        $id= $request->query->get('id');
        $user =  $this->em->getRepository(User::class)->find($id);

        $user->setPhotoProfil(null);

        $this->em->flush();

        return new JsonResponse(['status' => 'success']);
    }

    #[Route('/user/delete-account', name: 'app_user_delete_account')]
    public function deleteAccount(Request $request, Security $security): Response
    {
        $id= $request->query->get('id');
        $userToDelete = $this->em->getRepository(User::class)->find($id);

        $currentUserEmail = $security->getUser()->getUserIdentifier();
        $currentUser = $this->em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        $this->em->remove($userToDelete);

        $this->em->flush();

        if (in_array('ROLE_ADMIN', $currentUser->getRoles())) {
            return $this->redirectToRoute('app_admin_users_list');
        } else {
            return $this->redirectToRoute('app_home');
        }
    }


    
}
