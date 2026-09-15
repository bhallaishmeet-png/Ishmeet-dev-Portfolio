import { supabase, isSupabaseConfigured } from '../supabaseClient.js';

/* =====================================================================
   ISHMEET BHALLA — UNIFIED DATA SERVICE (v4)
   Pre-seeded with 100% verified factual data for Ishmeet Bhalla:
   - Holy Child Public School (Class 10 E2, Session 2026-27)
   - Live Projects (Jute Sutra, Sitemart, Road Doctors, Cricket Score Board, Dobara Tech)
   - Published Books (The Indian Festivals, The Last Spellbinder Part-1, The Last Hour Before Tomorrow)
   - Core Skills, Activities & Future Entrepreneurial Vision
   ===================================================================== */

const STORAGE_KEYS = {
  PROJECTS: 'ishmeet_projects_v4',
  BOOKS: 'ishmeet_books_v4',
  ACHIEVEMENTS: 'ishmeet_achievements_v4',
  SKILLS: 'ishmeet_skills_v4',
  JOURNEY: 'ishmeet_journey_v4',
  MUSIC: 'ishmeet_music_v4',
  SETTINGS: 'ishmeet_settings_v4',
  MESSAGES: 'ishmeet_messages_v4',
  MEDIA: 'ishmeet_media_v4'
};

