import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { Web3Provider } from './components/web3'
import { UserProfileProvider } from './contexts/UserProfileContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Web3Provider>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </Web3Provider>
    </ErrorBoundary>
  </StrictMode>,
)
