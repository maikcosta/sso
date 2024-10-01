import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sso',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '446483931548-lbcv2a5409vsp068ci9oss5mtr67atva.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
