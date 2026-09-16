import { useState, useEffect } from 'react';

// Services
import {
  getProjects,
  getBooks,
  getAchievements,
  getSkills,
  getJourney,
  getSettings,
  getMessages
} from './services/database';
import { isAuthenticated } from './services/auth';

// WebGL & Preloader
import CinematicAtmosphere from './components/webgl/CinematicAtmosphere';
import Preloader from './components/public/Preloader';

// Public Chapters
import Navbar from './components/public/Navbar';
import Hero from './components/public/Hero';
import About from './components/public/About';
import WhatIBuild from './components/public/WhatIBuild';
import Projects from './components/public/Projects';
import ProjectModal from './components/public/ProjectModal';
import Journey from './components/public/Journey';
import Books from './components/public/Books';
import Achievements from './components/public/Achievements';
import FutureVision from './components/public/FutureVision';
import Contact from './components/public/Contact';
import ResumeModal from './components/public/ResumeModal';
import Footer from './components/public/Footer';
import NotFound from './components/public/NotFound';

// Admin CMS Modules
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminOverview from './components/admin/AdminOverview';
import ProjectsCMS from './components/admin/ProjectsCMS';
import BooksCMS from './components/admin/BooksCMS';
import AchievementsCMS from './components/admin/AchievementsCMS';
import SkillsCMS from './components/admin/SkillsCMS';
import JourneyCMS from './components/admin/JourneyCMS';
import ContentCMS from './components/admin/ContentCMS';
import MessagesInbox from './components/admin/MessagesInbox';
import MediaManager from './components/admin/MediaManager';
import SiteSettingsCMS from './components/admin/SiteSettingsCMS';

