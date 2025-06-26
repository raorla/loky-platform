import { LocataireProfile, Document, ScoreReport, Agency, Property, DossierShare, Notification } from '../types';

export const mockLocataire: LocataireProfile = {
  id: '1',
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  phone: '+33 6 12 34 56 78',
  score: 91,
  dossierStatus: 'verified',
  createdAt: '2025-05-15T10:00:00Z',
  validUntil: '2025-10-01T23:59:59Z'
};

export const mockDocuments: Document[] = [
  {
    id: '1',
    type: 'salary_slip',
    name: 'Bulletin_salaire_mai_2025.pdf',
    uploadedAt: '2025-05-20T14:30:00Z',
    verified: true,
    size: 245760
  },
  {
    id: '2',
    type: 'work_contract',
    name: 'Contrat_travail_CDI.pdf',
    uploadedAt: '2025-05-20T14:32:00Z',
    verified: true,
    size: 512000
  },
  {
    id: '3',
    type: 'tax_notice',
    name: 'Avis_imposition_2024.pdf',
    uploadedAt: '2025-05-20T14:35:00Z',
    verified: true,
    size: 890240
  },
  {
    id: '4',
    type: 'bank_info',
    name: 'RIB_compte_principal.pdf',
    uploadedAt: '2025-05-20T14:38:00Z',
    verified: true,
    size: 128000
  }
];

export const mockScoreReport: ScoreReport = {
  status: 'ACCEPTED',
  score: 91,
  monthly_income: 3120,
  monthly_rent_max: 1040,
  contract_type: 'CDI',
  rest_after_rent: 1900,
  valid_until: '2025-10-01T23:59:59Z',
  generated_at: '2025-05-20T15:00:00Z'
};

export const mockAgencies: Agency[] = [
  {
    id: '1',
    name: 'Century 21 Lyon Centre',
    email: 'contact@century21lyon.fr',
    phone: '+33 4 72 00 12 34',
    address: '15 Rue de la République, 69002 Lyon',
    certificationLevel: 'gold',
    certificationDate: '2025-01-15T00:00:00Z',
    proCard: 'CPI123456789',
    rcsNumber: 'RCS Lyon 123 456 789',
    verifiedProperties: 145,
    reputation: 4.8
  },
  {
    id: '2',
    name: 'Orpi Presqu\'île',
    email: 'info@orpi-presquile.fr',
    phone: '+33 4 78 42 56 78',
    address: '32 Place Bellecour, 69002 Lyon',
    certificationLevel: 'silver',
    certificationDate: '2025-03-01T00:00:00Z',
    proCard: 'CPI987654321',
    rcsNumber: 'RCS Lyon 987 654 321',
    verifiedProperties: 89,
    reputation: 4.5
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    address: '12 Rue Victor Hugo, 69002 Lyon',
    type: 'apartment',
    rent: 950,
    charges: 150,
    surface: 45,
    verified: true,
    agencyId: '1',
    certification_badge: 'gold_verified'
  },
  {
    id: '2',
    address: '8 Place des Terreaux, 69001 Lyon',
    type: 'studio',
    rent: 720,
    charges: 80,
    surface: 25,
    verified: true,
    agencyId: '2',
    certification_badge: 'silver_verified'
  }
];

export const mockDossierShares: DossierShare[] = [
  {
    id: '1',
    locataireId: '1',
    sharedWith: 'Century 21 Lyon Centre',
    sharedAt: '2025-06-01T09:00:00Z',
    accessCount: 3,
    lastAccessed: '2025-06-15T14:30:00Z',
    shareLink: 'https://loky.app/share/abc123def456',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  },
  {
    id: '2',
    locataireId: '1',
    sharedWith: 'Orpi Presqu\'île',
    sharedAt: '2025-06-10T11:30:00Z',
    accessCount: 1,
    lastAccessed: '2025-06-10T11:45:00Z',
    shareLink: 'https://loky.app/share/xyz789ghi012',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Dossier consulté',
    message: 'Century 21 Lyon Centre a consulté votre dossier',
    timestamp: '2025-06-15T14:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'Nouveau partage',
    message: 'Votre dossier a été partagé avec Orpi Presqu\'île',
    timestamp: '2025-06-10T11:30:00Z',
    read: true
  },
  {
    id: '3',
    type: 'warning',
    title: 'Score expirant bientôt',
    message: 'Votre score expire le 1er octobre. Pensez à le renouveler.',
    timestamp: '2025-06-08T10:00:00Z',
    read: true
  }
];

// Données pour les statistiques
export const mockStats = {
  locataire: {
    totalDossiers: 1,
    dossiersActifs: 1,
    partagesEffectues: 2,
    consultationsRecues: 4,
    scoreActuel: 91,
    tempsEconomise: '12h'
  },
  agence: {
    dossiersRecus: 156,
    dossiersTraites: 142,
    tempsEconomise: '89h',
    tauxAcceptation: 76,
    biensVerifies: 145,
    niveauCertification: 'gold'
  }
};
