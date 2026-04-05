import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';

// Firebase config
const firebaseConfig = {
  "projectId": "gen-lang-client-0965584149",
  "appId": "1:551242453114:web:f7c2e84cef8f38aef76bc3",
  "apiKey": "AIzaSyByM5djHNXsV1gOvDsuefLTNAKg4lzbV8o",
  "authDomain": "gen-lang-client-0965584149.firebaseapp.com",
  "firestoreDatabaseId": "ai-studio-e575794b-26e5-409c-b7ed-81645a889973",
  "storageBucket": "gen-lang-client-0965584149.firebasestorage.app",
  "messagingSenderId": "551242453114",
  "measurementId": ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Supabase config (using service_role key to bypass RLS for migration)
const supabaseUrl = 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseServiceKey = 'sb_secret_ZB3jxhZUl_afubNi6johqw_vNGhfk38';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log("Starting migration...");
  
  // Migrate Events
  console.log("Fetching events from Firebase...");
  const eventsSnap = await getDocs(collection(db, 'events'));
  const events = eventsSnap.docs.map(d => {
    const data = d.data();
    return {
      title: data.title,
      description: data.description,
      date: data.date,
      status: data.status || 'upcoming',
      image_url: data.imageUrl || (data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls[0] : null),
      image_urls: data.imageUrls || [],
      created_at: data.createdAt || new Date().toISOString()
    };
  });
  
  if (events.length > 0) {
    console.log(`Inserting ${events.length} events into Supabase...`);
    const { error: eventsError } = await supabase.from('events').insert(events);
    if (eventsError) console.error("Error inserting events:", eventsError);
    else console.log("Events migrated successfully.");
  } else {
    console.log("No events found in Firebase.");
  }

  // Migrate Members
  console.log("Fetching members from Firebase...");
  const membersSnap = await getDocs(collection(db, 'members'));
  const members = membersSnap.docs.map(d => {
    const data = d.data();
    return {
      name: data.name,
      role: data.role,
      team: data.team || 'Core',
      registration_number: data.registrationNumber || null,
      image_url: data.imageUrl || null,
      skills: data.skills || [],
      social_links: data.socialLinks || {},
      created_at: data.createdAt || new Date().toISOString()
    };
  });

  if (members.length > 0) {
    console.log(`Inserting ${members.length} members into Supabase...`);
    const { error: membersError } = await supabase.from('members').insert(members);
    if (membersError) console.error("Error inserting members:", membersError);
    else console.log("Members migrated successfully.");
  } else {
    console.log("No members found in Firebase.");
  }
  
  console.log("Migration complete.");
  process.exit(0);
}

migrate().catch(console.error);
