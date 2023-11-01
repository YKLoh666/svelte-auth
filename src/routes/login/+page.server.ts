import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { user } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import type { User } from 'firebase/auth';

export const load = (async () => {
	const userStatus: User | null = get(user);
	if (userStatus) throw redirect(302, `/${userStatus.uid}/dashboard`);
	return {};
}) satisfies PageServerLoad;
