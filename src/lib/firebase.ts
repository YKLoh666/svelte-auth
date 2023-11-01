import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	type User
} from 'firebase/auth';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { writable, type Readable, derived } from 'svelte/store';

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

const userStore = () => {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in the browser');
		const { subscribe } = writable<User | null>(null);
		return { subscribe };
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
};

export const user = userStore();

export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

interface UserData {
	username: string;
	telephone: string;
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	if ($user) {
		return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
	} else {
		set(null);
	}
});

export const authHandlers = {
	signup: async (email: string, password: string): Promise<User> => {
		const user = (await createUserWithEmailAndPassword(auth, email, password)).user;

		const documentRef = doc(db, 'users', user.uid);

		await setDoc(documentRef, {
			email: user.email
		});
		return user;
	},
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email: string) => {
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (email: string) => {
		if (auth.currentUser) {
			await updateEmail(auth.currentUser, email);
		}
	},
	updatePassword: async (newPassword: string) => {
		if (auth.currentUser) {
			await updateEmail(auth.currentUser, newPassword);
		}
	}
};
