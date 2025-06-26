import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { AlertCircle } from 'lucide-react'

interface GrantAccessModalProps {
  protectedDataAddress: string
  protectedDataName: string
  onAccessGranted?: (result: any) => void
}

export const GrantAccessModal: React.FC<GrantAccessModalProps> = ({
  protectedDataAddress,
  protectedDataName,
  onAccessGranted
}) => {
  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <AlertCircle className="w-5 h-5" />
          Fonctionnalité en développement
        </CardTitle>
        <CardDescription className="text-amber-700">
          La fonctionnalité d'octroi d'accès sera disponible dans une prochaine version.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Badge variant="outline" className="text-xs">
              Adresse des données: {protectedDataAddress.slice(0, 10)}...{protectedDataAddress.slice(-8)}
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="text-xs">
              Nom: {protectedDataName}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
