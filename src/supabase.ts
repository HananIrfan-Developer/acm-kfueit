import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqamRubGdmenBib3Jjd3RlZWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTQ2MjcsImV4cCI6MjA5MDg5MDYyN30.-sgfJ2uzl_z_3J37Iaw-aM5gmszxphRwleWmcKoDyJA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
