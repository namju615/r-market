<script lang="ts">
	import '../app.css';
	import { queryClient } from '$lib/plugin/svelteQuery';
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	import { AuthInstanse } from '$lib/auth/authService';
	import Toast from '$lib/components/Toast.svelte';

	onMount(async () => {
		// TODO /auth/* 가 아닌 페이지에서 data?.session이 nul일 경우 처리
		const data = await AuthInstanse().getSession();
		console.log('user session', data?.session);
	});
</script>

<!-- TODO +layout.server
	* getSession 없을 경우 /login으로 redirect (/auth/ 페이지 제외)
 -->
<QueryClientProvider client={queryClient}>
	<main class="flex justify-center items-center w-full h-[100vh]">
		<slot />
	</main>
	<Toast />
</QueryClientProvider>
