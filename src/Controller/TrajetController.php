<?php

namespace App\Controller;

use App\Form\SearchTrajetType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TrajetController extends AbstractController{
    #[Route('/rechercher', name: 'app_rechercher')]
    public function index(Request $request): Response
    {
        $form = $this->createForm(SearchTrajetType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            // Ici tu peux lancer une recherche en base, par exemple :
            // $resultats = $trajetRepository->search($data);

            // Pour la démo, on va juste afficher les données
            return $this->render('trajets.html.twig', [
                'search' => $data,
                // 'resultats' => $resultats,
            ]);
        }
        return $this->render('trajet/rechercher.html.twig', [
            'form' => $form,

        ]);
    }

    #[Route('/trajet', name: 'app_trajet')]
    public function trajet(): Response
    {
        // regex plaque FR depuis 2012 : ^[A-Z]{2}-\d{3}-[A-Z]{2}$
        //regex plaque FR avant 2012 : ^\d{1,4} [A-Z]{2} \d{2,3}$
        
        return $this->render('trajet/index.html.twig', [
            'controller_name' => 'TrajetController',
        ]);
    }
}
