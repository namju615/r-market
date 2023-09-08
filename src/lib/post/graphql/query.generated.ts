import type * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery } from '@sveltestack/svelte-query';
import type { UseQueryOptions } from '@sveltestack/svelte-query';

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
export type IPostQueryVariables = Types.Exact<{ [key: string]: never }>;

export type IPostQuery = {
	post?: {
		user_id: number;
		title: string;
		hashtag: string;
		price: number;
		status: string;
		image_url: string;
		create_date: string;
		update_date: string;
		post_id: number;
		view_count: number;
	} | null;
};

export const PostDocument = /*#__PURE__*/ `
    query Post {
  post {
    user_id
    title
    hashtag
    price
    status
    image_url
    create_date
    update_date
    post_id
    view_count
  }
}
    `;
export const usePostQuery = <TData = IPostQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: IPostQueryVariables,
	options?: UseQueryOptions<IPostQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<IPostQuery, TError, TData>(
		variables === undefined ? ['Post'] : ['Post', variables],
		fetcher<IPostQuery, IPostQueryVariables>(client, PostDocument, variables, headers),
		options,
	);

usePostQuery.getKey = (variables?: IPostQueryVariables) => (variables === undefined ? ['Post'] : ['Post', variables]);
usePostQuery.fetcher = (client: GraphQLClient, variables?: IPostQueryVariables, headers?: RequestInit['headers']) =>
	fetcher<IPostQuery, IPostQueryVariables>(client, PostDocument, variables, headers);
