import React from 'react'
import { Button } from '../ui/button'
import useIExecDataProtector from '../../hooks/useIExecDataProtector'
import { testIExecConfigs } from '../../lib/test-iexec-configs'

export const IExecConfigDiagnostic: React.FC = () => {
  const { error, protectDocumentData } = useIExecDataProtector()

  const handleTestAllConfigs = async () => {
    console.log('🔍 Test de toutes les configurations...')
    await testIExecConfigs()
  }

  const testProtectDataSample = async () => {
    console.log('🔍 Test de protection de données simple...')
    
    const sampleData = {
      message: 'Test de protection',
      timestamp: new Date().toISOString(),
      test: true
    }
    
    try {
      const result = await protectDocumentData(sampleData, 'Test Diagnostic')
      console.log('✅ Protection réussie:', result)
    } catch (error) {
      console.error('❌ Erreur de protection:', error)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        🔧 Diagnostic iExec DataProtector
      </h3>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700">
          <strong>Erreur:</strong> {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={handleTestAllConfigs}
          className="text-sm"
        >
          Test Toutes Configs
        </Button>
        
        <Button
          variant="outline"
          onClick={testProtectDataSample}
          className="text-sm"
        >
          Test Protection
        </Button>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>• <strong>Test Toutes Configs:</strong> Teste différentes configurations (voir console)</p>
        <p>• <strong>Test Protection:</strong> Essaie de protéger des données de test</p>
        <p className="mt-2 font-medium">Résultats dans la console du navigateur (F12)</p>
      </div>
    </div>
  )
}

export default IExecConfigDiagnostic
