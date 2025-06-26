import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { WalletConnectButton } from '../components/web3';
import { useUserProfile } from '../contexts/UserProfileContext';
import { 
  User, 
  Building2, 
  ArrowRight, 
  Shield, 
  Clock,
  TrendingUp,
  FileCheck,
  Users,
  Star,
  CheckCircle
} from 'lucide-react';
import { mockStats } from '../data/mockData';

const Home = () => {
  const { profile, hasProfile } = useUserProfile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-loky-cream via-loky-background to-loky-beige">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo vertical avec tagline */}
            <div className="mb-8">
              <img 
                src="/images/LOKY_LogoVerticalTagline.png" 
                alt="Loky - tes données sous clé" 
                className="h-56 mx-auto"
              />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-loky-dark-blue sm:text-5xl lg:text-6xl">
              Bienvenue sur{' '}
              <span className="bg-loky-gradient bg-clip-text text-transparent">
                Loky
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-loky-dark-blue/80 max-w-3xl mx-auto">
              La plateforme qui révolutionne la location immobilière avec des dossiers 
              sécurisés, des scores certifiés et une confiance renforcée entre locataires et agences.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <WalletConnectButton 
                size="lg"
                showAddress={false}
                fullWidth={false}
              />
              
              {/* Afficher les boutons selon le profil utilisateur */}
              {hasProfile ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  {profile.userType === 'locataire' ? (
                    <Link to="/locataire">
                      <Button size="lg" className="bg-loky-gradient hover:opacity-90 shadow-lg">
                        <User className="mr-2 h-5 w-5" />
                        Mon Espace Locataire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/agence">
                      <Button size="lg" className="bg-loky-gradient hover:opacity-90 shadow-lg">
                        <Building2 className="mr-2 h-5 w-5" />
                        Mon Espace Agence
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/locataire">
                    <Button size="lg" className="bg-loky-gradient hover:opacity-90 shadow-lg">
                      <User className="mr-2 h-5 w-5" />
                      Espace Locataire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <Link to="/agence">
                    <Button variant="outline" size="lg" className="border-loky-primary text-loky-primary hover:bg-loky-primary hover:text-white transition-all">
                      <Building2 className="mr-2 h-5 w-5" />
                      Espace Agence
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section d'accueil personnalisée */}
      {hasProfile && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Bonjour {profile.nom || (profile.userType === 'locataire' ? 'Locataire' : 'Agence')} 👋
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                {profile.userType === 'locataire' 
                  ? 'Gérez votre dossier locataire et trouvez votre logement idéal'
                  : 'Gérez vos annonces et évaluez les candidatures'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.userType === 'locataire' ? (
                <>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <FileCheck className="h-12 w-12 mx-auto mb-4 text-loky-primary" />
                    <h3 className="text-lg font-semibold mb-2">Mon Dossier</h3>
                    <p className="text-gray-600 mb-4">Complétez et sécurisez votre dossier locataire</p>
                    <Link to="/locataire">
                      <Button variant="outline" className="w-full">
                        Gérer mon dossier
                      </Button>
                    </Link>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-loky-primary" />
                    <h3 className="text-lg font-semibold mb-2">Mon Score</h3>
                    <p className="text-gray-600 mb-4">Améliorez votre score de confiance</p>
                    <Link to="/locataire">
                      <Button variant="outline" className="w-full">
                        Voir mon score
                      </Button>
                    </Link>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <Users className="h-12 w-12 mx-auto mb-4 text-loky-primary" />
                    <h3 className="text-lg font-semibold mb-2">Candidatures</h3>
                    <p className="text-gray-600 mb-4">Suivez vos demandes de logement</p>
                    <Link to="/locataire">
                      <Button variant="outline" className="w-full">
                        Mes candidatures
                      </Button>
                    </Link>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-loky-primary" />
                    <h3 className="text-lg font-semibold mb-2">Mes Annonces</h3>
                    <p className="text-gray-600 mb-4">Gérez vos biens et annonces</p>
                    <Link to="/agence">
                      <Button variant="outline" className="w-full">
                        Gérer mes annonces
                      </Button>
                    </Link>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <Users className="h-12 w-12 mx-auto mb-4 text-loky-primary" />
                    <h3 className="text-lg font-semibold mb-2">Candidatures Reçues</h3>
                    <p className="text-gray-600 mb-4">Évaluez les dossiers locataires</p>
                    <Link to="/agence">
                      <Button variant="outline" className="w-full">
                        Voir les candidatures
                      </Button>
                    </Link>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-loky-primary" />
                    <h3 className="text-lg font-semibold mb-2">Vérifications</h3>
                    <p className="text-gray-600 mb-4">Validez les données protégées</p>
                    <Link to="/agence">
                      <Button variant="outline" className="w-full">
                        Outils de vérification
                      </Button>
                    </Link>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Choix utilisateur - Affiché seulement si pas de profil configuré */}
      {!hasProfile && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Que souhaitez-vous faire aujourd'hui ?
              </h2>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card Locataire */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="absolute inset-0 bg-loky-cream/50 group-hover:bg-loky-beige/30 transition-all duration-300"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="bg-loky-gradient p-3 rounded-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Je suis locataire</CardTitle>
                    <CardDescription>
                      Créez votre dossier de location sécurisé
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Téléversement sécurisé de documents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Score de solvabilité automatique</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Partage sécurisé avec les agences</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Réutilisation pour plusieurs candidatures</span>
                  </div>
                </div>

                <div className="bg-loky-cream p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-loky-dark-blue">Avantages</span>
                    <Badge className="bg-green-100 text-green-800">Gratuit</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-loky-dark-blue">Temps économisé</div>
                      <div className="text-loky-dark-blue/70">{mockStats.locataire.tempsEconomise}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-loky-dark-blue">Candidatures</div>
                      <div className="text-loky-dark-blue/70">Illimitées</div>
                    </div>
                  </div>
                </div>

                <Link to="/locataire" className="block">
                  <Button className="w-full bg-loky-gradient hover:opacity-90 group-hover:scale-105 transition-transform">
                    Accéder à mon espace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Card Agence */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="absolute inset-0 bg-loky-cream/50 group-hover:bg-loky-beige/30 transition-all duration-300"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="bg-loky-gradient p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Je suis une agence</CardTitle>
                    <CardDescription>
                      Consultez des dossiers certifiés et fiables
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Dossiers pré-analysés et scorés</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Certification de votre agence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Badge de confiance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Analyse rapide des candidatures</span>
                  </div>
                </div>

                <div className="bg-loky-cream p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-loky-dark-blue">Performance</span>
                    <Badge className="bg-loky-beige text-loky-primary">Pro</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-loky-dark-blue">Temps économisé</div>
                      <div className="text-loky-dark-blue/70">{mockStats.agence.tempsEconomise}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-loky-dark-blue">Taux d'acceptation</div>
                      <div className="text-loky-dark-blue/70">{mockStats.agence.tauxAcceptation}%</div>
                    </div>
                  </div>
                </div>

                <Link to="/agence" className="block">
                  <Button className="w-full bg-loky-gradient hover:opacity-90 group-hover:scale-105 transition-transform">
                    Accéder à mon espace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Statistiques générales */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Une plateforme qui fait ses preuves
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez pourquoi Loky transforme le marché de la location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-loky-beige rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-loky-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,250+</div>
              <div className="text-gray-600">Locataires actifs</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">89%</div>
              <div className="text-gray-600">Taux d'acceptation</div>
            </div>

            <div className="text-center">
              <div className="bg-loky-beige rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-loky-dark-blue" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">12h</div>
              <div className="text-gray-600">Temps économisé moyen</div>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Satisfaction utilisateur</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Sécurité et Confiance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Sécurité et confiance au cœur de Loky
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-loky-beige rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-loky-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chiffrement de bout en bout
                </h3>
                <p className="text-gray-600">
                  Vos documents sont protégés par un chiffrement militaire. 
                  Personne ne peut accéder à vos données sensibles.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analyse automatisée
                </h3>
                <p className="text-gray-600">
                  Intelligence artificielle pour une analyse objective et 
                  rapide de votre solvabilité.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-loky-beige rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-loky-dark-blue" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Certification des agences
                </h3>
                <p className="text-gray-600">
                  Toutes les agences sont vérifiées et certifiées pour 
                  votre sécurité et votre tranquillité d'esprit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
