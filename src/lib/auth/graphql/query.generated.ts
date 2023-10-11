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
export type IMemberQueryVariables = Types.Exact<{
	uuid: Types.Scalars['String']['input'];
}>;

export type IMemberQuery = {
	member?: {
		user_id?: string | null;
		email: string;
		name: string;
		profile_image_url?: string | null;
		manager_flag?: boolean | null;
		score?: number | null;
		notification_flag?: boolean | null;
		uuid?: string | null;
	} | null;
};

export const MemberDocument = /*#__PURE__*/ `
    query Member($uuid: String!) {
  member(uuid: $uuid) {
    user_id
    email
    name
    profile_image_url
    manager_flag
    score
    notification_flag
    uuid
  }
}
    `;
export const useMemberQuery = <TData = IMemberQuery, TError = unknown>(
	client: GraphQLClient,
	variables: IMemberQueryVariables,
	options?: UseQueryOptions<IMemberQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<IMemberQuery, TError, TData>(
		['Member', variables],
		fetcher<IMemberQuery, IMemberQueryVariables>(client, MemberDocument, variables, headers),
		options,
	);

useMemberQuery.getKey = (variables: IMemberQueryVariables) => ['Member', variables];
useMemberQuery.fetcher = (client: GraphQLClient, variables: IMemberQueryVariables, headers?: RequestInit['headers']) =>
	fetcher<IMemberQuery, IMemberQueryVariables>(client, MemberDocument, variables, headers);
