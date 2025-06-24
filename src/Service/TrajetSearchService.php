<?php
namespace App\Service;

use App\Controller\TrajetController;
use App\Entity\User;
use App\Enum\Statut;
use App\Repository\TrajetRepository;

class TrajetSearchService
{
    public function __construct(private TrajetRepository $trajetRepository, private TrajetController $trajetController) {}

    public function findMatchingTrips(array $startCoords, array $endCoords, $date, $nbPlace, string $currentUserId = ""): array
    {

        // $trips = $this->trajetRepository->findBy(['statut' => Statut::from('Planifié')]); // ou mieux : les trajets à venir seulement
        
        $isOnDate = true;
        $trips = $this->trajetRepository->findByDateStatutAndPlaces($date, $nbPlace, $isOnDate, $currentUserId);
        if (empty($trips)) {
            // chercher date sur 3 jours glissant
            // $trips = $this->trajetRepository->findByRangeDateStatutAndPlaces($date, 'Planifié', $nbPlace, $currentUserId);
            
            $isOnDate = false;
            $trips = $this->trajetRepository->findByDateStatutAndPlaces($date, $nbPlace, $isOnDate, $currentUserId);

        }
        
        //inclure une logique pour donner le/les trajets convenable a des dates différentes, avant sur 3 jours glissant, et total si toujours rien sur 3 jours glissant
        $matchingTrips = [];

        foreach ($trips as $trip) {
            $points = $trip->getGpsPoints(); // À implémenter : decode JSON et extraire les lat/lng

            $tripIsPlan = $trip->getStatut() == Statut::Planifie;
            if (
                $this->isCloseToRoute($startCoords, $points) &&
                $this->isCloseToRoute($endCoords, $points) &&
                $this->isSameDirection($startCoords, $endCoords, $points) &&
                $tripIsPlan
            ) {
                $nearestStartPoint = $this->findNearestPoint($startCoords, $points);
                $nearestEndPoint = $this->findNearestPoint($endCoords, $points);
                $placesRestante = $trip->getVoiture()->getPlaces() - count($trip->getParticipants());
                $matchingTrips[] = [
                    'datas' => $trip,
                    'timeDatas' => $this->trajetController->showTrajetDateAndTime($trip),
                    'placesRestante' => $placesRestante,
                    'nearestStartPoint' => $nearestStartPoint, 
                    'nearestEndPoint' => $nearestEndPoint
                ];
            }
        }

        return ['trajets' => $matchingTrips, 'isOnDate' => $isOnDate];
    }

    private function isCloseToRoute(array $coord, array $routePoints, float $thresholdMeters = 1000): bool
    {
        foreach ($routePoints as $point) {
            if ($this->haversineDistance($coord, $point) < $thresholdMeters) {
                return true;
            }
        }
        return false;
    }

    private function haversineDistance(array $point1, array $point2): float
    {
        $earthRadius = 6371000; // m
        $lat1 = deg2rad($point1['lat']);
        $lon1 = deg2rad($point1['lng']);
        $lat2 = deg2rad($point2['lat']);
        $lon2 = deg2rad($point2['lng']);

        $deltaLat = $lat2 - $lat1;
        $deltaLon = $lon2 - $lon1;

        $a = sin($deltaLat / 2) ** 2 +
             cos($lat1) * cos($lat2) * sin($deltaLon / 2) ** 2;

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    private function isSameDirection(array $userStart, array $userEnd, array $trajetPoints): bool
    {
        $nearestStartIndex = $this->findNearestPoint($userStart, $trajetPoints)['index'];
        $nearestEndIndex = $this->findNearestPoint($userEnd, $trajetPoints)['index'];

        return $nearestStartIndex !== null && $nearestEndIndex !== null && $nearestStartIndex < $nearestEndIndex;
    }

    private function findNearestPoint(array $target, array $points): ?array
    {
    $minDistance = PHP_INT_MAX;
    $closestIndex = null;

    foreach ($points as $index => $point) {
        $distance = $this->haversineDistance($target, $point);
        if ($distance < $minDistance) {
            $minDistance = $distance;
            $closestIndex = $index;
        }
    }

    // Optionnel : ne considérer que les points à moins de 10 km
    // return $minDistance < 10 ? $closestIndex : null;
    return ['index' => $closestIndex, 'distance' => round($minDistance, 1)];
    }
}
