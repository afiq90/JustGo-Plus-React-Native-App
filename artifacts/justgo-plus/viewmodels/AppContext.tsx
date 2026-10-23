import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppData, DEFAULT_DATA, Profile, TollCard, TransactionFilter, Vehicle } from '@/models';
import { demoRepository, newId } from '@/repositories/demoRepository';

interface AppContextValue {
  data: AppData;
  loading: boolean;
  error: string | null;
  reload: () => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (p: Partial<Profile>) => Promise<void>;
  saveVehicle: (v: Omit<Vehicle, 'id' | 'createdAt'>, id?: string) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  saveCard: (c: Omit<TollCard, 'id' | 'createdAt'>, id?: string) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  setFilter: (f: TransactionFilter) => Promise<void>;
  resetLocalDemo: () => Promise<void>;
}

const Ctx = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dataRef = useRef<AppData>(DEFAULT_DATA);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    demoRepository
      .load()
      .then((d) => { dataRef.current = d; setData(d); })
      .catch(() => setError('Could not read local demo data on this device.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const commit = useCallback(async (fn: (d: AppData) => AppData) => {
    const next = fn(dataRef.current);
    dataRef.current = next;
    setData(next);
    await demoRepository.save(next);
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    data, loading, error, reload: load,
    signIn: () => commit((d) => ({ ...d, signedIn: true })),
    signOut: () => commit((d) => ({ ...d, signedIn: false })),
    updateProfile: (p) => commit((d) => ({ ...d, profile: { ...d.profile, ...p } })),
    saveVehicle: (v, id) => commit((d) => ({
      ...d,
      vehicles: id
        ? d.vehicles.map((x) => (x.id === id ? { ...x, ...v } : x))
        : [...d.vehicles, { ...v, id: newId(), createdAt: Date.now() }],
    })),
    deleteVehicle: (id) => commit((d) => ({ ...d, vehicles: d.vehicles.filter((x) => x.id !== id) })),
    saveCard: (c, id) => commit((d) => ({
      ...d,
      cards: id
        ? d.cards.map((x) => (x.id === id ? { ...x, ...c } : x))
        : [...d.cards, { ...c, id: newId(), createdAt: Date.now() }],
    })),
    deleteCard: (id) => commit((d) => ({ ...d, cards: d.cards.filter((x) => x.id !== id) })),
    setFilter: (f) => commit((d) => ({ ...d, filter: f })),
    resetLocalDemo: async () => {
      await demoRepository.clear();
      const fresh = { ...DEFAULT_DATA, signedIn: false };
      dataRef.current = fresh;
      setData(fresh);
      await demoRepository.save(fresh);
    },
  }), [data, loading, error, load, commit]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside AppProvider');
  return v;
}
