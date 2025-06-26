import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAccount } from 'wagmi'

export interface UserProfile {
  userType: 'locataire' | 'agence'
  // Informations communes
  nom: string
  email: string
  telephone: string
  adresse: string
  ville: string
  codePostal: string
  
  // Informations spécifiques locataire
  dateNaissance?: string
  profession?: string
  salaire?: string
  situationFamiliale?: string
  
  // Informations spécifiques agence
  nomAgence?: string
  siret?: string
  licenceImmobiliere?: string
  description?: string
  secteurActivite?: string
  nombreEmployes?: string
}

const defaultProfile: UserProfile = {
  userType: 'locataire',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  ville: '',
  codePostal: '',
}

interface UserProfileContextType {
  profile: UserProfile
  updateProfile: (profile: UserProfile) => void
  isProfileComplete: boolean
  hasProfile: boolean
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export const useUserProfile = () => {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}

interface UserProfileProviderProps {
  children: ReactNode
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const { address } = useAccount()
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)

  // Charger le profil depuis localStorage quand l'adresse change
  useEffect(() => {
    if (address) {
      const savedProfile = localStorage.getItem(`user-profile-${address}`)
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile)
          setProfile({ ...defaultProfile, ...parsedProfile })
        } catch (error) {
          console.error('Erreur lors du chargement du profil:', error)
          setProfile(defaultProfile)
        }
      } else {
        setProfile(defaultProfile)
      }
    } else {
      setProfile(defaultProfile)
    }
  }, [address])

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile)
    if (address) {
      localStorage.setItem(`user-profile-${address}`, JSON.stringify(newProfile))
    }
  }

  // Vérifier si le profil est complet selon le type d'utilisateur
  const isProfileComplete = (() => {
    const requiredFields = ['nom', 'email', 'telephone', 'adresse', 'ville', 'codePostal']
    const hasRequiredFields = requiredFields.every(field => {
      const value = profile[field as keyof UserProfile]
      return typeof value === 'string' && value.length > 0
    })

    if (profile.userType === 'locataire') {
      return hasRequiredFields && Boolean(profile.profession) && Boolean(profile.salaire)
    } else if (profile.userType === 'agence') {
      return hasRequiredFields && Boolean(profile.nomAgence) && Boolean(profile.siret) && Boolean(profile.licenceImmobiliere)
    }

    return hasRequiredFields
  })()

  // Vérifier si l'utilisateur a un profil (au moins le nom)
  const hasProfile = profile.nom.length > 0

  const value = {
    profile,
    updateProfile,
    isProfileComplete,
    hasProfile
  }

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider
