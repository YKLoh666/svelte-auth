import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	type User
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

interface authStoreType {
	isLoading: boolean;
	currentUser: User | null;
}

export const authStore = writable<authStoreType>({
	isLoading: true,
	currentUser: null
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
			await updatePassword(auth.currentUser, newPassword);
		}
	}
};
