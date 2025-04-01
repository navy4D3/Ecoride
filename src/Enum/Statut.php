<?php

namespace App\Enum;

enum Statut: string
{
    case Planifie  = 'Planifié';
    case EnCours = 'En cours';
    case Termine = 'Terminé';
}