// 1. ALL LIVE PROJECTS SEED
export const DEFAULT_PROJECTS = [
  {
    id: "proj_jutesutra",
    slug: "jute-sutra",
    title: "Jute Sutra",
    category: "Web Application & Sustainable Commerce",
    status: "Live",
    type: "BUILD",
    technologies: ["React", "Lovable", "Tailwind CSS", "JavaScript ES6"],
    shortDescription: "Sustainable jute products & eco-friendly craft platform built on Lovable.",
    fullDescription: "An online platform dedicated to celebrating eco-conscious craft and sustainable natural fiber products. Designed with a clean, earthy UI and fast modern browsing.",
    problem: "Traditional artisan and sustainable jute products lacked a contemporary, high-converting digital storefront.",
    solution: "Crafted a responsive web application featuring intuitive product discovery, natural aesthetic palette, and seamless navigation.",
    result: "Successfully launched live web application accessible globally.",
    lessonsLearned: "Explored rapid application prototyping with modern web design frameworks and product storytelling.",
    image: "/assets/jutesutra_preview.png",
    githubUrl: "",
    liveUrl: "https://jutesutra.lovable.app/",
    featured: true,
    published: true,
    order: 1,
    date: "2026-03"
  },
  {
    id: "proj_sitemart",
    slug: "sitemart",
    title: "Sitemart",
    category: "Digital Marketplace & Web Tools",
    status: "Live",
    type: "BUILD",
    technologies: ["React", "Lovable", "Modern UI System", "TypeScript"],
    shortDescription: "Digital marketplace and modern website solutions platform built on Lovable.",
    fullDescription: "A specialized digital platform providing curated web solutions, business templates, and instant digital assets for entrepreneurs and small businesses.",
    problem: "Small business owners often struggle to find accessible, high-quality digital templates and web storefront solutions.",
    solution: "Designed a clean catalog interface with streamlined previews, feature matrices, and transparent deployment guides.",
    result: "Live marketplace providing an accessible entry point for online business presence.",
    lessonsLearned: "Designed conversion-oriented catalog layouts and responsive user flows.",
    image: "/assets/sitemart_preview.png",
    githubUrl: "",
    liveUrl: "https://sitemart.lovable.app/",
    featured: true,
    published: true,
    order: 2,
    date: "2026-02"
  },
  {
    id: "proj_roaddoctors",
    slug: "road-doctors",
    title: "Road Doctors",
    category: "Civic Infrastructure & Service Platform",
    status: "Live",
    type: "BUILD",
    technologies: ["React", "Lovable", "Civic Tech System", "Interactive Map UI"],
    shortDescription: "Civic road maintenance, hazard response, and infrastructure tracking platform.",
    fullDescription: "An interactive civic service application designed to bridge commuter hazard reports with municipal road repair workflows, bringing transparency and rapid reporting to road distress.",
    problem: "Unreported potholes and road damage cause traffic bottlenecks and vehicular accidents.",
    solution: "Created an accessible reporting portal with instant hazard categorization, location tagging, and repair status monitoring.",
    result: "Live responsive application for road safety awareness and repair coordination.",
    lessonsLearned: "Focused on mobile-first accessibility for quick on-the-road emergency reporting.",
    image: "/assets/theroaddoctors_preview.png",
    githubUrl: "",
    liveUrl: "https://theroaddoctors.lovable.app/",
    featured: true,
    published: true,
    order: 3,
    date: "2026-01"
  },
  {
    id: "proj_scoreboard",
    slug: "cricket-score-board",
    title: "Cricket Score Board",
    category: "Real-Time Sports Analytics & Tracking",
    status: "Live",
    type: "BUILD",
    technologies: ["React", "Lovable", "State Machine", "Live Data Feed"],
    shortDescription: "Interactive live cricket scoring, over-by-over analytics, and ball tracker.",
    fullDescription: "A dynamic real-time cricket companion app that tracks live ball-by-ball updates, calculates run rates and player strike rates, and presents game state through a clean, intuitive scoreboard interface.",
    problem: "Amateur cricket tournaments and school matches lack accessible digital scoring tools with automatic run-rate calculations.",
    solution: "Engineered a responsive state-driven digital scorer with one-tap ball recording, extras tracking, and fall-of-wicket timelines.",
    result: "Live score terminal used during school and local cricket fixtures.",
    lessonsLearned: "Mastered complex relational state machines and zero-latency UI re-renders.",
    image: "/assets/doodle_photo_new.jpg",
    githubUrl: "",
    liveUrl: "https://score-board-cricket.lovable.app/",
    featured: true,
    published: true,
    order: 4,
    date: "2025-12"
  },
  {
    id: "proj_dobara",
    slug: "dobara-tech",
    title: "Dobara Tech",
    category: "Next-Gen Tech & Electronics",
    status: "Live",
    type: "BUILD",
    technologies: ["Next.js", "Vercel", "Tailwind CSS", "Modern Web Architecture"],
    shortDescription: "Sustainable technology, device refurbishment, and modern hardware solutions.",
    fullDescription: "Dobara Tech champions sustainable electronics: exploring circular hardware lifecycles, device diagnostics, refurbished technology education, and innovative STEM hardware kits.",
    problem: "Rapid obsolescence creates massive electronic waste while underserved students lack affordable hands-on hardware.",
    solution: "Architected a dedicated platform showcasing refurbished tech initiatives, diagnostic guides, and sustainable hardware workshops.",
    result: "Production web platform deployed live on Vercel with high performance and accessibility scores.",
    lessonsLearned: "Deepened knowledge of Vercel edge deployment and circular sustainability frameworks.",
    image: "/assets/real_photo.jpg",
    githubUrl: "",
    liveUrl: "https://dobara-tech.vercel.app/",
    featured: true,
    published: true,
    order: 5,
    date: "2025-10"
  }
];

