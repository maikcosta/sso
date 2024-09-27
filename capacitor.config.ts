import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.pocsso',
  appName: 'sso',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '80325311987-i5b75sjlgp9sgfjn38ob4ga95snmuo8g.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
