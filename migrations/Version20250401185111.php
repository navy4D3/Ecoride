<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250401185111 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE trajet_user (trajet_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_825A9176D12A823 (trajet_id), INDEX IDX_825A9176A76ED395 (user_id), PRIMARY KEY(trajet_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user ADD CONSTRAINT FK_825A9176D12A823 FOREIGN KEY (trajet_id) REFERENCES trajet (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user ADD CONSTRAINT FK_825A9176A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD creator_id INT NOT NULL, ADD user_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF061220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_8F91ABF061220EA6 ON avis (creator_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_8F91ABF0A76ED395 ON avis (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD voiture_id INT NOT NULL, ADD chauffeur_id INT NOT NULL, ADD chauffeur2_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98C181A8BA FOREIGN KEY (voiture_id) REFERENCES voiture (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98C85C0B3BE FOREIGN KEY (chauffeur_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_2B5BA98C181A8BA ON trajet (voiture_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_2B5BA98C85C0B3BE ON trajet (chauffeur_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE voiture ADD proprietaire_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE voiture ADD CONSTRAINT FK_E9E2810F76C50E4A FOREIGN KEY (proprietaire_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_E9E2810F76C50E4A ON voiture (proprietaire_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user DROP FOREIGN KEY FK_825A9176D12A823
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet_user DROP FOREIGN KEY FK_825A9176A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE trajet_user
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF061220EA6
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_8F91ABF061220EA6 ON avis
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_8F91ABF0A76ED395 ON avis
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP creator_id, DROP user_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98C181A8BA
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98C85C0B3BE
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_2B5BA98C181A8BA ON trajet
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_2B5BA98C85C0B3BE ON trajet
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP voiture_id, DROP chauffeur_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE voiture DROP FOREIGN KEY FK_E9E2810F76C50E4A
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_E9E2810F76C50E4A ON voiture
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE voiture DROP proprietaire_id
        SQL);
    }
}
