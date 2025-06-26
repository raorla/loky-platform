:maison::cadenas_fermé_et_clé: Loky – Dossier de location certifié et confidentiel
:fléchette: Problème identifié
Le processus de location est aujourd’hui :
:x: Risqué pour les locataires : envoi de documents sensibles à des agences peu connues.
:x: Peu fiable pour les agences : dossiers parfois falsifiés (photoshop, faux bulletins).
:x: Chronophage pour tous : envoi répété des pièces, analyse manuelle, manque de confiance.
:coche_blanche: Notre solution
Loky est une plateforme confidentielle qui :
permet au locataire de créer une seule fois un dossier chiffré avec ses pièces justificatives,
exécute une analyse automatique dans un TEE sécurisé (iExec SGX) pour générer un score de solvabilité,
permet de partager un lien sécurisé avec une ou plusieurs agences ou propriétaires,
certifie l’agence et le bien pour protéger les locataires contre les arnaques.
:adn: Storytelling : louer sans stress
Jean cherche un appartement à Lyon. Il repère 10 annonces intéressantes, mais il ne veut pas envoyer son RIB, son contrat et son avis d’imposition à 10 agences différentes… et prendre le risque de se faire arnaquer.
Avec Loky, Jean téléverse une seule fois ses documents sur la plateforme. Son dossier est chiffré, et analysé automatiquement dans une enclave sécurisée.
Il obtient un score de solvabilité certifié qu’il peut partager via un lien confidentiel à chaque agence ou propriétaire.
En parallèle, Loky vérifie que chaque bien et chaque agence est légitime, via des documents officiels (mandats, RCS…).
Résultat : Jean peut postuler en toute confiance, en un seul clic, sans jamais exposer ses données sensibles.
:index_vers_la_droite: Si Jean y arrive, tout le monde y arrive !
:marteau_et_clé_anglaise: Fonctionnement technique avec iExec
:buste_silhouette: Côté locataire
Téléversement des documents → chiffrement avec DataProtector
Lancement de l’analyse dans une iApp iExec (SGX)
Génération d’un rapport de solvabilité signé
Partage via lien sécurisé ou QR code
:bureaux: Côté agence / propriétaire
Certification de l’agence et du bien (RCS, mandat…)
Consultation du score sans accès aux documents originaux
Décision rapide, fondée sur une preuve fiable et confidentielle
:boîte_rangement_fiches: Dataset Types
:buste_silhouette: Locataire
salary_slips (bulletins de salaire)
employment_contract (contrat de travail)
tax_notice (avis d’imposition)
bank_info (coordonnées bancaires)
housing_costs (charges existantes)
rental_score_report (rapport final signé)
:bureaux: Agence / bien
agency_license (carte pro, RCS…)
rental_mandate (mandat de location)
rental_property_info (description du bien)
certification_agency (badge agence certifiée)
certification_property (badge bien validé)
:page_imprimée: Exemple de rapport (rental_score_report.json)
json
{
  "status": "ACCEPTED",
  "score": 91,
  "monthly_income": 3120,
  "monthly_rent_max": 1040,
  "contract_type": "CDI",
  "rest_after_rent": 1900,
  "valid_until": "2025-10-01"
}
:ampoule: Fonctionnalités clés
:répéter: Réutilisation du dossier → 1 action = 10 candidatures
:lien: Partage facile et sécurisé (lien, QR, NFT)
:bouclier: Badge de certification agence/bien
:fléchette: UX pensée pour la Gen Z
:puzzle: API ou intégration future pour simulateurs, FranceConnect, etc.
:sac_d'argent: Modèle économique
Cible          Monétisation
Locataires  1er dossier gratuit → forfait ou abonnement (ex. 5€/mois)
Agences     Dashboard pro avec accès illimité
Plateforme NFT de preuve exportable pour scoring DeFi ou autres cas d’usage 
