<?php

namespace App\Entity;

use App\Repository\JoueurRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: JoueurRepository::class)]
class Joueur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_naissance = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    private ?National $national = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    private ?Club $club = null;

    #[ORM\Column]
    private ?int $nombre_but = null;


    public function getId(): ?int
    {
        return $this->id;
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

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(\DateTimeInterface $date_naissance): static
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function getIdNational(): ?National
    {
        return $this->national;
    }

    public function setIdNational(?National $national): static
    {
        $this->national = $national;

        return $this;
    }

    public function getIdClub(): ?Club
    {
        return $this->club;
    }

    public function setIdClub(?Club $club): static
    {
        $this->club = $club;

        return $this;
    }

    public function getNombreBut(): ?int
    {
        return $this->nombre_but;
    }

    public function setNombreBut(int $nombre_but): static
    {
        $this->nombre_but = $nombre_but;

        return $this;
    }
}
