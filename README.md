# Loky – Dossier de location certifié et confidentiel

## 🎯 Problème identifié

Le processus de location est aujourd’hui :

  * **🚨 Risqué pour les locataires :** envoi de documents sensibles à des agences ou des propriétaires peu connus.
  * **🤔 Peu fiable pour les agences :** dossiers parfois falsifiés (retouches photo, faux bulletins de paie).
  * **⏳ Chronophage pour tous :** envoi répété des mêmes pièces, analyse manuelle et un manque de confiance généralisé.

## ✨ Notre solution

**Loky** est une **plateforme confidentielle** qui :

1.  Permet au locataire de **créer une seule fois un dossier chiffré** avec toutes ses pièces justificatives.
2.  Exécute une **analyse automatique dans un environnement d'exécution sécurisé (TEE)**, via iExec, pour générer un **score de solvabilité**.
3.  Permet de **partager un lien sécurisé** avec une ou plusieurs agences ou propriétaires, sans jamais exposer les documents originaux.
4.  **Certifie l'agence et le bien** pour protéger les locataires contre les arnaques à la location.

-----

### 📖 Storytelling : louer sans stress

Jean cherche un appartement à Lyon. Il repère 10 annonces intéressantes, mais il ne veut pas envoyer son RIB, son contrat de travail et son avis d’imposition à 10 contacts différents… et prendre le risque de se faire arnaquer.

Avec **Loky**, Jean téléverse une seule fois ses documents sur la plateforme. Son dossier est chiffré de bout en bout et analysé automatiquement dans une enclave sécurisée.

Il obtient un **score de solvabilité certifié** qu’il peut partager via un **lien confidentiel** à chaque agence ou propriétaire.

En parallèle, Loky vérifie que **chaque bien et chaque agence est légitime**, en contrôlant des documents officiels (mandats de location, extrait Kbis, etc.).

**Résultat :** Jean peut postuler en toute confiance, en un seul clic, sans jamais exposer ses données sensibles.

> *Si Jean peut le faire, tout le monde peut le faire!*

-----

## 🛠️ Fonctionnement technique avec iExec

#### Côté locataire 👤

1.  **Téléversement des documents** → Chiffrement avec `DataProtector`.
2.  **Lancement de l’analyse** dans une application iExec (iApp) s'exécutant dans une enclave SGX.
3.  **Génération d’un rapport de solvabilité** signé numériquement.
4.  **Partage** via un lien sécurisé ou un QR code.

#### Côté agence / propriétaire 🏢

1.  **Certification** de l’agence et du bien (vérification Kbis, mandat, etc.).
2.  **Consultation du score** du candidat sans jamais avoir accès aux documents originaux.
3.  **Décision rapide**, fondée sur une preuve fiable et confidentielle.

-----

### 🗂️ Types de données (Datasets)

#### Locataire

  * `salary_slips` (bulletins de salaire)
  * `employment_contract` (contrat de travail)
  * `tax_notice` (avis d’imposition)
  * `bank_info` (coordonnées bancaires)
  * `housing_costs` (charges existantes)
  * `rental_score_report` (rapport final signé)

#### Agence / Bien

  * `agency_license` (carte pro, Kbis…)
  * `rental_mandate` (mandat de location)
  * `rental_property_info` (description du bien)
  * `certification_agency` (badge agence certifiée)
  * `certification_property` (badge bien validé)

-----

### 📄 Exemple de rapport (`rental_score_report.json`)

```json
{
  "status": "ACCEPTED",
  "score": 91,
  "monthly_income": 3120,
  "monthly_rent_max": 1040,
  "contract_type": "CDI",
  "rest_after_rent": 1900,
  "valid_until": "2025-10-01"
}
```

-----

## 🚀 Fonctionnalités clés

  * **Réutilisation du dossier :** 1 action = 10 candidatures.
  * **Partage facile et sécurisé :** via lien, QR code, ou même un NFT.
  * **Badge de certification** pour les agences et les biens.
  * **UX pensée pour la Gen Z :** simple, rapide et responsive.
  * **API et intégrations futures :** possibilité de se connecter à des simulateurs, FranceConnect, etc.

-----

## 💰 Modèle économique

| Cible              | Monétisation                                                                     |
| :----------------- | :------------------------------------------------------------------------------- |
| **Locataires** | 1er dossier gratuit, puis forfait ou abonnement (ex. 5€/mois).                   |
| **Agences** | Dashboard professionnel avec accès illimité aux fonctionnalités de vérification. |
| **Écosystème Web3** | Plateforme NFT de preuve exportable pour le scoring DeFi ou d'autres cas d’usage.  |

-----

## ⚙️ Installation & Démarrage

Pour lancer le projet en local :

1.  **Assurez-vous d'avoir [pnpm](https://pnpm.io/fr/installation) installé.**

2.  **Installez les dépendances du projet :**

    ```bash
    pnpm install
    ```

3.  **Lancez le serveur de développement :**

    ```bash
    pnpm dev
    ```



