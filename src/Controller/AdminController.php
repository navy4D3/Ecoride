<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Reservation;
use App\Entity\Trajet;
use App\Entity\User;
use App\Enum\Preference;
use App\Enum\Statut;
use App\Enum\StatutAvis;
use App\Enum\StatutReservation;
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

final class AdminController extends AbstractController {

    private $em;
    private $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    #[Route('/admin', name: 'app_admin')]
    public function profil(Request $request, Security $security, EntityManagerInterface $em, TrajetRepository $trajetRepository, ): Response
    {
        $users = $this->em->getRepository(User::class)->findAll();
        // prochainsCovoiturage
        $nbReservationAVenir = count($this->em->getRepository(Reservation::class)->findBy(['statut' => StatutReservation::Enregistre]));
        $nbReservationsAcquis =  count($this->em->getRepository(Reservation::class)->findAll()) - $nbReservationAVenir;
        $creditsAcquis = $nbReservationsAcquis*2;
        $creditsEnAttente = $nbReservationAVenir*2;

        $days = (int) $request->query->get('days', 7);
        $nbTrajetsAVenirArray = $trajetRepository->countRidesByDay($days);

        return $this->render('user/admin.html.twig');
    }
    #[Route('/admin/stats', name: 'app_admin_stats')]
    public function adminStats(Request $request, Security $security, EntityManagerInterface $em, TrajetRepository $trajetRepository, ): Response
    {
        $days = (int) $request->query->get('days', 7);
        $trajetsAVenir = $trajetRepository->countTrajetAVeniryDay($days);
        $creditsAVenir = $trajetRepository->countCreditsAVenirByDay($days);

        return $this->json([
            'trajetsAVenir' => $trajetsAVenir,
            'creditsAVenir' => $creditsAVenir
        ]);
    }

    #[Route('/employe', name: 'app_employe')]
    public function employe()
    {

        $avisATraiter = $this->em->getRepository(Avis::class)->findBy(['statut' => StatutAvis::Enregistre]);

        return $this->render('user/employe.html.twig', [
            'avisATraiter' => $avisATraiter,
        ]); 
    }

    #[Route('/employe/avis/{id}', name: 'app_employe_avis')]
    public function employeAvis(TrajetController $trajetController, $id)
    {

        $avis = $this->em->getRepository(Avis::class)->find($id);
        $trajet = $avis->getTrajet();
        $trajetTimeDatas = $trajetController->showTrajetDateAndTime($trajet);
        $avisCreator = $avis->getCreator();
        $reservation = $this->em->getRepository(Reservation::class)->findOneBy(['user' => $avisCreator, 'trajet' => $trajet]);

        return $this->render('user/employe_avis.html.twig', [
            'avis' => $avis,
            'trajetTimeDatas' => $trajetTimeDatas,
            'reservation' => $reservation
        ]); 
    }


    
}
