import type { PageServerLoad } from './$types';
import { authStore } from '$lib/stores';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	if (!get(authStore).isLoading && !get(authStore).currentUser) throw redirect(302, '/login');
	return {};
}) satisfies PageServerLoad;
