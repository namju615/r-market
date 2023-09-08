import { SupabaseInstanse } from '$lib/supabase/supabaseService';

// request id = 18 country data
const member = await SupabaseInstanse().getClient().rpc('get_member').eq('id', 18);

export default member;
