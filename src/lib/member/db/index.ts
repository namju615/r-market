import { SupabaseInstanse } from '$lib/supabase/supabaseService';

const member = await SupabaseInstanse().getClient().from('member').select();

export default member;
