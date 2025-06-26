import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Settings, User, Building2, Save, X } from 'lucide-react'
import { useUserProfile, type UserProfile } from '../../contexts/UserProfileContext'

interface UserSettingsProps {
  children?: React.ReactNode
}

export const UserSettings: React.FC<UserSettingsProps> = ({ children }) => {
  const { profile, updateProfile } = useUserProfile()
  const [isOpen, setIsOpen] = useState(false)
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile)
  const [isLoading, setIsLoading] = useState(false)

  // Synchroniser le profil local avec le contexte quand on ouvre la modal
  const handleOpen = (open: boolean) => {
    if (open) {
      setLocalProfile(profile)
    }
    setIsOpen(open)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      updateProfile(localProfile)
      console.log('✅ Profil utilisateur sauvegardé:', localProfile)
      setIsOpen(false)
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLocalProfile = (field: keyof UserProfile, value: string) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Paramètres Utilisateur
          </DialogTitle>
          <DialogDescription>
            Configurez vos informations de profil et choisissez votre type d'utilisateur
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Type d'utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Type d'utilisateur</CardTitle>
              <CardDescription>
                Sélectionnez si vous êtes un locataire ou une agence immobilière
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={localProfile.userType}
                onValueChange={(value: 'locataire' | 'agence') => updateLocalProfile('userType', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir le type d'utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="locataire">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Locataire
                    </div>
                  </SelectItem>
                  <SelectItem value="agence">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Agence Immobilière
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Informations communes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">
                    {localProfile.userType === 'agence' ? 'Nom du responsable' : 'Nom complet'}
                  </Label>
                  <Input
                    id="nom"
                    value={localProfile.nom}
                    onChange={(e) => updateLocalProfile('nom', e.target.value)}
                    placeholder={localProfile.userType === 'agence' ? 'Jean Dupont' : 'Jean Dupont'}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={localProfile.email}
                    onChange={(e) => updateLocalProfile('email', e.target.value)}
                    placeholder="exemple@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={localProfile.telephone}
                    onChange={(e) => updateLocalProfile('telephone', e.target.value)}
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  value={localProfile.adresse}
                  onChange={(e) => updateLocalProfile('adresse', e.target.value)}
                  placeholder="123 rue de la Paix"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ville">Ville</Label>
                  <Input
                    id="ville"
                    value={localProfile.ville}
                    onChange={(e) => updateLocalProfile('ville', e.target.value)}
                    placeholder="Paris"
                  />
                </div>
                
                <div>
                  <Label htmlFor="codePostal">Code postal</Label>
                  <Input
                    id="codePostal"
                    value={localProfile.codePostal}
                    onChange={(e) => updateLocalProfile('codePostal', e.target.value)}
                    placeholder="75001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations spécifiques locataire */}
          {localProfile.userType === 'locataire' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations locataire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateNaissance">Date de naissance</Label>
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={localProfile.dateNaissance || ''}
                      onChange={(e) => updateLocalProfile('dateNaissance', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      value={localProfile.profession || ''}
                      onChange={(e) => updateLocalProfile('profession', e.target.value)}
                      placeholder="Ingénieur, Professeur, etc."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="salaire">Salaire mensuel net (€)</Label>
                    <Input
                      id="salaire"
                      type="number"
                      value={localProfile.salaire || ''}
                      onChange={(e) => updateLocalProfile('salaire', e.target.value)}
                      placeholder="3000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="situationFamiliale">Situation familiale</Label>
                    <Select
                      value={localProfile.situationFamiliale || ''}
                      onValueChange={(value) => updateLocalProfile('situationFamiliale', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celibataire">Célibataire</SelectItem>
                        <SelectItem value="marie">Marié(e)</SelectItem>
                        <SelectItem value="pacs">Pacsé(e)</SelectItem>
                        <SelectItem value="divorce">Divorcé(e)</SelectItem>
                        <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informations spécifiques agence */}
          {localProfile.userType === 'agence' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informations agence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomAgence">Nom de l'agence</Label>
                    <Input
                      id="nomAgence"
                      value={localProfile.nomAgence || ''}
                      onChange={(e) => updateLocalProfile('nomAgence', e.target.value)}
                      placeholder="Agence Immobilière XYZ"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="siret">SIRET</Label>
                    <Input
                      id="siret"
                      value={localProfile.siret || ''}
                      onChange={(e) => updateLocalProfile('siret', e.target.value)}
                      placeholder="12345678901234"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="licenceImmobiliere">Licence immobilière</Label>
                    <Input
                      id="licenceImmobiliere"
                      value={localProfile.licenceImmobiliere || ''}
                      onChange={(e) => updateLocalProfile('licenceImmobiliere', e.target.value)}
                      placeholder="CPI 1234567890"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nombreEmployes">Nombre d'employés</Label>
                    <Input
                      id="nombreEmployes"
                      type="number"
                      value={localProfile.nombreEmployes || ''}
                      onChange={(e) => updateLocalProfile('nombreEmployes', e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="secteurActivite">Secteur d'activité</Label>
                    <Select
                      value={localProfile.secteurActivite || ''}
                      onValueChange={(value) => updateLocalProfile('secteurActivite', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="vente">Vente</SelectItem>
                        <SelectItem value="gestion">Gestion locative</SelectItem>
                        <SelectItem value="syndic">Syndic</SelectItem>
                        <SelectItem value="mixte">Activité mixte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description de l'agence</Label>
                  <Textarea
                    id="description"
                    value={localProfile.description || ''}
                    onChange={(e) => updateLocalProfile('description', e.target.value)}
                    placeholder="Décrivez votre agence, vos services, votre expérience..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-loky-primary hover:bg-loky-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserSettings
