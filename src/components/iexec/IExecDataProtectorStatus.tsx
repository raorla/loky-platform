import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy,
  Clock,
  Loader2
} from 'lucide-react'
import { ProtectedDataResult, ProtectDataStatus } from '../../hooks/useIExecDataProtector'

interface IExecDataProtectorStatusProps {
  isProtecting: boolean
  error: string | null
  protectedData: ProtectedDataResult | null
  currentStatus: ProtectDataStatus | null
  onClearError: () => void
  onReset: () => void
}

export const IExecDataProtectorStatus: React.FC<IExecDataProtectorStatusProps> = ({
  isProtecting,
  error,
  protectedData,
  currentStatus,
  onClearError,
  onReset
}) => {
  const getStatusProgress = (status: string): number => {
    const statusMap: Record<string, number> = {
      'EXTRACT_DATA_SCHEMA': 10,
      'CREATE_ZIP_FILE': 25,
      'CREATE_ENCRYPTION_KEY': 40,
      'ENCRYPT_FILE': 55,
      'UPLOAD_ENCRYPTED_FILE': 70,
      'DEPLOY_PROTECTED_DATA': 85,
      'PUSH_SECRET_TO_SMS': 95,
      'PROTECTION_COMPLETED': 100
    }
    return statusMap[status] || 0
  }

  const getStatusLabel = (status: string): string => {
    const labelMap: Record<string, string> = {
      'EXTRACT_DATA_SCHEMA': 'Analyse du schéma de données',
      'CREATE_ZIP_FILE': 'Création du fichier compressé',
      'CREATE_ENCRYPTION_KEY': 'Génération de la clé de chiffrement',
      'ENCRYPT_FILE': 'Chiffrement des données',
      'UPLOAD_ENCRYPTED_FILE': 'Téléversement sécurisé',
      'DEPLOY_PROTECTED_DATA': 'Déploiement sur la blockchain',
      'PUSH_SECRET_TO_SMS': 'Sécurisation finale',
      'PROTECTION_COMPLETED': 'Protection terminée'
    }
    return labelMap[status] || status
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Vous pourriez ajouter une notification toast ici
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <CardTitle className="text-red-800">Erreur de protection</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-red-700">{error}</p>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearError}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Fermer
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReset}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Affichage pendant la protection
  if (isProtecting && currentStatus) {
    const progress = getStatusProgress(currentStatus.title)
    
    return (
      <Card className="border-loky-beige bg-loky-cream">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <CardTitle className="text-blue-800">Protection en cours...</CardTitle>
          </div>
          <CardDescription className="text-blue-700">
            Vos données sont en cours de chiffrement et de protection avec iExec
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                {getStatusLabel(currentStatus.title)}
              </span>
              <span className="text-sm text-blue-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-blue-600">
            <Clock className="h-3 w-3" />
            <span>Cette opération peut prendre quelques minutes...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Affichage du succès
  if (protectedData) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-800">Données protégées avec succès</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Vos données sont maintenant chiffrées et stockées de manière sécurisée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-green-800">Nom</label>
              <p className="text-sm text-green-700 font-mono bg-white p-2 rounded border">
                {protectedData.name}
              </p>
            </div>
            
            <div>
              <label className="text-xs font-medium text-green-800">Adresse NFT</label>
              <div className="flex items-center space-x-1">
                <p className="text-sm text-green-700 font-mono bg-white p-2 rounded border flex-1 truncate">
                  {protectedData.address}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(protectedData.address)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-green-800">Propriétaire</label>
              <div className="flex items-center space-x-1">
                <p className="text-sm text-green-700 font-mono bg-white p-2 rounded border flex-1 truncate">
                  {protectedData.owner}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(protectedData.owner)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-green-800">Date de création</label>
              <p className="text-sm text-green-700 bg-white p-2 rounded border">
                {new Date(protectedData.creationTimestamp * 1000).toLocaleString('fr-FR')}
              </p>
            </div>
          </div>

          {protectedData.multiaddr && (
            <div>
              <label className="text-xs font-medium text-green-800">Stockage IPFS</label>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-green-700 font-mono bg-white p-2 rounded border flex-1 truncate">
                  {protectedData.multiaddr}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const ipfsHash = protectedData.multiaddr?.split('/').pop()
                    if (ipfsHash) {
                      window.open(`https://ipfs-gateway.v8-bellecour.iex.ec/ipfs/${ipfsHash}`, '_blank')
                    }
                  }}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Voir sur IPFS
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Protégé par iExec
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://explorer.iex.ec/bellecour/dataset/${protectedData.address}`, '_blank')}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Voir sur l'explorateur
            </Button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className="w-full border-green-300 text-green-700 hover:bg-green-100"
          >
            Protéger d'autres données
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}

export default IExecDataProtectorStatus
