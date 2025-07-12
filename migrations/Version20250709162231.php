<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250709162231 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, user_id INT NOT NULL, trajet_id INT NOT NULL, commentaire LONGTEXT DEFAULT NULL, is_positive TINYINT(1) NOT NULL, note INT NOT NULL, statut VARCHAR(255) NOT NULL, INDEX IDX_8F91ABF061220EA6 (creator_id), INDEX IDX_8F91ABF0A76ED395 (user_id), INDEX IDX_8F91ABF0D12A823 (trajet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE reservation (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, trajet_id INT NOT NULL, nb_places INT NOT NULL, statut VARCHAR(255) NOT NULL, INDEX IDX_42C84955A76ED395 (user_id), INDEX IDX_42C84955D12A823 (trajet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE reset_password_request (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, selector VARCHAR(20) NOT NULL, hashed_token VARCHAR(100) NOT NULL, requested_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', expires_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_7CE748AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE trajet (id INT AUTO_INCREMENT NOT NULL, voiture_id INT NOT NULL, chauffeur_id INT NOT NULL, heure_depart DATETIME NOT NULL, lieu_depart VARCHAR(100) NOT NULL, lieu_arrivee VARCHAR(100) NOT NULL, statut VARCHAR(255) NOT NULL, prix_personne INT NOT NULL, google_data JSON NOT NULL COMMENT '(DC2Type:json)', duree_in_seconds INT NOT NULL, INDEX IDX_2B5BA98C181A8BA (voiture_id), INDEX IDX_2B5BA98C85C0B3BE (chauffeur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE trajet_user (trajet_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_825A9176D12A823 (trajet_id), INDEX IDX_825A9176A76ED395 (user_id), PRIMARY KEY(trajet_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT '(DC2Type:json)', password VARCHAR(255) NOT NULL, nom VARCHAR(50) NOT NULL, prenom VARCHAR(50) NOT NULL, telephone VARCHAR(15) NOT NULL, photo_profil LONGBLOB DEFAULT NULL, adresse VARCHAR(255) NOT NULL, date_naissance DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', is_verified TINYINT(1) NOT NULL, note DOUBLE PRECISION DEFAULT NULL, description LONGTEXT DEFAULT NULL, preferences LONGTEXT DEFAULT NULL COMMENT '(DC2Type:simple_array)', credits INT NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE voiture (id INT AUTO_INCREMENT NOT NULL, proprietaire_id INT NOT NULL, modele VARCHAR(50) NOT NULL, marque VARCHAR(255) NOT NULL, is_electric TINYINT(1) NOT NULL, immatriculation VARCHAR(20) NOT NULL, date_premiere_immatriculation DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', couleur VARCHAR(255) NOT NULL, places INT NOT NULL, surnom VARCHAR(50) NOT NULL, INDEX IDX_E9E2810F76C50E4A (proprietaire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', available_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', delivered_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF061220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0D12A823 FOREIGN KEY (trajet_id) REFERENCES trajet (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reservation ADD CONSTRAINT FK_42C84955A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reservation ADD CONSTRAINT FK_42C84955D12A823 FOREIGN KEY (trajet_id) REFERENCES trajet (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reset_password_request ADD CONSTRAINT FK_7CE748AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98C181A8BA FOREIGN KEY (voiture_id) REFERENCES voiture (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98C85C0B3BE FOREIGN KEY (chauffeur_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user ADD CONSTRAINT FK_825A9176D12A823 FOREIGN KEY (trajet_id) REFERENCES trajet (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user ADD CONSTRAINT FK_825A9176A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE voiture ADD CONSTRAINT FK_E9E2810F76C50E4A FOREIGN KEY (proprietaire_id) REFERENCES user (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF061220EA6
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0D12A823
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955D12A823
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reset_password_request DROP FOREIGN KEY FK_7CE748AA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98C181A8BA
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98C85C0B3BE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user DROP FOREIGN KEY FK_825A9176D12A823
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user DROP FOREIGN KEY FK_825A9176A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE voiture DROP FOREIGN KEY FK_E9E2810F76C50E4A
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE avis
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE reservation
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE reset_password_request
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE trajet
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE trajet_user
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE voiture
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE messenger_messages
        SQL);
    }
}
