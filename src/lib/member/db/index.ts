import { SupabaseInstanse } from '$lib/supabase/supabaseService';

const member = await SupabaseInstanse().getClient().rpc('get_member').eq('id', 18);

export default member;
