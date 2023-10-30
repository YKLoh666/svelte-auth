<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { authHandlers, authStore } from '$lib/stores';
	import { addDoc, collection } from 'firebase/firestore';
	import { onMount } from 'svelte';

	$: {
		let user = $authStore.currentUser;
		if (!$authStore.isLoading && user) goto('/dashboard');
	}

	export let email = '';
	let password = '';
	let confirmPassword = '';

	let emailRef: HTMLInputElement;
	let passwordRef: HTMLInputElement;
	let confirmPasswordRef: HTMLInputElement;
	let errorMsg: undefined | string = undefined;

	onMount(() => {
		emailRef.focus();
	});

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			errorMsg = "Confirm password don't match the password, please confirm your password again";
			confirmPasswordRef.focus();
			confirmPassword = '';
			return;
		}

		try {
			authStore.update((curr) => {
				return { ...curr, isLoading: true };
			});
			await authHandlers.signup(email, password);
		} catch (err) {
			authStore.update((curr) => {
				return { ...curr, isLoading: false };
			});
			if (err && typeof err === 'object' && 'code' in err) {
				switch (err.code) {
					case 'auth/invalid-email':
						errorMsg = 'Please provide a valid email';
						email = password = confirmPassword = '';
						emailRef.focus();
						break;
					case 'auth/email-already-in-use':
						errorMsg = 'This email is already in use, please provide another one';
						email = password = confirmPassword = '';
						emailRef.focus();
						break;
					case 'auth/weak-password':
						errorMsg =
							'This password is too weak, please provide a password with minimum 6 characters';
						password = '';
						passwordRef.focus();
						break;
					default:
						errorMsg =
							'Unexpected error occured, please try again in few minutes, or inquire with the website admin';
				}
			} else if (err instanceof Error) {
				throw new Error(err.message);
			}
			return;
		}
	};
</script>

<form on:submit={handleSubmit} class="form">
	{#if errorMsg}
		<div class="error">{errorMsg}</div>
	{/if}
	<h1 class="p-4 text-center text-5xl">Register</h1>
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
			class="form-control"
			name="password"
			placeholder="At least 6 characters required"
			pattern={'.{6,}'}
			autocomplete="off"
			title="At least 6 characters required"
			required
			bind:value={password}
			bind:this={passwordRef}
		/>
	</label>
	<label class="form-group">
		<div class="label">Confirm Password</div>
		<input
			type="password"
			class="form-control"
			name="password"
			placeholder="Same as the password above"
			autocomplete="off"
			title="Same as the password above"
			required
			bind:value={confirmPassword}
			bind:this={confirmPasswordRef}
		/>
	</label>
	<div class="form-group block">
		Already have an account?
		<a href="/login" class="text-blue-600 hover:underline"> Sign in your account </a>
	</div>
	<label class="form-group flex-row justify-end">
		<input type="submit" value="Sign Up" class="btn-primary" />
	</label>
</form>
