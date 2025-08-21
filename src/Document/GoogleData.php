<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document]
class GoogleData
{
    #[MongoDB\Id]
    private string $id;

    #[MongoDB\Field(type: "string")]
    private string $trajetId; // lien vers l'id SQL du trajet

    #[MongoDB\Field(type: "hash")]
    private array $data; // JSON brut renvoyé par l’API Google Maps

    public function getId(): string
    {
        return $this->id;
    }

    public function getTrajetId(): string
    {
        return $this->trajetId;
    }

    public function setTrajetId(string $trajetId): self
    {
        $this->trajetId = $trajetId;
        return $this;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function setData(array $data): self
    {
        $this->data = $data;
        return $this;
    }
}
