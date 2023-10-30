<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { authStore } from '$lib/stores';
	import type { User } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let user: User | null;
	let userData: { email?: string; name?: string } = {};

	onMount(async () => {
		user = $authStore.currentUser;
		if (user) {
			try {
				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					userData = docSnap.data();
					console.log(userData);
				} else {
					console.log('User data not found.');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		}
	});
</script>

<div class="mx-auto mt-10 w-6/12 rounded-lg border p-5 text-center">
	{#if $authStore.isLoading}
		<p>Loading...</p>
	{:else if user}
		<h1 class="text-3xl">Welcome {user.email}</h1>
		<br />
		<form action="" class="form mt-0 w-11/12">
			<label class="form-group">
				<div class="label">Name:</div>
				<input
					type="text"
					class="form-control text-center"
					placeholder="Insert your name"
					value={userData.name ? userData.name : ''}
				/>
			</label>
			<label for="" class="form-group flex-row justify-end">
				<input type="submit" value="Save Profile" class="btn-primary" />
			</label>
		</form>
	{:else}
		<p>You are not authenticated</p>
		<a href="/login">Go to login page</a>
	{/if}
</div>
