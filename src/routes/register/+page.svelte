<script lang="ts">
	import type { PageData } from './$types';

	// export let data: PageData;
</script>

<form action="/api/users" method="POST" class="container mx-auto my-10 w-7/12">
	<h1 class="p-4 text-center text-5xl">Register</h1>
	<label class="form-group">
		<div class="label">Username</div>
		<input type="text" class="form-control" placeholder="Username" autocomplete="off" />
	</label>
	<label class="form-group">
		<div class="label">Password</div>
		<input type="password" class="form-control" placeholder="Password" autocomplete="off" />
	</label>
	<div class="form-group block">
		Already have an account?
		<a href="/login" class="text-blue-600 hover:underline"> Sign in your account </a>
	</div>
	<label class="form-group flex-row justify-end">
		<input type="submit" value="Sign Up" class="btn-primary" />
	</label>
</form>
