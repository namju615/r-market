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
export type ICreateTokenMutationVariables = Types.Exact<{
	input: Types.ITokenInput;
}>;

export type ICreateTokenMutation = {
	createToken?: {
		token_id: number;
		user_id: number;
		token_value: string;
		created_at: string;
		updated_at: string;
	} | null;
};

export type IUpdateTokenMutationVariables = Types.Exact<{
	input: Types.ITokenInput;
}>;

export type IUpdateTokenMutation = {
	updateToken?: {
		token_id: number;
		user_id: number;
		token_value: string;
		created_at: string;
		updated_at: string;
	} | null;
};

export const CreateTokenDocument = /*#__PURE__*/ `
    mutation CreateToken($input: TokenInput!) {
  createToken(input: $input) {
    token_id
    user_id
    token_value
    created_at
    updated_at
  }
}
    `;
export const useCreateTokenMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<ICreateTokenMutation, TError, ICreateTokenMutationVariables, TContext>,
	headers?: RequestInit['headers'],
) =>
	useMutation<ICreateTokenMutation, TError, ICreateTokenMutationVariables, TContext>(
		['CreateToken'],
		(variables?: ICreateTokenMutationVariables) =>
			fetcher<ICreateTokenMutation, ICreateTokenMutationVariables>(client, CreateTokenDocument, variables, headers)(),
		options,
	);
useCreateTokenMutation.fetcher = (
	client: GraphQLClient,
	variables: ICreateTokenMutationVariables,
	headers?: RequestInit['headers'],
) => fetcher<ICreateTokenMutation, ICreateTokenMutationVariables>(client, CreateTokenDocument, variables, headers);
export const UpdateTokenDocument = /*#__PURE__*/ `
    mutation UpdateToken($input: TokenInput!) {
  updateToken(input: $input) {
    token_id
    user_id
    token_value
    created_at
    updated_at
  }
}
    `;
export const useUpdateTokenMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<IUpdateTokenMutation, TError, IUpdateTokenMutationVariables, TContext>,
	headers?: RequestInit['headers'],
) =>
	useMutation<IUpdateTokenMutation, TError, IUpdateTokenMutationVariables, TContext>(
		['UpdateToken'],
		(variables?: IUpdateTokenMutationVariables) =>
			fetcher<IUpdateTokenMutation, IUpdateTokenMutationVariables>(client, UpdateTokenDocument, variables, headers)(),
		options,
	);
useUpdateTokenMutation.fetcher = (
	client: GraphQLClient,
	variables: IUpdateTokenMutationVariables,
	headers?: RequestInit['headers'],
) => fetcher<IUpdateTokenMutation, IUpdateTokenMutationVariables>(client, UpdateTokenDocument, variables, headers);
