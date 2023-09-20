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
export type IAddMemberMutationVariables = Types.Exact<{
	member: Types.IMemberInput;
}>;

export type IAddMemberMutation = {
	addMember: { uuid?: string | null; email: string; name: string; profile_image_url?: string | null };
};

export const AddMemberDocument = /*#__PURE__*/ `
    mutation AddMember($member: MemberInput!) {
  addMember(member: $member) {
    uuid
    email
    name
    profile_image_url
  }
}
    `;
export const useAddMemberMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<IAddMemberMutation, TError, IAddMemberMutationVariables, TContext>,
	headers?: RequestInit['headers'],
) =>
	useMutation<IAddMemberMutation, TError, IAddMemberMutationVariables, TContext>(
		['AddMember'],
		(variables?: IAddMemberMutationVariables) =>
			fetcher<IAddMemberMutation, IAddMemberMutationVariables>(client, AddMemberDocument, variables, headers)(),
		options,
	);
useAddMemberMutation.fetcher = (
	client: GraphQLClient,
	variables: IAddMemberMutationVariables,
	headers?: RequestInit['headers'],
) => fetcher<IAddMemberMutation, IAddMemberMutationVariables>(client, AddMemberDocument, variables, headers);
