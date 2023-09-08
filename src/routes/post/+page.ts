import { error } from '@sveltejs/kit';
import { dehydrate } from '@sveltestack/svelte-query';
import { queryClient } from '$lib/plugin/svelteQuery';
import { usePostsQuery } from '$lib/posts/graphql/query.generated';
import { GraphQLClient } from 'graphql-request';

import type { PageLoad } from './$types';

export const load = (async ({ route }: { route: { id: string } }) => {
	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');

	await queryClient.prefetchQuery(usePostsQuery.getKey(), usePostsQuery.fetcher(gqlClient));

	if (route.id === '/post') {
		return {
			title: 'post',
			dehydratedState: dehydrate(queryClient),
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
