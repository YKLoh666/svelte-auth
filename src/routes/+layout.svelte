<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Header from './Header.svelte';
	import { auth } from '$lib/firebase';
	import { authStore } from '$lib/stores';
	import { onAuthStateChanged } from 'firebase/auth';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});
		});
	});
</script>

<svelte:head>
	<title>Svelte Auth APP</title>
</svelte:head>

<Header />

<slot />