// 2. VERIFIED BOOKS SEED (BriBooks Publications)
export const DEFAULT_BOOKS = [
  {
    id: "book_festivals",
    title: "The Indian Festivals",
    subtitle: "A Celebration of Unity, Tradition and Culture",
    author: "Ishmeet Bhalla",
    genre: "Culture & Non-Fiction",
    year: "2024",
    stars: 5,
    description: "An inspiring journey into the cultural kaleidoscope of India's festivals, examining their historical origins, traditions, seasonal significance, and the enduring harmony they foster across diverse communities.",
    cover: "/assets/doodle_photo.png",
    platform: "BriBooks Bookstore",
    link: "https://www.bribooks.com/bookstore/the-indian-festivals-658c3aa619366/",
    featured: true,
    order: 1,
    spineBg: "#991b1b",
    spineInk: "#fef08a",
    spineFont: "700 42px Georgia",
    backBg: "#450a0a",
    backInk: "254,240,138",
    edge: "#fef3c7"
  },
  {
    id: "book_spellbinder",
    title: "The Last Spellbinder Part-1",
    subtitle: "The Awakening of Ancient Runes",
    author: "Ishmeet Bhalla",
    genre: "Fantasy & Adventure",
    year: "2024",
    stars: 5,
    description: "An original multi-chapter fantasy novel following an apprentice who uncovers an extinct magical discipline buried in forgotten ruins. Explores curiosity, determination, and the deep science underlying ancient spells.",
    cover: "/assets/doodle_photo.png",
    platform: "BriBooks Bookstore",
    link: "https://www.bribooks.com/bookstore/the-last-spellbinder-by-ishmeet-bhalla/",
    featured: true,
    order: 2,
    spineBg: "#1e3a8a",
    spineInk: "#93c5fd",
    spineFont: "700 42px serif",
    backBg: "#0f172a",
    backInk: "147,197,253",
    edge: "#e2e8f0"
  },
  {
    id: "book_lasthour",
    title: "The Last Hour Before Tomorrow",
    subtitle: "Reflections on Time, Choice and Tomorrow",
    author: "Ishmeet Bhalla",
    genre: "Speculative & Philosophical Fiction",
    year: "2024",
    stars: 5,
    description: "A thoughtful story exploring the pivotal moments right before dawn, where memories of the past converge with resolve for tomorrow, urging young minds to question, persevere, and shape their destiny.",
    cover: "/assets/doodle_photo.png",
    platform: "BriBooks Bookstore",
    link: "https://www.bribooks.com/bookstore/the-last-hour-before-tomorrow-by-ishmeet-bhalla/",
    featured: true,
    order: 3,
    spineBg: "#78350f",
    spineInk: "#fed7aa",
    spineFont: "700 42px sans-serif",
    backBg: "#291104",
    backInk: "254,215,170",
    edge: "#fed7aa"
  }
];

// 3. VERIFIED ACHIEVEMENTS & ACTIVITIES SEED (From School Profile)
export const DEFAULT_ACHIEVEMENTS = [
  {
    id: "ach_school_projects",
    title: "School Projects and Presentations",
    organization: "Holy Child Public School",
    date: "2026",
    category: "Academic & Presentations",
    description: "Led and delivered outstanding school presentations and research projects across scientific and technical domains.",
    order: 1
  },
  {
    id: "ach_stem_activities",
    title: "STEM and Science Activities",
    organization: "Science Department & Competitions",
    date: "2025-2026",
    category: "STEM & Science",
    description: "Active participant in school and inter-school science exhibitions, experiments, and analytical problem-solving challenges.",
    order: 2
  },
  {
    id: "ach_tech_exploration",
    title: "Technology Exploration",
    organization: "Self-Driven Research & Web Development",
    date: "2025-2026",
    category: "Technology & Coding",
    description: "Developed and published multiple web applications including Jute Sutra, Sitemart, Road Doctors, Cricket Score Board, and Dobara Tech.",
    order: 3
  },
  {
    id: "ach_cocurricular",
    title: "Co-Curricular Participation",
    organization: "Holy Child Public School Cultural & Sports Activities",
    date: "2024-2026",
    category: "Co-Curricular",
    description: "Active engagement in inter-house and school cultural programs, music, and sports competitions.",
    order: 4
  }
];

