import { Preferences } from '@capacitor/preferences';

export const initStorage = async () => {
  // Inicializar almacenamiento si es necesario
  console.log('Storage initialized');
};

export const storage = {
  async set(key: string, value: any) {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  },
  
  async get(key: string) {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  },
  
  async remove(key: string) {
    await Preferences.remove({ key });
  },
  
  async clear() {
    await Preferences.clear();
  }
};