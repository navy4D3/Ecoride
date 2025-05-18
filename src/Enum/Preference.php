<?php

namespace App\Enum;

enum Preference: string
{
    case ANIMAL_LOVER = 'J\'aime les animaux';
    case BAVARD = 'Bavard';
    case QUIET = 'J’aime le calme';
    case NONFUMEUR = 'Non fumeur';
    case MUSIQUE = 'Musique à fond';
    case FUMEUR = 'Fumeur';
    case CHILD_LOVER = 'J\'aime les enfants';
    case FLEXIBLE = "Flexible sur les horaires";
    case ON_TIME = "Toujours à l'heure";
    case RAPIDE = "Rapide et efficace";

    public function icon(): string
    {
        return match($this) {
            self::ANIMAL_LOVER => 'fa-paw',        // Font Awesome icon
            self::BAVARD => 'fa-comments',
            self::QUIET => 'fa-moon',
            self::NONFUMEUR => 'fa-moon',
            self::MUSIQUE => 'fa-moon',
            self::FUMEUR => 'fa-moon',
            self::CHILD_LOVER => 'fa-moon',
        };
    }

    public function label(): string
    {
        return $this->value;
    }
}