export type Nationality = 'MALAYSIAN' | 'NON-MALAYSIAN';
export type DocumentType = 'MYKAD' | 'MYTENTERA' | 'PASSPORT';
export type AppLanguage = 'en' | 'ms';

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  nationality: Nationality;
  documentType: DocumentType;
  mobileVerified: boolean;
  emailVerified: boolean;
  identityVerified: boolean;
}

export interface Vehicle {
  id: string;
  plate: string;
  make: string;
  model: string;
  color: string;
  createdAt: number;
}

export type TollCardKind = 'tng' | 'rfid';

export interface TollCard {
  id: string;
  kind: TollCardKind;
  label: string;
  number: string;
  createdAt: number;
}

export type DateRangeKey = 'last30' | 'last3m' | 'thisMonth' | 'last6m';
export type TxnType = 'all' | 'toll' | 'reload';
export type TxnStatus = 'all' | 'success' | 'pending' | 'failed';

export interface TransactionFilter {
  range: DateRangeKey;
  type: TxnType;
  status: TxnStatus;
}

export interface Transaction {
  id: string;
  plaza: string;
  amount: number;
  date: string;
  type: Exclude<TxnType, 'all'>;
  status: Exclude<TxnStatus, 'all'>;
}

export interface AppData {
  signedIn: boolean;
  language: AppLanguage;
  profile: Profile;
  vehicles: Vehicle[];
  cards: TollCard[];
  filter: TransactionFilter;
}

export type StepKey = 'mobile' | 'email' | 'identity' | 'payment' | 'vehicle';

export interface ProfileStep {
  key: StepKey;
  label: string;
  done: boolean;
  enabled: boolean;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const NATIONALITY_DOCS: Record<Nationality, DocumentType[]> = {
  MALAYSIAN: ['MYKAD', 'MYTENTERA'],
  'NON-MALAYSIAN': ['PASSPORT'],
};

export const DEMO_PROFILE: Profile = {
  fullName: 'AIDIL RAHMAN',
  email: 'demo.driver@example.com',
  phone: '+60 12-345 6789',
  nationality: 'MALAYSIAN',
  documentType: 'MYKAD',
  mobileVerified: true,
  emailVerified: true,
  identityVerified: false,
};

export const DEFAULT_FILTER: TransactionFilter = { range: 'last3m', type: 'all', status: 'all' };

export const DEFAULT_DATA: AppData = {
  signedIn: true,
  language: 'en',
  profile: DEMO_PROFILE,
  vehicles: [],
  cards: [],
  filter: DEFAULT_FILTER,
};
