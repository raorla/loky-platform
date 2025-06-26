import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Shield, Upload } from 'lucide-react'
import { DocumentDataProtector } from './DocumentDataProtector'

interface DataProtectionModalProps {
  trigger?: React.ReactNode
  onProtectionComplete?: (result: any) => void
}

export const DataProtectionModal: React.FC<DataProtectionModalProps> = ({
  trigger,
  onProtectionComplete
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleProtectionComplete = (result: any) => {
    if (onProtectionComplete) {
      onProtectionComplete(result)
    }
    // Fermer le modal après un délai pour laisser voir le résultat
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  const defaultTrigger = (
    <Button className="bg-loky-gradient hover:opacity-90">
      <Upload className="mr-2 h-4 w-4" />
      Protéger mes documents
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Protection des données avec iExec</span>
          </DialogTitle>
          <DialogDescription>
            Utilisez la technologie de calcul confidentiel d'iExec pour protéger vos documents et données sensibles
          </DialogDescription>
        </DialogHeader>
        
        <DocumentDataProtector onProtectionComplete={handleProtectionComplete} />
      </DialogContent>
    </Dialog>
  )
}

export default DataProtectionModal
