<?php

namespace App\Repository;

use App\Entity\Trajet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\Boolean;

/**
 * @extends ServiceEntityRepository<Trajet>
 */
class TrajetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Trajet::class);
    }

    public function findAllTrajetsByUser(int $userId, 
    // string $statut
    ): array
    {
        
        return $this->createQueryBuilder('t')
            ->leftJoin('t.chauffeur', 'chauffeur')
            ->leftJoin('t.chauffeur2', 'chauffeur2')
            ->leftJoin('t.participants', 'participant')
            ->where('chauffeur.id = :userId')
            ->orWhere('chauffeur2.id = :userId')
            ->orWhere('participant.id = :userId')
            // ->andWhere('t.statut = :statut')
            ->setParameter('userId', $userId)
            // ->setParameter('statut', $statut)
            ->orderBy('t.heureDepart', 'DESC') // colonne représentant l'heure de départ
            ->getQuery()
            ->getResult();
    }



    public function findByDateStatutAndPlaces(
        string $dateString, 
        // string $statut, 
        int $nbPassagers,
        bool $isOnDate,
        string $chauffeurId = "", 
        
    ): array 
    {

        
        $timestamp = $this->dateStringToTimestamp($dateString);
        $parsedDate = (new \DateTime('@' . $timestamp))->setTimezone(new \DateTimeZone('Europe/Paris'));

        // $parsedDate = (new \DateTime())->setTimestamp($timestamp);
        $startOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 00:00:00');
        $endOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 23:59:59');

        if (!$isOnDate) {

            // Propose un startOfDate -3j, sauf si ça tombe avant aujourd'hui à minuit
            $startMinus3 = (clone $startOfDate)->modify('-3 days');
            $startOfToday = new \DateTime('today');

            // On prend la date la plus tardive entre startOfToday et -3 jours
            if ($startMinus3 < $startOfToday) {
                $startOfDate = $startOfToday;
            } else {
                $startOfDate = $startMinus3;
            }

            // $endOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 23:59:59');
            $endOfDate = $endOfDate->modify('+ 3 day');
        }

    
        $qb = $this->createQueryBuilder('t')
            ->leftJoin('t.voiture', 'v')
            ->leftJoin('t.reservations', 'r')
            ->leftJoin('t.chauffeur', 'c')
            ->addSelect('v')
            ->addSelect('SUM(r.nbPlaces) AS HIDDEN totalPassagers')
            ->where('t.heureDepart BETWEEN :start AND :end')
            // ->andWhere('t.statut = :statut')
            ->andWhere('c.id != :chauffeurId')
            ->groupBy('t.id', 'v.id')
            ->having('(v.places - 1 - SUM(COALESCE(r.nbPlaces, 0))) >= :placesMin')
            ->setParameter('start', $startOfDate)
            ->setParameter('end', $endOfDate)
            // ->setParameter('statut', $statut)
            ->setParameter('placesMin', $nbPassagers)
            ->setParameter('chauffeurId', $chauffeurId);
    
        return $qb->getQuery()->getResult();
    }

    public function dateStringToTimestamp($dateString)
    {
        $formatter = \IntlDateFormatter::create(
            'fr_FR',
            \IntlDateFormatter::FULL,
            \IntlDateFormatter::NONE,
            'Europe/Paris',
            \IntlDateFormatter::GREGORIAN,
            'd MMMM yyyy'
        );

        $timestamp = $formatter->parse($dateString);

        if ($timestamp === false) {
            throw new \InvalidArgumentException('Format de date invalide : ' . $dateString);
        }
        
        // On convertit la date texte en DateTime
        return $timestamp;
    }

    public function countCreditsAVenirByDay(int $days): array
    {
        $qb = $this->createQueryBuilder('t')
            ->select('t')
            ->where('t.heureDepart >= :start')
            ->andWhere('t.heureDepart <= :end')
            ->setParameter('start', new \DateTimeImmutable('today'))
            ->setParameter('end', new \DateTimeImmutable("+$days days"))
            ->orderBy('t.heureDepart', 'ASC');

        // Ajout de la fonction DATE manuellement si besoin

        $results = $qb->getQuery()->getResult();

        $formatter = new \IntlDateFormatter(
            'fr_FR',
            \IntlDateFormatter::LONG,
            \IntlDateFormatter::NONE,
            null,
            null,
            'd MMMM' // Exemple : "2 juin"
        );

        // Remplir les jours sans trajets
        $filledResults = [];
        $start = new \DateTimeImmutable('today');
        for ($i = 0; $i < $days; $i++) {
            $date = $start->modify("+$i days");
            $formattedDate = $formatter->format($date);
            $filledResults[$formattedDate] = 0;
        }

        

        // Regrouper les trajets par date
        foreach ($results as $trajet) {
            /** @var \DateTimeInterface $dateTime */
            $dateTime = $trajet->getHeureDepart();
            $reservations = $trajet->getReservations();
            $formattedDate = $formatter->format($dateTime);
            if (isset($filledResults[$formattedDate])) {
                $count = 0;
                foreach($reservations as $reservation) {
                    $count += $reservation->getNbPlaces() * 2;
                }
                
                $filledResults[$formattedDate]+= $count;
            }
        }

        // Reformater pour le front
        $final = [];
        foreach ($filledResults as $date => $count) {
            $final[] = ['date' => $date, 'count' => $count];
        }

        return $final;
    }
    public function countTrajetsAVenirByDay(int $days): array
    {
    $qb = $this->createQueryBuilder('t')
        ->select('t.heureDepart', 't.id')
        ->where('t.heureDepart >= :start')
        ->andWhere('t.heureDepart <= :end')
        ->setParameter('start', new \DateTimeImmutable('today'))
        ->setParameter('end', new \DateTimeImmutable("+$days days"))
        ->orderBy('t.heureDepart', 'ASC');

    // Ajout de la fonction DATE manuellement si besoin

    $results = $qb->getQuery()->getResult();

    $formatter = new \IntlDateFormatter(
        'fr_FR',
        \IntlDateFormatter::LONG,
        \IntlDateFormatter::NONE,
        null,
        null,
        'd MMMM' // Exemple : "2 juin"
    );

    // Remplir les jours sans trajets
    $filledResults = [];
    $start = new \DateTimeImmutable('today');
    for ($i = 0; $i < $days; $i++) {
        $date = $start->modify("+$i days");
        $formattedDate = $formatter->format($date);
        $filledResults[$formattedDate] = 0;
    }

    

    // Regrouper les trajets par date
    foreach ($results as $trajet) {
        /** @var \DateTimeInterface $dateTime */
        $dateTime = $trajet['heureDepart'];
        $formattedDate = $formatter->format($dateTime);
        if (isset($filledResults[$formattedDate])) {
            $filledResults[$formattedDate]++;
        }
    }

    // Reformater pour le front
    $final = [];
    foreach ($filledResults as $date => $count) {
        $final[] = ['date' => $date, 'count' => $count];
    }

    return $final;
    }

//    /**
//     * @return Trajet[] Returns an array of Trajet objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Trajet
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
