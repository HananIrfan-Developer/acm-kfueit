-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    author TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and public policies for News (since admin dashboard relies on client-side)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON news FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON news FOR ALL USING (true) WITH CHECK (true);

-- Insert dummy data
INSERT INTO news (title, content, date, author, image_url) VALUES 
('ACM KFUEIT Hosted an Amazing Seminar on AI & ML', 'An insightful seminar on Artificial Intelligence and Machine Learning was conducted successfully with overwhelming participation. We covered the basics of neural networks...', '2026-05-11', 'ACM KFUEIT', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'),
('Our Team Won at CodeXtreme Competition 2026', 'We are proud to announce that the ACM KFUEIT team secured the first position at the annual CodeXtreme hackathon...', '2026-05-05', 'ACM KFUEIT', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d');