// 4. VERIFIED SKILLS MATRIX SEED (From School Profile)
export const DEFAULT_SKILLS = [
  { id: "sk_1", category: "Core Foundational Skills", name: "Communication", status: "MASTERING", priority: 1 },
  { id: "sk_2", category: "Core Foundational Skills", name: "Leadership", status: "BUILDING", priority: 2 },
  { id: "sk_3", category: "Core Foundational Skills", name: "Teamwork", status: "PRACTICING", priority: 3 },
  { id: "sk_4", category: "Core Foundational Skills", name: "Critical Thinking", status: "MASTERING", priority: 4 },
  { id: "sk_5", category: "Core Foundational Skills", name: "Problem Solving", status: "MASTERING", priority: 5 },
  { id: "sk_6", category: "Core Foundational Skills", name: "Creativity", status: "EXPRESSING", priority: 6 },
  { id: "sk_7", category: "Core Foundational Skills", name: "Digital Literacy", status: "ADVANCED", priority: 7 },
  { id: "sk_8", category: "Technical & Domain Interests", name: "Science & Physics Fundamentals", status: "EXPLORING", priority: 8 },
  { id: "sk_9", category: "Technical & Domain Interests", name: "Web Application Development (React / Next.js)", status: "BUILDING", priority: 9 },
  { id: "sk_10", category: "Technical & Domain Interests", name: "Entrepreneurship & STEM Solutions", status: "VISION", priority: 10 },
  { id: "sk_11", category: "Technical & Domain Interests", name: "Music (Keyboard & Guitar)", status: "CREATING", priority: 11 },
  { id: "sk_12", category: "Technical & Domain Interests", name: "Creative Writing & Literature", status: "PUBLISHED", priority: 12 }
];

// 5. THE JOURNEY SEED
export const DEFAULT_JOURNEY = [
  {
    id: "j_2026",
    year: "2026–27",
    title: "Class 10 E2 & Live Application Ecosystem",
    category: "Academics & Tech",
    description: "Studying at Holy Child Public School (Session 2026–27) while shipping five live production web applications (Jute Sutra, Sitemart, Road Doctors, Cricket Score Board, Dobara Tech).",
    tag: "Current Phase"
  },
  {
    id: "j_2024",
    year: "2024",
    title: "Published Author on BriBooks",
    category: "Literature",
    description: "Authored and published three books: 'The Indian Festivals', 'The Last Spellbinder Part-1', and 'The Last Hour Before Tomorrow'.",
    tag: "Authorship"
  },
  {
    id: "j_2023",
    year: "2023",
    title: "STEM Foundation & Technology Exploration",
    category: "Exploration",
    description: "Engaged in hands-on science activities, school presentations, music performances, and foundational software engineering.",
    tag: "Bedrock"
  }
];

// 6. MUSIC PROJECTS SEED
export const DEFAULT_MUSIC = [
  {
    id: "mus_1",
    title: "Acoustic Harmony",
    role: "Guitar & Melodies",
    genre: "Acoustic Instrumental",
    description: "Exploration of open guitar tunings, resonance, and gentle melodic themes.",
    year: "2025",
    audioUrl: ""
  },
  {
    id: "mus_2",
    title: "Synthesizer Horizons",
    role: "Keyboard / Piano",
    genre: "Ambient Instrumental",
    description: "Contemplative piano compositions interwoven with ambient synth textures.",
    year: "2026",
    audioUrl: ""
  }
];

// 7. SITE SETTINGS SEED (From Exact Screenshot Profile)
export const DEFAULT_SETTINGS = {
  siteName: "ISHMEET BHALLA",
  heroTitle: "ISHMEET BHALLA",
  heroSubtitle: "Class 10 E2 | Holy Child Public School | Session 2026–27",
  careerObjective: "Motivated student interested in science, technology, entrepreneurship, and music. Eager to develop leadership, creativity, and problem-solving skills through learning and innovation.",
  education: "Holy Child Public School – Class X (2026–27)",
  skillsText: "Communication • Leadership • Teamwork • Critical Thinking • Problem Solving • Creativity • Digital Literacy",
  achievementsText: "School projects and presentations • STEM and science activities • Technology exploration • Co-curricular participation",
  interestsText: "Science • Technology • Entrepreneurship • Music • Reading",
  futureGoal: "To become an entrepreneur in science and education by creating innovative STEM learning solutions.",
  email: "bhallaishmeet@gmail.com",
  githubUrl: "https://github.com/ishmeetbhalla",
  linkedinUrl: "https://linkedin.com/in/ishmeetbhalla",
  youtubeUrl: "https://youtube.com/@ishmeetbhalla",
  instagramUrl: "https://instagram.com/ishmeetbhalla",
  resumeUrl: "/assets/Ishmeet_Bhalla_Resume.pdf",
  seoTitle: "Ishmeet Bhalla — Student, Builder & Author",
  seoDescription: "Portfolio of Ishmeet Bhalla. Class 10 student at Holy Child Public School exploring science, technology, entrepreneurship, music, and writing.",
  accentColor: "#e0231c",
  maintenanceMode: false
};

