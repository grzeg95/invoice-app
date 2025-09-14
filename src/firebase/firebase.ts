import {initializeApp} from 'firebase/app';
import {connectAuthEmulator, getAuth, signInAnonymously} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import {connectFunctionsEmulator, getFunctions} from 'firebase/functions';
import {initializeAppCheck, ReCaptchaEnterpriseProvider} from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, `http://localhost:9099`);
}
// Login as Anonymous
signInAnonymously(auth).then(() => console.log('Anonymous user signed in')).catch(console.error);

export const firestore = getFirestore(app);
if (import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export const functions = getFunctions(app, 'europe-central2');
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_APP_FIREBASE_APP_CHECK_SITE_KEY),
  isTokenAutoRefreshEnabled: true
});
