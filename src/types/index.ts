// Types pour l'application Loky

export interface LocataireProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  score?: number;
  dossierStatus: 'draft' | 'complete' | 'verified';
  createdAt: string;
  validUntil?: string;
}

export interface Document {
  id: string;
  type: 'salary_slip' | 'work_contract' | 'tax_notice' | 'bank_info' | 'charges';
  name: string;
  uploadedAt: string;
  verified: boolean;
  size: number;
}

export interface ScoreReport {
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED' | 'REVIEWING';
  score: number;
  monthly_income: number;
  monthly_rent_max: number;
  contract_type: 'CDI' | 'CDD' | 'FREELANCE' | 'STUDENT' | 'OTHER';
  rest_after_rent: number;
  valid_until: string;
  generated_at: string;
}

export interface Agency {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  certificationLevel: 'none' | 'bronze' | 'silver' | 'gold';
  certificationDate?: string;
  proCard: string;
  rcsNumber: string;
  verifiedProperties: number;
  reputation: number;
}

export interface Property {
  id: string;
  address: string;
  type: 'apartment' | 'house' | 'studio' | 'room';
  rent: number;
  charges: number;
  surface: number;
  verified: boolean;
  agencyId: string;
  certification_badge?: string;
}

export interface DossierShare {
  id: string;
  locataireId: string;
  sharedWith: string; // email ou nom de l'agence
  sharedAt: string;
  accessCount: number;
  lastAccessed?: string;
  qrCode?: string;
  shareLink: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
