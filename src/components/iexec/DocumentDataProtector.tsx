import React, { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { 
  Upload, 
  FileText, 
  Shield,
  Info
} from 'lucide-react'
import { useIExecDataProtector } from '../../hooks/useIExecDataProtector'
import { IExecDataProtectorStatus } from './IExecDataProtectorStatus'

interface DocumentDataProtectorProps {
  onProtectionComplete?: (result: any) => void
}

export const DocumentDataProtector: React.FC<DocumentDataProtectorProps> = ({
  onProtectionComplete
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [customName, setCustomName] = useState('')
  const [mode, setMode] = useState<'file' | 'data'>('file')
  const [jsonData, setJsonData] = useState('')

  const {
    isProtecting,
    error,
    protectedData,
    currentStatus,
    protectDocumentData,
    protectFileData,
    clearError,
    reset
  } = useIExecDataProtector()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!customName) {
        setCustomName(`Document Loky - ${file.name}`)
      }
    }
  }

  const handleProtectFile = async () => {
    if (!selectedFile) return

    const result = await protectFileData(selectedFile, customName || undefined)
    if (result && onProtectionComplete) {
      onProtectionComplete(result)
    }
  }

  const handleProtectData = async () => {
    try {
      const data = JSON.parse(jsonData)
      const result = await protectDocumentData(data, customName || undefined)
      if (result && onProtectionComplete) {
        onProtectionComplete(result)
      }
    } catch (err) {
      console.error('Erreur JSON:', err)
    }
  }

  const handleProtectDocumentMetadata = async () => {
    // Simuler les métadonnées d'un document de location
    const documentMetadata = {
      platform: 'Loky',
      documentType: 'rental_application',
      userProfile: {
        hasVerifiedIncome: true,
        hasVerifiedIdentity: true,
        creditScore: 85,
        completionPercentage: 80
      },
      timestamp: new Date().toISOString(),
      securityLevel: 'high',
      // Convertir l'array en string pour éviter l'erreur "Unsupported array data"
      dataCategories: 'personal_identity,financial_information,employment_data',
      // Ou comme objet indexé
      categories: {
        personal_identity: true,
        financial_information: true,
        employment_data: true
      }
    }

    const result = await protectDocumentData(
      documentMetadata, 
      customName || 'Métadonnées Dossier Loky'
    )
    
    if (result && onProtectionComplete) {
      onProtectionComplete(result)
    }
  }

  // Si une protection est en cours ou terminée, afficher le statut
  if (isProtecting || error || protectedData) {
    return (
      <IExecDataProtectorStatus
        isProtecting={isProtecting}
        error={error}
        protectedData={protectedData}
        currentStatus={currentStatus}
        onClearError={clearError}
        onReset={reset}
      />
    )
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-blue-800">Protection des données avec iExec</CardTitle>
        </div>
        <CardDescription>
          Chiffrez et protégez vos documents et données de manière décentralisée
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode selection */}
        <div className="flex space-x-2">
          <Button
            variant={mode === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('file')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Fichier
          </Button>
          <Button
            variant={mode === 'data' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('data')}
          >
            <Info className="h-4 w-4 mr-2" />
            Données JSON
          </Button>
        </div>

        {/* Nom personnalisé */}
        <div className="space-y-2">
          <Label htmlFor="customName">Nom de la donnée protégée (optionnel)</Label>
          <Input
            id="customName"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Nom descriptif pour vos données protégées"
          />
        </div>

        {mode === 'file' ? (
          /* Mode fichier */
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sélectionner un fichier</Label>
              <div className="flex items-center space-x-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Fichier sélectionné: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <Button 
              onClick={handleProtectFile}
              disabled={!selectedFile || isProtecting}
              className="w-full"
            >
              <Shield className="h-4 w-4 mr-2" />
              Protéger le fichier avec iExec
            </Button>
          </div>
        ) : (
          /* Mode données JSON */
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jsonData">Données JSON à protéger</Label>
              <textarea
                id="jsonData"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder='{"email": "user@example.com", "score": 85}'
                className="w-full h-32 p-3 border rounded-md resize-none font-mono text-sm"
              />
            </div>

            <Button 
              onClick={handleProtectData}
              disabled={!jsonData.trim() || isProtecting}
              className="w-full"
            >
              <Shield className="h-4 w-4 mr-2" />
              Protéger les données avec iExec
            </Button>
          </div>
        )}

        {/* Option rapide pour les métadonnées Loky */}
        <div className="border-t pt-4">
          <div className="bg-loky-cream p-4 rounded-lg space-y-3">
            <h4 className="font-medium text-loky-dark-blue">Protection rapide</h4>
            <p className="text-sm text-loky-dark-blue">
              Protégez les métadonnées de votre dossier Loky (score, statut de vérification, etc.)
            </p>
            <Button 
              onClick={handleProtectDocumentMetadata}
              disabled={isProtecting}
              variant="outline"
              className="w-full border-loky-beige text-loky-dark-blue hover:bg-loky-beige"
            >
              <Shield className="h-4 w-4 mr-2" />
              Protéger mes métadonnées Loky
            </Button>
          </div>
        </div>

        {/* Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-gray-600 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Comment ça fonctionne :</p>
              <ul className="space-y-1 text-xs">
                <li>• Vos données sont chiffrées côté client avant envoi</li>
                <li>• Un NFT unique est créé pour représenter la propriété</li>
                <li>• Les données chiffrées sont stockées sur IPFS</li>
                <li>• Seul vous pouvez autoriser l'accès à vos données</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DocumentDataProtector
