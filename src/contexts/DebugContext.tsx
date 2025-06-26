import React, { createContext, useContext, useState, ReactNode } from 'react'

interface DebugContextType {
  isDebugMode: boolean
  toggleDebugMode: () => void
}

const DebugContext = createContext<DebugContextType | undefined>(undefined)

export const useDebugMode = () => {
  const context = useContext(DebugContext)
  if (context === undefined) {
    throw new Error('useDebugMode must be used within a DebugProvider')
  }
  return context
}

interface DebugProviderProps {
  children: ReactNode
}

export const DebugProvider: React.FC<DebugProviderProps> = ({ children }) => {
  const [isDebugMode, setIsDebugMode] = useState(false)

  const toggleDebugMode = () => {
    setIsDebugMode(prev => !prev)
    console.log(`🐛 Mode debug ${!isDebugMode ? 'activé' : 'désactivé'}`)
  }

  return (
    <DebugContext.Provider value={{ isDebugMode, toggleDebugMode }}>
      {children}
    </DebugContext.Provider>
  )
}
