import { error } from '@sveltejs/kit';
import { dehydrate } from '@sveltestack/svelte-query';
import { queryClient } from '$lib/plugin/svelteQuery';
// import { GraphQLClient } from 'graphql-request';

import type { PageLoad } from './$types';
// import { useGetRoomListQuery } from '$lib/chat/graphql/query.generated';

export const load = (async ({ route }) => {
	// const gqlClient = new GraphQLClient('http://localhost:5173/graphql');

	// await queryClient.prefetchQuery(useGetRoomListQuery.getKey(), useGetRoomListQuery.fetcher(gqlClient, { member_id: 1 }));

	if (route.id === '/chat') {
		return {
			title: 'chat',
			dehydratedState: dehydrate(queryClient),
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
