import { QueryClient } from '@sveltestack/svelte-query';

// Configure for static fetching from Server
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});
