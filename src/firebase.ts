import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDbTP7A-T_YwLECE14qTQXjNKkhPZI87gA",
  authDomain: "viso-map-app.firebaseapp.com",
  projectId: "viso-map-app",
  storageBucket: "viso-map-app.appspot.com",
  messagingSenderId: "308777422889",
  appId: "1:308777422889:web:96f938ebe1faddc2444c38"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const questCollectionRef = collection(db, 'maps');

export { 
  app, 
  analytics, 
  db, 
  questCollectionRef 
};