import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Use demo config for development if env vars are not set
const getDemoConfig = () => ({
  apiKey: 'demo-api-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef'
});

const getFirebaseConfig = (): FirebaseOptions => {
  // In production, require all env vars
  if (import.meta.env.PROD) {
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    // Validate all required fields are present
    const missingVars = Object.entries(config)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required Firebase configuration: ${missingVars.join(', ')}. ` +
        'Please check your .env file.'
      );
    }

    return config;
  }

  // In development, use demo config
  console.warn(
    'Using demo Firebase configuration. ' +
    'Set up your .env file for full functionality.'
  );
  return getDemoConfig();
};

// Initialize Firebase with error handling
let firebaseApp;
try {
  firebaseApp = initializeApp(getFirebaseConfig());
} catch (error) {
  console.error('Firebase initialization failed:', error);
  firebaseApp = null;
}

// Export Firebase services with null checks
export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
export const googleProvider = new GoogleAuthProvider();

// Export app for analytics
export const app = firebaseApp;
