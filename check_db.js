import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqamRubGdmenBib3Jjd3RlZWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTQ2MjcsImV4cCI6MjA5MDg5MDYyN30.-sgfJ2uzl_z_3J37Iaw-aM5gmszxphRwleWmcKoDyJA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('highlights').select('*').limit(1);
  console.log("highlights:", error ? error.message : data);
}
run();
