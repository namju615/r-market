interface IMessageData {
	title: string;
	body: string;
	type?: 'foreground-only' | 'both';
}

export type TopicType = 'post-reply' | 'chat-message' | 'keyword-triggered-post-update';

const createMessageData = ({ title, body, type = 'both' }: IMessageData) => {
	const backgroundMsg = {
		notification: {
			title,
			body,
		},
	};
	const foregroundMsg = {
		data: {
			title,
			body,
		},
	};

	return {
		...(type === 'both' ? backgroundMsg : null),
		...foregroundMsg,
	};
};

export const TOPIC_MESSAGE: Record<TopicType, { notification?: IMessageData; data: IMessageData }> = {
	'post-reply': createMessageData({ title: '새 댓글 알림', body: '내가 작성한 판매글에 새 댓글이 등록되었습니다 🥕' }),
	'chat-message': createMessageData({ title: '새 채팅 메시지 알림', body: '새로운 채팅 메시지가 도착했습니다 🥕' }),
	'keyword-triggered-post-update': createMessageData({
		title: '키워드 판매글 알림',
		body: '내가 저장한 키워드 관련 판매글이 등록되었습니다 🥕',
	}),
};

export const TEST_MESSAGE = createMessageData({ title: '푸시 알람 허용', body: '푸시 알람이 허용되었습니다' });
