<?php

namespace App\Controller;

use App\Entity\User;
use App\Enum\Preference;
use App\Form\DevenirChauffeurType;
use App\Repository\TrajetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;

final class UserController extends AbstractController{
    #[Route('/profil', name: 'app_user_profil')]
    public function profil(Security $security, EntityManagerInterface $em, TrajetRepository $trajetRepository, TrajetController $trajetController): Response
    {
        $currentUserEmail = $security->getUser()->getUserIdentifier();

        $currentUser = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        //faire une requete dans le repository pour avoir tous les trajets concernant l'utilisateur connecté ordonné par datetime

        // $trajetsAVenir = $currentUser->getTrajetsAsChauffeur();
        $trajetsAVenir = $trajetRepository->findAllTrajetsByUser($currentUser->getId(), 'Planifié');
        //inclure condition si vide

        $trajetAVenirDatasToDisplay = [];

        //inclure condition si vide
        foreach ($trajetsAVenir as $trajet) {
            

            $isChauffeur = false;
            if ($trajet->getChauffeur() == $currentUser) {
                $isChauffeur = true;
            }

            $timeDatasToShow = $trajetController->showTrajetDateAndTime($trajet);

            // Formatage final pour le front
            $data = [
                'dateDepart' => $timeDatasToShow['dateDepart'],
                'heureDepart' => $timeDatasToShow['heureDepart'],
                'lieuDepart' => $trajet->getLieuDepart(),
                'duree' => $timeDatasToShow['duree'],
                'heureArrivee' => $timeDatasToShow['heureArrivee'],
                'lieuArrivee' => $trajet->getLieuArrivee(),
                'plusUn' => $timeDatasToShow['isNextDay'],
                'isChauffeur' => $isChauffeur,
                'chauffeur' => $trajet->getChauffeur(),
                'voiture' => $trajet->getVoiture()
            ];

            array_push($trajetAVenirDatasToDisplay, $data);
        }

        $trajetsPasses = $trajetRepository->findAllTrajetsByUser($currentUser->getId(), 'Terminé');
        $trajetsPassesDatasToDisplay = [];

        foreach ($trajetsPasses as $trajet) {
            $departureDateTime = $trajet->getHeureDepart();
            $durationInSeconds = $trajet->getDureeInSeconds(); // exemple : 5h40 = 20400 sec

            $arrivalDateTime = $departureDateTime->modify("+$durationInSeconds seconds");

            $isNextDay = $departureDateTime->format('Y-m-d') !== $arrivalDateTime->format('Y-m-d');

            $hours = floor($durationInSeconds / 3600);
            $minutes = floor(($durationInSeconds % 3600) / 60);


            // Formatage final pour le front
            $data = [
                'dateDepart' => $timeDatasToShow['dateDepart'],
                'lieuDepart' => $trajet->getLieuDepart(),
                'lieuArrivee' => $trajet->getLieuArrivee(),
                'prix' => $trajet->getPrixPersonne()
            ];

            array_push($trajetsPassesDatasToDisplay, $data);
        }

        return $this->render('user/profil.html.twig', [
            'trajetsAVenir' =>  $trajetAVenirDatasToDisplay,
            'trajetsPasses' => $trajetsPassesDatasToDisplay
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

    #[Route('/ajouter-credits', name: 'app_ajouter-credits')]
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
}
