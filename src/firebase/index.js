import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBEL7BnJCO2UExnNDbKBljsR6gHC61PzQ0',
  authDomain: 'todo-app-37013.firebaseapp.com',
  projectId: 'todo-app-37013',
  storageBucket: 'todo-app-37013.appspot.com',
  messagingSenderId: '117115735299',
  appId: '1:117115735299:web:63d629aac4d5148ec86d36',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
