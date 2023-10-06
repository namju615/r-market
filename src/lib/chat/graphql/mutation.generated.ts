import type * as Types from '$lib/types';

import type { GraphQLClient } from 'graphql-request';
import { useMutation, type UseMutationOptions } from '@sveltestack/svelte-query';

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
export type IAddChatMessageMutationVariables = Types.Exact<{
	chat: Types.IChatMessageForm;
}>;

export type IAddChatMessageMutation = {
	addChatMessage: { room_id: number; user_id: number; message_id: number; contents: string; create_date: string };
};

export const AddChatMessageDocument = /*#__PURE__*/ `
    mutation AddChatMessage($chat: ChatMessageForm!) {
  addChatMessage(chat: $chat) {
    room_id
    user_id
    message_id
    contents
    create_date
  }
}
    `;
export const useAddChatMessageMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<IAddChatMessageMutation, TError, IAddChatMessageMutationVariables, TContext>,
	headers?: RequestInit['headers'],
) =>
	useMutation<IAddChatMessageMutation, TError, IAddChatMessageMutationVariables, TContext>(
		['AddChatMessage'],
		(variables?: IAddChatMessageMutationVariables) =>
			fetcher<IAddChatMessageMutation, IAddChatMessageMutationVariables>(
				client,
				AddChatMessageDocument,
				variables,
				headers,
			)(),
		options,
	);
useAddChatMessageMutation.fetcher = (
	client: GraphQLClient,
	variables: IAddChatMessageMutationVariables,
	headers?: RequestInit['headers'],
) =>
	fetcher<IAddChatMessageMutation, IAddChatMessageMutationVariables>(
		client,
		AddChatMessageDocument,
		variables,
		headers,
	);
