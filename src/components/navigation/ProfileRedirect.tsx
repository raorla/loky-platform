import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserProfile } from '../../contexts/UserProfileContext';

/**
 * Composant pour rediriger automatiquement les utilisateurs vers leur espace
 * selon leur type de profil et certaines conditions
 */
export const ProfileRedirect: React.FC = () => {
  const { profile, hasProfile } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ne pas rediriger si l'utilisateur n'a pas de profil
    if (!hasProfile) return;

    // Ne pas rediriger depuis certaines pages (accueil, landing)
    const allowedPaths = ['/', '/home'];
    if (!allowedPaths.includes(location.pathname)) return;

    // Rediriger vers l'espace inapproprié si l'utilisateur est sur la mauvaise page
    if (location.pathname === '/locataire' && profile.userType === 'agence') {
      navigate('/agence');
      return;
    }

    if (location.pathname === '/agence' && profile.userType === 'locataire') {
      navigate('/locataire');
      return;
    }

  }, [profile, hasProfile, navigate, location.pathname]);

  return null; // Ce composant ne rend rien
};
