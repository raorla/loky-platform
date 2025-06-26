import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Wallet, 
  Loader2, 
  LogOut,
  Shield
} from 'lucide-react'
import { useWeb3Connection } from '../../hooks/useWeb3Connection'
import { cn } from '../../lib/utils'

interface WalletConnectButtonProps {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showAddress?: boolean
  fullWidth?: boolean
}

export const WalletConnectButton = ({
  variant = 'default',
  size = 'default',
  className,
  showAddress = true,
  fullWidth = false
}: WalletConnectButtonProps) => {
  const { 
    status, 
    isConnected, 
    isConnecting, 
    address, 
    connect, 
    disconnect, 
    formatAddress, 
    error 
  } = useWeb3Connection()

  // Bouton de connexion quand pas connecté
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center space-y-3">
        <Button
          onClick={connect}
          disabled={isConnecting}
          variant={variant}
          size={size}
          className={cn(
            'bg-loky-gradient hover:opacity-90 text-white transition-all duration-300 shadow-lg hover:shadow-xl',
            'border-0 font-semibold tracking-wide loky-hover-lift',
            !isConnecting && 'wallet-connect-pulse',
            fullWidth && 'w-full',
            size === 'lg' && 'px-8 py-3 text-base',
            className
          )}
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Connecter Wallet
            </>
          )}
        </Button>
        
        {/* Message d'erreur amélioré */}
        {error && (
          <div className="text-xs text-loky-primary bg-loky-beige/50 px-3 py-2 rounded-lg border border-loky-primary/20 max-w-sm text-center">
            <div className="font-medium mb-1">Erreur de connexion</div>
            {error}
          </div>
        )}
      </div>
    )
  }

  // Bouton connecté avec adresse
  return (
    <div className="flex items-center space-x-3">
      {showAddress && (
        <div className="flex items-center space-x-2 bg-loky-beige/80 px-3 py-2 rounded-lg border border-loky-primary/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-loky-dark-blue">
              {formatAddress(address)}
            </span>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
            Connecté
          </Badge>
        </div>
      )}
      
      <Button
        onClick={disconnect}
        variant="outline"
        size={size}
        className={cn(
          'border-loky-primary/30 text-loky-primary hover:bg-loky-primary hover:text-white',
          'transition-all duration-200',
          className
        )}
        title="Déconnecter le wallet"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Composant optimisé pour mobile
export const WalletConnectMobile = () => {
  const { isConnected, isConnecting, connect, disconnect, formatAddress, address } = useWeb3Connection()

  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        disabled={isConnecting}
        size="sm"
        className="bg-loky-gradient hover:opacity-90 text-white w-full font-semibold shadow-lg"
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connexion...
          </>
        ) : (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Connecter
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="flex-1 flex items-center space-x-2 px-3 py-2 bg-loky-beige/80 rounded-lg border border-loky-primary/20">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-loky-dark-blue font-medium truncate">
          {formatAddress(address)}
        </span>
      </div>
      <Button
        onClick={disconnect}
        variant="outline"
        size="sm"
        className="border-loky-primary/30 text-loky-primary hover:bg-loky-primary hover:text-white shrink-0"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default WalletConnectButton
