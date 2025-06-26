import { IExecDataProtectorCore } from '@iexec/dataprotector'

// Test des différentes configurations pour identifier celle qui fonctionne
const configs = {
  // Configuration TDX actuelle (recommandée)
  tdx: {
    subgraphUrl: 'https://thegraph-product.iex.ec/subgraphs/name/bellecour/dataprotector',
    dataprotectorContractAddress: '0x0A1E9CC1e19F39E8f7a4e1772C6Aabcf63F32A58',
    sharingContractAddress: '0x88e7C9067A45f99a94a1e3Bf77ffbbf7FC8Db6C5',
    ipfsGateway: 'https://ipfs-gateway.v8-bellecour.iex.ec',
    ipfsNode: 'https://ipfs-upload.v8-bellecour.iex.ec',
    smsDebugURL: 'https://sms.labs.iex.ec',
    defaultWorkerpool: 'tdx-labs.pools.iexec.eth'
  },
  // Configuration production standard (pour comparaison)
  prod: {
    subgraphUrl: 'https://thegraph.iex.ec/subgraphs/name/bellecour/dataprotector',
    dataprotectorContractAddress: '0x0A1E9CC1e19F39E8f7a4e1772C6Aabcf63F32A58',
    sharingContractAddress: '0x88e7C9067A45f99a94a1e3Bf77ffbbf7FC8Db6C5',
    ipfsGateway: 'https://ipfs-gateway.v8-bellecour.iex.ec',
    ipfsNode: 'https://ipfs-upload.v8-bellecour.iex.ec',
    smsDebugURL: 'https://sms.iex.ec',
    defaultWorkerpool: 'prod-v8-bellecour.main.pools.iexec.eth'
  },
  // Configuration debug (pour tests)
  debug: {
    subgraphUrl: 'https://thegraph.iex.ec/subgraphs/name/bellecour/dataprotector',
    dataprotectorContractAddress: '0x0A1E9CC1e19F39E8f7a4e1772C6Aabcf63F32A58',
    sharingContractAddress: '0x88e7C9067A45f99a94a1e3Bf77ffbbf7FC8Db6C5',
    ipfsGateway: 'https://ipfs-gateway.v8-bellecour.iex.ec',
    ipfsNode: 'https://ipfs-upload.v8-bellecour.iex.ec',
    smsDebugURL: 'https://sms.iex.ec',
    defaultWorkerpool: 'debug-v8-bellecour.main.pools.iexec.eth'
  }
}

export const testIExecConfigs = async () => {
  console.log('🧪 Test des configurations iExec DataProtector...')
  
  for (const [name, config] of Object.entries(configs)) {
    console.log(`\n📋 Test de la configuration "${name}":`, config)
    
    try {
      if ((window as any).ethereum) {
        const dataProtector = new IExecDataProtectorCore((window as any).ethereum, config)
        console.log(`✅ Configuration "${name}" initialisée avec succès`)
      } else {
        console.log(`⚠️ Wallet non disponible pour tester la configuration "${name}"`)
      }
    } catch (error) {
      console.error(`❌ Erreur avec la configuration "${name}":`, error)
    }
  }
}

export { configs }
