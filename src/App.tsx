import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import MinimalLanding from './pages/MinimalLanding';
import SimpleLanding from './pages/SimpleLanding';
import TestLanding from './pages/TestLanding';
import Home from './pages/Home';
import Locataire from './pages/Locataire';
import Agence from './pages/Agence';
import './App.css';

function App() {
  console.log('🚀 App component mounted');
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/minimal" element={<MinimalLanding />} />
          <Route path="/simple" element={<SimpleLanding />} />
          <Route path="/test" element={<TestLanding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/locataire" element={<Locataire />} />
          <Route path="/agence" element={<Agence />} />
          {/* Route de fallback pour débugger */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
