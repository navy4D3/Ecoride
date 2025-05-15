<?php

namespace App\Controller;

use App\Entity\Trajet;
use App\Entity\User;
use App\Entity\Voiture;
use App\Enum\Statut;
use App\Form\AddTrajetType;
use App\Form\SearchTrajetType;
use App\Service\TrajetSearchService;
use Doctrine\ORM\EntityManagerInterface;
use IntlDateFormatter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class TrajetController extends AbstractController
{
    private HttpClientInterface $client;
    private string $googleApiKey;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
        $this->googleApiKey = $_ENV['GOOGLE_API_KEY']; // ou directement depuis votre config
    }


    #[Route('/rechercher', name: 'app_rechercher')]
    public function rechercher(Request $request, TrajetSearchService $trajetSearchService, HttpClientInterface $client, Security $security, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(SearchTrajetType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() ) {
            $data = $form->getData();

            $startAddress = $form->get('lieuDepart')->getData();
            $endAddress = $form->get('lieuArrivee')->getData();
            $date = $form->get('dateDepart')->getData();
            $nbPlace = $form->get('nbPlace')->getData();
            // $endAddress = $request->query->get('lieuArrivee');

            $startCoords = $this->geocode($startAddress, $client);
            $endCoords = $this->geocode($endAddress, $client);

            $currentUserEmail = $security->getUser()->getUserIdentifier();
            $currentUserId = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail])->getId();


            // Appel au service de recherche
            $results = $trajetSearchService->findMatchingTrips($startCoords, $endCoords, $date, $nbPlace, $currentUserId);
            // inclure un filtre sur la date d'aujourd'hui, afficher que les trajets ultérieurs
            // faire une fonction qui met à jour les trajets à passés a partir du moment ou la date est passé

            return $this->render('trajet/results.html.twig', [
                'trajets' => $results['trajets'],
                'isOnDate' => $results['isOnDate'],
                'form' => $form,

            ]);

            // Ici tu peux lancer une recherche en base, par exemple :
            // $resultats = $trajetRepository->search($data);

            // Pour la démo, on va juste afficher les données
            // return $this->render('trajets.html.twig', [
            //     'search' => $data,
            //     // 'resultats' => $resultats,
            // ]);
        }

        return $this->render('home/index.html.twig', [
            'form' => $form,
        ]);
    }

    // public function search(Request $request, HttpClientInterface $client, TrajetSearchService $trajetSearchService): Response
    // {
    //     $startAddress = $request->query->get('lieuDepart');
    //     $endAddress = $request->query->get('lieuArrivee');

    //     $startCoords = $this->geocode($startAddress, $client);
    //     $endCoords = $this->geocode($endAddress, $client);

    //     // Appel au service de recherche
    //     $results = $trajetSearchService->findMatchingTrips($startCoords, $endCoords);

    //     return $this->render('search/results.html.twig', [
    //         'trajets' => $results
    //     ]);
    // }

    public function showTrajetDateAndTime(Trajet $trajet)
    {
        $currentTime = new \DateTime();
        $formatter = new \IntlDateFormatter(
            'fr_FR',
            \IntlDateFormatter::LONG,
            \IntlDateFormatter::NONE,
            $currentTime->getTimezone()
        );

        $departureDateTime = $trajet->getHeureDepart();
        $durationInSeconds = $trajet->getDureeInSeconds(); // exemple : 5h40 = 20400 sec

        // if (!$departureDateTime instanceof \DateTime) {
        //     $departureDateTime = \DateTime::createFromInterface($departureDateTime);
        // }

        // $arrivalDateTime = $departureDateTime->modify("+$durationInSeconds seconds");
        // $arrivalDateTime = $departureDateTime->add(new \DateInterval('PT' . $durationInSeconds . 'S'));
        $arrivalDateTimeStamp = $departureDateTime->getTimestamp() + $durationInSeconds;
        $arrivalDateTime = new \DateTime();
        $arrivalDateTime->setTimestamp($arrivalDateTimeStamp)->setTimezone($currentTime->getTimezone());

        $isNextDay = $departureDateTime->format('Y-m-d') !== $arrivalDateTime->format('Y-m-d');

        $hours = floor($durationInSeconds / 3600);
        $minutes = floor(($durationInSeconds % 3600) / 60);

        $results = [
            'dateDepart' => $formatter->format($departureDateTime),
            'heureDepart' => $departureDateTime->format('H:i'),
            'heureArrivee' => $arrivalDateTime->format('H:i'),
            'isNextDay' => $isNextDay,
            'duree' => sprintf('%dh%02dmin', $hours, $minutes)
        ];

        return $results;
    }

    private function geocode(string $address, HttpClientInterface $client): array
    {
        $response = $client->request('GET', 'https://maps.googleapis.com/maps/api/geocode/json', [
            'query' => [
                'address' => $address,
                'key' => $_ENV['GOOGLE_API_KEY']
            ]
        ]);
        $data = $response->toArray();
        return $data['results'][0]['geometry']['location']; // ['lat' => ..., 'lng' => ...]
    }

    #[Route('/trajet/{id}', name: 'app_trajet')]
    public function trajet(): Response
    {
        // regex plaque FR depuis 2012 : ^[A-Z]{2}-\d{3}-[A-Z]{2}$
        //regex plaque FR avant 2012 : ^\d{1,4} [A-Z]{2} \d{2,3}$
        
        return $this->render('trajet/index.html.twig', [
            'controller_name' => 'TrajetController',
        ]);
    }
    #[Route('/publier-trajet', name: 'app_publier_trajet')]
    public function publierTrajet(Request $request, EntityManagerInterface $em, Security $security): Response
    {
        $trajet = new Trajet();
        $form = $this->createForm(AddTrajetType::class, $trajet);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $trajet = $form->getData();

            // $dateString = $form->get('dateDepart')->getData();
            // $formatter = new IntlDateFormatter(
            //     'fr_FR',
            //     IntlDateFormatter::LONG,
            //     IntlDateFormatter::NONE,
            //     'Europe/Paris',
            //     IntlDateFormatter::GREGORIAN,
            //     'd MMMM yyyy' // → correspond à '20 mai 2025'
            // );

            // $timestamp = $formatter->parse($dateString);

            // if ($timestamp === false) {
            //     throw new \Exception("Impossible de parser la date : $dateString");
            // }
            // $dateFormatted = (new \DateTime())->setTimestamp($timestamp);

            //interpreter pour date arrivée.
            //faire la même chose pour les autres attributs
            

            $googleDataJson = $form->get('googleData')->getData();
            $googleDataArray = json_decode($googleDataJson, true);
            $trajet->setGoogleData($googleDataArray);

            // return new Response($googleDataJson);
            $dureeInSeconds = $googleDataArray['legs'][0]['duration']['value'];
            $trajet->setDureeInSeconds($dureeInSeconds);


            $voitureId = $form->get('voiture')->getData();
            $voitureObject = $em->getRepository(Voiture::class)->find($voitureId);
            $user = $security->getUser();
            // $user = $em->getRepository(User::class)->findOneBy(['email' => $currentUserEmail]);
            $trajet->setChauffeur2($user);
            $trajet->setChauffeur($user);
            // return new Response($voitureObject->get);

            $trajet->setVoiture($voitureObject);
            $trajet->setStatut(Statut::from('Planifié'));

            $em->persist($trajet);
            $em->flush();

            return $this->redirectToRoute('app_home');
        }

        return $this->render('trajet/publier.html.twig', [
            'controller_name' => 'TrajetController',
            'form' => $form,
        ]);
    }

    #[Route('/publier-trajet/itineraires', name: 'app_trajet_itineraires')]
    public function findItineraires(Request $request)
    {
        $origin = $request->query->get('origin');
        $destination = $request->query->get('destination');

        if (!$origin || !$destination) {
            return new JsonResponse(
                ['error' => 'Origin and destination are required.'], 400
            );
        }

        $response = $this->client->request('GET', 'https://maps.googleapis.com/maps/api/directions/json', [
            'query' => [
                'origin' => $origin,
                'destination' => $destination,
                'mode' => 'driving',
                'alternatives' => 'true',
                'key' => $this->googleApiKey,
            ],
        ]);

        $responseArray = $response->toArray();
        $dataToDisplay = [];
        $hasTollGlobal = false;
        $rawData = $responseArray;

        foreach ($responseArray['routes'] as $route) {
            $hasToll = false;
        
            foreach ($route['legs'] as $leg) {
                foreach ($leg['steps'] as $step) {
                    if (isset($step['html_instructions']) && str_contains(strtolower($step['html_instructions']), 'toll')) {
                        $hasToll = true;
                        $hasTollGlobal = true;
                        break 2; // Stoppe directement
                    }
                }
            }

            $dureeSeconds = $route['legs'][0]['duration']['value'];
            $dureeFormated = $this->formatDuration($dureeSeconds);

            $distanceMeters = $route['legs'][0]['distance']['value'];
            $distanceFormated = $this->formatDistance($distanceMeters);

            $routeData = [
                'duree' => $dureeFormated,
                'distance' => $distanceFormated,
                'summary' => $route['summary'],
                'hasToll' => $hasToll,
                'rawData' => $route
            ];
        
            array_push($dataToDisplay, $routeData);
        }

        if ($hasTollGlobal) {
            $responseSansPeage = $this->client->request('GET', 'https://maps.googleapis.com/maps/api/directions/json', [
                'query' => [
                    'origin' => $origin,
                    'destination' => $destination,
                    'mode' => 'driving',
                    'avoid' => 'tolls',
                    'alternatives' => 'false',
                    'key' => $this->googleApiKey,
                ],
            ]);
    
            $responseSansPeageArray = $responseSansPeage->toArray();

            $dureeSansPeageSeconds = $responseSansPeageArray['routes'][0]['legs'][0]['duration']['value'];
            $dureeSansPeageFormated = $this->formatDuration($dureeSansPeageSeconds);

            $distanceSanPeageMeters = $responseSansPeageArray['routes'][0]['legs'][0]['distance']['value'];
            $distanceSansPeageFormated = $this->formatDistance($distanceSanPeageMeters);

            $dataItineraireSansPeage = [
                'duree' => $dureeSansPeageFormated,
                'distance' => $distanceSansPeageFormated,
                'summary' => 'Sans péage',
                'hasToll' => false,
                'rawData' => $responseSansPeageArray['routes'][0]
            ];

            array_push($dataToDisplay, $dataItineraireSansPeage);
        }

        return new JsonResponse($dataToDisplay);


    }

    private function formatDuration(int $seconds): string
    {
        $minutesTotal = (int) round($seconds / 60); // On arrondit à la minute la plus proche
        $hours = intdiv($minutesTotal, 60);
        $minutes = $minutesTotal % 60;

        // return ['hours' => $hours, 'minutes' => $minutes];

        if ($hours > 0) {
            return sprintf('%dh%02d', $hours, $minutes);
        }

        return sprintf('%dmin', $minutes);
    }

    private function formatDistance(int $meters): string
    {
        $kilometers = $meters / 1000;
        return number_format($kilometers, 1, '.', '') . ' km'; // 1 chiffre après la virgule
    }


    

}
