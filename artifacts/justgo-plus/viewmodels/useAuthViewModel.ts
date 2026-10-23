import { useMemo, useState } from 'react';
import { DocumentType, FieldErrors, Nationality, NATIONALITY_DOCS } from '@/models';
import { AccountForm, hasErrors, isEmail, isMyPhone, PersonalForm, validateAccount, validatePersonal } from '@/services/validation';
import { useApp } from './AppContext';

export type AuthTab = 'login' | 'register';
export type LoginMode = 'phone' | 'email';

export function useLoginViewModel() {
  const [mode, setMode] = useState<LoginMode>('phone');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const unavailable = (what: string) => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setNotice(what + ' is not connected in this build. No request was sent and nothing was verified. Use "Explore demo" to view the app with sample data.');
    }, 450);
  };

  return {
    mode, setMode: (m: LoginMode) => { setMode(m); setError(null); setNotice(null); },
    phone, setPhone: (v: string) => { setPhone(v.replace(/[^\d]/g, '')); setError(null); },
    email, setEmail, password, setPassword, error, notice, busy,
    dismissNotice: () => setNotice(null),
    countryInfo: () => setNotice('JustGo accounts use Malaysian (+60) mobile numbers. Other country codes are not available.'),
    requestOtp: () => {
      if (!isMyPhone(phone)) { setError('Enter a valid Malaysian mobile number'); return false; }
      unavailable('The SMS OTP provider');
      return true;
    },
    emailLogin: () => {
      if (!isEmail(email)) { setError('Enter a valid email address'); return false; }
      if (password.length < 1) { setError('Enter your password'); return false; }
      setPassword('');
      unavailable('PLUSMiles account sign-in');
      return true;
    },
    myDigitalId: () => unavailable('MyDigital ID sign-in'),
  };
}

export function useRegisterViewModel() {
  const { updateProfile } = useApp();
  const [step, setStep] = useState<0 | 1>(0);
  const [nationality, setNationalityRaw] = useState<Nationality>('MALAYSIAN');
  const [documentType, setDocumentType] = useState<DocumentType>('MYKAD');
  const [name, setName] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [personalErrors, setPersonalErrors] = useState<FieldErrors<PersonalForm>>({});
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [accountErrors, setAccountErrors] = useState<FieldErrors<AccountForm>>({});
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const documentOptions = useMemo(() => NATIONALITY_DOCS[nationality], [nationality]);

  return {
    step, setStep, nationality, documentType, documentOptions, name, idNumber, consent,
    personalErrors, email, phone, accountErrors, result, busy,
    setNationality: (n: Nationality) => { setNationalityRaw(n); setDocumentType(NATIONALITY_DOCS[n][0]); setIdNumber(''); },
    setDocumentType,
    setName: (v: string) => { setName(v.toUpperCase()); setPersonalErrors((e) => ({ ...e, name: undefined })); },
    setIdNumber: (v: string) => { setIdNumber(v); setPersonalErrors((e) => ({ ...e, idNumber: undefined })); },
    setConsent: (v: boolean) => { setConsent(v); setPersonalErrors((e) => ({ ...e, consent: undefined })); },
    setEmail: (v: string) => { setEmail(v); setAccountErrors((e) => ({ ...e, email: undefined })); },
    setPhone: (v: string) => { setPhone(v.replace(/[^\d]/g, '')); setAccountErrors((e) => ({ ...e, phone: undefined })); },
    next: () => {
      const e = validatePersonal({ name, idNumber, consent, documentType });
      const clean = Object.fromEntries(Object.entries(e).filter(([, v]) => !!v));
      setPersonalErrors(clean);
      if (hasErrors(clean)) return false;
      setStep(1);
      return true;
    },
    submit: () => {
      const e = validateAccount({ email, phone });
      setAccountErrors(e);
      if (hasErrors(e)) return false;
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setResult('Account registration and identity checks need the PLUSMiles service, which is not connected in this build. Your ID number was not sent or stored.');
      }, 500);
      return true;
    },
    useAsDemo: async () => {
      await updateProfile({ fullName: name.trim(), email: email.trim(), phone: '+60 ' + phone, nationality, documentType });
    },
    clearResult: () => setResult(null),
  };
}
