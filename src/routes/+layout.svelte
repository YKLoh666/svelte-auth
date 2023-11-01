<script lang="ts">
	import { user, userData } from '$lib/firebase';
	import Header from './Header.svelte';
	import '../app.css';

	$user;
	$userData;
</script>

<svelte:head>
	<title>Svelte Auth APP</title>
</svelte:head>

<Header />

<slot />
