import { json } from '@sveltejs/kit';
import { unsubscribeToTopic } from '$lib/server/subscription';

const TOPIC_PREFIX = '/topics/';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	// if (!locals.firebaseApp) {
	// 	return json({ result: 'fail', message: 'Firebase app is not available' }, { status: 500 });
	// }

	const { topic, token } = await request.json();

	try {
		const result = await unsubscribeToTopic(token, TOPIC_PREFIX + topic);
		console.log(result);

		if (result) {
			return json({ result: 'success', message: '' }, { status: 200 });
		} else {
			return json({ result: 'fail', message: '' }, { status: 500 });
		}
	} catch (error) {
		return json({ result: 'fail', message: '' }, { status: 500 });
	}
}
