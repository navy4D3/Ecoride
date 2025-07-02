<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Reservation;
use App\Entity\Trajet;
use App\Entity\User;
use App\Enum\Statut;
use App\Enum\StatutAvis;
use App\Enum\StatutReservation;
use App\Form\AvisType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AvisController extends AbstractController{

    private $em;
    private $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    #[Route('/add-avis', name: 'app_add_avis')]
    public function addAvis(Request $request): Response
    {
        $avis = new Avis();
        $form = $this->createForm(AvisType::class);
        $errors = $form->getErrors(true);

        $trajetLinkedId = $request->query->get('trajet');
        $userId = $request->query->get('user');


        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $currentUserEmail = $this->security->getUser()->getUserIdentifier();
                $currentUser = $this->em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);
                $userNoted = $this->em->getRepository(User::class)->find($userId);
                $trajet = $this->em->getRepository(Trajet::class)->find($trajetLinkedId);
                $reservation = $this->em->getRepository(Reservation::class)->findOneBy(['trajet' => $trajet, 'user' => $currentUser]);

                $avis = $form->getData();

                $avis->setUser($userNoted);
                $avis->setCreator($currentUser);
                $avis->setTrajet($trajet);
                $avis->setStatut(StatutAvis::Enregistre);

                $this->em->persist($avis);
                $this->em->flush();

                $userNotedAvis = $this->em->getRepository(Avis::class)->findBy(['user' =>  $userNoted]);
                
                $total = 0;
                foreach ($userNotedAvis as $avis) {
                    $total += $avis->getNote();
                }
                $moyenneNote = $total / count($userNotedAvis);

                // Mettre à jour la moyenne
                $userNoted->setNote($moyenneNote);
                

                if ($avis->isPositive()) {
                    $creditsPayes = $reservation->getNbPlaces() * $trajet->getPrixPersonne();
                    $currentUser->setCredits($currentUser->getCredits() - $creditsPayes - 2); //application de la commission payé par passager
                    $userNoted->setCredits($userNoted->getCredits() + $creditsPayes);
                    $reservation->setStatut(StatutReservation::Paye);

                    if ($avis->getCommentaire() == "") {
                        $avis->setStatut(StatutAvis::Visible);
                    }
                }

                $this->em->flush();

                return $this->redirectToRoute('app_trajet', [
                    'id' => $trajetLinkedId
                ]);
            } else {
                return $this->render('user/add_avis.html.twig', [
                    'form' => $form,
                    'errors' => $errors
                ]); 
            }

        }

        return $this->render('user/add_avis.html.twig', [
            'form' => $form,
            'errors' => $errors
        ]); 
    }

    #[Route('/avis/update-statut/{id}', name: 'app_avis_update_statut')]
    public function updateAvisStatut(Request $request, $id): JsonResponse|Response
    {
        $isVisible = $request->query->get('visible');

        $avis = $this->em->getRepository(Avis::class)->find($id);


        if ($isVisible) {
            $avis->setStatut(StatutAvis::Visible);
        } else {
            $avis->setStatut(StatutAvis::NonVisible);
        }

        $this->em->flush();

        if ($request->isXmlHttpRequest()) {
            return new JsonResponse(['statut' => 'success']);
        } else {
            return $this->redirectToRoute('app_employe');
        }
        
    }
}
