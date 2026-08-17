import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqamRubGdmenBib3Jjd3RlZWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTQ2MjcsImV4cCI6MjA5MDg5MDYyN30.-sgfJ2uzl_z_3J37Iaw-aM5gmszxphRwleWmcKoDyJA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  await supabase.auth.signUp({ email: 'hananirfan91@gmail.com', password: 'hanan@2007.', options: { data: { full_name: 'Hanan Irfan' } }});
  await supabase.auth.signUp({ email: 'acmkfueitt@gmail.com', password: 'acmkfueit2024', options: { data: { full_name: 'ACM KFUEIT' } }});
  console.log("Done");
}
run();
