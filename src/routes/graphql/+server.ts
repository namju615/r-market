import { createYoga, createSchema } from 'graphql-yoga';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema, loadDocuments } from '@graphql-tools/load';
import country from '$lib/country/db';
import countries from '$lib/countries/db';
import { member, addMember } from '$lib/auth/db';
import { getTopics, subscribe, unsubscribe } from '$lib/topics/db';
import { getToken } from '$lib/token/db';

import type { RequestEvent } from '@sveltejs/kit';

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
				member: (_, { email }: { email: string }) => member(email),
				topicWithToken: async (_, { user_id, token_id }) => {
					const { data: token } = await getToken({ user_id, token_id });
					const topics = await getTopics(user_id, token_id);
					return { topics, token: token ? token[0] : null };
				},
			},
			Mutation: {
				addMember: (_, { member }: { member: { email: string; name: string } }) => addMember(member),
				subscribe: (_, args, context, info) => {
					console.log(context, info);
					subscribe(args);
				},
				unsubscribe: (_, args) => {
					const { data } = unsubscribe(args);
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
