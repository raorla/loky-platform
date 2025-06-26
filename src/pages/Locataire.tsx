import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUserProfile } from '../contexts/UserProfileContext';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Share2, 
  QrCode,
  TrendingUp,
  Clock,
  Shield,
  Bell,
  Settings,
  Download,
  Eye,
  AlertCircle,
  Calendar,
  Euro,
  Home,
  Briefcase,
  Building2,
  Bug,
  BugOff
} from 'lucide-react';
import { mockLocataire, mockDocuments, mockScoreReport, mockDossierShares, mockNotifications, mockStats } from '../data/mockData';
import { WalletGuard, WalletInfoCompact } from '../components/web3';
import { UserTypeGuard } from '../components/auth/UserTypeGuard';
import { DataProtectionModal } from '../components/iexec/DataProtectionModal';
import { GrantAccessModal } from '../components/iexec/GrantAccessModal';
import { ConfigTest } from '../components/iexec/ConfigTest';
import IExecConfigDiagnostic from '../components/iexec/IExecConfigDiagnostic';
import DataProtectionTester from '../components/iexec/DataProtectionTester';

const Locataire = () => {
  const { profile, isProfileComplete } = useUserProfile();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  const [protectedDataResults, setProtectedDataResults] = useState<any[]>([]);
  const [isDebugMode, setIsDebugMode] = useState(false);

  const handleFileUpload = () => {
    setUploading(true);
    // Simulation d'upload
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  const handleProtectionComplete = (result: any) => {
    console.log('✅ Données protégées avec iExec:', result);
    setProtectedDataResults(prev => [...prev, result]);
    // Vous pouvez ici ajouter une notification de succès
  };

  const handleAccessGranted = (result: any) => {
    console.log('✅ Accès accordé avec iExec:', result);
    // Vous pouvez ici ajouter une notification de succès
    // et peut-être mettre à jour l'état des données protégées
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'salary_slip':
        return <Euro className="h-4 w-4" />;
      case 'work_contract':
        return <Briefcase className="h-4 w-4" />;
      case 'tax_notice':
        return <FileText className="h-4 w-4" />;
      case 'bank_info':
        return <Home className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDocumentLabel = (type: string) => {
    const labels = {
      'salary_slip': 'Bulletin de salaire',
      'work_contract': 'Contrat de travail',
      'tax_notice': 'Avis d\'imposition',
      'bank_info': 'RIB / Infos bancaires',
      'charges': 'Justificatifs de charges'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <UserTypeGuard requiredUserType="locataire">
      <WalletGuard
        title="Connectez votre wallet"
        description="Votre wallet sécurise votre identité et vos données de location"
      >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bonjour, {profile.nom || mockLocataire.name} 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Gérez votre dossier de location et suivez vos candidatures
              </p>
              {!isProfileComplete && (
                <div className="mt-2 flex items-center text-amber-600">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  <span className="text-sm">Complétez votre profil dans les paramètres</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <WalletInfoCompact />
              
              <Badge 
                variant={mockLocataire.dossierStatus === 'verified' ? 'default' : 'secondary'}
                className="bg-green-100 text-green-800"
              >
                <Shield className="mr-1 h-3 w-3" />
                Dossier vérifié
              </Badge>
              
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="score">Mon Score</TabsTrigger>
            <TabsTrigger value="partages">Partages</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Aperçu du score */}
            <Card className="bg-loky-gradient text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Score de solvabilité</CardTitle>
                    <CardDescription className="text-blue-100">
                      Valable jusqu'au {new Date(mockScoreReport.valid_until).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{mockScoreReport.score}/100</div>
                    <Badge className="bg-green-500 text-white mt-2">
                      {mockScoreReport.status === 'ACCEPTED' ? 'Excellent' : mockScoreReport.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-blue-100">Revenus mensuels</div>
                    <div className="text-lg font-semibold">{mockScoreReport.monthly_income.toLocaleString('fr-FR')} €</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Loyer maximum</div>
                    <div className="text-lg font-semibold">{mockScoreReport.monthly_rent_max.toLocaleString('fr-FR')} €</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Type de contrat</div>
                    <div className="text-lg font-semibold">{mockScoreReport.contract_type}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dossiers partagés</CardTitle>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.locataire.partagesEffectues}</div>
                  <p className="text-xs text-muted-foreground">
                    +1 ce mois
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultations reçues</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.locataire.consultationsRecues}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 cette semaine
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temps économisé</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.locataire.tempsEconomise}</div>
                  <p className="text-xs text-muted-foreground">
                    Depuis l'inscription
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Score actuel</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.locataire.scoreActuel}/100</div>
                  <p className="text-xs text-muted-foreground">
                    Excellent profil
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Activité récente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${
                        notification.type === 'success' ? 'bg-green-100' :
                        notification.type === 'info' ? 'bg-blue-100' :
                        notification.type === 'warning' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        <Bell className={`h-3 w-3 ${
                          notification.type === 'success' ? 'text-green-600' :
                          notification.type === 'info' ? 'text-blue-600' :
                          notification.type === 'warning' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('partages')}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager mon dossier
                  </Button>
                  <Button className="w-full justify-start border-loky-beige text-loky-dark-blue hover:bg-loky-beige" variant="outline" onClick={() => setActiveTab('documents')}>
                    <Upload className="mr-2 h-4 w-4" />
                    Ajouter un document
                  </Button>
                  <Button className="w-full justify-start bg-loky-gradient hover:opacity-90 text-white" variant="default">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le rapport
                  </Button>
                  <Button className="w-full justify-start border-loky-beige text-loky-dark-blue hover:bg-loky-beige" variant="outline">
                    <QrCode className="mr-2 h-4 w-4" />
                    Générer un QR Code
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mes documents</h2>
                <p className="text-gray-600">Gérez vos documents de location de manière sécurisée</p>
              </div>
              <DataProtectionModal 
                onProtectionComplete={handleProtectionComplete}
                trigger={
                  <Button onClick={handleFileUpload} disabled={uploading} className="bg-loky-gradient hover:opacity-90">
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? 'Téléversement...' : 'Protéger mes documents'}
                  </Button>
                }
              />
            </div>

            {/* Progression du dossier */}
            <Card>
              <CardHeader>
                <CardTitle>Progression de votre dossier</CardTitle>
                <CardDescription>
                  Ajoutez tous vos documents pour obtenir le meilleur score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Complétude</span>
                    <span className="text-sm text-gray-600">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-gray-500">
                    4 documents sur 5 ajoutés. Ajoutez votre justificatif de charges pour un score optimal.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liste des documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getDocumentIcon(document.type)}
                        <span className="text-sm font-medium">{getDocumentLabel(document.type)}</span>
                      </div>
                      {document.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium truncate">{document.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(document.size)} • Ajouté le {new Date(document.uploadedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>

                    {document.verified ? (
                      <Badge className="w-full justify-center bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Vérifié
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="w-full justify-center">
                        <Clock className="mr-1 h-3 w-3" />
                        En cours de vérification
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Carte pour ajouter un document manquant */}
              <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Justificatif de charges
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Recommandé pour améliorer votre score
                  </p>
                  <Button variant="outline" size="sm" onClick={handleFileUpload}>
                    Ajouter
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Section des données protégées avec iExec */}
            {protectedDataResults.length > 0 && (
              <>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    Données protégées avec iExec ({protectedDataResults.length})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {protectedDataResults.map((result, index) => (
                      <Card key={index} className="border-blue-200 bg-blue-50">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Shield className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium">{result.name}</span>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              Protégé
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-xs text-blue-600 font-medium">Adresse NFT</p>
                            <p className="text-xs text-blue-800 font-mono truncate">
                              {result.address}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-blue-600 font-medium">Créé le</p>
                            <p className="text-xs text-blue-800">
                              {new Date(result.creationTimestamp * 1000).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-100"
                              onClick={() => window.open(`https://explorer.iex.ec/bellecour/dataset/${result.address}`, '_blank')}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              Explorer
                            </Button>
                          </div>

                          {/* Modal pour accorder l'accès */}
                          <GrantAccessModal 
                            protectedDataAddress={result.address}
                            protectedDataName={result.name}
                            onAccessGranted={handleAccessGranted}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Score */}
          <TabsContent value="score" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score principal */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse de votre solvabilité</CardTitle>
                    <CardDescription>
                      Score généré automatiquement le {new Date(mockScoreReport.generated_at).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Score visuel */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-loky-gradient text-white mb-4">
                        <span className="text-3xl font-bold">{mockScoreReport.score}</span>
                      </div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 text-sm">
                          {mockScoreReport.status === 'ACCEPTED' ? 'Profil Excellent' : mockScoreReport.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Détails financiers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium">Revenus mensuels</div>
                        <div className="text-2xl font-bold text-blue-900">
                          {mockScoreReport.monthly_income.toLocaleString('fr-FR')} €
                        </div>
                        <div className="text-xs text-blue-600">Net imposable</div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-600 font-medium">Capacité de loyer</div>
                        <div className="text-2xl font-bold text-green-900">
                          {mockScoreReport.monthly_rent_max.toLocaleString('fr-FR')} €
                        </div>
                        <div className="text-xs text-green-600">Charges comprises</div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-purple-600 font-medium">Reste à vivre</div>
                        <div className="text-2xl font-bold text-purple-900">
                          {mockScoreReport.rest_after_rent.toLocaleString('fr-FR')} €
                        </div>
                        <div className="text-xs text-purple-600">Après paiement du loyer</div>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-orange-600 font-medium">Type de contrat</div>
                        <div className="text-2xl font-bold text-orange-900">
                          {mockScoreReport.contract_type}
                        </div>
                        <div className="text-xs text-orange-600">Stabilité élevée</div>
                      </div>
                    </div>

                    {/* Validité */}
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Score valable jusqu'au {new Date(mockScoreReport.valid_until).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-xs text-yellow-700 mt-1">
                        Pensez à renouveler votre dossier avant expiration pour maintenir votre score actuel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions et conseils */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-loky-gradient hover:opacity-90">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le rapport
                    </Button>
                    <Button variant="outline" className="w-full border-loky-beige text-loky-dark-blue hover:bg-loky-beige">
                      <Share2 className="mr-2 h-4 w-4" />
                      Partager le score
                    </Button>
                    <Button variant="outline" className="w-full border-loky-beige text-loky-dark-blue hover:bg-loky-beige">
                      <Settings className="mr-2 h-4 w-4" />
                      Actualiser les données
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conseils pour améliorer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Excellent historique</p>
                        <p className="text-gray-600">Vos revenus sont stables</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Document manquant</p>
                        <p className="text-gray-600">Ajoutez vos justificatifs de charges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Partages */}
          <TabsContent value="partages" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mes partages</h2>
                <p className="text-gray-600">Suivez qui a accès à votre dossier</p>
              </div>
              <Button className="bg-loky-gradient hover:opacity-90">
                <Share2 className="mr-2 h-4 w-4" />
                Nouveau partage
              </Button>
            </div>

            {/* Statistiques de partage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total partagé</CardTitle>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockDossierShares.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Agences différentes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockDossierShares.reduce((sum, share) => sum + share.accessCount, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vues au total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dernière vue</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockDossierShares[0]?.lastAccessed ? 
                      new Date(mockDossierShares[0].lastAccessed).toLocaleDateString('fr-FR') : 
                      'Jamais'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockDossierShares[0]?.sharedWith || 'Aucune agence'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Liste des partages */}
            <div className="space-y-4">
              {mockDossierShares.map((share) => (
                <Card key={share.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{share.sharedWith}</h3>
                            <p className="text-sm text-gray-600">
                              Partagé le {new Date(share.sharedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{share.accessCount}</div>
                          <div className="text-xs text-gray-500">Consultations</div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">
                            {share.lastAccessed ? 
                              new Date(share.lastAccessed).toLocaleDateString('fr-FR') : 
                              'Jamais'
                            }
                          </div>
                          <div className="text-xs text-gray-500">Dernière vue</div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Lien de partage:</span>
                        <code className="text-xs bg-white px-2 py-1 rounded border">
                          {share.shareLink}
                        </code>
                        <Button variant="ghost" size="sm">
                          Copier
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      
      {/* Bouton Debug Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsDebugMode(!isDebugMode)}
          variant={isDebugMode ? "default" : "outline"}
          size="sm"
          className={`
            relative transition-all duration-300 shadow-lg border-2
            ${isDebugMode 
              ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
            }
          `}
        >
          <div className="flex items-center space-x-2">
            {isDebugMode ? (
              <Bug className="h-4 w-4" />
            ) : (
              <BugOff className="h-4 w-4" />
            )}
            <span className="font-medium">Debug</span>
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${isDebugMode 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-500'
              }
            `}>
              {isDebugMode ? 'ON' : 'OFF'}
            </span>
          </div>
        </Button>
      </div>
      
      {/* Composants de test temporaire pour débugger la configuration - Affichés seulement en mode debug */}
      {isDebugMode && (
        <div className="fixed bottom-20 right-4 bg-white border-2 border-orange-500 rounded-lg shadow-xl p-4 max-w-sm z-40">
          <h3 className="text-sm font-semibold text-orange-600 mb-3 flex items-center">
            <Bug className="h-4 w-4 mr-2" />
            Outils de Diagnostic
          </h3>
          <div className="space-y-2">
            <ConfigTest />
            <IExecConfigDiagnostic />
            <DataProtectionTester />
          </div>
        </div>
      )}
      </WalletGuard>
    </UserTypeGuard>
  );
};

export default Locataire;
