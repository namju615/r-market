import supabase from '$lib/db';

// request id = 18 country data
const country = await supabase.rpc('get_country').eq('id', 18);

export default country;
