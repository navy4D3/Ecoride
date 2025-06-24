<?php

namespace App\Entity;

use App\Enum\Preference;
use App\Enum\StatutReservation;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['email'], message: 'Cette adresse mail est déja utilisée.', groups: ['registration'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 50)]
    private ?string $nom = null;

    #[ORM\Column(length: 50)]
    private ?string $prenom = null;

    #[ORM\Column(length: 15)]
    private ?string $telephone = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $photoProfil = null;

    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_naissance = null;

    #[ORM\Column]
    private bool $isVerified = false;

    /**
     * @var Collection<int, Voiture>
     */
    #[ORM\OneToMany(targetEntity: Voiture::class, mappedBy: 'proprietaire', orphanRemoval: true)]
    private Collection $voitures;

    /**
     * @var Collection<int, Voiture>
     */

    #[ORM\OneToMany(mappedBy: 'chauffeur', targetEntity: Trajet::class)]
    private Collection $trajetsEnTantQueChauffeur;

    /**
     * @var Collection<int, Trajet>
     */
    #[ORM\OneToMany(targetEntity: Trajet::class, mappedBy: 'chauffeur2', orphanRemoval: true)]
    private Collection $trajetsAsChauffeur;

    #[ORM\Column(nullable: true)]
    private ?float $note = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::SIMPLE_ARRAY, nullable: true, enumType: Preference::class)]
    private ?array $preferences = null;

    /**
     * @var Collection<int, Reservation>
     */
    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $reservations;

    #[ORM\Column]
    private ?int $credits = null;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Avis::class, cascade: ['persist', 'remove'])]
    private Collection $avisPublies;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Avis::class, orphanRemoval: true)]
    private Collection $avisRecus;

    public function __construct()
    {
        $this->voitures = new ArrayCollection();
        $this->trajetsEnTantQueChauffeur = new ArrayCollection();
        $this->trajetsAsChauffeur = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->credits = 20;
        $this->avisRecus = new ArrayCollection();
        $this->avisPublies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function getUserLevel(): string
    {
        $roles = $this->roles;

        if ( in_array('ROLE_ADMIN', $roles) ) {
            return 'ADMIN';
        } else if (in_array('ROLE_EMPLOYE', $roles)) {
            return 'EMPLOYE';
        } else {
            return 'USER';
        }
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getPhotoProfil()
    {
        return $this->photoProfil;
    }

    public function setPhotoProfil($photoProfil): static
    {
        $this->photoProfil = $photoProfil;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeImmutable
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(\DateTimeImmutable $date_naissance): static
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    /**
     * @return Collection<int, Voiture>
     */
    public function getVoitures(): Collection
    {
        return $this->voitures;
    }

    public function addVoiture(Voiture $voiture): static
    {
        if (!$this->voitures->contains($voiture)) {
            $this->voitures->add($voiture);
            $voiture->setProprietaire($this);
        }

        return $this;
    }

    public function removeVoiture(Voiture $voiture): static
    {
        if ($this->voitures->removeElement($voiture)) {
            // set the owning side to null (unless already changed)
            if ($voiture->getProprietaire() === $this) {
                $voiture->setProprietaire(null);
            }
        }

        return $this;
    }


    public function getTrajetsEnTantQueChauffeur(): Collection
    {
        return $this->trajetsEnTantQueChauffeur;
    }

    public function addTrajetEnTantQueChauffeur(Trajet $trajet): self
    {
        if (!$this->trajetsEnTantQueChauffeur->contains($trajet)) {
            $this->trajetsEnTantQueChauffeur[] = $trajet;
            $trajet->setChauffeur($this);
        }

        return $this;
    }

    public function isChauffeur(): bool
    {
        return in_array('ROLE_CHAUFFEUR', $this->roles, true);
    }

    public function addRole(string $role): self
    {
        if (!in_array($role, $this->roles, true)) {
            $this->roles[] = $role;
        }

        return $this;
    }

    // public function removeTrajetEnTantQueChauffeur(Trajet $trajet): self
    // {
    //     if ($this->trajetsEnTantQueChauffeur->removeElement($trajet)) {
    //         if ($trajet->getChauffeur() === $this) {
    //             $trajet->setChauffeur(null);
    //         }
    //     }

    //     return $this;
    // }

    /**
     * @return Collection<int, Trajet>
     */
    public function getTrajetsAsChauffeur(): Collection
    {
        return $this->trajetsAsChauffeur;
    }

    public function addTrajetsAsChauffeur(Trajet $trajetsAsChauffeur): static
    {
        if (!$this->trajetsAsChauffeur->contains($trajetsAsChauffeur)) {
            $this->trajetsAsChauffeur->add($trajetsAsChauffeur);
            $trajetsAsChauffeur->setChauffeur2($this);
        }

        return $this;
    }

    public function removeTrajetsAsChauffeur(Trajet $trajetsAsChauffeur): static
    {
        if ($this->trajetsAsChauffeur->removeElement($trajetsAsChauffeur)) {
            // set the owning side to null (unless already changed)
            if ($trajetsAsChauffeur->getChauffeur2() === $this) {
                $trajetsAsChauffeur->setChauffeur2(null);
            }
        }

        return $this;
    }

    public function getNote(): ?float
    {
        return $this->note;
    }

    public function setNote(?float $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Preference[]|null
     */
    public function getPreferences(): ?array
    {
        return $this->preferences;
    }

    public function setPreferences(?array $preferences): static
    {
        $this->preferences = $preferences;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setUser($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getUser() === $this) {
                $reservation->setUser(null);
            }
        }

        return $this;
    }

    public function getCredits(): ?int
    {
        return $this->credits;
    }

    public function setCredits(int $credits): static
    {
        $this->credits = $credits;

        return $this;
    }

    public function getCreditsReserve(): int
    {
        $creditsEnAttente = 0;
        $reservations = $this->getReservations();

        foreach ($reservations as $reservation) {
            if ($reservation->getStatut() == StatutReservation::Enregistre) {
                $creditsEnAttente += $reservation->getNbPlaces() * $reservation->getTrajet()->getPrixPersonne();
            }
        }

        return $creditsEnAttente;
        
    }

    public function getCreditsDisponible(): int
    {
        return $this->getCredits() - $this->getCreditsReserve();
    }

    /**
     * @return Collection<int, Avis>
     */
    public function getAvisPublies(): Collection
    {
        return $this->avisPublies;
    }

    /**
     * @return Collection<int, Avis>
     */
    public function getAvisRecus(): Collection
    {
        return $this->avisRecus;
    }

}
