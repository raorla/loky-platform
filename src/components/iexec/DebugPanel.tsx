import React from 'react'
import { useAccount, useChainId } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Wallet, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  RefreshCw
} from 'lucide-react'
import { IEXEC_CONFIG, RECOMMENDED_CHAIN_ID } from '../../lib/iexec-config'
import { useIExecDataProtector } from '../../hooks/useIExecDataProtector'

export const DebugPanel: React.FC = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const chainId = useChainId()
  const { error } = useIExecDataProtector()

  const networkName = chainId === 1 ? 'Mainnet' : 
                     chainId === 11155111 ? 'Sepolia' :
                     chainId === 134 ? 'iExec Bellecour' :
                     `Réseau ${chainId}`

  const isCorrectNetwork = chainId === RECOMMENDED_CHAIN_ID

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Info className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-blue-800">État de la connexion (Debug)</CardTitle>
        </div>
        <CardDescription className="text-blue-700">
          Informations de debug pour diagnostiquer les problèmes de connexion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* État du wallet */}
          <div>
            <label className="text-xs font-medium text-blue-800">Wallet</label>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
              <Badge className={isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {isConnecting ? 'Connexion...' : isConnected ? 'Connecté' : 'Non connecté'}
              </Badge>
            </div>
            {address && (
              <p className="text-xs text-blue-600 font-mono mt-1">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            )}
          </div>

          {/* État du réseau */}
          <div>
            <label className="text-xs font-medium text-blue-800">Réseau</label>
            <div className="flex items-center space-x-2">
              {isCorrectNetwork ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              )}
              <Badge className={isCorrectNetwork ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                {networkName}
              </Badge>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Chain ID: {chainId || 'Non détecté'}
            </p>
          </div>

          {/* État iExec */}
          <div>
            <label className="text-xs font-medium text-blue-800">iExec DataProtector</label>
            <div className="flex items-center space-x-2">
              {!error ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
              <Badge className={!error ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {!error ? 'Initialisé' : 'Erreur'}
              </Badge>
            </div>
          </div>

          {/* Recommandations */}
          <div>
            <label className="text-xs font-medium text-blue-800">Réseau recommandé</label>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-800">
                {IEXEC_CONFIG.BELLECOUR.CHAIN_NAME}
              </Badge>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Chain ID: {RECOMMENDED_CHAIN_ID}
            </p>
          </div>
        </div>

        {/* Erreurs */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-medium">Erreur détectée:</p>
            <p className="text-xs text-red-600 mt-1">{error}</p>
          </div>
        )}

        {/* Avertissements */}
        {!isCorrectNetwork && isConnected && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-700 font-medium">Avertissement réseau:</p>
            <p className="text-xs text-orange-600 mt-1">
              Pour une expérience optimale, basculez vers le réseau {IEXEC_CONFIG.BELLECOUR.CHAIN_NAME}.
              L'application fonctionne sur d'autres réseaux mais avec des limitations.
            </p>
          </div>
        )}

        {/* Informations techniques */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700 font-medium">Informations techniques:</p>
          <div className="text-xs text-gray-600 mt-1 space-y-1">
            <p>• window.ethereum: {typeof window !== 'undefined' && (window as any).ethereum ? '✅ Détecté' : '❌ Non détecté'}</p>
            <p>• Wagmi isConnected: {isConnected ? '✅' : '❌'}</p>
            <p>• Chain ID détecté: {chainId || 'Aucun'}</p>
            <p>• iExec Config Chain ID: {RECOMMENDED_CHAIN_ID}</p>
          </div>
        </div>

        {/* Actions de debug */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.reload()}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Recharger la page
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => console.log('Debug info:', { address, isConnected, chainId, error })}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <Info className="h-3 w-3 mr-1" />
            Log dans console
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DebugPanel
