import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseServiceKey = 'sb_secret_ZB3jxhZUl_afubNi6johqw_vNGhfk38';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data, error } = await supabase.from('members').select('*').eq('team', 'Lower Cabinet');
  console.log(data);
}

run().catch(console.error);
