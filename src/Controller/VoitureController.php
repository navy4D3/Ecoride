<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Voiture;
use App\Enum\Marque;
use App\Form\AddVoitureType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class VoitureController extends AbstractController{
    #[Route('/add-voiture', name: 'app_add_voiture')]
    public function addVoiture(Request $request, EntityManagerInterface $em, Security $security): Response
    {
        

        $voitureId = $request->get('id');

        if ($voitureId) {
            $voiture = $em->getRepository(Voiture::class)->find($voitureId);
        } else {
            $voiture = new Voiture();
        }

        $form = $this->createForm(AddVoitureType::class, $voiture);
        $form->handleRequest($request);
        $errors = $form->getErrors(true);

        if ($form->isSubmitted() && $form->isValid()) {
            $voiture = $form->getData();
            $marqueString = $form->get('marque')->getData();
            $voiture->setMarque(Marque::from($marqueString));

            $currentUserEmail = $security->getUser()->getUserIdentifier();
            $user = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);
            $voiture->setProprietaire($user);
            $user->addVoiture($voiture);

            $em->persist($voiture);
            $em->flush();

            $voitureData = [
                'surnom' => $voiture->getSurnom(),
                'marque' => $voiture->getMarqueLabel(),
                'modele' => $voiture->getModele(),
                'isElectric' => $voiture->isElectric(),
                'places' => $voiture->getPlaces(),
                'id' => $voiture->getId(),
            ];

            return new JsonResponse([
                'status' => 'success',
                'voiture' => $voitureData

            ]);

        }

        $datas = [
            'form' => $form->createView(),
            'errors' => $errors,
            // 'isEdit' => true
        ];

        if ($voitureId) {
            $datas['isEdit'] = true;
        }

        // Rendre le formulaire dans un template
        $html = $this->renderView('voiture/add_voiture_form.html.twig', $datas);
        // return $this->render('voiture/add_voiture_form.html.twig', [
        //     'form' => $form->createView(),
        //     'errors' => $errors
        // ]);

        // Retourner en JSON
        return new JsonResponse([
            'status' => "load",
            'html' => $html,
        ]);

        // return $this->render('voiture/index.html.twig', [
        //     'controller_name' => 'VoitureController',
        // ]);
    }

    #[Route('/delete-voiture/{id}', name: 'app_delete_voiture')]
    public function deleteVoiture(Request $request, EntityManagerInterface $em, Security $security, $id): Response
    {


        $voiture = $em->getRepository(Voiture::class)->find($id);

        $em->remove($voiture);
        $em->flush();

        // gerer les errus si la voiture est lié a des trajets

        return new JsonResponse([
            'status' => 'success',
        ]);

    }
}
