import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ProfileRedirect } from './components/navigation/ProfileRedirect';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Locataire from './pages/Locataire';
import Agence from './pages/Agence';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <ProfileRedirect />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/locataire" element={<Locataire />} />
          <Route path="/agence" element={<Agence />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
