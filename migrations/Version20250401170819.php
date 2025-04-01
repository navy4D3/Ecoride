<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250401170819 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, commentaire LONGTEXT DEFAULT NULL, is_positive TINYINT(1) NOT NULL, note INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE trajet (id INT AUTO_INCREMENT NOT NULL, date_depart DATETIME NOT NULL, heure_depart DATETIME NOT NULL, lieu_depart VARCHAR(100) NOT NULL, date_arrivee DATETIME NOT NULL, heure_arrivee DATETIME NOT NULL, lieu_arrivee VARCHAR(100) NOT NULL, nb_place INT NOT NULL, statut VARCHAR(255) NOT NULL, prix_personne INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user ADD prenom VARCHAR(255) NOT NULL, ADD email VARCHAR(255) NOT NULL, ADD password VARCHAR(50) NOT NULL, ADD telephone VARCHAR(50) DEFAULT NULL, ADD adresse VARCHAR(100) DEFAULT NULL, ADD birth_date DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', ADD profil_picture LONGBLOB DEFAULT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP TABLE avis
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE trajet
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user DROP prenom, DROP email, DROP password, DROP telephone, DROP adresse, DROP birth_date, DROP profil_picture
        SQL);
    }
}
