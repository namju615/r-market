import { type Message, getMessaging, type MessagingPayload } from 'firebase-admin/messaging';

const TOPIC_PREFIX = '/topics/';

export const send = async (message: Message) => {
	try {
		console.log(message);
		return await getMessaging().send(message);
	} catch (error) {
		console.log(error);
	}

	return null;
};

export const sendToTopic = async (topic: string, payload: MessagingPayload) => {
	try {
		console.log(topic, payload);
		return await getMessaging().sendToTopic(TOPIC_PREFIX + topic, payload);
	} catch (error) {
		console.log(error);
	}

	return null;
};
