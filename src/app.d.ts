// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Errors {}
		interface Locals {
			user: string | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
