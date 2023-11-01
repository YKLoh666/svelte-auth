<script>
	import { page } from '$app/stores';
	import { authHandlers, user } from '$lib/firebase';

	const handleLogout = async () => {
		try {
			await authHandlers.logout();
		} catch (error) {
			if (error instanceof Error) {
				throw Error(error.message);
			}
		}
	};
</script>

<header
	class="flex items-center justify-between bg-gray-200 px-8 py-4 text-center text-2xl shadow-lg"
>
	<a href="/">Svelte Authentication APP</a>
	{#if $user}
		<button on:click={handleLogout} class="header-button">Log Out</button>
	{:else if $page.url.pathname === '/login'}
		<a href="/register" class="header-button"> Sign Up </a>
	{:else}
		<a href="/login" class="header-button">Login</a>
	{/if}
</header>
