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
export type IPostsQueryVariables = Types.Exact<{
	page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

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
		member: { user_id?: string | null; email: string; name: string };
	} | null>;
};

export const PostsDocument = /*#__PURE__*/ `
    query Posts($page: Int) {
  posts(page: $page) {
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
