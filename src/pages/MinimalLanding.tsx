import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const MinimalLanding = () => {
  console.log('🏠 MinimalLanding component mounted');
  
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f9f4ec 0%, #f4d9ba 100%)', padding: '20px' }}>
      {/* Header simple */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e8632e' }}>🏠 Loky</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/home">
            <Button>Découvrir</Button>
          </Link>
        </div>
      </header>

      {/* Hero section simple */}
      <main style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#343e91', marginBottom: '20px' }}>
          Votre dossier de location sécurisé
        </h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px', maxWidth: '600px', margin: '0 auto' }}>
          Fini les envois répétés de documents sensibles. Créez un dossier unique, 
          obtenez un score certifié et partagez-le en toute sécurité avec les agences.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/locataire">
            <Button style={{ padding: '12px 24px', fontSize: '18px' }}>
              Espace Locataire
            </Button>
          </Link>
          <Link to="/agence">
            <Button variant="outline" style={{ padding: '12px 24px', fontSize: '18px' }}>
              Espace Agence
            </Button>
          </Link>
        </div>
      </main>

      {/* Card demo simple */}
      <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #343e91 0%, #e8632e 100%)', padding: '16px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>📁 Dossier Loky</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
              Vérifié
            </span>
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span>Score de solvabilité</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e8632e' }}>91/100</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'green' }}>✅</span>
              <span>Bulletins de salaire</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'green' }}>✅</span>
              <span>Contrat de travail CDI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'green' }}>✅</span>
              <span>Avis d'imposition</span>
            </div>
          </div>
          <button style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'linear-gradient(135deg, #343e91 0%, #e8632e 100%)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Partager le dossier
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimalLanding;
