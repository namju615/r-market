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
export type ITokensQueryVariables = Types.Exact<{
	user_id: Types.Scalars['Int']['input'];
}>;

export type ITokensQuery = {
	tokens?: Array<{
		token_id: number;
		user_id: number;
		token_value: string;
		created_at: string;
		updated_at: string;
	} | null> | null;
};

export type ILatestTokenQueryVariables = Types.Exact<{
	user_id: Types.Scalars['Int']['input'];
}>;

export type ILatestTokenQuery = {
	latestToken?: {
		token_id: number;
		user_id: number;
		token_value: string;
		created_at: string;
		updated_at: string;
	} | null;
};

export const TokensDocument = /*#__PURE__*/ `
    query Tokens($user_id: Int!) {
  tokens(user_id: $user_id) {
    token_id
    user_id
    token_value
    created_at
    updated_at
  }
}
    `;
export const useTokensQuery = <TData = ITokensQuery, TError = unknown>(
	client: GraphQLClient,
	variables: ITokensQueryVariables,
	options?: UseQueryOptions<ITokensQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<ITokensQuery, TError, TData>(
		['Tokens', variables],
		fetcher<ITokensQuery, ITokensQueryVariables>(client, TokensDocument, variables, headers),
		options,
	);

useTokensQuery.getKey = (variables: ITokensQueryVariables) => ['Tokens', variables];
useTokensQuery.fetcher = (client: GraphQLClient, variables: ITokensQueryVariables, headers?: RequestInit['headers']) =>
	fetcher<ITokensQuery, ITokensQueryVariables>(client, TokensDocument, variables, headers);
export const LatestTokenDocument = /*#__PURE__*/ `
    query LatestToken($user_id: Int!) {
  latestToken(user_id: $user_id) {
    token_id
    user_id
    token_value
    created_at
    updated_at
  }
}
    `;
export const useLatestTokenQuery = <TData = ILatestTokenQuery, TError = unknown>(
	client: GraphQLClient,
	variables: ILatestTokenQueryVariables,
	options?: UseQueryOptions<ILatestTokenQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<ILatestTokenQuery, TError, TData>(
		['LatestToken', variables],
		fetcher<ILatestTokenQuery, ILatestTokenQueryVariables>(client, LatestTokenDocument, variables, headers),
		options,
	);

useLatestTokenQuery.getKey = (variables: ILatestTokenQueryVariables) => ['LatestToken', variables];
useLatestTokenQuery.fetcher = (
	client: GraphQLClient,
	variables: ILatestTokenQueryVariables,
	headers?: RequestInit['headers'],
) => fetcher<ILatestTokenQuery, ILatestTokenQueryVariables>(client, LatestTokenDocument, variables, headers);
