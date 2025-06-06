<?php

namespace App\Enum;

enum Statut: string
{
    case Planifie  = 'Planifié';
    case EnCours = 'En cours';
    case Termine = 'Terminé';

    public function label(): string
    {
        return match($this) {
            self::Planifie => 'Planifié',
            self::EnCours => 'En cours',
            self::Termine => 'Terminé',
        };
    }
}