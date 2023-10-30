<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import Header from './Header.svelte';
	import { auth } from '$lib/firebase';
	import { authStore } from '$lib/stores';
	import { onAuthStateChanged } from 'firebase/auth';

	let unsubscribe: (() => void) | undefined;

	onMount(() => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<svelte:head>
	<title>Svelte Auth APP</title>
</svelte:head>

<Header />

<slot />
