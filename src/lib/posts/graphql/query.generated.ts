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
export type IPostsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type IPostsQuery = {
	posts: Array<{
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
	} | null>;
};

export const PostsDocument = /*#__PURE__*/ `
    query Posts {
  posts {
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
export const usePostsQuery = <TData = IPostsQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: IPostsQueryVariables,
	options?: UseQueryOptions<IPostsQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<IPostsQuery, TError, TData>(
		variables === undefined ? ['Posts'] : ['Posts', variables],
		fetcher<IPostsQuery, IPostsQueryVariables>(client, PostsDocument, variables, headers),
		options,
	);

usePostsQuery.getKey = (variables?: IPostsQueryVariables) =>
	variables === undefined ? ['Posts'] : ['Posts', variables];
usePostsQuery.fetcher = (client: GraphQLClient, variables?: IPostsQueryVariables, headers?: RequestInit['headers']) =>
	fetcher<IPostsQuery, IPostsQueryVariables>(client, PostsDocument, variables, headers);
