import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require("../../../../creds.json");

initializeApp({
  credential: cert(serviceAccount)
});

export const DB = getFirestore();