import React from 'react'
import { Button } from '../ui/button'
import { Bug, BugOff } from 'lucide-react'

interface DebugWrapperProps {
  children: React.ReactNode
}

// State simple sans contexte pour commencer
let debugMode = false

export const setDebugMode = (value: boolean) => {
  debugMode = value
}

export const getDebugMode = () => debugMode

export const DebugWrapper: React.FC<DebugWrapperProps> = ({ children }) => {
  if (!debugMode) {
    return null
  }
  
  return <>{children}</>
}

export const DebugToggleButton: React.FC = () => {
  const [isDebugMode, setIsDebugMode] = React.useState(debugMode)

  const toggleDebugMode = () => {
    const newMode = !isDebugMode
    setIsDebugMode(newMode)
    setDebugMode(newMode)
    console.log(`🐛 Mode debug ${newMode ? 'activé' : 'désactivé'}`)
    
    // Force un re-render de l'app
    window.dispatchEvent(new CustomEvent('debugModeChanged', { detail: newMode }))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleDebugMode}
        variant={isDebugMode ? "default" : "outline"}
        size="sm"
        className={`
          relative transition-all duration-300 shadow-lg border-2
          ${isDebugMode 
            ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }
        `}
      >
        <div className="flex items-center space-x-2">
          {isDebugMode ? (
            <Bug className="h-4 w-4" />
          ) : (
            <BugOff className="h-4 w-4" />
          )}
          <span className="font-medium">Debug</span>
          <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${isDebugMode 
              ? 'bg-white/20 text-white' 
              : 'bg-gray-100 text-gray-500'
            }
          `}>
            {isDebugMode ? 'ON' : 'OFF'}
          </span>
        </div>
      </Button>
    </div>
  )
}
