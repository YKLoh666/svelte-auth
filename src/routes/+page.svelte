<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores';
	import { onMount } from 'svelte';
	// import type { PageData } from './$types';

	onMount(() => {
		if (!$authStore.isLoading && $authStore.currentUser) goto('/dashboard');
		else goto('/login');
	});

	// export let data: PageData;
</script>
