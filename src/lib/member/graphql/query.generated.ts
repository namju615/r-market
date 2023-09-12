import type * as Types from '$lib/types';

import type { GraphQLClient } from 'graphql-request';
import { useQuery, type UseQueryOptions } from '@sveltestack/svelte-query';

function fetcher<TData, TVariables extends { [key: string]: any }>(
	client: GraphQLClient,
	query: string,
	variables?: TVariables,
	requestHeaders?: RequestInit['headers'],
) {
	return async (): Promise<TData> =>
		client.request({
			document: query,
			variables,
			requestHeaders,
		});
}
export type IMemberQueryVariables = Types.Exact<{ [key: string]: never }>;

export type IMemberQuery = { member: { user_id: number; email: string; name: string } };

export const MemberDocument = /*#__PURE__*/ `
    query Member {
  member {
    user_id
    email
    name
  }
}
    `;
export const useMemberQuery = <TData = IMemberQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: IMemberQueryVariables,
	options?: UseQueryOptions<IMemberQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<IMemberQuery, TError, TData>(
		variables === undefined ? ['Member'] : ['Member', variables],
		fetcher<IMemberQuery, IMemberQueryVariables>(client, MemberDocument, variables, headers),
		options,
	);

useMemberQuery.getKey = (variables?: IMemberQueryVariables) =>
	variables === undefined ? ['Member'] : ['Member', variables];
useMemberQuery.fetcher = (client: GraphQLClient, variables?: IMemberQueryVariables, headers?: RequestInit['headers']) =>
	fetcher<IMemberQuery, IMemberQueryVariables>(client, MemberDocument, variables, headers);
