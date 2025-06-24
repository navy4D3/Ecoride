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
use App\Form\AdminAddEmployeType;
use App\Form\AdminEditUserType;
use App\Form\AvisType;
use App\Form\DevenirChauffeurType;
use App\Form\MailAndPasswordType;
use App\Form\RegistrationFormType;
use App\Form\RegistrationStepTwoType;
use App\Repository\TrajetRepository;
use App\Repository\UserRepository;
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
        // prochainsCovoiturage
        $usersCount =  count($this->em->getRepository(User::class)->findAll());
        $nbReservationAVenir = count($this->em->getRepository(Reservation::class)->findBy(['statut' => StatutReservation::Enregistre]));
        $nbReservationsAcquis =  count($this->em->getRepository(Reservation::class)->findAll()) - $nbReservationAVenir;
        $creditsAcquis = $nbReservationsAcquis*2;
        $creditsEnAttente = $nbReservationAVenir*2;

        return $this->render('admin/admin.html.twig', [
            'creditsAcquis' => $creditsAcquis,
            'creditsEnAttente' => $creditsEnAttente,
            'usersCount' => $usersCount
        ]);
    }
    #[Route('/admin/stats', name: 'app_admin_stats')]
    public function adminStats(Request $request, Security $security, EntityManagerInterface $em, TrajetRepository $trajetRepository, ): Response
    {
        $days = (int) $request->query->get('days', 7);
        $trajetsAVenir = $trajetRepository->countTrajetsAVenirByDay($days);
        $creditsAVenir = $trajetRepository->countCreditsAVenirByDay($days);

        return $this->json([
            'trajetsAVenir' => $trajetsAVenir,
            'creditsAVenir' => $creditsAVenir
        ]);
    }

    #[Route('/admin/users-list', name: 'app_admin_users_list')]
    public function adminUsersList(Request $request, Security $security, EntityManagerInterface $em, UserRepository $userRepository ): Response
    {
        $search = $request->query->get('search');
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $users = $userRepository->findPaginatedUsers($limit, $offset, $search);
        $totalUsers = $userRepository->countUsers($search);
        $totalPages = ceil($totalUsers / $limit);

        $template = $request->isXmlHttpRequest() ? 'admin/admin_users_table.html.twig' : 'admin/admin_users_list.html.twig';

        return $this->render($template, [
            'users' => $users,
            'search' => $search,
            'page' => $page,
            'totalPages' => $totalPages,
        ]);
    }

    #[Route('/admin/user', name: 'app_admin_user')]
    public function adminUser(Request $request, FormService $formService ): Response
    {
        $id= $request->query->get('id');
        $user =  $this->em->getRepository(User::class)->find($id);

        $form = $this->createForm(AdminEditUserType::class, $user);
        $form->handleRequest($request);
        
        $errors =  $form->getErrors(true);

        if ($form->isSubmitted())  {
            if ($form->isValid()) {
                $user = $form->getData();

                $this->em->flush();

                return new JsonResponse(['status' => 'success']);
                //gerer cas erreur

            } else {

                $errors = $formService->convertFormErrorsToJson($form);
                return new JsonResponse(['status' => 'error' , 'errors' => $errors]);
            }
        }

        return $this->render('admin/admin_user.html.twig', [
            'user' => $user,
            'form' => $form,
            'errors' => $errors
        ]);
    }
    #[Route('/admin/add-employe', name: 'app_admin_add_employe')]
    public function addEmploye(Request $request, FormService $formService ): Response
    {
        $user =  new User();

        $form = $this->createForm(AdminAddEmployeType::class, $user);
        $form->handleRequest($request);
        
        $errors =  $form->getErrors(true);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();

            $user->addRole('ROLE_EMPLOYE');

            $this->em->persist($user);
            $this->em->flush();

            return $this->redirectToRoute('app_admin_users_list');
        }

        return $this->render('admin/admin_add_employe.html.twig', [
            'user' => $user,
            'form' => $form,
            'errors' => $errors
        ]);
    }

    #[Route('/employe', name: 'app_employe')]
    public function employe()
    {

        $avisATraiter = $this->em->getRepository(Avis::class)->findBy(['statut' => StatutAvis::Enregistre]);

        return $this->render('admin/employe.html.twig', [
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

        return $this->render('admin/employe_avis.html.twig', [
            'avis' => $avis,
            'trajetTimeDatas' => $trajetTimeDatas,
            'reservation' => $reservation
        ]); 
    }


    
}
