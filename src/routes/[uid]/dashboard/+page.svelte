<script lang="ts">
	import { user, userData } from '$lib/firebase';
</script>

<div class="mx-auto mt-10 w-6/12 rounded-lg border p-5 text-center">
	{#if $user}
		<h1 class="text-3xl">Welcome {$user.email}</h1>
		<br />
		<form action="" class="form mt-0 w-11/12 text-left">
			<label class="form-group">
				<div class="label">Username:</div>
				<input
					type="text"
					class="form-control text-center"
					placeholder="Insert your username"
					value={$userData?.username ? $userData?.username : ''}
				/>
			</label>
			<label class="form-group">
				<div class="label">Telephone:</div>
				<input
					type="text"
					class="form-control text-center"
					placeholder="Insert your telephone"
					value={$userData?.telephone ? $userData?.telephone : ''}
				/>
			</label>
			<label for="" class="form-group flex-row justify-end">
				<input type="submit" value="Save Profile" class="btn-primary" />
			</label>
		</form>
	{:else}
		<p>You are not authenticated</p>
		<br />
		<a href="/login" class="btn-primary mx-auto">Go to login page</a>
	{/if}
</div>
