<?php

namespace App\Entity;

use App\Enum\Statut;
use App\Repository\TrajetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TrajetRepository::class)]
class Trajet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $heureDepart = null;

    #[ORM\Column(length: 100)]
    private ?string $lieuDepart = null;


    #[ORM\Column(length: 100)]
    private ?string $lieuArrivee = null;



    #[ORM\Column(enumType: Statut::class)]
    private ?Statut $statut = null;

    #[ORM\Column]
    private ?int $prixPersonne = null;

    #[ORM\ManyToOne(inversedBy: 'trajets')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Voiture $voiture = null;

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'trajets')]
    private Collection $participants;

    #[ORM\ManyToOne(inversedBy: 'trajetsEnTantQueChauffeur')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $chauffeur = null;

    #[ORM\Column]
    private ?array $googleData = [];

    #[ORM\Column]
    private ?int $dureeInSeconds = null;

    #[ORM\ManyToOne(inversedBy: 'trajetsAsChauffeur')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $chauffeur2 = null;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHeureDepart(): ?\DateTimeInterface
    {
        return $this->heureDepart;
    }

    public function setHeureDepart(\DateTimeInterface $heureDepart): static
    {
        $this->heureDepart = $heureDepart;

        return $this;
    }

    public function getLieuDepart(): ?string
    {
        return $this->lieuDepart;
    }

    public function setLieuDepart(string $lieuDepart): static
    {
        $this->lieuDepart = $lieuDepart;

        return $this;
    }

    public function getLieuArrivee(): ?string
    {
        return $this->lieuArrivee;
    }

    public function setLieuArrivee(string $lieuArrivee): static
    {
        $this->lieuArrivee = $lieuArrivee;

        return $this;
    }

    public function getStatut(): ?Statut
    {
        return $this->statut;
    }

    public function setStatut(Statut $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function getPrixPersonne(): ?int
    {
        return $this->prixPersonne;
    }

    public function setPrixPersonne(int $prixPersonne): static
    {
        $this->prixPersonne = $prixPersonne;

        return $this;
    }

    public function getVoiture(): ?Voiture
    {
        return $this->voiture;
    }

    public function setVoiture(?Voiture $voiture): static
    {
        $this->voiture = $voiture;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): static
    {
        if (!$this->participants->contains($participant)) {
            $this->participants->add($participant);
        }

        return $this;
    }

    public function removeParticipant(User $participant): static
    {
        $this->participants->removeElement($participant);

        return $this;
    }

    public function getPlacesRestante() {
        $nbParticipants = count($this->getParticipants());
        $nbPlaces = $this->getVoiture()->getPlaces();

        return $nbPlaces - $nbParticipants - 1;
    }

    public function getChauffeur(): ?User
    {
        return $this->chauffeur;
    }

    public function setChauffeur(User $chauffeur): static
    {
        $this->chauffeur = $chauffeur;

        return $this;
    }

    public function getGoogleData(): ?array
    {
        return $this->googleData;
    }

    public function setGoogleData(array $googleData): static
    {
        $this->googleData = $googleData;

        return $this;
    }

    public function getDureeInSeconds(): ?int
    {
        return $this->dureeInSeconds;
    }

    public function setDureeInSeconds(int $dureeInSeconds): static
    {
        $this->dureeInSeconds = $dureeInSeconds;

        return $this;
    }

    public function getChauffeur2(): ?User
    {
        return $this->chauffeur2;
    }

    public function setChauffeur2(?User $chauffeur2): static
    {
        $this->chauffeur2 = $chauffeur2;

        return $this;
    }

    public function getGpsPoints(): array
    {
        $data = $this->getGoogleData(); // JSON brut de Google
        // // $data = json_decode($json, true);
        $polyline = $data['overview_polyline']['points'];
        // $polyline = $data['summary'];

        return $this->decodePolyline($polyline);
    }

    private function decodePolyline(string $polyline): array
    {
        if (!$polyline) {
            return [];
        }

        $points = [];
    
        $index = 0;
        $lat = 0;
        $lng = 0;
        $length = strlen($polyline);
    
        while ($index < $length) {
            $result = 1;
            $shift = 0;
            do {
                $b = ord($polyline[$index++]) - 63 - 1;
                $result += $b << $shift;
                $shift += 5;
            } while ($b >= 0x1f);
            $lat += ($result & 1) ? ~($result >> 1) : ($result >> 1);
    
            $result = 1;
            $shift = 0;
            do {
                $b = ord($polyline[$index++]) - 63 - 1;
                $result += $b << $shift;
                $shift += 5;
            } while ($b >= 0x1f);
            $lng += ($result & 1) ? ~($result >> 1) : ($result >> 1);
    
            $points[] = [
                'lat' => $lat * 1e-5,
                'lng' => $lng * 1e-5,
            ];
        }
    
        return $points;
        // Fonction pour décoder les polylines Google en tableau de ['lat' => ..., 'lng' => ...]
        // => peux t’en fournir une version PHP si besoin
    }
}
