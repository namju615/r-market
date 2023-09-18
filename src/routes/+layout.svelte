<script lang="ts">
	import '../app.css';
	import { queryClient } from '$lib/plugin/svelteQuery';
	import { QueryClientProvider } from '@sveltestack/svelte-query';
</script>

<!-- TODO +layout.server
	* getSession 없을 경우 /login으로 redirect (/auth/ 페이지 제외)
 -->
<QueryClientProvider client={queryClient}>
	<main class="flex justify-center items-center w-full h-[100vh]">
		<slot />
	</main>
</QueryClientProvider>
