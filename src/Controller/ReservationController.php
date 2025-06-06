<?php

namespace App\Controller;

use App\Entity\Reservation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ReservationController extends AbstractController{
    // #[Route('/reservation', name: 'app_reservation')]
    // public function index(): Response
    // {
    //     return $this->render('reservation/index.html.twig', [
    //         'controller_name' => 'ReservationController',
    //     ]);
    // }

    #[Route('/cancel-reservation/{id}', name: 'app_cancel_reservation')]
    public function cancelReservation(EntityManagerInterface $em, $id): Response
    {
        $reservationToDelete = $em->getRepository(Reservation::class)->find($id);

        $em->remove($reservationToDelete);

        $em->flush();

        return $this->redirectToRoute('app_user_profil');
    }
}
