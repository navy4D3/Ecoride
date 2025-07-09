# 🚗 Ecoride — Plateforme intelligente de covoiturage

**Ecoride** est une application web développée avec **Symfony** qui permet de mettre en relation des passagers et des conducteurs pour organiser des trajets de covoiturage.  
L’application intègre des fonctionnalités avancées comme la suggestion dynamique de trajets via **Google Maps**, un système de rôles hiérarchisé (`ROLE_USER`, `ROLE_CHAUFFEUR`, `ROLE_EMPLOYE`, `ROLE_ADMIN`), et une modération humaine des avis.

---

## 🧰 Technologies utilisées

### Backend
- **Symfony 7** (PHP 8+)
- **Doctrine ORM**
- **Symfony Mailer** (via [Mailtrap](https://mailtrap.io/))
- **Composer**

### Frontend
- **Twig** (templates Symfony)
- **JavaScript** (vanilla)
- **Bootstrap SCSS**
- **Webpack Encore**

### Services externes
- **Google Maps Platform** :
  - `Places API` (autocomplétion d’adresses)
  - `Directions API` (calculs et données d’itinéraires)
- **victor-prdh Recaptcha-bundle** (Sécurité Google Recaptcha) - https://github.com/victor-prdh/recaptcha-bundle
---

## 🔐 Rôles et gestion des utilisateurs

| Rôle | Description |
|------|-------------|
| `ROLE_USER` | Par défaut à l’inscription. Peut rechercher et réserver un trajet. |
| `ROLE_CHAUFFEUR` | Accès après validation du formulaire « devenir chauffeur » (âge ≥ 18 ans). Peut proposer des trajets. |
| `ROLE_EMPLOYE` | Valide les **avis** postés par les passagers, et gère les signalements/avis négatifs. |
| `ROLE_ADMIN` | Accède à un **dashboard complet**, visualise les indicateurs (trajets, crédits), modifie les utilisateurs et crée les comptes `ROLE_EMPLOYE`. |

---

## ✨ Fonctionnalités principales


- 🚘 Création de trajets (chauffeurs uniquement) avec 📍 autocomplétion des adresses via **Google Autocomplete**
- 🔍 Rechercher de trajets avec des  Suggestions intelligentes 🧠 de trajets même si le passager se situe à une **étape intermédiaire**
- 📆 Réservation de trajets avec calcul dynamique des places restantes
- 💶 Système de crédit permettant les paiements entre passagers et chauffeur
- ⭐ Système de notation post-trajet (commentaire + note)
- 🧾 Validation des avis par des employés (`ROLE_EMPLOYE`)
- 🛡 Dashboard administrateur (`ROLE_EMPLOYE`) avec **indicateurs de suivi**, gestion des rôles, utilisateurs
- 📧 Notifications automatiques (annulation de trajet, demande d'avis suite à un trajet)


---

## 🧪 Structure de données

### Tables principales :
- `User` : informations, rôle, mot de passe, âge
- `Voiture` : véhicule lié au chauffeur
- `Trajet` : date, heure, lieux, voiture, chauffeur
- `Reservation` : passager, nombre de places
- `Avis` : note, commentaire, statut (`En attente`, `Visible`, `Rejeté`)

📁 La structure complète peut être consulté sur des visualiseurs de Base De Données SQL (MySQLWorkbench, PHPMyAdmin, PostGreSQL...)

---

## ⚙️ Installation locale

### Prérequis
- PHP 8.2+
- MySQL / MariaDB
- Composer
- Node.js + npm (Webpack Encore)
- Symfony CLI recommandé

### Étapes

```bash
# Cloner le projet
git clone https://github.com/navy4D3/Ecoride.git
cd ecoride

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env .env.local

# Configurer les variables d'environnement dans .env.local (base de données, mailer, google keys)
DATABASE_URL="mysql://root:password@127.0.0.1:3306/ecoride"


MAILER_DSN=mailtrap+smtp://PASSWORD@default

GOOGLE_API_KEY=yourkey

GOOGLE_RECAPTCHA_SITE_KEY=yourkey
GOOGLE_RECAPTCHA_SECRET_KEY=yourkey

# Créer la base et les tables
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# (Optionnel) Charger des données de test
php bin/console doctrine:fixtures:load

# Installer les assets frontend
npm install
npm run build

# Lancer le serveur
symfony server:start
