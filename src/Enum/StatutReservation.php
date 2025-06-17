<?php

namespace App\Enum;

enum StatutReservation: string
{
    case Enregistre  = 'Enregistré';
    case Paye = 'Payé';
    case Rembourse = 'Remboursé';
    case Equilibre = 'Equilibré';

    public function label(): string
    {
        return match($this) {
            self::Enregistre => 'Enregistré',
            self::Paye => 'Payé',
            self::Rembourse => 'Remboursé',
            self::Equilibre => 'Equilibré',
        };
    }
}