import { SupabaseInstanse } from '$lib/supabase/supabaseService';

interface IMember {
	uuid: string;
	email: string;
	name: string;
	profile_image_url?: string;
}

export const member = async (email: string) => {
	const response = await SupabaseInstanse().getClient().from('member').select().eq('email', email).single();
	return response.data;
};
export const addMember = async (member: IMember) => {
	const response = await SupabaseInstanse().getClient().from('member').insert(member).select().single();
	return response.data;
};
