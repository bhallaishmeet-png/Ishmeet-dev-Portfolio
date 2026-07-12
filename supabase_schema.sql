-- SUPABASE DATABASE SETUP SCHEMA
-- Copy and paste this script directly into your Supabase SQL Editor (https://supabase.com) 
-- to initialize the database tables for users, reviews, projects, and banned emails.

-- 1. Create Banned Emails Table
CREATE TABLE IF NOT EXISTS banned_emails (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    provider TEXT NOT NULL DEFAULT 'Email',
    status TEXT NOT NULL DEFAULT 'Signed Out',
    join_date DATE DEFAULT CURRENT_DATE NOT NULL
);

-- 3. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    url TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_letter TEXT NOT NULL,
    target TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Projects Data
INSERT INTO projects (id, name, description, tech, url, image)
VALUES 
('proj_1', 'JuteSutra', 'A highly aesthetic e-commerce portal selling eco-friendly, artisanal jute bags. Implements responsive grids, detailed catalogs, and high-performance load times.', ARRAY['HTML5', 'CSS3', 'JavaScript', 'E-Commerce'], 'https://jutesutra.lovable.app', 'assets/jutesutra_preview.png'),
('proj_2', 'SiteMart', 'A digital template storefront designed for browsing, previewing, and buying ready-made web code layouts. Optimized for rapid styling loading and high density grids.', ARRAY['HTML5', 'CSS Modules', 'JS ES6', 'UI/UX Layouts'], 'https://sitemart.lovable.app', 'assets/sitemart_preview.png'),
('proj_3', 'The Road Doctors', 'An enterprise lead-generation landing page for asphalt repairs and maintenance services. Focuses on appointment scheduling mockups and localization elements.', ARRAY['HTML5', 'Custom CSS', 'Lead Forms', 'Performance'], 'https://theroaddoctors.lovable.app', 'assets/theroaddoctors_preview.png')
ON CONFLICT (id) DO NOTHING;

-- Seed Reviews Data
INSERT INTO reviews (id, name, avatar_letter, target, rating, comment, date)
VALUES 
('rev_1', 'Amit Sharma', 'A', 'JuteSutra', 5, 'Ishmeet built a phenomenal e-commerce site for our organic brand. The page speed is top-tier and our checkout conversions increased by 40%! An absolute pleasure to work with.', '2026-05-12'),
('rev_2', 'Sarah Jenkins', 'S', 'SiteMart', 5, 'SiteMart''s layout is incredibly clean and futuristic. Ishmeet translates complex UI requirements into working, responsive code instantly. Highly recommend him for business owners!', '2026-06-02'),
('rev_3', 'Mr. Gupta', 'G', 'The Road Doctors', 4, 'Excellent lead generation landing page. Simple, responsive, and effectively structured to capture estimates. Ishmeet completed the project ahead of schedule and with clean documentation.', '2026-06-20')
ON CONFLICT (id) DO NOTHING;

-- Seed Admin User (admin@ishmeet.dev / admin)
INSERT INTO users (username, email, password, provider, status)
VALUES ('admin', 'admin@ishmeet.dev', 'admin', 'Email', 'Signed Out')
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security (RLS) policies or leave open for Anon access:
-- Note: For demo ease, ensure read/write access are granted to anon role.
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE reviews FORCE ROW LEVEL SECURITY;
ALTER TABLE projects FORCE ROW LEVEL SECURITY;
ALTER TABLE banned_emails FORCE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on projects" ON projects FOR DELETE USING (true);

CREATE POLICY "Allow public select on reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert on reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on reviews" ON reviews FOR DELETE USING (true);

CREATE POLICY "Allow public select on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on users" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on users" ON users FOR DELETE USING (true);

CREATE POLICY "Allow public select on banned_emails" ON banned_emails FOR SELECT USING (true);
CREATE POLICY "Allow public insert on banned_emails" ON banned_emails FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on banned_emails" ON banned_emails FOR DELETE USING (true);
