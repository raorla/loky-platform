import React from 'react';

const TestLanding = () => {
  console.log('🧪 TestLanding mounted');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: '#333'
    }}>
      <div>
        <h1>🏠 Test Landing Page</h1>
        <p>Si vous voyez ceci, le routage fonctionne !</p>
        <p>Timestamp: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default TestLanding;
