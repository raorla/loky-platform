import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Alert, AlertDescription } from '../ui/alert'
import { Badge } from '../ui/badge'
import useIExecDataProtector from '../../hooks/useIExecDataProtector'
import { useAccount } from 'wagmi'
import { CheckCircle, AlertCircle, Clock, Shield, Copy } from 'lucide-react'

export const DataProtectionTester: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { 
    protectDocumentData, 
    isProtecting, 
    error, 
    protectedData, 
    currentStatus,
    clearError 
  } = useIExecDataProtector()

  const [testData, setTestData] = useState({
    email: 'user@example.com',
    name: 'Test User',
    message: 'Données de test pour vérification'
  })
  const [protectionName, setProtectionName] = useState('Test Protection Loky')

  const handleProtectData = async () => {
    console.log('🧪 Test de protection de données...')
    clearError()
    
    const result = await protectDocumentData(testData, protectionName)
    
    if (result) {
      console.log('✅ Protection réussie:', result)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const isValidAddress = (addr: string) => {
    return addr && addr !== '0x0000000000000000000000000000000000000000'
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-loky-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-loky-primary" />
            Test de Protection de Données iExec TDX
          </CardTitle>
          <CardDescription>
            Testez la protection de données et vérifiez que l'adresse de propriétaire est correcte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Statut Wallet */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span className="text-sm font-medium">
                Wallet: {isConnected ? 'Connecté' : 'Non connecté'}
              </span>
            </div>
            {address && (
              <Badge variant="outline" className="text-xs">
                {address.slice(0, 6)}...{address.slice(-4)}
              </Badge>
            )}
          </div>

          {/* Erreur */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Statut actuel */}
          {currentStatus && (
            <Alert>
              {currentStatus.isDone ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              <AlertDescription>
                {currentStatus.title} {currentStatus.isDone ? '✅' : '⏳'}
              </AlertDescription>
            </Alert>
          )}

          {/* Formulaire de test */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="protectionName">Nom de la protection</Label>
              <Input
                id="protectionName"
                value={protectionName}
                onChange={(e) => setProtectionName(e.target.value)}
                placeholder="Nom descriptif pour les données protégées"
              />
            </div>

            <div>
              <Label htmlFor="testData">Données de test (JSON)</Label>
              <Textarea
                id="testData"
                value={JSON.stringify(testData, null, 2)}
                onChange={(e) => {
                  try {
                    setTestData(JSON.parse(e.target.value))
                  } catch (err) {
                    // Ignorer les erreurs de parsing temporaires
                  }
                }}
                rows={6}
                className="font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleProtectData}
              disabled={!isConnected || isProtecting}
              className="w-full bg-loky-primary hover:bg-loky-primary/90"
            >
              {isProtecting ? 'Protection en cours...' : 'Protéger les données'}
            </Button>
          </div>

          {/* Résultat de protection */}
          {protectedData && (
            <Card className="border border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">✅ Données Protégées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Nom:</Label>
                  <p className="text-sm">{protectedData.name}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Adresse du Dataset:</Label>
                  <div className="flex items-center gap-2">
                    <code className={`text-xs p-1 rounded ${
                      isValidAddress(protectedData.address) 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {protectedData.address}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(protectedData.address)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    {!isValidAddress(protectedData.address) && (
                      <Badge variant="destructive" className="text-xs">INVALID</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Propriétaire:</Label>
                  <div className="flex items-center gap-2">
                    <code className={`text-xs p-1 rounded ${
                      protectedData.owner.toLowerCase() === address?.toLowerCase()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {protectedData.owner}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(protectedData.owner)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    {protectedData.owner.toLowerCase() === address?.toLowerCase() ? (
                      <Badge variant="default" className="text-xs bg-green-600">MATCH</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">MISMATCH</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Transaction Hash:</Label>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-gray-100 p-1 rounded">
                      {protectedData.transactionHash}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(protectedData.transactionHash)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Timestamp:</Label>
                  <p className="text-sm">
                    {new Date(protectedData.creationTimestamp * 1000).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DataProtectionTester
