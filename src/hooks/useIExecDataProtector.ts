import { useState, useCallback, useEffect } from 'react'
import { IExecDataProtectorCore, createArrayBufferFromFile } from '@iexec/dataprotector'
import { useAccount, useChainId } from 'wagmi'
import { getDataProtectorConfig, IEXEC_CONFIG } from '../lib/iexec-config'
import { sanitizeDataForIExec } from '../lib/iexec-data-utils'

export interface ProtectedDataResult {
  name: string
  address: string
  owner: string
  schema: any
  creationTimestamp: number
  transactionHash: string
  multiaddr?: string
}

export interface ProtectDataStatus {
  title: string
  isDone: boolean
}

export interface UseIExecDataProtectorReturn {
  // État
  isProtecting: boolean
  error: string | null
  protectedData: ProtectedDataResult | null
  
  // Actions
  protectDocumentData: (documentData: any, name?: string) => Promise<ProtectedDataResult | null>
  protectFileData: (file: File, name?: string) => Promise<ProtectedDataResult | null>
  clearError: () => void
  reset: () => void
  
  // Statut
  currentStatus: ProtectDataStatus | null
}

export const useIExecDataProtector = (): UseIExecDataProtectorReturn => {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [isProtecting, setIsProtecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [protectedData, setProtectedData] = useState<ProtectedDataResult | null>(null)
  const [currentStatus, setCurrentStatus] = useState<ProtectDataStatus | null>(null)
  const [dataProtectorCore, setDataProtectorCore] = useState<IExecDataProtectorCore | null>(null)

  // Initialiser iExec DataProtector quand le wallet est connecté
  useEffect(() => {
    if (isConnected && window.ethereum) {
      try {
        // Avertir si nous ne sommes pas sur Bellecour, mais permettre l'initialisation
        if (chainId && chainId !== IEXEC_CONFIG.BELLECOUR.CHAIN_ID) {
          console.warn(`⚠️ Réseau actuel: ${chainId}. Pour une expérience optimale, basculez vers ${IEXEC_CONFIG.BELLECOUR.CHAIN_NAME} (Chain ID: ${IEXEC_CONFIG.BELLECOUR.CHAIN_ID})`)
          // Ne pas bloquer l'initialisation, juste avertir
        }

        // Configuration pour iExec DataProtector
        // Utiliser les configurations par défaut qui fonctionnent sur plusieurs réseaux
        const core = new IExecDataProtectorCore(window.ethereum as any)
        setDataProtectorCore(core)
        setError(null) // Clear any previous errors
        console.log('✅ iExec DataProtector initialisé avec succès')
      } catch (err) {
        console.error('❌ Erreur lors de l\'initialisation d\'iExec DataProtector:', err)
        setError('Impossible d\'initialiser iExec DataProtector: ' + (err as Error).message)
      }
    } else if (!isConnected) {
      setDataProtectorCore(null)
      setError(null) // Ne pas afficher d'erreur si le wallet n'est pas connecté
    } else {
      setDataProtectorCore(null)
      setError('Wallet non détecté. Veuillez installer MetaMask ou un autre wallet.')
    }
  }, [isConnected, chainId])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setProtectedData(null)
    setCurrentStatus(null)
    setIsProtecting(false)
  }, [])

  const protectDocumentData = useCallback(async (
    documentData: any, 
    name?: string
  ): Promise<ProtectedDataResult | null> => {
    console.log('🔍 Tentative de protection de données...', {
      dataProtectorCore: !!dataProtectorCore,
      isConnected,
      address,
      chainId
    })

    if (!dataProtectorCore) {
      const errorMsg = `DataProtector non initialisé. État: wallet connecté=${isConnected}, chainId=${chainId}`
      setError(errorMsg)
      console.error('❌', errorMsg)
      return null
    }

    if (!isConnected || !address) {
      setError('Wallet non connecté')
      return null
    }

    setIsProtecting(true)
    setError(null)
    setCurrentStatus(null)

    try {
      console.log('🔐 Protection des données de document avec iExec...', { 
        documentData: typeof documentData, 
        name,
        chainId,
        address: address?.slice(0, 6) + '...' + address?.slice(-4)
      })

      // Sanitize document data before protection
      const sanitizedDocumentData = sanitizeDataForIExec(documentData)

      const result = await dataProtectorCore.protectData({
        name: name || `Document protégé - ${new Date().toLocaleDateString('fr-FR')}`,
        data: sanitizedDocumentData,
        onStatusUpdate: (status) => {
          console.log('📊 Statut de protection:', status.title, status.isDone ? '✅' : '⏳')
          setCurrentStatus(status)
        }
      })

      console.log('✅ Données protégées avec succès:', result)
      setProtectedData(result)
      setCurrentStatus({ title: 'PROTECTION_COMPLETED', isDone: true })
      
      return result
    } catch (err: any) {
      console.error('❌ Erreur lors de la protection des données:', err)
      setError(err.message || 'Erreur lors de la protection des données')
      return null
    } finally {
      setIsProtecting(false)
    }
  }, [dataProtectorCore, isConnected, address])

  const protectFileData = useCallback(async (
    file: File, 
    name?: string
  ): Promise<ProtectedDataResult | null> => {
    if (!dataProtectorCore) {
      setError('DataProtector non initialisé. Veuillez connecter votre wallet.')
      return null
    }

    if (!isConnected || !address) {
      setError('Wallet non connecté')
      return null
    }

    setIsProtecting(true)
    setError(null)
    setCurrentStatus(null)

    try {
      console.log('🔐 Protection du fichier avec iExec...', { fileName: file.name, fileSize: file.size })

      // Convertir le fichier en ArrayBuffer
      const fileAsArrayBuffer = await createArrayBufferFromFile(file)
      
      const result = await dataProtectorCore.protectData({
        name: name || `Fichier protégé - ${file.name}`,
        data: {
          file: fileAsArrayBuffer,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          uploadedAt: new Date().toISOString()
        },
        onStatusUpdate: (status) => {
          console.log('📊 Statut:', status)
          setCurrentStatus(status)
        }
      })

      console.log('✅ Fichier protégé avec succès:', result)
      setProtectedData(result)
      setCurrentStatus({ title: 'PROTECTION_COMPLETED', isDone: true })
      
      return result
    } catch (err: any) {
      console.error('❌ Erreur lors de la protection du fichier:', err)
      setError(err.message || 'Erreur lors de la protection du fichier')
      return null
    } finally {
      setIsProtecting(false)
    }
  }, [dataProtectorCore, isConnected, address])

  return {
    isProtecting,
    error,
    protectedData,
    currentStatus,
    protectDocumentData,
    protectFileData,
    clearError,
    reset
  }
}

export default useIExecDataProtector
