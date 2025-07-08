<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250604160206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP TABLE q
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP INDEX UNIQ_8F91ABF061220EA6, ADD INDEX IDX_8F91ABF061220EA6 (creator_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0D12A823 FOREIGN KEY (trajet_id) REFERENCES trajet (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_8F91ABF0D12A823 ON avis (trajet_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP statut
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE q (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP INDEX IDX_8F91ABF061220EA6, ADD UNIQUE INDEX UNIQ_8F91ABF061220EA6 (creator_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0D12A823
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_8F91ABF0D12A823 ON avis
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet ADD statut VARCHAR(255) NOT NULL
        SQL);
    }
}
