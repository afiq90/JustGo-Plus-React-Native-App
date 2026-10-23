import { DocumentType, FieldErrors } from '@/models';

export interface PersonalForm { name: string; idNumber: string; consent: boolean; documentType: DocumentType }
export interface AccountForm { email: string; phone: string }
export interface VehicleForm { plate: string; make: string; model: string; color: string }
export interface ProfileForm { fullName: string; email: string; phone: string }
export interface CardForm { label: string; number: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (v: string) => EMAIL.test(v.trim());
export const isMyPhone = (v: string) => /^1\d{7,9}$/.test(v.replace(/[\s-]/g, '').replace(/^0/, ''));

export function validatePersonal(f: PersonalForm): FieldErrors<PersonalForm> {
  const e: FieldErrors<PersonalForm> = {};
  if (f.name.trim().length < 3) e.name = 'Enter your name as per identification document';
  else if (!/^[A-Za-z @'./-]+$/.test(f.name.trim())) e.name = 'Name may only contain letters';
  const id = f.idNumber.replace(/-/g, '');
  if (f.documentType === 'MYKAD' && !/^\d{12}$/.test(id)) e.idNumber = 'MyKad number must be 12 digits';
  if (f.documentType === 'MYTENTERA' && !/^[A-Za-z0-9]{6,12}$/.test(id)) e.idNumber = 'Enter a valid MyTentera number';
  if (f.documentType === 'PASSPORT' && !/^[A-Za-z0-9]{6,12}$/.test(id)) e.idNumber = 'Passport number must be 6-12 letters or digits';
  if (!f.consent) e.consent = 'Please agree to the terms to continue';
  return e;
}

export function validateAccount(f: AccountForm): FieldErrors<AccountForm> {
  const e: FieldErrors<AccountForm> = {};
  if (!isEmail(f.email)) e.email = 'Enter a valid email address';
  if (!isMyPhone(f.phone)) e.phone = 'Enter a valid Malaysian mobile number';
  return e;
}

export function validateVehicle(f: VehicleForm): FieldErrors<VehicleForm> {
  const e: FieldErrors<VehicleForm> = {};
  if (!/^[A-Z]{1,3}\s?\d{1,4}\s?[A-Z]{0,3}$/.test(f.plate.trim().toUpperCase())) e.plate = 'Enter a valid plate, e.g. WXY 1234';
  if (f.make.trim().length < 2) e.make = 'Enter the vehicle make';
  if (f.model.trim().length < 1) e.model = 'Enter the vehicle model';
  return e;
}

export function validateProfile(f: ProfileForm): FieldErrors<ProfileForm> {
  const e: FieldErrors<ProfileForm> = {};
  if (f.fullName.trim().length < 3) e.fullName = 'Name must be at least 3 characters';
  if (!isEmail(f.email)) e.email = 'Enter a valid email address';
  if (f.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a valid phone number';
  return e;
}

export function validateCard(f: CardForm, kind: 'tng' | 'rfid'): FieldErrors<CardForm> {
  const e: FieldErrors<CardForm> = {};
  if (f.label.trim().length < 2) e.label = 'Give this item a nickname';
  const n = f.number.replace(/\s/g, '');
  if (kind === 'tng' && !/^\d{10}$/.test(n)) e.number = 'Card serial must be 10 digits';
  if (kind === 'rfid' && !/^[A-Za-z0-9]{6,16}$/.test(n)) e.number = 'Tag ID must be 6-16 letters or digits';
  return e;
}

export const hasErrors = (e: object) => Object.keys(e).length > 0;
