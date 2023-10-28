<script lang="ts">
	import { authStore } from '$lib/stores';
	import { redirect } from '@sveltejs/kit';
	// import type { PageData } from './$types';

	$: {
		if (!$authStore.isLoading && $authStore.currentUser) throw redirect(302, '/dashboard');
		else throw redirect(302, '/login');
	}

	// export let data: PageData;
</script>
