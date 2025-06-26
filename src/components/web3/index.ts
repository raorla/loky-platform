// Composants Web3 pour Loky
export { default as WalletConnectButton, WalletConnectMobile } from './WalletConnectButton'
export { default as WalletInfo, WalletInfoCompact } from './WalletInfo'
export { default as Web3Provider } from './Web3Provider'
export { default as WalletGuard, WalletRequired } from './WalletGuard'

// Hooks
export { useWeb3Connection, useWalletStatus } from '../../hooks/useWeb3Connection'

// Configuration
export { appKit, config, projectId } from '../../lib/web3-config'
