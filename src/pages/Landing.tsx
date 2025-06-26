import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { WalletConnectButton } from '../components/web3';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  Lock, 
  Zap, 
  Star,
  ArrowRight,
  Users,
  Building2,
  FileCheck,
  TrendingUp,
  Globe,
  Smartphone
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-loky-cream via-loky-background to-loky-beige">
      {/* Header avec navigation simplifiée */}
      <header className="bg-loky-background/90 backdrop-blur-md border-b border-loky-beige/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/LOKY_Picto.png" 
                alt="Loky Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-loky-primary">Loky</span>
              <Badge variant="secondary" className="text-xs bg-loky-beige text-loky-dark-blue">
                By iExec
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/home">
                <Button variant="ghost" className="text-loky-dark-blue hover:bg-loky-beige">Découvrir</Button>
              </Link>
              <WalletConnectButton 
                size="default"
                showAddress={false}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              {/* Logo avec tagline */}
              <div className="mb-8 text-center lg:text-left">
                <img 
                  src="/images/LOKY_LogoHorizTagline.png" 
                  alt="Loky - tes données sous clé" 
                  className="h-21 mx-auto lg:mx-0"
                />
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-loky-dark-blue sm:text-6xl lg:text-5xl xl:text-6xl">
                Votre dossier de location{' '}
                <span className="bg-loky-gradient bg-clip-text text-transparent">
                  sécurisé et certifié
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-loky-dark-blue/80 sm:max-w-md lg:max-w-none">
                Fini les envois répétés de documents sensibles. Créez un dossier unique, 
                obtenez un score certifié et partagez-le en toute sécurité avec les agences.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <WalletConnectButton 
                  size="lg"
                  showAddress={false}
                />
                
                <Link to="/home">
                  <Button variant="outline" size="lg" className="border-loky-dark-blue text-loky-dark-blue hover:bg-loky-beige">
                    Découvrir Loky
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <p className="mt-4 text-sm text-loky-dark-blue/60">
                🔒 Connectez votre wallet pour commencer • Données 100% sécurisées
              </p>

              {/* Statistiques */}
              <div className="mt-10 flex items-center gap-x-6">
                <div className="flex items-center gap-x-2">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-loky-primary border-2 border-white"></div>
                    <div className="h-8 w-8 rounded-full bg-loky-dark-blue border-2 border-white"></div>
                    <div className="h-8 w-8 rounded-full bg-loky-beige border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-loky-dark-blue/70">+1,250 locataires actifs</span>
                </div>
                
                <div className="flex items-center gap-x-1">
                  <Star className="h-4 w-4 text-loky-primary fill-current" />
                  <span className="text-sm text-loky-dark-blue/70">4.9/5 (156 avis)</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-10 max-w-lg lg:col-span-5 lg:mx-0 lg:mt-0 xl:col-span-6">
              <div className="relative">
                {/* Interface mockup */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-loky-beige loky-card-float loky-card-appear">
                  <div className="bg-loky-gradient p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img 
                          src="/images/LOKY_Picto.png" 
                          alt="Loky" 
                          className="h-5 w-5"
                        />
                        <span className="text-white font-medium">Dossier Loky</span>
                      </div>
                      <Badge className="bg-green-500 text-white loky-badge-pulse">Vérifié</Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-loky-dark-blue/70">Score de solvabilité</span>
                      <span className="text-2xl font-bold text-loky-primary loky-score-count">91/100</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 loky-check-cascade">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-loky-dark-blue">Bulletins de salaire</span>
                      </div>
                      <div className="flex items-center space-x-2 loky-check-cascade">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-loky-dark-blue">Contrat de travail CDI</span>
                      </div>
                      <div className="flex items-center space-x-2 loky-check-cascade">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-loky-dark-blue">Avis d'imposition</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-loky-gradient hover:opacity-90 loky-hover-lift">
                      Partager le dossier
                    </Button>
                  </div>
                </div>

                {/* Éléments décoratifs */}
                <div className="absolute -top-4 -right-4 h-72 w-72 bg-gradient-to-br from-loky-beige to-loky-primary rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-8 -left-4 h-64 w-64 bg-gradient-to-br from-loky-dark-blue to-loky-primary rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-loky-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-loky-dark-blue sm:text-4xl">
              Pourquoi choisir Loky ?
            </h2>
            <p className="mt-4 text-lg text-loky-dark-blue/70">
              Une solution moderne qui révolutionne la recherche de logement
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white border-loky-beige">
              <CardContent className="pt-6">
                <div className="mx-auto h-12 w-12 bg-loky-beige rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-loky-dark-blue" />
                </div>
                <h3 className="text-lg font-semibold text-loky-dark-blue mb-2">
                  100% Sécurisé
                </h3>
                <p className="text-loky-dark-blue/70">
                  Vos documents sont chiffrés et analysés dans un environnement sécurisé. 
                  Aucune donnée sensible n'est exposée.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white border-loky-beige">
              <CardContent className="pt-6">
                <div className="mx-auto h-12 w-12 bg-loky-beige rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-loky-primary" />
                </div>
                <h3 className="text-lg font-semibold text-loky-dark-blue mb-2">
                  Gain de temps
                </h3>
                <p className="text-loky-dark-blue/70">
                  Créez votre dossier une fois et partagez-le avec toutes les agences. 
                  Plus besoin d'envoyer vos documents à chaque candidature.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white border-loky-beige">
              <CardContent className="pt-6">
                <div className="mx-auto h-12 w-12 bg-loky-beige rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-loky-dark-blue" />
                </div>
                <h3 className="text-lg font-semibold text-loky-dark-blue mb-2">
                  Score Certifié
                </h3>
                <p className="text-loky-dark-blue/70">
                  Obtenez un score de solvabilité automatique et certifié qui 
                  rassure les propriétaires et accélère vos candidatures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-loky-dark-blue sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-loky-dark-blue/70">
              Simple, rapide et sécurisé en 3 étapes
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-loky-gradient rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-loky-dark-blue mb-2">
                  Téléversez vos documents
                </h3>
                <p className="text-loky-dark-blue/70">
                  Importez vos bulletins de salaire, contrat de travail, 
                  avis d'imposition et RIB en toute sécurité.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-loky-gradient rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-loky-dark-blue mb-2">
                  Obtenez votre score
                </h3>
                <p className="text-loky-dark-blue/70">
                  Notre IA analyse vos documents et génère automatiquement 
                  un score de solvabilité certifié.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-loky-gradient rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-loky-dark-blue mb-2">
                  Partagez votre dossier
                </h3>
                <p className="text-loky-dark-blue/70">
                  Envoyez un lien sécurisé aux agences pour qu'elles consultent 
                  votre score sans accéder à vos documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 bg-loky-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl mb-12">
              Loky en chiffres
            </h2>
            
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <div>
                <div className="text-3xl font-bold mb-2">1,250+</div>
                <div className="text-blue-100">Locataires actifs</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold mb-2">89%</div>
                <div className="text-blue-100">Taux d'acceptation</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold mb-2">12h</div>
                <div className="text-blue-100">Temps économisé en moyenne</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Agences partenaires</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-loky-dark-blue sm:text-4xl">
            Prêt à révolutionner votre expérience immobilière ?
          </h2>
          <p className="mt-4 text-lg text-loky-dark-blue/80">
            Rejoignez l'ère du Web3 avec des milliers d'utilisateurs qui font confiance à Loky
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <WalletConnectButton 
              size="lg"
              showAddress={false}
              className="w-full sm:w-auto"
            />
            
            <Link to="/home">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-loky-dark-blue text-loky-dark-blue hover:bg-loky-beige">
                Explorer la plateforme
              </Button>
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-loky-dark-blue/60">
            🔒 Web3 natif • Sécurité blockchain • Données décentralisées
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
