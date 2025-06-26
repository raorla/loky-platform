# Guide d'Intégration du Profil Utilisateur - Loky Platform

## 🎯 Vue d'ensemble

Cette intégration permet aux utilisateurs de configurer leur type (locataire ou agence) et d'afficher conditionnellement les espaces appropriés dans l'interface utilisateur.

## 🚀 Fonctionnalités Implémentées

### 1. **UserProfileContext**

- Contexte global pour gérer le profil utilisateur
- Stockage persistant dans localStorage par adresse wallet
- Types d'utilisateur : `locataire` ou `agence`
- Validation de complétude du profil

### 2. **UserSettings Modal**

- Modal de configuration du profil utilisateur
- Formulaires dynamiques selon le type d'utilisateur
- Champs spécifiques pour locataires et agences
- Sauvegarde automatique dans le contexte

### 3. **Navigation Conditionnelle**

- Affichage/masquage des espaces selon le type d'utilisateur
- Intégration du bouton paramètres dans la navigation
- Adaptation desktop et mobile

### 4. **Pages Personnalisées**

- **Home** : Affichage conditionnel selon le profil
- **Locataire** : Accès protégé + personnalisation
- **Agence** : Accès protégé + personnalisation

### 5. **UserTypeGuard**

- Composant de protection d'accès aux pages
- Redirection/blocage si mauvais type d'utilisateur
- Interface claire pour configuration du profil

## 📁 Structure des Fichiers

```
src/
├── contexts/
│   └── UserProfileContext.tsx          # Contexte global du profil
├── components/
│   ├── auth/
│   │   └── UserTypeGuard.tsx          # Protection d'accès aux pages
│   ├── settings/
│   │   └── UserSettings.tsx           # Modal de paramètres utilisateur
│   └── layout/
│       └── Navigation.tsx             # Navigation avec affichage conditionnel
├── pages/
│   ├── Home.tsx                       # Page d'accueil personnalisée
│   ├── Locataire.tsx                  # Espace locataire protégé
│   └── Agence.tsx                     # Espace agence protégé
└── main.tsx                           # Intégration du UserProfileProvider
```

## 🔄 Workflow Utilisateur

### Premier Accès

1. **Connexion Wallet** : L'utilisateur connecte son wallet
2. **Page Home** : Affichage des boutons locataire/agence
3. **Sélection Type** : Choix entre "Espace Locataire" ou "Espace Agence"
4. **Garde d'Accès** : `UserTypeGuard` demande la configuration du profil
5. **Modal Paramètres** : Configuration du type et des informations
6. **Accès Autorisé** : Redirection vers l'espace approprié

### Utilisateur Configuré

1. **Connexion Wallet** : Reconnaissance automatique du profil
2. **Page Home** : Affichage personnalisé selon le type
3. **Navigation** : Seul l'espace approprié est visible
4. **Accès Direct** : Navigation libre dans son espace

## 🎛️ Configuration du Profil

### Interface UserProfile

```typescript
interface UserProfile {
  userType: "locataire" | "agence";
  // Informations communes
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;

  // Informations spécifiques locataire
  dateNaissance?: string;
  profession?: string;
  salaire?: string;
  situationFamiliale?: string;

  // Informations spécifiques agence
  nomAgence?: string;
  siret?: string;
  licenceImmobiliere?: string;
  description?: string;
  secteurActivite?: string;
  nombreEmployes?: string;
}
```

### Stockage

- **Clé** : `user-profile-${walletAddress}`
- **Format** : JSON stringifié dans localStorage
- **Synchronisation** : Automatique avec changement d'adresse

## 🔐 Protection d'Accès

### UserTypeGuard

- **Aucun profil** : Modal de configuration obligatoire
- **Mauvais type** : Message d'erreur + option de changement
- **Type correct** : Accès autorisé au contenu

### Routing

```typescript
// App.tsx - Pas de protection au niveau des routes
// Protection intégrée dans chaque page spécifique

// pages/Locataire.tsx
<UserTypeGuard requiredUserType="locataire">
  <WalletGuard>
    {/* Contenu locataire */}
  </WalletGuard>
</UserTypeGuard>

// pages/Agence.tsx
<UserTypeGuard requiredUserType="agence">
  <WalletGuard>
    {/* Contenu agence */}
  </WalletGuard>
</UserTypeGuard>
```

## 🎨 Interface Utilisateur

### Navigation

- **Desktop** : Liens conditionnels dans la barre de navigation
- **Mobile** : Menu déroulant avec espaces filtrés
- **Paramètres** : Bouton accessible via icône Settings

### Pages Dynamiques

- **Home** : Section d'accueil personnalisée si profil configuré
- **Locataire** : Salutation avec nom du profil + alertes de complétude
- **Agence** : Nom d'agence et adresse du profil + alertes

### Messages d'Alerte

- **Profil incomplet** : Alertes visuelles avec lien vers paramètres
- **Type incorrect** : Pages de blocage avec options de reconfiguration

## 🧪 Tests et Validation

### Scénarios de Test

1. **Nouveau utilisateur** : Workflow complet de configuration
2. **Changement de type** : Basculement locataire ↔ agence
3. **Profil incomplet** : Validation des alertes et blocages
4. **Changement d'adresse** : Chargement du bon profil
5. **Navigation** : Vérification des espaces visibles/cachés

### Points de Contrôle

- [ ] UserProfileProvider intégré au niveau racine
- [ ] Navigation conditionnelle fonctionnelle
- [ ] UserTypeGuard bloque l'accès incorrect
- [ ] Modal UserSettings sauvegarde correctement
- [ ] Persistance localStorage par adresse wallet
- [ ] Pages personnalisées selon le profil

## 🔧 Personnalisation

### Ajout de Nouveaux Types

1. Étendre l'interface `UserProfile`
2. Mettre à jour les guards et validations
3. Ajouter les routes et pages correspondantes
4. Configurer l'affichage conditionnel

### Champs Personnalisés

1. Modifier l'interface `UserProfile`
2. Ajouter les champs dans `UserSettings.tsx`
3. Mettre à jour la validation de complétude
4. Intégrer l'affichage dans les pages

## 📊 Métriques et Analytics

### Données Trackées

- Type d'utilisateur configuré
- Complétude du profil
- Changements de type
- Accès aux espaces protégés

### KPIs Suggérés

- Taux de configuration de profil
- Distribution locataires/agences
- Temps de première configuration
- Abandons dans le workflow

## 🔄 Prochaines Étapes

1. **Tests Utilisateur** : Validation du workflow UX
2. **Analytics** : Intégration de tracking des événements
3. **Validation** : Vérification des informations saisies
4. **Export** : Fonctionnalités d'export/import de profil
5. **Synchronisation** : Sync multi-device du profil

---

## 💡 Notes Techniques

### Performance

- Contexte optimisé avec useEffect pour éviter les re-renders
- localStorage pour persistance locale rapide
- Lazy loading conditionnel des composants

### Sécurité

- Validation des types au niveau TypeScript
- Sanitisation des données localStorage
- Protection des routes sensibles

### Maintenance

- Structure modulaire pour faciliter les évolutions
- Types TypeScript stricts pour éviter les erreurs
- Documentation inline du code
