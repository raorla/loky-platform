import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-loky-dark-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/LOKY_Picto.png" 
                alt="Loky Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-loky-primary">Loky</span>
            </div>
            <p className="text-loky-beige text-sm">
              La première plateforme de dossiers de location sécurisés et certifiés. 
              Simplifiez votre recherche de logement avec confiance.
            </p>
            <div className="flex space-x-4">
              
              <a href="#" className="text-loky-beige hover:text-loky-primary transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-loky-beige hover:text-loky-primary transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-loky-primary">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-loky-beige hover:text-loky-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/locataire" className="text-gray-400 hover:text-white transition-colors">
                  Espace Locataire
                </Link>
              </li>
              <li>
                <Link to="/agence" className="text-gray-400 hover:text-white transition-colors">
                  Espace Agence
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sécurité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">contact@loky.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Paris, France</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md text-sm font-medium transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Loky. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookies
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Accessibilité
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Plan du site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
