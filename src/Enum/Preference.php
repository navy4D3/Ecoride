<?php

namespace App\Enum;

enum Preference: string
{
    case ANIMAL_LOVER = 'J\'aime les animaux';
    case BAVARD = 'Bavard';
    case QUIET = 'J’aime le calme';
    case NONFUMEUR = 'Non fumeur';
    case FUMEUR = 'Fumeur';
    case MUSIQUE = 'Musique à fond';
    
    case CHILD_LOVER = 'J\'aime les enfants';
    case FLEXIBLE = "Flexible sur les horaires";
    case ON_TIME = "Toujours à l'heure";
    case RAPIDE = "Rapide et efficace";

    public function icon(): string
    {
        return match($this) {
            self::ANIMAL_LOVER => 'solar:cat-linear',        // Font Awesome icon
            self::BAVARD => 'mynaui:message',
            self::QUIET => 'material-symbols-light:sentiment-calm-outline-rounded',
            self::NONFUMEUR => 'cil:smoke-free',
            self::FUMEUR => 'cil:smoke',
            self::MUSIQUE => 'mynaui:music',
            self::CHILD_LOVER => 'cil:child',
            self::FLEXIBLE => 'proicons:directions',
            self::ON_TIME => 'ion:time-outline',
            self::RAPIDE => 'material-symbols-light:speed-outline-rounded',
        };
    }

    public function label(): string
    {
        return $this->value;
    }
}