// 8. CONTACT MESSAGES SEED
export const DEFAULT_MESSAGES = [
  {
    id: "msg_welcome",
    name: "System",
    email: "system@ishmeet.dev",
    subject: "Portfolio Initialized",
    message: "Portfolio refreshed with verified profile details, live projects, and 3D books showcase.",
    date: new Date().toISOString(),
    read: true,
    archived: false
  }
];

/* -------------------------------------------------------------
   LOCALSTORAGE HELPER UTILITIES
   ------------------------------------------------------------- */
const getLocal = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
};

const setLocal = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
};

/* =============================================================
   PUBLIC DATABASE API METHODS
   ============================================================= */

// PROJECTS
export async function getProjects() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase project fetch failed, falling back to local:", e);
    }
  }
  return getLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
}

export async function saveProject(project) {
  const current = getLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
  let updated;
  if (project.id) {
    const idx = current.findIndex(p => p.id === project.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...updated[idx], ...project, updatedAt: new Date().toISOString() };
    } else {
      updated = [project, ...current];
    }
  } else {
    const newProj = {
      ...project,
      id: `proj_${Date.now()}`,
      slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      published: project.published !== undefined ? project.published : true,
      order: current.length + 1
    };
    updated = [newProj, ...current];
  }
  setLocal(STORAGE_KEYS.PROJECTS, updated);

  if (isSupabaseConfigured) {
    try {
      await supabase.from('projects').upsert(project);
    } catch (e) {
      console.error("Supabase upsert failed:", e);
    }
  }
  return updated;
}

export async function deleteProject(id) {
  const current = getLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
  const updated = current.filter(p => p.id !== id);
  setLocal(STORAGE_KEYS.PROJECTS, updated);

  if (isSupabaseConfigured) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      console.error("Supabase delete failed:", e);
    }
  }
  return updated;
}

// BOOKS
export async function getBooks() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('books').select('*').order('order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch { /* fallback */ }
  }
  return getLocal(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS);
}

export async function saveBook(book) {
  const current = getLocal(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS);
  let updated;
  if (book.id) {
    const idx = current.findIndex(b => b.id === book.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...updated[idx], ...book };
    } else {
      updated = [book, ...current];
    }
  } else {
    const newBook = { ...book, id: `book_${Date.now()}`, order: current.length + 1 };
    updated = [newBook, ...current];
  }
  setLocal(STORAGE_KEYS.BOOKS, updated);
  return updated;
}

export async function deleteBook(id) {
  const current = getLocal(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS);
  const updated = current.filter(b => b.id !== id);
  setLocal(STORAGE_KEYS.BOOKS, updated);
  return updated;
}

