import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyB0vKegukdXPb_KKvJHrC2PV7vrabnZeM8',
	authDomain: 'svelte-auth-app.firebaseapp.com',
	projectId: 'svelte-auth-app',
	storageBucket: 'svelte-auth-app.appspot.com',
	messagingSenderId: '869426755134',
	appId: '1:869426755134:web:d915bbbce72657941f436f'
};

let app;

if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
	deleteApp(app);
	app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app };
