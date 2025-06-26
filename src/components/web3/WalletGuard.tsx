import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Wallet, Shield, AlertCircle } from 'lucide-react'
import { useWeb3Connection } from '../../hooks/useWeb3Connection'
import WalletConnectButton from './WalletConnectButton'

interface WalletGuardProps {
  children: ReactNode
  fallback?: ReactNode
  title?: string
  description?: string
}

export const WalletGuard = ({ 
  children, 
  fallback,
  title = "Connexion Wallet Requise",
  description = "Connectez votre wallet pour accéder à cette fonctionnalité"
}: WalletGuardProps) => {
  const { isConnected, isConnecting } = useWeb3Connection()

  // Si connecté, afficher le contenu
  if (isConnected) {
    return <>{children}</>
  }

  // Si un fallback personnalisé est fourni
  if (fallback) {
    return <>{fallback}</>
  }

  // Affichage par défaut pour la connexion
  return (
    <div className="min-h-screen bg-loky-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-loky-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-loky-gradient rounded-full flex items-center justify-center mb-4">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-loky-dark-blue">{title}</CardTitle>
          <CardDescription className="text-loky-dark-blue/70">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <WalletConnectButton 
              size="lg" 
              fullWidth 
              className="mb-4"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-loky-accent/30 rounded-lg">
              <Shield className="h-5 w-5 text-loky-primary" />
              <div className="text-sm">
                <p className="font-medium text-loky-dark-blue">Sécurité garantie</p>
                <p className="text-loky-dark-blue/70">
                  Vos données restent dans votre wallet
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Web3 natif</p>
                <p className="text-blue-700">
                  Profitez d'une expérience décentralisée
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-xs text-loky-dark-blue/50">
              Pas de wallet ? Installez{' '}
              <a 
                href="https://metamask.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-loky-primary underline hover:text-loky-primary/80"
              >
                MetaMask
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Composant simplifié pour les sections nécessitant une connexion
export const WalletRequired = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useWeb3Connection()

  if (!isConnected) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <h3 className="font-semibold text-orange-900 mb-2">
            Connexion Wallet Requise
          </h3>
          <p className="text-sm text-orange-700 mb-4">
            Connectez votre wallet pour voir ce contenu
          </p>
          <WalletConnectButton size="sm" />
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}

export default WalletGuard
