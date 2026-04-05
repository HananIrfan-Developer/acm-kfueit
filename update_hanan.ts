import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseServiceKey = 'sb_secret_ZB3jxhZUl_afubNi6johqw_vNGhfk38';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data, error } = await supabase.from('members').select('*').ilike('name', '%Hanan Irfan%');
  
  if (data && data.length > 0) {
    await supabase.from('members').update({ 
      team: 'Lower Cabinet', 
      sort_order: 1, 
      role: 'General Member' 
    }).eq('id', data[0].id);
    console.log("Updated existing Hanan Irfan to be first in Lower Cabinet.");
  } else {
    await supabase.from('members').insert([{
      name: 'Hanan Irfan',
      role: 'General Member',
      team: 'Lower Cabinet',
      sort_order: 1,
      skills: []
    }]);
    console.log("Added Hanan Irfan as first in Lower Cabinet.");
  }
}

run().catch(console.error);
