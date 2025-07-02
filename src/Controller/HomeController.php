<?php

namespace App\Controller;

use App\Form\SearchTrajetType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormErrorIterator;
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

    public function convertFormErrorsToJson(FormErrorIterator $errors)
    {
        $response = [];

        foreach ($errors as $error) {
            $formField = $error->getOrigin(); // champ du formulaire (FormInterface)
            $response[] = [
                'field' => $formField->getName(),
                'message' => $error->getMessage(),
            ];
        }

        return $response;
    }

    #[Route('/mentions-legales', name: 'app_mentions_legales')]
    public function mentionsLegales(Request $request): Response
    {
        return $this->render('home/mentions_legales.html.twig', [

        ]);
    }

    #[Route('/cgu', name: 'app_cgu')]
    public function cgu(Request $request): Response
    {
        return $this->render('home/cgu.html.twig', [

        ]);
    }
}
