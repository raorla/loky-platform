import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const SimpleLanding = () => {
  console.log('🏠 SimpleLanding component mounted');
  
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Loky - Version Simple
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Test de la page d'accueil sans styles complexes
      </p>
      
      <div className="space-x-4">
        <Link to="/home">
          <Button>Aller à Home</Button>
        </Link>
        <Link to="/locataire">
          <Button variant="outline">Espace Locataire</Button>
        </Link>
        <Link to="/agence">
          <Button variant="outline">Espace Agence</Button>
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">État du debug :</h2>
        <ul className="space-y-1">
          <li>✅ Routage fonctionnel</li>
          <li>✅ Composant SimpleLanding chargé</li>
          <li>✅ Styles de base appliqués</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleLanding;
