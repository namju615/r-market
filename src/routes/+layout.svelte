<script lang="ts">
	import '../app.css';
	import { queryClient } from '$lib/plugin/svelteQuery';
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	import { AuthInstanse } from '$lib/auth/authService';
	import { page } from '$app/stores';
	import { member } from '../stores/member';
	import { useMember } from '../hooks/memberHooks';

	const { login, logout, refresh } = useMember();

	onMount(async () => {
		if ($page.url.pathname.indexOf('/auth/') === -1) {
			const data = await AuthInstanse().getSession();
			if (!data?.session) {
				sessionStorage.getItem('T2') ? refresh() : logout();
			} else {
				!$member && login();
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	{JSON.stringify($member)}
	<main class="flex justify-center items-center w-full h-[100vh]">
		<slot />
	</main>
</QueryClientProvider>
