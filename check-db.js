import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function check() {
  const events = await getDocs(collection(db, 'events'));
  console.log('Events count:', events.size);
  const members = await getDocs(collection(db, 'members'));
  console.log('Members count:', members.size);
}

check().catch(console.error);
