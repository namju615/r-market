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
export type ISubscribeMutationVariables = Types.Exact<{
	input: Types.ITopicInput;
}>;

export type ISubscribeMutation = {
	subscribe?: {
		topic_id: number;
		topic_name: string;
		user_id: number;
		use_yn: string;
		created_at: string;
		updated_at: string;
	} | null;
};

export type IUnsubscribeMutationVariables = Types.Exact<{
	input: Types.ITopicInput;
}>;

export type IUnsubscribeMutation = {
	unsubscribe?: {
		topic_id: number;
		topic_name: string;
		user_id: number;
		use_yn: string;
		created_at: string;
		updated_at: string;
	} | null;
};

export const SubscribeDocument = /*#__PURE__*/ `
    mutation Subscribe($input: TopicInput!) {
  subscribe(input: $input) {
    topic_id
    topic_name
    user_id
    use_yn
    created_at
    updated_at
  }
}
    `;
export const useSubscribeMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<ISubscribeMutation, TError, ISubscribeMutationVariables, TContext>,
	headers?: RequestInit['headers'],
) =>
	useMutation<ISubscribeMutation, TError, ISubscribeMutationVariables, TContext>(
		['Subscribe'],
		(variables?: ISubscribeMutationVariables) =>
			fetcher<ISubscribeMutation, ISubscribeMutationVariables>(client, SubscribeDocument, variables, headers)(),
		options,
	);
useSubscribeMutation.fetcher = (
	client: GraphQLClient,
	variables: ISubscribeMutationVariables,
	headers?: RequestInit['headers'],
) => fetcher<ISubscribeMutation, ISubscribeMutationVariables>(client, SubscribeDocument, variables, headers);
export const UnsubscribeDocument = /*#__PURE__*/ `
    mutation Unsubscribe($input: TopicInput!) {
  unsubscribe(input: $input) {
    topic_id
    topic_name
    user_id
    use_yn
    created_at
    updated_at
  }
}
    `;
export const useUnsubscribeMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<IUnsubscribeMutation, TError, IUnsubscribeMutationVariables, TContext>,
	headers?: RequestInit['headers'],
) =>
	useMutation<IUnsubscribeMutation, TError, IUnsubscribeMutationVariables, TContext>(
		['Unsubscribe'],
		(variables?: IUnsubscribeMutationVariables) =>
			fetcher<IUnsubscribeMutation, IUnsubscribeMutationVariables>(client, UnsubscribeDocument, variables, headers)(),
		options,
	);
useUnsubscribeMutation.fetcher = (
	client: GraphQLClient,
	variables: IUnsubscribeMutationVariables,
	headers?: RequestInit['headers'],
) => fetcher<IUnsubscribeMutation, IUnsubscribeMutationVariables>(client, UnsubscribeDocument, variables, headers);