export default function App() {
  // Navigation & Route state
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [preloaderComplete, setPreloaderComplete] = useState(true);

  // Data states
  const [projects, setProjects] = useState([]);
  const [books, setBooks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [skills, setSkills] = useState([]);
  const [journey, setJourney] = useState([]);
  const [settings, setSettings] = useState(null);
  const [messages, setMessages] = useState([]);

  // Modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Admin CMS State
  const [adminTab, setAdminTab] = useState('overview');
  const [adminLoggedIn, setAdminLoggedIn] = useState(isAuthenticated());

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3200);
  };

  // Route Hash Listener
  useEffect(() => {
    const handleHashChange = () => {
      const current = window.location.hash || '#/';
      setRoute(current);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initial Data Fetching from Database Service
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          projsData,
          booksData,
          achsData,
          skillsData,
          journeyData,
          settingsData,
          msgsData
        ] = await Promise.all([
          getProjects(),
          getBooks(),
          getAchievements(),
          getSkills(),
          getJourney(),
          getSettings(),
          getMessages()
        ]);

        setProjects(projsData);
        setBooks(booksData);
        setAchievements(achsData);
        setSkills(skillsData);
        setJourney(journeyData);
        setSettings(settingsData);
        setMessages(msgsData);

        // Update document title if configured
        if (settingsData?.seoTitle) {
          document.title = settingsData.seoTitle;
        }
      } catch (err) {
        console.error('Failed to initialize portfolio database:', err);
      }
    };
    fetchData();
  }, []);

  // Sync auth state
  useEffect(() => {
    setAdminLoggedIn(isAuthenticated());
  }, [route]);

  // Navigate to Hash
  const navigateTo = (path) => {
    window.location.hash = path;
    setRoute(path);
  };

  /* =============================================================
     RENDER ADMIN CMS ROUTES
     ============================================================= */
  if (route.startsWith('#/admin')) {
    // If route is /admin/login or user is not logged in, render AdminLogin
    if (!adminLoggedIn) {
      return (
        <>
          <AdminLogin
            onLoginSuccess={(_session) => {
              setAdminLoggedIn(true);
              triggerToast(`Welcome back, Administrator.`);
              navigateTo('#/admin');
            }}
            onReturnHome={() => navigateTo('#/')}
          />
          {toastVisible && <div className="toast-notice">{toastMessage}</div>}
        </>
      );
    }

    // Authenticated CMS Portal
    const unreadMessagesCount = messages.filter(m => !m.read).length;

    return (
      <AdminLayout
        activeTab={adminTab}
        onSelectTab={setAdminTab}
        onLogout={() => {
          setAdminLoggedIn(false);
          triggerToast('Session terminated.');
          navigateTo('#/');
        }}
        onViewLiveSite={() => navigateTo('#/')}
        unreadCount={unreadMessagesCount}
      >
        {adminTab === 'overview' && (
          <AdminOverview
            projects={projects}
            books={books}
            achievements={achievements}
            skills={skills}
            messages={messages}
            onNavigateTab={setAdminTab}
          />
        )}
        {adminTab === 'projects' && (
          <ProjectsCMS
            projects={projects}
            onProjectsUpdated={setProjects}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'books' && (
          <BooksCMS
            books={books}
            onBooksUpdated={setBooks}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'achievements' && (
          <AchievementsCMS
            achievements={achievements}
            onAchievementsUpdated={setAchievements}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'skills' && (
          <SkillsCMS
            skills={skills}
            onSkillsUpdated={setSkills}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'journey' && (
          <JourneyCMS
            journey={journey}
            onJourneyUpdated={setJourney}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'content' && (
          <ContentCMS
            settings={settings}
            onSettingsUpdated={setSettings}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'messages' && (
          <MessagesInbox
            messages={messages}
            onMessagesUpdated={setMessages}
            onTriggerToast={triggerToast}
          />
        )}
        {adminTab === 'media' && (
          <MediaManager onTriggerToast={triggerToast} />
        )}
        {adminTab === 'settings' && (
          <SiteSettingsCMS
            settings={settings}
            onSettingsUpdated={setSettings}
            onTriggerToast={triggerToast}
          />
        )}

        {toastVisible && <div className="toast-notice">{toastMessage}</div>}
      </AdminLayout>
    );
  }

  // 404 Route
  if (route.startsWith('#/404')) {
    return <NotFound onReturnHome={() => navigateTo('#/')} />;
  }

  /* =============================================================
     RENDER PUBLIC CINEMATIC PORTFOLIO
     ============================================================= */
  return (
    <div className="page-wrapper">
      {/* 1. Cinematic Entry Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* 2. Interactive Three.js WebGL Atmosphere */}
      <CinematicAtmosphere />

      {/* 3. Navigation Bar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* 4. Public Portfolio Chapters */}
      <main>
        {/* Chapter 00: Cinematic Hero */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* Chapter 01: About Ishmeet */}
        <About settings={settings} onOpenResume={() => setResumeOpen(true)} />

        {/* Chapter 02: What I Build (Multidisciplinary Matrix) */}
        <WhatIBuild />

        {/* Chapter 03: Projects Showcase & Case Studies */}
        <Projects projects={projects} onSelectProject={setSelectedProject} setProjects={setProjects} />

        {/* Chapter 04: The Journey (Building in Public) */}
        <Journey journey={journey} />

        {/* Chapter 05: Books & Writing */}
        <Books books={books} setBooks={setBooks} />

        {/* Chapter 06: Honors & Achievements */}
        <Achievements achievements={achievements} onOpenResume={() => setResumeOpen(true)} />

        {/* Chapter 07: Future Vision */}
        <FutureVision
          visionText={settings?.futureVision}
          onContactClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Chapter 08: Contact & Collaboration */}
        <Contact
          settings={settings}
          onMessageSubmitted={() => {
            triggerToast('Message received! Stored in the portal inbox.');
            // Refresh messages list
            getMessages().then(setMessages);
          }}
        />
      </main>

      {/* 5. Minimal Editorial Footer */}
      <Footer settings={settings} onOpenResume={() => setResumeOpen(true)} />

      {/* 6. Deep Dive Project Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 7. Curriculum Vitae / Resume PDF Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* 8. Global Toast Feedback Notice */}
      {toastVisible && <div className="toast-notice">{toastMessage}</div>}
    </div>
  );
}
