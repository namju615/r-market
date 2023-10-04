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
export type ITopicsQueryVariables = Types.Exact<{
	user_id: Types.Scalars['Int']['input'];
}>;

export type ITopicsQuery = {
	topicWithToken?: {
		topics: Array<{
			topic_id: number;
			topic_name: string;
			user_id: number;
			use_yn: string;
			created_at: string;
			updated_at: string;
		} | null>;
		token?: { token_id: number; user_id: number; token_value: string; created_at: string; updated_at: string } | null;
	} | null;
};

export const TopicsDocument = /*#__PURE__*/ `
    query Topics($user_id: Int!) {
  topicWithToken(user_id: $user_id) {
    topics {
      topic_id
      topic_name
      user_id
      use_yn
      created_at
      updated_at
    }
    token {
      token_id
      user_id
      token_value
      created_at
      updated_at
    }
  }
}
    `;
export const useTopicsQuery = <TData = ITopicsQuery, TError = unknown>(
	client: GraphQLClient,
	variables: ITopicsQueryVariables,
	options?: UseQueryOptions<ITopicsQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<ITopicsQuery, TError, TData>(
		['Topics', variables],
		fetcher<ITopicsQuery, ITopicsQueryVariables>(client, TopicsDocument, variables, headers),
		options,
	);

useTopicsQuery.getKey = (variables: ITopicsQueryVariables) => ['Topics', variables];
useTopicsQuery.fetcher = (client: GraphQLClient, variables: ITopicsQueryVariables, headers?: RequestInit['headers']) =>
	fetcher<ITopicsQuery, ITopicsQueryVariables>(client, TopicsDocument, variables, headers);
