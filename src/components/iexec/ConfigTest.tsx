import React from 'react';
import { useChainId } from 'wagmi';
import { getDataProtectorConfig, IEXEC_CONFIG, RECOMMENDED_CHAIN_ID } from '../../lib/iexec-config';

export const ConfigTest: React.FC = () => {
  const chainId = useChainId();
  const config = getDataProtectorConfig(chainId);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'white', 
      border: '1px solid #ccc', 
      padding: '10px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '350px'
    }}>
      <h4>🔧 Configuration iExec Debug</h4>
      <p><strong>Wallet Chain ID:</strong> {chainId || 'Non connecté'}</p>
      <p><strong>iExec Chain ID:</strong> {RECOMMENDED_CHAIN_ID} (Bellecour)</p>
      <p style={{color: chainId === RECOMMENDED_CHAIN_ID ? 'green' : 'orange'}}>
        <strong>Status:</strong> {chainId === RECOMMENDED_CHAIN_ID ? '✅ Optimal' : '⚠️ Wallet sur autre réseau'}
      </p>
      <p><strong>iExec utilise TOUJOURS:</strong> Bellecour</p>
      <p><strong>Workerpool:</strong> {config.defaultWorkerpool}</p>
      <p><strong>SMS URL:</strong> {config.smsDebugURL}</p>
      <hr style={{margin: '5px 0'}} />
      <p style={{fontSize: '10px', color: '#666'}}>
        iExec DataProtector fonctionne sur Bellecour même si le wallet est connecté à un autre réseau.
      </p>
    </div>
  );
};
