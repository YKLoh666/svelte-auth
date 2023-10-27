<script lang="ts">
	import { authHandlers, authStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { AuthErrorCodes } from 'firebase/auth';
	import { onMount } from 'svelte';

	$: {
		let user = $authStore.currentUser;
		if (user) goto('/');
	}

	let email = '';
	let password = '';
	let errorMsg: undefined | string = '';

	let emailRef: HTMLInputElement;
	let passwordRef: HTMLInputElement;

	onMount(() => {
		emailRef.focus();
	});

	const handleSubmit = async (e: Event) => {
		try {
			await authHandlers.login(email, password);
		} catch (err) {
			if (err && typeof err === 'object' && 'code' in err) {
				switch (err.code) {
					case 'auth/user-not-found':
					case 'auth/wrong-password':
					case 'auth/invalid-login-credentials':
						errorMsg = 'Invalid email / password';
						emailRef.focus();
						break;
					case 'auth/user-disabled':
						errorMsg =
							'This account is disabled, please inquire with the website admin for more information';
						break;
					default:
						errorMsg =
							'Unexpected error occured, please try again in few minutes, or inquire with the website admin';
				}
				password = '';
			}
		}
	};
</script>

<form class="form" on:submit={handleSubmit}>
	{#if errorMsg}
		<div class="error">{errorMsg}</div>
	{/if}
	<h1 class="p-4 text-center text-5xl">Login</h1>
	<label class="form-group">
		<div class="label">Email</div>
		<input
			type="email"
			class="form-control"
			name="email"
			placeholder="example@xyz.com"
			autocomplete="off"
			required
			bind:value={email}
			bind:this={emailRef}
		/>
	</label>
	<label class="form-group">
		<div class="label">Password</div>
		<input
			type="password"
			name="password"
			class="form-control"
			placeholder="Password"
			autocomplete="off"
			required
			bind:value={password}
			bind:this={passwordRef}
		/>
	</label>
	<div class="form-group block">
		Haven't sign up?
		<a href="/register" class="text-blue-600 hover:underline"> Sign up an account </a>
	</div>
	<label class="form-group flex-row justify-end">
		<input type="submit" value="Sign In" class="btn-primary" />
	</label>
</form>
