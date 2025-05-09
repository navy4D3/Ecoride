<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\TrajetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController{
    #[Route('/profil', name: 'app_user')]
    public function profil(Security $security, EntityManagerInterface $em, TrajetRepository $trajetRepository): Response
    {
        $currentUserEmail = $security->getUser()->getUserIdentifier();

        $currentUser = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);

        //faire une requete dans le repository pour avoir tous les trajets concernant l'utilisateur connecté ordonné par datetime

        // $trajetsAVenir = $currentUser->getTrajetsAsChauffeur();
        $trajetsAVenir = $trajetRepository->findAllTrajetsByUser($currentUser->getId(), 'Planifié');
        //inclure condition si vide
        
        $currentTime = new \DateTime();
        $formatter = new \IntlDateFormatter(
            'fr_FR',
            \IntlDateFormatter::LONG,
            \IntlDateFormatter::NONE,
            $currentTime->getTimezone()
        );

        $trajetAVenirDatasToDisplay = [];

        //inclure condition si vide
        foreach ($trajetsAVenir as $trajet) {
            $departureDateTime = $trajet->getHeureDepart();
            $durationInSeconds = $trajet->getDureeInSeconds(); // exemple : 5h40 = 20400 sec

            $arrivalDateTime = $departureDateTime->modify("+$durationInSeconds seconds");

            $isNextDay = $departureDateTime->format('Y-m-d') !== $arrivalDateTime->format('Y-m-d');

            $hours = floor($durationInSeconds / 3600);
            $minutes = floor(($durationInSeconds % 3600) / 60);

            $isChauffeur = false;
            if ($trajet->getChauffeur() == $currentUser) {
                $isChauffeur = true;
            }

            // Formatage final pour le front
            $data = [
                'dateDepart' => $formatter->format($departureDateTime),
                'heureDepart' => $departureDateTime->format('H:i'),
                'lieuDepart' => $trajet->getLieuDepart(),
                'duree' => sprintf('%dh%02dmin', $hours, $minutes),
                'heureArrivee' => $arrivalDateTime->format('H:i'),
                'lieuArrivee' => $trajet->getLieuArrivee(),
                'plusUn' => $isNextDay,
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
                'dateDepart' => $formatter->format($departureDateTime),
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
}
