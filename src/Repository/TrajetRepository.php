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
        string $chauffeurId = "", 
        bool $isOnDate
    ): array 
    {

        
        $timestamp = $this->dateStringToTimestamp($dateString);
        $parsedDate = (new \DateTime('@' . $timestamp))->setTimezone(new \DateTimeZone('Europe/Paris'));

        // $parsedDate = (new \DateTime())->setTimestamp($timestamp);
        $startOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 00:00:00');
        $endOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 23:59:59');

        if (!$isOnDate) {
            // $startOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 00:00:00');
            $startOfDate = $startOfDate->modify('-3 day');

            // $endOfDate = new \DateTime($parsedDate->format('Y-m-d') . ' 23:59:59');
            $endOfDate = $endOfDate->modify('+ 3 day');
        }

    
        $qb = $this->createQueryBuilder('t')
            ->leftJoin('t.voiture', 'v')
            ->leftJoin('t.participants', 'p')
            ->leftJoin('t.chauffeur', 'c')
            ->addSelect('v')
            ->addSelect('p')
            ->where('t.heureDepart BETWEEN :start AND :end')
            // ->andWhere('t.statut = :statut')
            ->andWhere('c.id != :chauffeurId')
            ->groupBy('t.id', 'v.id')
            ->having('(v.places - 1 - COUNT(p.id)) >= :placesMin')
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
