<?php

namespace App\Controller;

use App\Form\SearchTrajetType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController{
    #[Route('/', name: 'app_home')]
    public function index(Request $request): Response
    {
        $form = $this->createForm(SearchTrajetType::class);
        $form->handleRequest($request);

        return $this->render('home/index.html.twig', [
            'form' => $form,

        ]);
    }
}
