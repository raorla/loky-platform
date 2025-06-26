import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Wallet, 
  Copy, 
  ExternalLink,
  Shield,
  Check,
  AlertTriangle
} from 'lucide-react'
import { useWeb3Connection } from '../../hooks/useWeb3Connection'
import { useState } from 'react'
import { useChainId, useChains } from 'wagmi'

export const WalletInfo = () => {
  const { 
    isConnected, 
    address, 
    disconnect, 
    formatAddress 
  } = useWeb3Connection()
  
  const chainId = useChainId()
  const chains = useChains()
  const chain = chains.find(c => c.id === chainId)
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Erreur lors de la copie:', err)
      }
    }
  }

  const openInExplorer = () => {
    if (address && chain) {
      const baseUrl = chain.id === 1 
        ? 'https://etherscan.io' 
        : 'https://sepolia.etherscan.io'
      window.open(`${baseUrl}/address/${address}`, '_blank')
    }
  }

  if (!isConnected) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">Wallet non connecté</p>
              <p className="text-sm text-orange-700">
                Connectez votre wallet pour accéder à toutes les fonctionnalités
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-loky-primary/20 bg-gradient-to-r from-loky-cream to-loky-beige">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-loky-dark-blue">
          <Wallet className="h-5 w-5" />
          <span>Wallet connecté</span>
        </CardTitle>
        <CardDescription className="text-loky-dark-blue/70">
          Votre identité Web3 sécurisée
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Adresse */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-loky-dark-blue">Adresse</span>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="mr-1 h-3 w-3" />
              Vérifiée
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-loky-primary/10">
            <code className="flex-1 text-sm font-mono text-loky-dark-blue">
              {formatAddress(address)}
            </code>
            
            <Button
              onClick={copyAddress}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-loky-dark-blue hover:bg-loky-primary/10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              onClick={openInExplorer}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-loky-dark-blue hover:bg-loky-primary/10"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Réseau */}
        {chain && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-loky-dark-blue">Réseau</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-loky-dark-blue">{chain.name}</span>
              <Badge variant="outline" className="text-xs">
                ID: {chain.id}
              </Badge>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t border-loky-primary/10">
          <Button
            onClick={disconnect}
            variant="outline"
            size="sm"
            className="w-full border-loky-primary/20 text-loky-dark-blue hover:bg-loky-primary/10"
          >
            Déconnecter le wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Composant compact pour les barres latérales
export const WalletInfoCompact = () => {
  const { isConnected, address, formatAddress } = useWeb3Connection()
  const chainId = useChainId()
  const chains = useChains()
  const chain = chains.find(c => c.id === chainId)

  if (!isConnected) return null

  return (
    <div className="flex items-center space-x-2 p-2 bg-loky-accent/30 rounded-lg border border-loky-primary/10">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-loky-dark-blue truncate">
          {formatAddress(address)}
        </p>
        {chain && (
          <p className="text-xs text-loky-dark-blue/60">{chain.name}</p>
        )}
      </div>
    </div>
  )
}

export default WalletInfo
