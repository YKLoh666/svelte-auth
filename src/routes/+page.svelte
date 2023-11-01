<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/firebase';
	import { onMount } from 'svelte';
	// import type { PageData } from './$types';

	onMount(() => {
		if ($user) goto(`${$user.uid}/dashboard`);
		else goto('/login');
	});

	// export let data: PageData;
</script>
