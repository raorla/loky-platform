import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Bug, BugOff } from 'lucide-react'
import { useDebugMode } from '../../contexts/DebugContext'

export const DebugToggle: React.FC = () => {
  const { isDebugMode, toggleDebugMode } = useDebugMode()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleDebugMode}
        variant={isDebugMode ? "default" : "outline"}
        size="sm"
        className={`
          relative overflow-hidden transition-all duration-300 shadow-lg
          ${isDebugMode 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300'
          }
        `}
      >
        {/* Effet de pulsation quand activé */}
        {isDebugMode && (
          <div className="absolute inset-0 rounded-md animate-ping bg-orange-400 opacity-25"></div>
        )}
        
        {/* Icône et texte */}
        <div className="relative flex items-center space-x-2">
          {isDebugMode ? (
            <Bug className="h-4 w-4" />
          ) : (
            <BugOff className="h-4 w-4" />
          )}
          <span className="font-medium">Debug</span>
        </div>
        
        {/* Badge de statut */}
        <Badge 
          variant={isDebugMode ? "secondary" : "outline"}
          className={`
            ml-2 text-xs
            ${isDebugMode 
              ? 'bg-white/20 text-white border-white/30' 
              : 'bg-gray-200 text-gray-500 border-gray-300'
            }
          `}
        >
          {isDebugMode ? 'ON' : 'OFF'}
        </Badge>
      </Button>
      
      {/* Tooltip/indicateur */}
      {isDebugMode && (
        <div className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap">
          Mode debug actif
          <div className="absolute top-full right-4 w-2 h-2 bg-black/80 rotate-45 transform -translate-y-1"></div>
        </div>
      )}
    </div>
  )
}
