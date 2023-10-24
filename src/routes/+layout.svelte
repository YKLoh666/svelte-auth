<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Svelte Auth APP</title>
</svelte:head>

<header
	class="flex items-center justify-between bg-gray-200 px-8 py-4 text-center text-2xl shadow-lg"
>
	<a href="/">Svelte Authentication APP</a>
	<a
		class="rounded-md border-[1px] border-transparent bg-black px-2 py-1 text-lg text-white transition-all hover:border-black hover:bg-transparent hover:text-black"
		href={$page.url.pathname === '/login' ? '/register' : '/login'}
	>
		{$page.url.pathname === '/login' ? 'Sign Up' : 'Sign In'}
	</a>
</header>

<slot />
