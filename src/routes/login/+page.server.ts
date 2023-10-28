import { authStore } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	if (!get(authStore).isLoading && get(authStore).currentUser) throw redirect(302, '/dashboard');
	return {};
}) satisfies PageServerLoad;
