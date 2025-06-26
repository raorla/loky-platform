import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { useUserProfile } from '../contexts/UserProfileContext';
import { 
  Building2, 
  Shield, 
  Star, 
  TrendingUp,
  Users,
  FileCheck,
  Clock,
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  Award,
  Verified,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Euro,
  Home,
  BarChart3,
  User,
  Settings,
  Trophy
} from 'lucide-react';
import { mockAgencies, mockStats, mockProperties } from '../data/mockData';
import { WalletGuard, WalletInfoCompact } from '../components/web3';
import { UserTypeGuard } from '../components/auth/UserTypeGuard';

const Agence = () => {
  const { profile, isProfileComplete } = useUserProfile();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulation de dossiers de locataires pour l'agence
  const mockDossiers = [
    {
      id: '1',
      locataireName: 'Jean Dupont',
      score: 91,
      status: 'ACCEPTED',
      submitDate: '2025-06-15T10:00:00Z',
      property: 'Appartement 2P - Rue Victor Hugo',
      monthlyIncome: 3120,
      maxRent: 1040,
      contractType: 'CDI'
    },
    {
      id: '2',
      locataireName: 'Marie Martin',
      score: 76,
      status: 'REVIEWING',
      submitDate: '2025-06-20T14:30:00Z',
      property: 'Studio - Place Bellecour',
      monthlyIncome: 2800,
      maxRent: 933,
      contractType: 'CDI'
    },
    {
      id: '3',
      locataireName: 'Pierre Durand',
      score: 88,
      status: 'ACCEPTED',
      submitDate: '2025-06-22T09:15:00Z',
      property: 'Appartement 3P - Presqu\'île',
      monthlyIncome: 4200,
      maxRent: 1400,
      contractType: 'CDI'
    }
  ];

  const currentAgency = mockAgencies[0]; // Century 21 Lyon Centre

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'ACCEPTED': { color: 'bg-green-100 text-green-800', label: 'Accepté' },
      'REVIEWING': { color: 'bg-orange-100 text-orange-800', label: 'En cours' },
      'REFUSED': { color: 'bg-red-100 text-red-800', label: 'Refusé' },
      'PENDING': { color: 'bg-gray-100 text-gray-800', label: 'En attente' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getCertificationLevel = (level: string) => {
    const levels = {
      'gold': { color: 'text-yellow-600', icon: '🥇', label: 'Certification Or' },
      'silver': { color: 'text-gray-500', icon: '🥈', label: 'Certification Argent' },
      'bronze': { color: 'text-orange-600', icon: '🥉', label: 'Certification Bronze' },
      'none': { color: 'text-gray-400', icon: '❌', label: 'Non certifié' }
    };
    return levels[level as keyof typeof levels] || levels.none;
  };

  return (
    <UserTypeGuard requiredUserType="agence">
      <WalletGuard
        title="Espace Agence Sécurisé"
        description="Connectez votre wallet pour accéder aux fonctionnalités d'agence certifiée"
      >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.nomAgence || currentAgency.name}
                </h1>
                <p className="text-gray-600 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.adresse || currentAgency.address}</span>
                </p>
                {!isProfileComplete && (
                  <div className="mt-2 flex items-center text-amber-600">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    <span className="text-sm">Complétez votre profil d'agence dans les paramètres</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <WalletInfoCompact />
              
              <Badge className={`${getCertificationLevel(currentAgency.certificationLevel).color} bg-yellow-50 border border-yellow-200`}>
                <Award className="mr-1 h-3 w-3" />
                {getCertificationLevel(currentAgency.certificationLevel).label}
              </Badge>
              
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{currentAgency.reputation}</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="dossiers">Dossiers reçus</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
            <TabsTrigger value="biens">Mes biens</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dossiers reçus</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.agence.dossiersRecus}</div>
                  <p className="text-xs text-muted-foreground">
                    +12 ce mois
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux d'acceptation</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.agence.tauxAcceptation}%</div>
                  <p className="text-xs text-muted-foreground">
                    +5% vs mois dernier
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temps économisé</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.agence.tempsEconomise}</div>
                  <p className="text-xs text-muted-foreground">
                    Depuis l'adoption
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Biens vérifiés</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.agence.biensVerifies}</div>
                  <p className="text-xs text-muted-foreground">
                    100% certifiés
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Certification et badge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Performances récentes</CardTitle>
                  <CardDescription>Évolution de vos indicateurs clés</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">Dossiers traités</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-900">{mockStats.agence.dossiersTraites}</div>
                        <div className="text-xs text-green-600">+8% ce mois</div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-800">Score moyen</span>
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-900">82/100</div>
                        <div className="text-xs text-blue-600">Excellent niveau</div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Certification active</span>
                      </div>
                      <div className="text-lg font-bold text-purple-900">
                        {getCertificationLevel(currentAgency.certificationLevel).label}
                      </div>
                      <div className="text-xs text-purple-600">
                        Renouvelée le {new Date(currentAgency.certificationDate!).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profil agence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold">{currentAgency.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{currentAgency.reputation}/5</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{currentAgency.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{currentAgency.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span>Carte Pro: {currentAgency.proCard}</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Modifier le profil
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dossiers récents */}
            <Card>
              <CardHeader>
                <CardTitle>Dossiers récents</CardTitle>
                <CardDescription>Les dernières candidatures reçues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDossiers.slice(0, 3).map((dossier) => (
                    <div key={dossier.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{dossier.locataireName}</h4>
                          <p className="text-sm text-gray-600">{dossier.property}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-lg border text-sm font-medium ${getScoreColor(dossier.score)}`}>
                          {dossier.score}/100
                        </div>
                        {getStatusBadge(dossier.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dossiers reçus */}
          <TabsContent value="dossiers" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dossiers de candidatures</h2>
                <p className="text-gray-600">Consultez et analysez les dossiers Loky</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Rechercher un locataire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Liste des dossiers */}
            <div className="space-y-4">
              {mockDossiers.map((dossier) => (
                <Card key={dossier.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-loky-gradient p-3 rounded-lg text-white">
                          <User className="h-6 w-6" />
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{dossier.locataireName}</h3>
                          <p className="text-sm text-gray-600">{dossier.property}</p>
                          <p className="text-xs text-gray-500">
                            Candidature du {new Date(dossier.submitDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        {/* Score */}
                        <div className="text-center">
                          <div className={`text-2xl font-bold rounded-lg px-4 py-2 ${getScoreColor(dossier.score)}`}>
                            {dossier.score}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Score Loky</div>
                        </div>

                        {/* Infos financières */}
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">
                            {dossier.monthlyIncome.toLocaleString('fr-FR')} €
                          </div>
                          <div className="text-xs text-gray-500">Revenus/mois</div>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {dossier.maxRent.toLocaleString('fr-FR')} €
                          </div>
                          <div className="text-xs text-gray-500">Loyer max</div>
                        </div>

                        {/* Statut et actions */}
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(dossier.status)}
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-3 w-3" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-1 h-3 w-3" />
                              Rapport
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Détails supplémentaires */}
                    <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Type de contrat:</span>
                        <span className="ml-2 font-medium">{dossier.contractType}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Reste à vivre:</span>
                        <span className="ml-2 font-medium text-green-600">
                          {(dossier.monthlyIncome - dossier.maxRent).toLocaleString('fr-FR')} €
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Ratio revenus:</span>
                        <span className="ml-2 font-medium">
                          {Math.round((dossier.maxRent / dossier.monthlyIncome) * 100)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Dossier vérifié:</span>
                        <CheckCircle className="inline ml-2 h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certification */}
          <TabsContent value="certification" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Certification Loky</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Renforcez la confiance de vos clients avec notre certification officielle
              </p>
            </div>

            {/* Statut actuel */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Certification Or Active</CardTitle>
                      <CardDescription>
                        Valable jusqu'au {new Date(currentAgency.certificationDate!).toLocaleDateString('fr-FR')}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">
                    🥇 Niveau Or
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{currentAgency.verifiedProperties}</div>
                    <div className="text-sm text-yellow-700">Biens certifiés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{currentAgency.reputation}/5</div>
                    <div className="text-sm text-yellow-700">Note de confiance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">98%</div>
                    <div className="text-sm text-yellow-700">Taux de satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avantages de la certification */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avantages de votre certification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Badge de confiance sur vos annonces</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priorité dans les résultats de recherche</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Accès aux dossiers Loky premium</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Support prioritaire 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Analytics avancées</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations de certification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Numéro de certification</div>
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded">LOKY-CERT-{currentAgency.id}-2025</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Carte professionnelle</div>
                    <div className="font-medium">{currentAgency.proCard}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">RCS</div>
                    <div className="font-medium">{currentAgency.rcsNumber}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Date de certification</div>
                    <div className="font-medium">
                      {new Date(currentAgency.certificationDate!).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le certificat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Processus de renouvellement */}
            <Card>
              <CardHeader>
                <CardTitle>Renouvellement automatique</CardTitle>
                <CardDescription>
                  Votre certification sera automatiquement renouvelée si vous maintenez vos standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Satisfaction client</h3>
                    <div className="text-sm text-gray-600">
                      Maintenir une note ≥ 4.5/5
                    </div>
                    <div className="text-lg font-bold text-green-600 mt-1">✓ {currentAgency.reputation}/5</div>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Biens vérifiés</h3>
                    <div className="text-sm text-gray-600">
                      Min. 80% des biens certifiés
                    </div>
                    <div className="text-lg font-bold text-green-600 mt-1">✓ 100%</div>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Activité régulière</h3>
                    <div className="text-sm text-gray-600">
                      Min. 10 dossiers/mois
                    </div>
                    <div className="text-lg font-bold text-green-600 mt-1">✓ 39/mois</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mes biens */}
          <TabsContent value="biens" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mes biens immobiliers</h2>
                <p className="text-gray-600">Gérez vos propriétés et leur certification</p>
              </div>
              <Button>
                <Home className="mr-2 h-4 w-4" />
                Ajouter un bien
              </Button>
            </div>

            {/* Statistiques des biens */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total biens</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockProperties.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Toutes catégories
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Biens certifiés</CardTitle>
                  <Verified className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockProperties.filter(p => p.verified).length}</div>
                  <p className="text-xs text-muted-foreground">
                    100% du portefeuille
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Loyer moyen</CardTitle>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(mockProperties.reduce((sum, p) => sum + p.rent, 0) / mockProperties.length)} €
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hors charges
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-xs text-muted-foreground">
                    Très performant
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Liste des biens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Home className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {property.type === 'apartment' ? 'Appartement' : 
                             property.type === 'studio' ? 'Studio' : 
                             property.type === 'house' ? 'Maison' : 'Chambre'}
                          </h3>
                          <p className="text-sm text-gray-600">{property.address}</p>
                        </div>
                      </div>

                      {property.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Certifié
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Loyer</div>
                        <div className="font-semibold">{property.rent} €</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Charges</div>
                        <div className="font-semibold">{property.charges} €</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Surface</div>
                        <div className="font-semibold">{property.surface} m²</div>
                      </div>
                    </div>

                    {property.certification_badge && (
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Badge {property.certification_badge.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Voir détails
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="mr-1 h-3 w-3" />
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      </WalletGuard>
    </UserTypeGuard>
  );
};

export default Agence;
