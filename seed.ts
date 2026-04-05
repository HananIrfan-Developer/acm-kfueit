import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajjdnlgfzpborcwteeah.supabase.co';
const supabaseServiceKey = 'sb_secret_ZB3jxhZUl_afubNi6johqw_vNGhfk38';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Seeding placeholder data...");

  const events = [
    {
      title: "AI & Machine Learning Bootcamp",
      description: "A comprehensive 2-day bootcamp covering the fundamentals of AI, neural networks, and practical machine learning applications using Python.",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
      status: "upcoming",
      image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Web Development Hackathon",
      description: "Join us for a 24-hour hackathon to build innovative web applications. Great prizes for the top 3 teams!",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      status: "upcoming",
      image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Cybersecurity Workshop",
      description: "Learn about ethical hacking, network security, and how to protect systems from modern cyber threats.",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last month
      status: "past",
      image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Tech Talk: Future of Cloud Computing",
      description: "An insightful session with industry experts discussing the evolution of cloud technologies and serverless architectures.",
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
      status: "past",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const { error: eventsError } = await supabase.from('events').insert(events);
  if (eventsError) console.error("Error inserting events:", eventsError);
  else console.log("Events seeded successfully.");

  const members = [
    {
      name: "Ali Hassan",
      role: "President",
      team: "Core",
      registration_number: "CS-20-01",
      skills: ["Leadership", "Public Speaking", "Management"]
    },
    {
      name: "Sara Ahmed",
      role: "Vice President",
      team: "Core",
      registration_number: "CS-20-15",
      skills: ["Event Planning", "Communication", "Strategy"]
    },
    {
      name: "Usman Tariq",
      role: "General Secretary",
      team: "Upper Cabinet",
      registration_number: "CS-21-42",
      skills: ["Documentation", "Coordination", "Writing"]
    },
    {
      name: "Fatima Noor",
      role: "Assistant General Secretary",
      team: "Upper Cabinet",
      registration_number: "CS-21-55",
      skills: ["Organization", "Teamwork"]
    },
    {
      name: "Bilal Khan",
      role: "Event Management Head",
      team: "Upper Cabinet",
      registration_number: "SE-20-12",
      skills: ["Logistics", "Planning", "Execution"]
    },
    {
      name: "Ayesha Malik",
      role: "Graphics Head",
      team: "Upper Cabinet",
      registration_number: "IT-21-08",
      skills: ["UI/UX", "Illustrator", "Photoshop"]
    },
    {
      name: "Zainab Ali",
      role: "Media Head",
      team: "Upper Cabinet",
      registration_number: "CS-22-19",
      skills: ["Photography", "Video Editing", "Social Media"]
    },
    {
      name: "Omar Farooq",
      role: "Protocol Director",
      team: "Upper Cabinet",
      registration_number: "SE-21-33",
      skills: ["Public Relations", "Hosting", "Networking"]
    },
    {
      name: "Hira Shah",
      role: "Hosting",
      team: "Upper Cabinet",
      registration_number: "IT-22-41",
      skills: ["Public Speaking", "Anchoring"]
    },
    {
      name: "Saad Raza",
      role: "Web Developer",
      team: "Lower Cabinet",
      registration_number: "CS-22-05",
      skills: ["React", "Node.js", "Tailwind"]
    }
  ];

  const { error: membersError } = await supabase.from('members').insert(members);
  if (membersError) console.error("Error inserting members:", membersError);
  else console.log("Members seeded successfully.");

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch(console.error);
