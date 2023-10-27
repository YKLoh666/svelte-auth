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
import { auth } from './firebase';

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
		return (await createUserWithEmailAndPassword(auth, email, password)).user;
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
