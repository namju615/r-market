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
		member: { user_id: number; email: string; name: string };
	} | null;
};

export const PostDocument = /*#__PURE__*/ `
    query Post {
  post {
    member {
      user_id
      email
      name
    }
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
