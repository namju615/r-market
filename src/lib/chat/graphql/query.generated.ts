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
export type IGetChatMessageQueryVariables = Types.Exact<{
	room_id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type IGetChatMessageQuery = {
	getChatMessage: Array<{
		room_id: number;
		user_id: number;
		name: string;
		user_image?: string | null;
		contents: string;
		create_date: string;
	} | null>;
};

export type IGetRoomListQueryVariables = Types.Exact<{
	user_id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type IGetRoomListQuery = {
	getRoomList?: Array<{
		room_id: number;
		post_id: number;
		post_title?: string | null;
		product_image?: string | null;
		last_message_date?: string | null;
		last_message?: string | null;
		user_list: Array<{ name: string; user_id: number; user_image?: string | null }>;
	} | null> | null;
};

export const GetChatMessageDocument = /*#__PURE__*/ `
    query GetChatMessage($room_id: Int) {
  getChatMessage(id: $room_id) {
    room_id
    user_id
    name
    user_image
    contents
    create_date
  }
}
    `;
export const useGetChatMessageQuery = <TData = IGetChatMessageQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: IGetChatMessageQueryVariables,
	options?: UseQueryOptions<IGetChatMessageQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<IGetChatMessageQuery, TError, TData>(
		variables === undefined ? ['GetChatMessage'] : ['GetChatMessage', variables],
		fetcher<IGetChatMessageQuery, IGetChatMessageQueryVariables>(client, GetChatMessageDocument, variables, headers),
		options,
	);

useGetChatMessageQuery.getKey = (variables?: IGetChatMessageQueryVariables) =>
	variables === undefined ? ['GetChatMessage'] : ['GetChatMessage', variables];
useGetChatMessageQuery.fetcher = (
	client: GraphQLClient,
	variables?: IGetChatMessageQueryVariables,
	headers?: RequestInit['headers'],
) => fetcher<IGetChatMessageQuery, IGetChatMessageQueryVariables>(client, GetChatMessageDocument, variables, headers);
export const GetRoomListDocument = /*#__PURE__*/ `
    query GetRoomList($user_id: Int) {
  getRoomList(id: $user_id) {
    room_id
    user_list {
      name
      user_id
      user_image
    }
    post_id
    post_title
    product_image
    last_message_date
    last_message
  }
}
    `;
export const useGetRoomListQuery = <TData = IGetRoomListQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: IGetRoomListQueryVariables,
	options?: UseQueryOptions<IGetRoomListQuery, TError, TData>,
	headers?: RequestInit['headers'],
) =>
	useQuery<IGetRoomListQuery, TError, TData>(
		variables === undefined ? ['GetRoomList'] : ['GetRoomList', variables],
		fetcher<IGetRoomListQuery, IGetRoomListQueryVariables>(client, GetRoomListDocument, variables, headers),
		options,
	);

useGetRoomListQuery.getKey = (variables?: IGetRoomListQueryVariables) =>
	variables === undefined ? ['GetRoomList'] : ['GetRoomList', variables];
useGetRoomListQuery.fetcher = (
	client: GraphQLClient,
	variables?: IGetRoomListQueryVariables,
	headers?: RequestInit['headers'],
) => fetcher<IGetRoomListQuery, IGetRoomListQueryVariables>(client, GetRoomListDocument, variables, headers);
