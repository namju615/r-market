import { getMessaging } from 'firebase-admin/messaging';

const TOPIC_PREFIX = '/topics/';

export const subscribeToTopic = async (token: string, topic: string) => {
	try {
		return await getMessaging().subscribeToTopic(token, TOPIC_PREFIX + topic);
	} catch (error) {
		console.log(error);
	}

	return null;
};

export const unsubscribeToTopic = async (token: string, topic: string) => {
	try {
		return await getMessaging().unsubscribeFromTopic(token, TOPIC_PREFIX + topic);
	} catch (error) {
		console.log(error);
	}

	return null;
};
