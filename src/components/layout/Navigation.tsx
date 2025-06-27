import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { WalletConnectButton, WalletConnectMobile } from '../web3';
import { UserSettings } from '../settings/UserSettings';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { 
  Home, 
  User, 
  Building2, 
  Menu, 
  X,
  Bell,
  Settings
} from 'lucide-react';

const Navigation = () => {
  console.log('🧭 Navigation component rendered');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { profile } = useUserProfile();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-loky-background border-b border-loky-beige shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et nom */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/images/LOKY_Picto.png" 
                alt="Loky Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-loky-dark-blue">Loky</span>
              <Badge variant="secondary" className="text-xs bg-loky-beige text-loky-dark-blue">
                Beta
              </Badge>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/home"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/home') 
                  ? 'text-loky-primary bg-loky-beige' 
                  : 'text-loky-dark-blue hover:text-loky-primary hover:bg-loky-beige/50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
            
            {/* Afficher l'espace locataire seulement si l'utilisateur est un locataire */}
            {profile.userType === 'locataire' && (
              <Link 
                to="/locataire"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/locataire') 
                    ? 'text-loky-primary bg-loky-beige' 
                    : 'text-loky-dark-blue hover:text-loky-primary hover:bg-loky-beige/50'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Espace Locataire</span>
              </Link>
            )}
            
            {/* Afficher l'espace agence seulement si l'utilisateur est une agence */}
            {profile.userType === 'agence' && (
              <Link 
                to="/agence"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/agence') 
                    ? 'text-loky-primary bg-loky-beige' 
                    : 'text-loky-dark-blue hover:text-loky-primary hover:bg-loky-beige/50'
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>Espace Agence</span>
              </Link>
            )}
          </div>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative text-loky-dark-blue hover:bg-loky-beige">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-loky-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
            
            <UserSettings>
              <Button variant="ghost" size="sm" className="text-loky-dark-blue hover:bg-loky-beige">
                <Settings className="h-4 w-4" />
              </Button>
            </UserSettings>

            <div className="flex items-center space-x-2">
              <WalletConnectButton 
                size="sm"
                showAddress={true}
              />
            </div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile déployé */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-loky-beige">
              <Link 
                to="/home"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/home') 
                    ? 'text-loky-primary bg-loky-beige' 
                    : 'text-loky-dark-blue hover:text-loky-primary hover:bg-loky-beige/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Accueil</span>
              </Link>
              
              {/* Afficher l'espace locataire seulement si l'utilisateur est un locataire */}
              {profile.userType === 'locataire' && (
                <Link 
                  to="/locataire"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/locataire') 
                      ? 'text-loky-primary bg-loky-beige' 
                      : 'text-loky-dark-blue hover:text-loky-primary hover:bg-loky-beige/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Espace Locataire</span>
                </Link>
              )}
              
              {/* Afficher l'espace agence seulement si l'utilisateur est une agence */}
              {profile.userType === 'agence' && (
                <Link 
                  to="/agence"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/agence') 
                      ? 'text-loky-primary bg-loky-beige' 
                      : 'text-loky-dark-blue hover:text-loky-primary hover:bg-loky-beige/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Building2 className="h-5 w-5" />
                  <span>Espace Agence</span>
                </Link>
              )}

              <div className="border-t border-loky-beige pt-4 mt-4 space-y-3">
                <UserSettings>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-loky-dark-blue hover:bg-loky-beige"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Paramètres
                  </Button>
                </UserSettings>
                
                <WalletConnectMobile />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
