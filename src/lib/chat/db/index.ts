import { SupabaseInstanse } from '$lib/supabase/supabaseService';

interface IChatMessage {
	room_id: number;
	member_id: number;
	contents: string;
}

export const getChatMessage = async (id: number) => {
	const chat_messages = await SupabaseInstanse().getClient().rpc('get_room_message', { roomid: id });
	return chat_messages;
};

export const getRoomList = async (id: number) => {
	const my_room = await SupabaseInstanse().getClient().rpc('get_room_list', { userid: id });
	return my_room;
};

export const addChatMessage = async (chat: IChatMessage) => {
	const response = await SupabaseInstanse().getClient().from('post_chat_message').insert(chat).select().single();
	return response;
};
