<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores';
	import type { User } from 'firebase/auth';

	let user: User | null;

	$: {
		user = $authStore.currentUser;
		if (!$authStore.isLoading && !user) goto('/login');
	}
</script>

{#if user}
	<h1>Welcome {user.email}</h1>
	<p>This is your doc id: {$authStore.docRef}</p>
{:else}
	<p>Loading...</p>
{/if}
