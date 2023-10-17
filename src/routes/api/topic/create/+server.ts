import { json } from '@sveltejs/kit';
import { subscribeToTopic } from '$lib/server/subscription';

const TOPIC_PREFIX = '/topics/';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	// if (!locals.firebaseApp) {
	// 	return json({ result: 'fail', message: 'Firebase app is not available' }, { status: 500 });
	// }

	const { topic, token } = await request.json();

	try {
		const result = await subscribeToTopic(token, TOPIC_PREFIX + topic);

		if (result) {
			const { successCount, errors } = result;
			if (successCount === 1 && errors.length === 0) {
				return json({ result: 'success', message: 'Subscription Success to ' + topic }, { status: 200 });
			}
		} else {
			return json({ result: 'fail', message: 'Topic subscription failed' }, { status: 500 });
		}
	} catch (error) {
		return json({ result: 'fail', message: 'Error' }, { status: 500 });
	}
}
