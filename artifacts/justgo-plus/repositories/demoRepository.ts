import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, DEFAULT_DATA } from '@/models';

const KEY = 'justgo-plus/demo-data/v1';

/** Local-only persistence for demo data. Never stores passwords, ID numbers or card data. */
export const demoRepository = {
  async load(): Promise<AppData> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      ...DEFAULT_DATA,
      ...parsed,
      profile: { ...DEFAULT_DATA.profile, ...(parsed.profile ?? {}) },
      filter: { ...DEFAULT_DATA.filter, ...(parsed.filter ?? {}) },
    };
  },
  async save(data: AppData): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  },
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  },
};

export const newId = () => Date.now().toString() + Math.random().toString(36).slice(2, 9);
