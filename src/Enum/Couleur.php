<?php

namespace App\Enum;

enum Couleur: string
{
    case Blanc = 'Blanc';
    case Noir = 'Noir';
    case GrisFonce = 'Gris foncé';
    case GrisClaire = 'Gris clair';
    case Rouge = 'Rouge';
    case Bleu = 'Bleu';
    case Vert = 'Vert';
    case Jaune = 'Jaune';
    case Orange = 'Orange';
    case Marron = 'Marron';
    case Violet = 'Violet';
    case Beige = 'Beige';
    case Rose = 'Rose';

    public function label(): string
    {
        return match($this) {
            self::Blanc => 'Blanc',
            self::Noir => 'Noir',
            self::GrisFonce => 'Gris foncé',
            self::GrisClaire => 'Gris clair',
            self::Rouge => 'Rouge',
            self::Bleu => 'Bleu',
            self::Vert => 'Vert',
            self::Jaune => 'Jaune',
            self::Orange => 'Orange',
            self::Marron => 'Marron',
            self::Violet => 'Violet',
            self::Beige => 'Beige',
            self::Rose => 'Rose',
        };
    }

    public function hex(): string
    {
        return match($this) {
            self::Blanc => '#ffffff',
            self::Noir => '#000000',
            self::GrisFonce => '#555555',
            self::GrisClaire => '#d3d3d3',
            self::Rouge => '#ff0000',
            self::Bleu => '#0000ff',
            self::Vert => '#008000',
            self::Jaune => '#ffff00',
            self::Orange => '#ffa500',
            self::Marron => '#8b4513',
            self::Violet => '#800080',
            self::Beige => '#f5f5dc',
            self::Rose => '#ffc0cb',
        };
    }
}