<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250504094122 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP INDEX UNIQ_2B5BA98C85C0B3BE, ADD INDEX IDX_2B5BA98C85C0B3BE (chauffeur_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE trajet DROP INDEX IDX_2B5BA98C85C0B3BE, ADD UNIQUE INDEX UNIQ_2B5BA98C85C0B3BE (chauffeur_id)
        SQL);
    }
}
