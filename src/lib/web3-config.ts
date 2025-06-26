import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Définition du réseau Bellecour (iExec Sidechain)
const bellecour: AppKitNetwork = {
  id: 134,
  name: 'iExec Sidechain',
  nativeCurrency: {
    name: 'xRLC',
    symbol: 'xRLC',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://bellecour.iex.ec']
    }
  },
  blockExplorers: {
    default: {
      name: 'iExec Explorer',
      url: 'https://blockscout-bellecour.iex.ec'
    }
  },
  chainNamespace: 'eip155'
}

// Configuration des réseaux supportés
export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, sepolia, bellecour]

// Identifiant de projet Reown (remplacer par votre vrai projet ID)
export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'demo-project-id'

// Métadonnées de l'application
export const metadata = {
  name: 'Loky - Plateforme de Location Sécurisée',
  description: 'Dossiers de location certifiés et confidentiels',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://loky.app',
  icons: ['https://loky.app/favicon.png']
}

// Configuration de l'adaptateur Wagmi
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Création de l'instance AppKit
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: [],
    emailShowWallets: false
  },
  // Inclure seulement MetaMask (exclut automatiquement WalletConnect QR et Phantom)
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
  ],

  excludeWalletIds: [
  'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b', // WalletConnect
  'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393', // Phantom
 ],

  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-color-mix': '#e8632e',
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#e8632e',
    '--w3m-border-radius-master': '8px',
    '--w3m-font-family': 'system-ui, -apple-system, sans-serif'
  }
})

// Export de la configuration Wagmi
export const config = wagmiAdapter.wagmiConfig
