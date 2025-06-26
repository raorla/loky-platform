import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { AlertCircle, Settings } from 'lucide-react';
import { UserSettings } from '../settings/UserSettings';

interface UserTypeGuardProps {
  children: React.ReactNode;
  requiredUserType: 'locataire' | 'agence';
  redirectTo?: string;
}

export const UserTypeGuard: React.FC<UserTypeGuardProps> = ({ 
  children, 
  requiredUserType, 
  redirectTo = '/home' 
}) => {
  const { profile, hasProfile } = useUserProfile();

  // Si l'utilisateur n'a pas de profil, montrer un message d'invitation
  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <CardTitle>Configuration requise</CardTitle>
            </div>
            <CardDescription>
              Vous devez configurer votre profil pour accéder à cette section.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Cette page est réservée aux {requiredUserType === 'locataire' ? 'locataires' : 'agences immobilières'}. 
              Veuillez configurer votre profil dans les paramètres.
            </p>
            
            <div className="flex flex-col space-y-2">
              <UserSettings>
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurer mon profil
                </Button>
              </UserSettings>
              
              <Button variant="outline" onClick={() => window.history.back()}>
                Retour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si l'utilisateur a un profil mais pas le bon type, rediriger ou montrer un message
  if (profile.userType !== requiredUserType) {
    const oppositeType = requiredUserType === 'locataire' ? 'agence' : 'locataire';
    const currentTypeLabel = profile.userType === 'locataire' ? 'locataire' : 'agence immobilière';
    const requiredTypeLabel = requiredUserType === 'locataire' ? 'locataires' : 'agences immobilières';

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <CardTitle>Accès restreint</CardTitle>
            </div>
            <CardDescription>
              Cette section est réservée aux {requiredTypeLabel}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Vous êtes actuellement connecté(e) en tant que <strong>{currentTypeLabel}</strong>. 
              Cette page est réservée aux {requiredTypeLabel}.
            </p>
            
            <div className="flex flex-col space-y-2">
              <UserSettings>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Changer de type d'utilisateur
                </Button>
              </UserSettings>
              
              <Button onClick={() => window.history.back()}>
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si tout est bon, afficher le contenu
  return <>{children}</>;
};

export default UserTypeGuard;
