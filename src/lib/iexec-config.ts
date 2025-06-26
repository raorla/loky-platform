// Configuration pour iExec DataProtector
// TOUJOURS utiliser Bellecour (chainId: 134) pour iExec, peu importe le réseau wallet

export const IEXEC_CONFIG = {
  // Configuration Bellecour avec TDX (TOUJOURS utilisée pour iExec)
  BELLECOUR: {
    CHAIN_ID: 134,
    CHAIN_NAME: 'iExec Sidechain (Bellecour)',
    // URL du subgraph TDX DataProtector
    SUBGRAPH_URL: 'https://thegraph-product.iex.ec/subgraphs/name/bellecour/dataprotector',
    DATAPROTECTOR_CONTRACT: '0x0A1E9CC1e19F39E8f7a4e1772C6Aabcf63F32A58',
    SHARING_CONTRACT: '0x88e7C9067A45f99a94a1e3Bf77ffbbf7FC8Db6C5',
    IPFS_GATEWAY: 'https://ipfs-gateway.v8-bellecour.iex.ec',
    IPFS_NODE: 'https://ipfs-upload.v8-bellecour.iex.ec',
    // URL SMS TDX Labs
    SMS_URL: 'https://sms.labs.iex.ec',
    RESULT_PROXY_URL: 'https://result-proxy.v8-bellecour.iex.ec',
    // Workerpool TDX Labs
    DEFAULT_WORKERPOOL: 'tdx-labs.pools.iexec.eth',
    EXPLORER_URL: 'https://explorer.iex.ec/bellecour',
    // Configuration RPC pour Bellecour
    RPC_URL: 'https://bellecour.iex.ec'
  }
}

// Configuration par défaut pour DataProtector selon le réseau
export const getDataProtectorConfig = (chainId?: number) => {
  // TOUJOURS utiliser Bellecour pour iExec DataProtector, peu importe le réseau wallet connecté
  const config = IEXEC_CONFIG.BELLECOUR
  
  console.log(`🔧 iExec DataProtector configuré pour Bellecour (chainId 134), wallet sur chainId: ${chainId}`)
  
  return {
    subgraphUrl: config.SUBGRAPH_URL,
    dataprotectorContractAddress: config.DATAPROTECTOR_CONTRACT,
    sharingContractAddress: config.SHARING_CONTRACT,
    ipfsGateway: config.IPFS_GATEWAY,
    ipfsNode: config.IPFS_NODE,
    smsDebugURL: config.SMS_URL,
    defaultWorkerpool: config.DEFAULT_WORKERPOOL
  }
}

// Réseau recommandé
export const RECOMMENDED_CHAIN_ID = IEXEC_CONFIG.BELLECOUR.CHAIN_ID

export default IEXEC_CONFIG
