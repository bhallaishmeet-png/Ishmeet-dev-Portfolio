# Ishmeet Bhalla — Cinematic 3D Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A high-performance cinematic personal portfolio, projects portal, and 3D literary showcase built for Ishmeet Bhalla.**  
*Class 10 E2 · Holy Child Public School · Session 2026–27*

[Explore Projects](#-live-projects-showcase) • [3D Published Books](#-published-books-showcase-3d-bribooks-shelf) • [Admin CMS](#-administrative-portal--cms) • [Quick Start](#-getting-started)

</div>

---

## 🌟 Highlights & Features

### ⛩️ Authentic Kage 3D Kyoto Temple Atmosphere
- **Three.js WebGL Engine**: Full-screen atmospheric Kyoto night walk inspired by ThreeUI *Kage*.
- **Live 3D Elements**: The Sanmon mountain temple hall with warm interior lanterns, a glowing vermilion moon, charred cypress eaves, stone stairs, and the torii gate.
- **Dynamic Particle Physics**: Real-time falling autumn maple leaves drifting through 3D space with natural turbulence.
- **Scroll-Driven Camera Traversal**: Smooth camera progression moving through temple thresholds as the user scrolls between chapters.
- **Cursor Parallax**: Responsive camera and lighting shifts reactive to pointer coordinates.
- **Post-Processing Shaders**: Cinematic vignette, depth haze, and film grain.

### 🚀 Live Projects Showcase
A curated directory of live web applications with direct external links, architecture badges, and an interactive creation modal:

| Project | Live URL | Focus Area & Architecture |
| :--- | :--- | :--- |
| **Jute Sutra** | [jutesutra.lovable.app](https://jutesutra.lovable.app/) | Sustainable jute craft commerce platform · React, Lovable, Tailwind CSS |
| **Sitemart** | [sitemart.lovable.app](https://sitemart.lovable.app/) | Digital marketplace and website solutions · Modern UI System, TypeScript |
| **Road Doctors** | [theroaddoctors.lovable.app](https://theroaddoctors.lovable.app/) | Civic infrastructure & hazard management · Interactive Map UI |
| **Cricket Score Board** | [score-board-cricket.lovable.app](https://score-board-cricket.lovable.app/) | Real-time interactive cricket score tracker · State Machine, Live Feeds |
| **Dobara Tech** | [dobara-tech.vercel.app](https://dobara-tech.vercel.app/) | Hardware refurbishment & circular tech solutions · Next.js, Vercel |

> **Interactive CMS Capability**: Click the **`+ Add Project`** button in the section header to publish new web projects directly from the browser with local persistence.

### 📖 Published Books Showcase (3D BriBooks Shelf)
An interactive 3D literary experience powered by **VengeanceUI** showcasing authored works published on BriBooks:

| Book Title | Bookstore Link | Genre & Description |
| :--- | :--- | :--- |
| **The Indian Festivals** | [BriBooks Store](https://www.bribooks.com/bookstore/the-indian-festivals-658c3aa619366/) | Cultural heritage, traditions, and festival chronicles |
| **The Last Spellbinder Part-1** | [BriBooks Store](https://www.bribooks.com/bookstore/the-last-spellbinder-by-ishmeet-bhalla/) | High fantasy adventure & mystical spellbinder saga |
| **The Last Hour Before Tomorrow** | [BriBooks Store](https://www.bribooks.com/bookstore/the-last-hour-before-tomorrow-by-ishmeet-bhalla/) | Speculative sci-fi & futuristic fiction narrative |

- **Interactive 3D Book Models**: Realistic 3D book covers, tilt physics, lighting highlights, and click inspection.
- **`+ Add Book` Modal**: Add future publications with cover links, synopsis, and bookstore URLs.

### 🎓 Verified Academic Profile & Record
- **Student**: Ishmeet Bhalla (Class 10 E2, Holy Child Public School, Session 2026–27)
- **Career Objective**: Motivated student interested in science, technology, entrepreneurship, and music. Eager to develop leadership, creativity, and problem-solving skills through learning and innovation.
- **Core Competencies**: Communication, Leadership, Teamwork, Critical Thinking, Problem Solving, Creativity, Digital Literacy.
- **Future Vision**: To become an entrepreneur in science and education by creating innovative STEM learning solutions.

### 🛡️ Administrative Portal & CMS
A protected administrative workspace accessible directly at `#/admin`:
- **Real-Time Content Management**: Edit project metadata, add authored titles, update achievements, and customize site parameters.
- **Message Center**: Inquiries submitted through the contact form are routed to the private admin inbox.
- **Security**: Salted SHA-256 password hashing with Web Crypto API and session token expiration.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | React 19.2 (Functional components & hooks) |
| **Build & Dev Engine** | Vite 8.1 + Rolldown bundler |
| **3D & WebGL Graphics** | Three.js (Shaders, Particle systems, Perspective camera) |
| **Styling & Design System** | Tailwind CSS v4 + Custom CSS Design Tokens |
| **Component Libraries** | VengeanceUI (3D Book Showcase), ThreeUI (Kage Atmosphere) |
| **Iconography** | Lucide React |
| **Animations** | Motion / Framer Motion |
| **Database & Persistence** | LocalStorage API + Optional Supabase Cloud sync |

---

## 📁 Repository Structure

```text
ishmeet-portfolio/
├── public/
│   ├── assets/                     # Portrait photographs & static images
│   ├── landing-pages/              # Kage 3D WebGL runtime & assets
│   │   ├── kage.html               # Kyoto mountain temple Three.js engine
│   │   └── secret-pathways-assets/ # Shaders, textures, and webp models
│   ├── favicon.png
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── admin/                  # Administrative CMS suite (Login, Overview, CMS)
│   │   ├── public/                 # Public portfolio sections
│   │   │   ├── Hero.jsx            # Cinematic chapter 00 identity
│   │   │   ├── About.jsx           # Chapter 01 profile & academic record
│   │   │   ├── WhatIBuild.jsx      # Chapter 02 multidisciplinary matrix
│   │   │   ├── Projects.jsx        # Chapter 03 live projects showcase
│   │   │   ├── Books.jsx           # Chapter 05 3D books & literary works
│   │   │   ├── FutureVision.jsx    # Chapter 08 entrepreneurial vision
│   │   │   └── Contact.jsx         # Chapter 09 contact & collaboration
│   │   ├── ui/
│   │   │   └── books-showcase.tsx  # VengeanceUI 3D book canvas component
│   │   └── webgl/
│   │       └── CinematicAtmosphere.jsx # Kage background controller
│   ├── lib/
│   │   └── utils.js                # Class utilities (cn / clsx / twMerge)
│   ├── services/
│   │   ├── auth.js                 # Admin authentication & SHA-256 hashing
│   │   └── database.js             # Projects, books, and profile data layer
│   ├── App.jsx                     # Root router & application state
│   ├── index.css                   # Tailwind v4 import & design system tokens
│   └── main.jsx                    # React root mounting
├── .gitignore                      # Production-ready git ignore rules
├── package.json                    # Dependencies & npm scripts
├── vite.config.js                  # Vite configuration & path aliases
└── README.md                       # Repository documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ / v22+ recommended)
- **npm**: v9.0.0 or later

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ishmeet-portfolio.git
cd ishmeet-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```
Spawns the local production preview server (default: [http://localhost:4173](http://localhost:4173)).

---

## 🔐 Admin Access

To access the administrator CMS:
1. Navigate to `#/admin` on your running port (e.g., [http://localhost:5173/#/admin](http://localhost:5173/#/admin)) or click the **Lock icon** in the top navigation bar.
2. Enter the default administrator credentials:
   - **Email**: `bhallaishmeet@gmail.com` *(or `admin@ishmeet.dev`)*
   - **Password**: `admin`
3. Credentials can be customized inside **Site Settings** in the CMS.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Designed & Developed for <b>Ishmeet Bhalla</b> · Kyoto Night Walk Aesthetic
</div>
