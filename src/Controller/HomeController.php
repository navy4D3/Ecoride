<?php

namespace App\Controller;

use App\Form\ContactType;
use App\Form\SearchTrajetType;
use App\Service\TrajetSearchService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\FormErrorIterator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class HomeController extends AbstractController{
    #[Route('/', name: 'app_home')]
    public function index(Request $request, TrajetController $trajetController, TrajetSearchService $trajetSearchService, HttpClientInterface $client, Security $security, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(SearchTrajetType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            return $trajetController->rechercher($request, $trajetSearchService, $client, $security, $em);
        }

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

    #[Route('/contact', name: 'app_contact')]
    public function contact(Request $request, MailerInterface $mailer): Response|JsonResponse
    {
        $form = $this->createForm(ContactType::class);
        

        $errors = $form->getErrors(true);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $email = (new Email())
                ->from('noreply@ecoride.com')
                ->to('admin@ecoride.com')
                ->subject('Prise de contact - Ecoride')
                ->html('Vous avez reçu le message suivant de la part de ' . $form->get('prenom')->getData() . " " . strtoupper($form->get('nom')->getData()) . " : <br> <br>" . $form->get('message')->getData());
    
                $mailer->send($email);
    
                return new JsonResponse([
                    'status' => "success"
                ]);
            } else {
                return new JsonResponse([
                    'status' => "error",
                    'errors' => $errors
                ]);
            }
        } 


        return $this->render('home/contact.html.twig', [
            'form' => $form,
            'errors' => $errors
        ]);
    }
}
