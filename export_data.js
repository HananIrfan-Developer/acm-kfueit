import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  console.log('Fetching data...');
  const {data: events, error: err1} = await supabase.from('events').select('*');
  const {data: members, error: err2} = await supabase.from('members').select('*');
  
  if (err1 || err2) {
    console.error('Error fetching data:', err1 || err2);
    return;
  }
  
  fs.writeFileSync('events_data.json', JSON.stringify(events, null, 2));
  fs.writeFileSync('members_data.json', JSON.stringify(members, null, 2));
  console.log('Export complete! Files saved to workspace.');
}
run();
