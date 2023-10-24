import { createYoga, createSchema } from 'graphql-yoga';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema, loadDocuments } from '@graphql-tools/load';
import country from '$lib/country/db';
import countries from '$lib/countries/db';
import { member, addMember } from '$lib/auth/db';
import { getPostInfo } from '$lib/post/db';
import { posts } from '$lib/posts/db';

import type { RequestEvent } from '@sveltejs/kit';
import { addChatMessage, getChatMessage, getRoomList } from '$lib/chat/db';

const typeDefs = await loadSchema('./src/lib/**/graphql/schema.graphql', {
	loaders: [new GraphQLFileLoader()],
});

const defaultQuery = await loadDocuments('./src/lib/countries/graphql/query.graphql', {
	loaders: [new GraphQLFileLoader()],
}).then((res) => res[0].rawSDL);

const yogaApp = createYoga<RequestEvent>({
	schema: createSchema({
		typeDefs,
		resolvers: {
			Query: {
				countries: () => countries.data,
				country: () => country.data[0],
				member: (_, { uuid }: { uuid: string }) => member(uuid),
				getRoomList: async (_, args) => {
					const { data } = await getRoomList(args.id);
					return data;
				},
				getChatMessage: async (_, args) => {
					const { data } = await getChatMessage(args.id);
					return data;
				},
				posts: async (_, { page }: { page: number }) => {
					const response: any = await posts(page);
					return response.data;
				},
				post: async (_, { id }: { id: number }) => {
					const response: any = await getPostInfo(id);
					return response.data[0];
				},
			},
			Mutation: {
				addMember: (
					_,
					{ member }: { member: { uuid: string; email: string; name: string; profile_image_url?: string } },
				) => addMember(member),
				addChatMessage: async (_, args) => {
					const { data } = await addChatMessage(args.chat);
					return data;
				},
			},
		},
	}),
	graphiql: {
		defaultQuery,
	},
	fetchAPI: globalThis,
});

export { yogaApp as GET, yogaApp as POST };
