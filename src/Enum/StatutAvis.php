<?php

namespace App\Enum;

enum StatutAvis: string
{
    case Enregistre  = 'Enregistré';
    case Visible = 'Visible';
    case NonVisible = 'Non visible';

    public function label(): string
    {
        return match($this) {
            self::Enregistre => 'Enregistré',
            self::Visible => 'Visible',
            self::NonVisible => 'Non visible',
        };
    }
}