// ACHIEVEMENTS
export async function getAchievements() {
  return getLocal(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
}

export async function saveAchievement(item) {
  const current = getLocal(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
  let updated;
  if (item.id) {
    const idx = current.findIndex(a => a.id === item.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...updated[idx], ...item };
    } else {
      updated = [item, ...current];
    }
  } else {
    updated = [{ ...item, id: `ach_${Date.now()}` }, ...current];
  }
  setLocal(STORAGE_KEYS.ACHIEVEMENTS, updated);
  return updated;
}

export async function deleteAchievement(id) {
  const current = getLocal(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
  const updated = current.filter(a => a.id !== id);
  setLocal(STORAGE_KEYS.ACHIEVEMENTS, updated);
  return updated;
}

// SKILLS
export async function getSkills() {
  return getLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
}

export async function saveSkill(skill) {
  const current = getLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
  let updated;
  if (skill.id) {
    const idx = current.findIndex(s => s.id === skill.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...updated[idx], ...skill };
    } else {
      updated = [skill, ...current];
    }
  } else {
    updated = [{ ...skill, id: `sk_${Date.now()}` }, ...current];
  }
  setLocal(STORAGE_KEYS.SKILLS, updated);
  return updated;
}

export async function deleteSkill(id) {
  const current = getLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
  const updated = current.filter(s => s.id !== id);
  setLocal(STORAGE_KEYS.SKILLS, updated);
  return updated;
}

// JOURNEY
export async function getJourney() {
  return getLocal(STORAGE_KEYS.JOURNEY, DEFAULT_JOURNEY);
}

// MUSIC
export async function getMusic() {
  return getLocal(STORAGE_KEYS.MUSIC, DEFAULT_MUSIC);
}

// SETTINGS
export async function getSettings() {
  return getLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export async function saveSettings(settings) {
  const current = getLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const updated = { ...current, ...settings };
  setLocal(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// MESSAGES
export async function getMessages() {
  return getLocal(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
}

export async function saveMessage(msg) {
  const current = getLocal(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  const newMsg = { ...msg, id: `msg_${Date.now()}`, date: new Date().toISOString(), read: false, archived: false };
  const updated = [newMsg, ...current];
  setLocal(STORAGE_KEYS.MESSAGES, updated);
  return updated;
}

// CMS & SUBMISSION EXPORTS
export async function submitContactMessage(msg) {
  return saveMessage(msg);
}

export async function saveMusic(item) {
  const current = getLocal(STORAGE_KEYS.MUSIC, DEFAULT_MUSIC);
  let updated;
  if (item.id) {
    const idx = current.findIndex(m => m.id === item.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...updated[idx], ...item };
    } else {
      updated = [item, ...current];
    }
  } else {
    updated = [{ ...item, id: `mus_${Date.now()}` }, ...current];
  }
  setLocal(STORAGE_KEYS.MUSIC, updated);
  return updated;
}

export async function deleteMusic(id) {
  const current = getLocal(STORAGE_KEYS.MUSIC, DEFAULT_MUSIC);
  const updated = current.filter(m => m.id !== id);
  setLocal(STORAGE_KEYS.MUSIC, updated);
  return updated;
}

export async function saveJourney(item) {
  const current = getLocal(STORAGE_KEYS.JOURNEY, DEFAULT_JOURNEY);
  let updated;
  if (item.id) {
    const idx = current.findIndex(j => j.id === item.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...updated[idx], ...item };
    } else {
      updated = [item, ...current];
    }
  } else {
    updated = [{ ...item, id: `j_${Date.now()}` }, ...current];
  }
  setLocal(STORAGE_KEYS.JOURNEY, updated);
  return updated;
}

export async function deleteJourney(id) {
  const current = getLocal(STORAGE_KEYS.JOURNEY, DEFAULT_JOURNEY);
  const updated = current.filter(j => j.id !== id);
  setLocal(STORAGE_KEYS.JOURNEY, updated);
  return updated;
}

export async function updateMessageStatus(id, updates) {
  const current = getLocal(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  const updated = current.map(m => m.id === id ? { ...m, ...updates } : m);
  setLocal(STORAGE_KEYS.MESSAGES, updated);
  return updated;
}

export async function deleteMessage(id) {
  const current = getLocal(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  const updated = current.filter(m => m.id !== id);
  setLocal(STORAGE_KEYS.MESSAGES, updated);
  return updated;
}

export async function getMediaAssets() {
  return getLocal(STORAGE_KEYS.MEDIA, []);
}

export async function uploadMediaAsset(asset) {
  const current = getLocal(STORAGE_KEYS.MEDIA, []);
  const newAsset = { ...asset, id: `media_${Date.now()}`, date: new Date().toISOString() };
  const updated = [newAsset, ...current];
  setLocal(STORAGE_KEYS.MEDIA, updated);
  return updated;
}

export async function deleteMediaAsset(id) {
  const current = getLocal(STORAGE_KEYS.MEDIA, []);
  const updated = current.filter(m => m.id !== id);
  setLocal(STORAGE_KEYS.MEDIA, updated);
  return updated;
}

export async function markMessageRead(id) {
  return updateMessageStatus(id, { read: true });
}
export async function getMediaList() {
  return getMediaAssets();
}
export async function saveMediaItem(item) {
  return uploadMediaAsset(item);
}
export async function deleteMediaItem(id) {
  return deleteMediaAsset(id);
}
