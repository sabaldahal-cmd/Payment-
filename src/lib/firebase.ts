import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let config;
try {
  // @ts-ignore
  import configData from '../../firebase-applet-config.json';
  config = configData;
} catch (e) {
  console.warn('Firebase config not found. Please set up Firebase in the UI.');
}

const app = !getApps().length ? (config ? initializeApp(config) : null) : getApp();
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app, config?.firestoreDatabaseId) : null;

export const isFirebaseReady = !!app;
