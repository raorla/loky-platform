import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { useCallback, useEffect, useState } from 'react'

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

export interface Web3Connection {
  // État de connexion
  status: ConnectionStatus
  isConnected: boolean
  isConnecting: boolean
  address?: string
  
  // Actions
  connect: () => void
  disconnect: () => void
  
  // Utilitaires
  formatAddress: (address?: string) => string
  error?: string
}

export const useWeb3Connection = (): Web3Connection => {
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()
  const [error, setError] = useState<string>()

  // Déterminer le statut de connexion
  const getStatus = useCallback((): ConnectionStatus => {
    if (error) return 'error'
    if (isConnecting) return 'connecting'
    if (isConnected) return 'connected'
    return 'disconnected'
  }, [error, isConnecting, isConnected])

  const status = getStatus()

  // Fonction pour ouvrir le modal de connexion
  const connect = useCallback(() => {
    try {
      setError(undefined)
      open()
    } catch (err) {
      setError('Erreur lors de l\'ouverture du modal de connexion')
      console.error('Erreur connexion wallet:', err)
    }
  }, [open])

  // Fonction pour se déconnecter
  const handleDisconnect = useCallback(() => {
    try {
      setError(undefined)
      disconnect()
    } catch (err) {
      setError('Erreur lors de la déconnexion')
      console.error('Erreur déconnexion wallet:', err)
    }
  }, [disconnect])

  // Formater l'adresse pour l'affichage
  const formatAddress = useCallback((addr?: string): string => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }, [])

  // Gérer les erreurs de connexion
  useEffect(() => {
    if (!isConnecting && !isConnected && error) {
      const timer = setTimeout(() => setError(undefined), 5000)
      return () => clearTimeout(timer)
    }
  }, [isConnecting, isConnected, error])

  return {
    status,
    isConnected,
    isConnecting,
    address,
    connect,
    disconnect: handleDisconnect,
    formatAddress,
    error
  }
}

// Hook supplémentaire pour améliorer l'UX
export const useWalletStatus = () => {
  const { isConnected, address } = useAccount()
  const [connectionTime, setConnectionTime] = useState<Date | null>(null)

  useEffect(() => {
    if (isConnected && !connectionTime) {
      setConnectionTime(new Date())
    } else if (!isConnected && connectionTime) {
      setConnectionTime(null)
    }
  }, [isConnected, connectionTime])

  return {
    isConnected,
    address,
    connectionTime,
    connectedSince: connectionTime ? Math.floor((Date.now() - connectionTime.getTime()) / 1000) : 0
  }
}
