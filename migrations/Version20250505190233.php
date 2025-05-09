<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250505190233 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // $this->addSql(<<<'SQL'
        //     ALTER TABLE trajet ADD chauffeur2_id INT NOT NULL
        // SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98CE885DC45 FOREIGN KEY (chauffeur2_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_2B5BA98CE885DC45 ON trajet (chauffeur2_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98CE885DC45
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_2B5BA98CE885DC45 ON trajet
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP chauffeur2_id
        SQL);
    }
}
