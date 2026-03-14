import axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

// Detectar si estamos en dispositivo nativo o web
const getBaseUrl = () => {
  if (Capacitor.isNativePlatform()) {
    // En Android emulador, localhost = 10.0.2.2
    return 'http://10.0.2.2:3000/api';
  } else {
    // En navegador web (desarrollo)
    return 'http://localhost:3000/api';
  }
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Versión simplificada sin tipos conflictivos
api.interceptors.request.use(
  async (config) => {
    try {
      const { value } = await Preferences.get({ key: 'token' });
      if (value && config.headers) {
        config.headers.Authorization = `Bearer ${value}`;
      }
    } catch (error) {
      console.error('Error al obtener token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Para depuración: mostrar qué URL se está usando
console.log('🌐 API Base URL:', getBaseUrl());

export default api;