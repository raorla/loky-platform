/**
 * Utilitaires de vérification pour iExec DataProtector TDX
 */

export const verifyTDXConfiguration = (config: any) => {
  const checks = {
    smsURL: config.smsDebugURL === 'https://sms.labs.iex.ec',
    workerpool: config.defaultWorkerpool === 'tdx-labs.pools.iexec.eth',
    subgraph: config.subgraphUrl === 'https://thegraph-product.iex.ec/subgraphs/name/bellecour/dataprotector'
  }

  console.log('🔍 Vérification configuration TDX:')
  console.log('  SMS URL:', config.smsDebugURL, checks.smsURL ? '✅' : '❌')
  console.log('  Workerpool:', config.defaultWorkerpool, checks.workerpool ? '✅' : '❌')
  console.log('  Subgraph:', config.subgraphUrl, checks.subgraph ? '✅' : '❌')

  const isValid = Object.values(checks).every(check => check)
  console.log('Configuration TDX valide:', isValid ? '✅' : '❌')

  return {
    isValid,
    checks,
    config
  }
}

export const verifyProtectedDataResult = (result: any, expectedOwner: string) => {
  const checks = {
    hasValidAddress: result.address && result.address !== '0x0000000000000000000000000000000000000000',
    ownerMatches: result.owner && result.owner.toLowerCase() === expectedOwner.toLowerCase(),
    hasTransactionHash: result.transactionHash && result.transactionHash !== '0x' + '0'.repeat(64),
    hasTimestamp: result.creationTimestamp && result.creationTimestamp > 0
  }

  console.log('🔍 Vérification résultat protectedData:')
  console.log('  Adresse valide:', result.address, checks.hasValidAddress ? '✅' : '❌')
  console.log('  Propriétaire correct:', result.owner, checks.ownerMatches ? '✅' : '❌')
  console.log('  Hash transaction:', result.transactionHash, checks.hasTransactionHash ? '✅' : '❌')
  console.log('  Timestamp:', result.creationTimestamp, checks.hasTimestamp ? '✅' : '❌')

  const isValid = Object.values(checks).every(check => check)
  console.log('ProtectedData valide:', isValid ? '✅' : '❌')

  return {
    isValid,
    checks,
    result
  }
}

export const verifyWalletConnection = async (web3Provider: any) => {
  try {
    const accounts = await web3Provider.request({ method: 'eth_accounts' })
    const chainId = await web3Provider.request({ method: 'eth_chainId' })
    
    console.log('🔍 Vérification connexion wallet:')
    console.log('  Comptes:', accounts)
    console.log('  ChainId:', chainId, parseInt(chainId, 16))
    
    return {
      isConnected: accounts.length > 0,
      currentAccount: accounts[0],
      chainId: parseInt(chainId, 16),
      accounts
    }
  } catch (error) {
    console.error('❌ Erreur vérification wallet:', error)
    return {
      isConnected: false,
      currentAccount: null,
      chainId: null,
      accounts: []
    }
  }
}

export default {
  verifyTDXConfiguration,
  verifyProtectedDataResult,
  verifyWalletConnection
}
