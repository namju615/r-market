import { SupabaseInstanse } from '$lib/supabase/supabaseService';

export const getChatMessage = async (id: number) => {
	const chat_messages = await SupabaseInstanse().getClient().rpc('get_room_message', { roomid: id });
	return chat_messages;
};

export const getRoomList = async (id: number) => {
	const my_room = await SupabaseInstanse().getClient().rpc('get_room_list', { userid: id });
	return my_room;
};
