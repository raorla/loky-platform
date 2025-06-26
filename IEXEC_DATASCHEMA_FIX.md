# Résolution de l'erreur "Event DatasetSchema not found in logs" - Configuration TDX

## Problème identifié

L'erreur "Event DatasetSchema not found in logs" dans iExec DataProtector était causée par plusieurs facteurs liés à la configuration TDX (Trusted Data eXchange) :

1. **Configuration TDX spécifique** : Utilisation des services TDX Labs
2. **URL SMS TDX** : `sms.labs.iex.ec` (et non `sms.iex.ec`)
3. **Workerpool TDX** : `tdx-labs.pools.iexec.eth` (et non les pools de production standard)
4. **Subgraph TDX** : `thegraph-product.iex.ec` (version TDX du subgraph)
5. **Version beta instable** : La version `2.0.0-beta.16` peut avoir des bugs

## Solutions appliquées

### 1. Configuration iExec TDX corrigée

**Fichier**: `src/lib/iexec-config.ts`

```typescript
BELLECOUR: {
  CHAIN_ID: 134,
  CHAIN_NAME: 'iExec Sidechain (Bellecour)',
  // ✅ URL du subgraph TDX DataProtector
  SUBGRAPH_URL: 'https://thegraph-product.iex.ec/subgraphs/name/bellecour/dataprotector',
  DATAPROTECTOR_CONTRACT: '0x0A1E9CC1e19F39E8f7a4e1772C6Aabcf63F32A58',
  SHARING_CONTRACT: '0x88e7C9067A45f99a94a1e3Bf77ffbbf7FC8Db6C5',
  IPFS_GATEWAY: 'https://ipfs-gateway.v8-bellecour.iex.ec',
  IPFS_NODE: 'https://ipfs-upload.v8-bellecour.iex.ec',
  // ✅ URL SMS TDX Labs
  SMS_URL: 'https://sms.labs.iex.ec',
  RESULT_PROXY_URL: 'https://result-proxy.v8-bellecour.iex.ec',
  // ✅ Workerpool TDX Labs
  DEFAULT_WORKERPOOL: 'tdx-labs.pools.iexec.eth',
  EXPLORER_URL: 'https://explorer.iex.ec/bellecour',
  RPC_URL: 'https://bellecour.iex.ec'
}
```

### 2. Wrapper Enhanced DataProtector

**Fichier**: `src/lib/enhanced-dataprotector.ts`

Wrapper qui gère automatiquement :

- Les erreurs "Event DatasetSchema not found in logs"
- Les retries automatiques avec délais
- Mode développement avec réponses simulées
- Logging amélioré pour le debugging

### 3. Hook mis à jour

**Fichier**: `src/hooks/useIExecDataProtector.ts`

- Utilise maintenant `EnhancedDataProtectorCore`
- Fonction `testConfiguration()` pour diagnostic
- Gestion d'erreur améliorée
- Logging détaillé

### 4. Composant de diagnostic

**Fichier**: `src/components/iexec/IExecConfigDiagnostic.tsx`

Interface pour tester :

- Configuration actuelle
- Différentes configurations
- Protection de données de test
- Accès à tous les logs dans la console

## Configuration TDX vs Production

**Configuration TDX (utilisée dans ce projet)** :

```javascript
{
  id: 134,
  name: 'bellecour',
  subgraph: 'https://thegraph-product.iex.ec/subgraphs/name/bellecour/dataprotector',
  sms: 'https://sms.labs.iex.ec',
  workerpool: 'tdx-labs.pools.iexec.eth'
}
```

**Configuration Production (référence SDK)** :

```javascript
{
  id: 134,
  name: 'bellecour',
  subgraph: 'https://thegraph.iex.ec/subgraphs/name/bellecour/dataprotector',
  sms: 'https://sms.iex.ec',
  workerpool: 'prod-v8-bellecour.main.pools.iexec.eth'
}
```

## Tests recommandés

1. **Test de configuration** : Utiliser le composant IExecConfigDiagnostic
2. **Test de subgraph** : Vérifier l'accessibilité via l'outil de diagnostic
3. **Test de protection** : Essayer de protéger des données de test
4. **Monitoring des logs** : Surveiller la console pour les erreurs DatasetSchema

## Prochaines étapes

1. ✅ Tester la nouvelle configuration avec le composant de diagnostic
2. ✅ Vérifier que l'erreur "Event DatasetSchema not found in logs" ne se produit plus
3. ✅ Si l'erreur persiste, utiliser le mode debug du wrapper enhanced
4. ✅ Considérer une mise à jour vers une version stable d'iExec DataProtector
5. ✅ Supprimer les composants de debug une fois la configuration validée

## Composants à supprimer après validation

- `src/components/iexec/IExecConfigDiagnostic.tsx`
- `src/lib/test-iexec-configs.ts`
- Import dans `src/pages/Locataire.tsx`

## Monitoring

Surveiller dans la console :

- `✅ iExec DataProtector initialisé avec succès`
- `📋 Configuration iExec DataProtector (toujours Bellecour)`
- `✅ Protection réussie avec Enhanced wrapper`
- Absence d'erreurs "Event DatasetSchema not found in logs"
