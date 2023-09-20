<script lang="ts">
	import { onMount } from 'svelte';
	import { AuthInstanse } from '$lib/auth/authService';

	onMount(async () => {
		const { session } = await AuthInstanse().getSession();
		if (session) {
			const response = await fetch('/api/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					uuid: session.user.id,
					email: session.user.email,
					profile_image_url: session.user.user_metadata.avatar_url,
					name: session.user.user_metadata.name,
				}),
			});

			if (response.status === 200) {
				// TODO user 저장 {...session.user, ...response.user}
				sessionStorage.setItem('T1', session.access_token);
				sessionStorage.setItem('T2', session.refresh_token);
			}
		}
	});
</script>

SUCCESS!!!
