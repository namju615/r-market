import { SupabaseInstanse } from '$lib/supabase/supabaseService';

// request id = 18 country data
const country = await SupabaseInstanse().getClient().rpc('get_country').eq('id', 18);

export default country;
