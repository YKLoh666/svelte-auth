import type { PageServerLoad } from './$types';
import { user } from '$lib/firebase';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	if (get(user)) throw redirect(302, '/login');
	return {};
}) satisfies PageServerLoad;
