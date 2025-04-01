<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TrajetController extends AbstractController{
    #[Route('/trajet', name: 'app_trajet')]
    public function index(): Response
    {
        // regex plaque FR depuis 2012 : ^[A-Z]{2}-\d{3}-[A-Z]{2}$
        //regex plaque FR avant 2012 : ^\d{1,4} [A-Z]{2} \d{2,3}$
        
        return $this->render('trajet/index.html.twig', [
            'controller_name' => 'TrajetController',
        ]);
    }
}
