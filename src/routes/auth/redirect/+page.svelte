<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(async () => {
		const hash = $page.url.hash;
		if (hash) {
			const params = JSON.parse(
				'{"' + decodeURI(hash.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}',
			);
			const response = await fetch('/api/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					access_token: params.access_token || '',
					refresh_token: params.refresh_token || '',
				}),
			});
			if (response.status === 200) {
				sessionStorage.setItem('T1', params.access_token);
				sessionStorage.setItem('T2', params.refresh_token);
			} else {
				throw new Error('Unable to get your location');
			}
		}
	});
</script>

SUCCESS!!!
