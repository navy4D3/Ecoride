<?php

namespace App\Entity;

use App\Enum\Couleur;
use App\Repository\VoitureRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VoitureRepository::class)]
class Voiture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $modele = null;

    #[ORM\Column(length: 50)]
    private ?string $marque = null;

    #[ORM\Column]
    private ?bool $isElectric = null;

    #[ORM\Column(length: 20)]
    private ?string $immatriculation = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $datePremiereImmatriculation = null;

    #[ORM\Column(enumType: Couleur::class)]
    private ?Couleur $couleur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModele(): ?string
    {
        return $this->modele;
    }

    public function setModele(string $modele): static
    {
        $this->modele = $modele;

        return $this;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function isElectric(): ?bool
    {
        return $this->isElectric;
    }

    public function setIsElectric(bool $isElectric): static
    {
        $this->isElectric = $isElectric;

        return $this;
    }

    public function getImmatriculation(): ?string
    {
        return $this->immatriculation;
    }

    public function setImmatriculation(string $immatriculation): static
    {
        $this->immatriculation = $immatriculation;

        return $this;
    }

    public function getDatePremiereImmatriculation(): ?\DateTimeImmutable
    {
        return $this->datePremiereImmatriculation;
    }

    public function setDatePremiereImmatriculation(\DateTimeImmutable $datePremiereImmatriculation): static
    {
        $this->datePremiereImmatriculation = $datePremiereImmatriculation;

        return $this;
    }

    public function getCouleur(): ?Couleur
    {
        return $this->couleur;
    }

    public function setCouleur(Couleur $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }
}
