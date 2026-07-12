import { useState, useEffect, Fragment } from 'react';
import CircularText from './CircularText';
import ClickSpark from './ClickSpark';
import ElectricBorder from './ElectricBorder';
import { supabase, isSupabaseConfigured } from './supabaseClient';

// Seeding standard data
const DEFAULT_PROJECTS = [
  {
    id: "proj_1",
    name: "JuteSutra",
    description: "A highly aesthetic e-commerce portal selling eco-friendly, artisanal jute bags. Implements responsive grids, detailed catalogs, and high-performance load times.",
    tech: ["HTML5", "CSS3", "JavaScript", "E-Commerce"],
    url: "https://jutesutra.lovable.app",
    image: "/assets/jutesutra_preview.png"
  },
  {
    id: "proj_2",
    name: "SiteMart",
    description: "A digital template storefront designed for browsing, previewing, and buying ready-made web code layouts. Optimized for rapid styling loading and high density grids.",
    tech: ["HTML5", "CSS Modules", "JS ES6", "UI/UX Layouts"],
    url: "https://sitemart.lovable.app",
    image: "/assets/sitemart_preview.png"
  },
  {
    id: "proj_3",
    name: "The Road Doctors",
    description: "An enterprise lead-generation landing page for asphalt repairs and maintenance services. Focuses on appointment scheduling mockups and localization elements.",
    tech: ["HTML5", "Custom CSS", "Lead Forms", "Performance"],
    url: "https://theroaddoctors.lovable.app",
    image: "/assets/theroaddoctors_preview.png"
  }
];

const DEFAULT_REVIEWS = [
  {
    id: "rev_1",
    name: "Amit Sharma",
    avatarLetter: "A",
    target: "JuteSutra",
    rating: 5,
    comment: "Ishmeet built a phenomenal e-commerce site for our organic brand. The page speed is top-tier and our checkout conversions increased by 40%! An absolute pleasure to work with.",
    date: "2026-05-12"
  },
  {
    id: "rev_2",
    name: "Sarah Jenkins",
    avatarLetter: "S",
    target: "SiteMart",
    rating: 5,
    comment: "SiteMart's layout is incredibly clean and futuristic. Ishmeet translates complex UI requirements into working, responsive code instantly. Highly recommend him for business owners!",
    date: "2026-06-02"
  },
  {
    id: "rev_3",
    name: "Mr. Gupta",
    avatarLetter: "G",
    target: "The Road Doctors",
    rating: 4,
    comment: "Excellent lead generation landing page. Simple, responsive, and effectively structured to capture estimates. Ishmeet completed the project ahead of schedule and with clean documentation.",
    date: "2026-06-20"
  }
];

const DEFAULT_USERS = [
  {
    username: "admin",
    email: "admin@ishmeet.dev",
    password: "admin",
    provider: "Email",
    status: "Signed Out",
    joinDate: "2026-04-01"
  },
  {
    username: "amit_jute",
    email: "amit@jutesutra.com",
    password: "password123",
    provider: "Email",
    status: "Signed Out",
    joinDate: "2026-05-10"
  },
  {
    username: "sarah_j",
    email: "sarah.j@techstart.io",
    password: "password123",
    provider: "Email",
    status: "Signed Out",
    joinDate: "2026-05-30"
  }
];

function App() {
  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Projects state
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  // Auth states
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [bannedEmails, setBannedEmails] = useState(() => {
    const saved = localStorage.getItem('bannedEmails');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Reviews states
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  // Modal open states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Tab & Form states
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [adminTab, setAdminTab] = useState('users'); // 'users' | 'reviews' | 'projects'
  const [avatarFlipped, setAvatarFlipped] = useState(false);

  // Toast states
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Auth Password Eye states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Auth Inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);

  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupErrorText, setSignupErrorText] = useState('');
  const [signupErrorVisible, setSignupErrorVisible] = useState(false);

  // Review Inputs
  const [reviewTarget, setReviewTarget] = useState('Overall Portfolio');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Project Admin Management Inputs
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState(''); // comma-separated
  const [newProjUrl, setNewProjUrl] = useState('');
  const [newProjImage, setNewProjImage] = useState(''); // Base64 or URL
  const [editingProjectId, setEditingProjectId] = useState(null); // id or null
  const [dragOver, setDragOver] = useState(false);

  // 1. Initial Data Fetching from Supabase Cloud
  useEffect(() => {
    const syncWithCloud = async () => {
      if (!isSupabaseConfigured) return;

      try {
        // Fetch Projects
        const { data: dbProjs, error: errProjs } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: true });
        if (!errProjs && dbProjs && dbProjs.length > 0) {
          setProjects(dbProjs);
        }

        // Fetch Reviews
        const { data: dbReviews, error: errReviews } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        if (!errReviews && dbReviews) {
          const formattedReviews = dbReviews.map(r => ({
            id: r.id,
            name: r.name,
            avatarLetter: r.avatar_letter,
            target: r.target,
            rating: r.rating,
            comment: r.comment,
            date: r.date
          }));
          setReviews(formattedReviews);
        }

        // Fetch Users
        const { data: dbUsers, error: errUsers } = await supabase
          .from('users')
          .select('*');
        if (!errUsers && dbUsers) {
          const formattedUsers = dbUsers.map(u => ({
            username: u.username,
            email: u.email,
            password: u.password,
            provider: u.provider,
            status: u.status,
            joinDate: u.join_date
          }));
          setUsers(formattedUsers);
        }

        // Fetch Banned Emails
        const { data: dbBanned, error: errBanned } = await supabase
          .from('banned_emails')
          .select('email');
        if (!errBanned && dbBanned) {
          setBannedEmails(dbBanned.map(b => b.email.toLowerCase()));
        }
      } catch (err) {
        console.error("Cloud DB Synchronize failed: ", err);
      }
    };

    syncWithCloud();
  }, []);

  // Synchronize LocalStorage as fallback
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('bannedEmails', JSON.stringify(bannedEmails));
    }
  }, [bannedEmails]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Toast Utility
  const triggerToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    triggerToast(`Switched to ${nextTheme} mode`);
  };

  // Clipboard copy email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bhallaishmeet@gmail.com").then(() => {
      triggerToast("Email address copied to clipboard!");
    }).catch(err => {
      console.error(err);
      alert("Copy email: bhallaishmeet@gmail.com");
    });
  };

  // Standard Login (Checks banned status and tracks Online state)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginErrorVisible(false);

    if (!loginEmail || !loginPassword) {
      alert("Please fill in all credentials.");
      return;
    }

    if (bannedEmails.includes(loginEmail.trim().toLowerCase())) {
      alert("This account has been banned by the administrator.");
      return;
    }

    const userIndex = users.findIndex(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword);
    
    if (userIndex !== -1) {
      const matchedUser = users[userIndex];

      // Update state status to Online
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...matchedUser, status: 'Online' };
      setUsers(updatedUsers);

      // Save user Online status in DB
      if (isSupabaseConfigured) {
        await supabase
          .from('users')
          .update({ status: 'Online' })
          .eq('email', matchedUser.email);
      } else {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }

      setCurrentUser({
        username: matchedUser.username,
        email: matchedUser.email,
        provider: matchedUser.provider
      });
      setAuthModalOpen(false);
      triggerToast(`Welcome back, ${matchedUser.username}!`);
      
      // Reset
      setLoginEmail('');
      setLoginPassword('');
      setShowLoginPassword(false);
    } else {
      setLoginErrorVisible(true);
    }
  };

  // Robust Sign-up Registration (Validates, matches passwords and sets Online state)
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupErrorVisible(false);

    if (!signupUsername || !signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupErrorText("Please fill in all registration fields.");
      setSignupErrorVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail.trim())) {
      setSignupErrorText("Please enter a valid email address.");
      setSignupErrorVisible(true);
      return;
    }

    if (signupPassword.length < 6) {
      setSignupErrorText("Password must be at least 6 characters.");
      setSignupErrorVisible(true);
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupErrorText("Passwords do not match. Please verify.");
      setSignupErrorVisible(true);
      return;
    }

    if (bannedEmails.includes(signupEmail.trim().toLowerCase())) {
      setSignupErrorText("This email address has been banned.");
      setSignupErrorVisible(true);
      return;
    }

    if (users.find(u => u.email.toLowerCase() === signupEmail.trim().toLowerCase())) {
      setSignupErrorText("User already exists with this email address.");
      setSignupErrorVisible(true);
      return;
    }

    const newUser = {
      username: signupUsername.trim().toLowerCase(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
      provider: "Email",
      status: "Online",
      joinDate: new Date().toISOString().split('T')[0]
    };

    // Save to Cloud DB
    if (isSupabaseConfigured) {
      await supabase
        .from('users')
        .insert([{
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          provider: newUser.provider,
          status: newUser.status,
          join_date: newUser.joinDate
        }]);
    }

    const clientUser = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      provider: newUser.provider,
      status: newUser.status,
      joinDate: newUser.joinDate
    };

    const nextUsers = [...users, clientUser];
    setUsers(nextUsers);
    setCurrentUser({
      username: newUser.username,
      email: newUser.email,
      provider: newUser.provider
    });

    if (!isSupabaseConfigured) {
      localStorage.setItem('users', JSON.stringify(nextUsers));
    }

    setAuthModalOpen(false);
    triggerToast(`Account created! Welcome, ${newUser.username}`);
    
    // Reset
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setShowSignupPassword(false);
  };

  // Sign out updates status to Signed Out in DB
  const handleSignOutSubmit = async () => {
    if (!currentUser) return;
    const email = currentUser.email;

    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], status: 'Signed Out' };
      setUsers(updatedUsers);

      if (isSupabaseConfigured) {
        await supabase
          .from('users')
          .update({ status: 'Signed Out' })
          .eq('email', email);
      } else {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }

    setCurrentUser(null);
    triggerToast("Logged out successfully");
  };

  // Review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const newReview = {
      id: "rev_" + Date.now(),
      name: currentUser.username,
      avatar_letter: currentUser.username.charAt(0).toUpperCase(),
      target: reviewTarget,
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const clientReview = {
      id: newReview.id,
      name: newReview.name,
      avatarLetter: newReview.avatar_letter,
      target: newReview.target,
      rating: newReview.rating,
      comment: newReview.comment,
      date: newReview.date
    };

    const nextReviews = [clientReview, ...reviews];
    setReviews(nextReviews);

    // Save to DB
    if (isSupabaseConfigured) {
      await supabase
        .from('reviews')
        .insert([newReview]);
    } else {
      localStorage.setItem('reviews', JSON.stringify(nextReviews));
    }

    triggerToast("Thank you for your feedback!");

    // Reset Form
    setReviewComment('');
    setReviewRating(5);
  };

  // Review Moderation deletion
  const handleDeleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      setReviews(prev => prev.filter(rev => rev.id !== id));

      if (isSupabaseConfigured) {
        await supabase
          .from('reviews')
          .delete()
          .eq('id', id);
      } else {
        const local = JSON.parse(localStorage.getItem('reviews') || '[]');
        localStorage.setItem('reviews', JSON.stringify(local.filter(r => r.id !== id)));
      }

      triggerToast("Review deleted successfully");
    }
  };

  // Admin User Removal
  const handleRemoveUser = async (email) => {
    if (email.toLowerCase() === 'admin@ishmeet.dev') {
      alert("You cannot remove the system administrator!");
      return;
    }

    if (window.confirm(`Are you sure you want to delete the user account for ${email}?`)) {
      const nextUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
      setUsers(nextUsers);

      if (isSupabaseConfigured) {
        await supabase
          .from('users')
          .delete()
          .eq('email', email);
      } else {
        localStorage.setItem('users', JSON.stringify(nextUsers));
      }

      // Force Sign Out if deleted user is currently active
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        setCurrentUser(null);
      }

      triggerToast(`Account for ${email} has been deleted.`);
    }
  };

  // Admin User Banning (Updates status to Banned and writes to banned list)
  const handleBanUser = async (email) => {
    if (email.toLowerCase() === 'admin@ishmeet.dev') {
      alert("You cannot ban the system administrator!");
      return;
    }

    if (window.confirm(`Are you sure you want to ban ${email}? This will sign them out and block future logins.`)) {
      const nextBanned = [...bannedEmails, email.toLowerCase()];
      setBannedEmails(nextBanned);

      // Set user status to Banned in local state
      const updatedUsers = users.map(u => 
        u.email.toLowerCase() === email.toLowerCase() ? { ...u, status: 'Banned' } : u
      );
      setUsers(updatedUsers);

      if (isSupabaseConfigured) {
        await supabase
          .from('banned_emails')
          .insert([{ email: email.toLowerCase() }]);

        await supabase
          .from('users')
          .update({ status: 'Banned' })
          .eq('email', email);
      } else {
        localStorage.setItem('bannedEmails', JSON.stringify(nextBanned));
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }

      // Force Sign Out if banned user is currently active
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        setCurrentUser(null);
      }

      triggerToast(`User ${email} has been banned.`);
    }
  };

  // Admin User Unbanning (Removes blacklist and resets status to Signed Out)
  const handleUnbanUser = async (email) => {
    if (window.confirm(`Are you sure you want to unban ${email}?`)) {
      const nextBanned = bannedEmails.filter(e => e.toLowerCase() !== email.toLowerCase());
      setBannedEmails(nextBanned);

      const updatedUsers = users.map(u => 
        u.email.toLowerCase() === email.toLowerCase() ? { ...u, status: 'Signed Out' } : u
      );
      setUsers(updatedUsers);

      if (isSupabaseConfigured) {
        await supabase
          .from('banned_emails')
          .delete()
          .eq('email', email.toLowerCase());

        await supabase
          .from('users')
          .update({ status: 'Signed Out' })
          .eq('email', email);
      } else {
        localStorage.setItem('bannedEmails', JSON.stringify(nextBanned));
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }

      triggerToast(`User ${email} has been unbanned.`);
    }
  };

  // Read Dropped / Pasted Image files as Base64 Data URL
  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert("Invalid file type. Please upload or paste a valid image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewProjImage(e.target.result); // Base64 string
      triggerToast("Image file parsed successfully!");
    };
    reader.readAsDataURL(file);
  };

  // Paste Event Handler for Clipboard images (Ctrl + V)
  const handleClipboardPaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleImageFile(file);
        break;
      }
    }
  };

  // Admin Project Creation & Editing form submission
  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    if (!newProjName || !newProjDesc || !newProjUrl) {
      alert("Please enter project name, description and live URL.");
      return;
    }

    const techArray = newProjTech
      ? newProjTech.split(',').map(item => item.trim()).filter(item => item.length > 0)
      : ["Custom Website"];

    const projImageValue = newProjImage || "/assets/jutesutra_preview.png";

    if (editingProjectId) {
      // Edit mode: UPDATE query
      const updatedProject = {
        id: editingProjectId,
        name: newProjName.trim(),
        description: newProjDesc.trim(),
        tech: techArray,
        url: newProjUrl.trim(),
        image: projImageValue
      };

      const nextProjects = projects.map(p => p.id === editingProjectId ? updatedProject : p);
      setProjects(nextProjects);

      if (isSupabaseConfigured) {
        await supabase
          .from('projects')
          .update({
            name: updatedProject.name,
            description: updatedProject.description,
            tech: updatedProject.tech,
            url: updatedProject.url,
            image: updatedProject.image
          })
          .eq('id', editingProjectId);
      } else {
        localStorage.setItem('projects', JSON.stringify(nextProjects));
      }

      triggerToast(`Project "${updatedProject.name}" updated successfully!`);
      setEditingProjectId(null);
    } else {
      // Add mode: INSERT query
      const newProject = {
        id: "proj_" + Date.now(),
        name: newProjName.trim(),
        description: newProjDesc.trim(),
        tech: techArray,
        url: newProjUrl.trim(),
        image: projImageValue
      };

      const nextProjects = [...projects, newProject];
      setProjects(nextProjects);

      if (isSupabaseConfigured) {
        await supabase
          .from('projects')
          .insert([newProject]);
      } else {
        localStorage.setItem('projects', JSON.stringify(nextProjects));
      }

      triggerToast(`Project "${newProject.name}" added successfully!`);
    }

    // Reset Form
    setNewProjName('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjUrl('');
    setNewProjImage('');
  };

  // Populate form with selected project for editing
  const handleStartEditProject = (proj) => {
    setNewProjName(proj.name);
    setNewProjDesc(proj.description);
    setNewProjTech(proj.tech.join(', '));
    setNewProjUrl(proj.url);
    setNewProjImage(proj.image || '');
    setEditingProjectId(proj.id);

    // Scroll project editing section title into viewport
    const element = document.getElementById('admin-project-form-title');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setNewProjName('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjUrl('');
    setNewProjImage('');
    triggerToast("Edit cancelled");
  };

  // Admin Project Deletion
  const handleDeleteProject = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the project "${name}"?`)) {
      const nextProjects = projects.filter(proj => proj.id !== id);
      setProjects(nextProjects);

      if (isSupabaseConfigured) {
        await supabase
          .from('projects')
          .delete()
          .eq('id', id);
      } else {
        localStorage.setItem('projects', JSON.stringify(nextProjects));
      }

      // If deleted project was currently being edited, reset form
      if (editingProjectId === id) {
        setEditingProjectId(null);
        setNewProjName('');
        setNewProjDesc('');
        setNewProjTech('');
        setNewProjUrl('');
        setNewProjImage('');
      }

      triggerToast("Project deleted successfully");
    }
  };

  // Stats Calculations
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const getStarsHTML = (rating) => {
    return Array.from({ length: 5 }, (_, i) => i < rating ? "★" : "☆").join(" ");
  };

  return (
    <ClickSpark sparkColor={theme === 'dark' ? '#ffffff' : '#000000'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      {/* Header & Navigation */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">
            <span className="logo-dot"></span>
            ISHMEET.DEV
          </a>
          <nav className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            {currentUser?.email === 'admin@ishmeet.dev' && (
              <a href="#admin-section" className="nav-link">Admin Panel</a>
            )}
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          <div className="nav-actions">
            <button id="theme-toggle" className="btn-icon" onClick={toggleTheme} aria-label="Toggle dark/light theme">
              {theme === 'dark' ? (
                <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: 24, height: 24, display:'block'}}>
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: 24, height: 24, display:'block'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
            <button className="btn btn-secondary" onClick={() => setResumeModalOpen(true)}>Resume</button>
            {currentUser ? (
              <button className="btn btn-primary" onClick={handleSignOutSubmit}>Sign Out</button>
            ) : (
              <button className="btn btn-primary" onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }}>Sign In</button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-content">
        
        {/* Hero Section */}
        <section id="about" className="hero-section">
          <div className="hero-container">
            <div className="hero-text">
              <div className="badge">Open to Projects</div>
              <h1 className="hero-title">Crafting digital products that <span className="text-gradient">drive business growth</span></h1>
              <p className="hero-description">
                Hi, I'm <strong>Ishmeet Bhalla</strong>, a Student Innovator, Web Developer, and Future Entrepreneur based in India. I design, build, and sell high-converting, premium websites tailored to help business owners establish a powerful online presence.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">View My Projects</a>
                <a href="#contact" className="btn btn-outline">Let's Connect</a>
              </div>
            </div>

            {/* Doodle to Real Flip Avatar - Concentric size 260px */}
            <div className="hero-avatar">
              <div className="avatar-wrapper-relative">
                {/* Circular Text border - sits perfectly on the outer boundary (135px radius), bolded and highlighted */}
                <CircularText 
                  text="ISHMEET BHALLA • STUDENT • CREATOR • WEB DEVELOPER • INNOVATOR • " 
                  spinDuration={24} 
                  onHover="speedUp" 
                  className="doodle-circular-text" 
                />

                <div className={`avatar-card-container ${avatarFlipped ? 'flipped' : ''}`} onClick={() => setAvatarFlipped(!avatarFlipped)}>
                  <div className="avatar-card">
                    {/* Front: Doodle Image restored to previous version doodle_photo.png */}
                    <div className="avatar-front">
                      <img src="/assets/doodle_photo.png" alt="Ishmeet Bhalla Doodle Illustration" className="avatar-img" />
                      <div className="avatar-overlay">
                        <span className="avatar-label">Illustration Mode</span>
                      </div>
                    </div>
                    {/* Back: Real Photo */}
                    <div className="avatar-back">
                      <img src="/assets/real_photo.jpg" alt="Ishmeet Bhalla Real Photo" className="avatar-img" />
                      <div className="avatar-overlay">
                        <span className="avatar-label">Real Photo Mode</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="avatar-hint">Click my avatar to flip and see the real me!</p>
            </div>
          </div>

          {/* Social Links & Tooltips - Profile image is `/assets/real_photo.jpg` for all social previews */}
          <div className="social-links-container">
            <p className="social-label">Find me on</p>
            <div className="social-buttons">
              {/* LinkedIn: avatar is real_photo.jpg */}
              <div className="social-btn-wrapper">
                <a href="https://www.linkedin.com/in/ishmeet-bhalla-053443390" target="_blank" rel="noreferrer" className="social-btn" id="social-linkedin" aria-label="LinkedIn Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <div className="hover-preview" id="preview-linkedin">
                  <div className="preview-header">
                    <img src="/assets/real_photo.jpg" alt="Avatar" className="preview-avatar" />
                    <div className="preview-meta">
                      <h4 className="preview-name">Ishmeet Bhalla</h4>
                      <p className="preview-handle">LinkedIn Profile</p>
                    </div>
                    <span className="preview-badge">Connect</span>
                  </div>
                  <p className="preview-bio" style={{fontSize:'0.75rem'}}>
                    Student • Musician • Writer • Science Experiment & Innovation Enthusiast | Passionate About Creating & Discovering
                  </p>
                  <p className="preview-bio" style={{fontSize:'0.75rem', marginTop:4, color:'var(--text-secondary)', fontWeight:'600'}}>
                    🏢 CONSAT ORAHI<br />
                    🏫 Holy Child Public School, Rewari
                  </p>
                  <div className="preview-stats">
                    <div className="preview-stat">
                      <strong>23</strong>
                      <span>Connections</span>
                    </div>
                    <div className="preview-stat">
                      <strong>15+</strong>
                      <span>Projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram: avatar is real_photo.jpg */}
              <div className="social-btn-wrapper">
                <a href="https://www.instagram.com/ishmeet.bhalla2011/" target="_blank" rel="noreferrer" className="social-btn" id="social-instagram" aria-label="Instagram Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <div className="hover-preview" id="preview-instagram">
                  <div className="preview-header">
                    <img src="/assets/real_photo.jpg" alt="Avatar" className="preview-avatar" />
                    <div className="preview-meta">
                      <h4 className="preview-name">Ishmeet bhalla</h4>
                      <p className="preview-handle">@ishmeet.bhalla2011</p>
                    </div>
                    <span className="preview-badge preview-badge-insta">Follow</span>
                  </div>
                  <p className="preview-bio" style={{fontSize:'0.8rem'}}>
                    🎹 Musician/band<br />
                    🚀 Founder of @roaddocs.officiall<br />
                    💻 CTO at @roaddocs.officiall<br />
                    📺 youtube.com/@ishmeetbhalla7009
                  </p>
                  <div className="preview-stats">
                    <div className="preview-stat">
                      <strong>34</strong>
                      <span>Posts</span>
                    </div>
                    <div className="preview-stat">
                      <strong>104</strong>
                      <span>Followers</span>
                    </div>
                    <div className="preview-stat">
                      <strong>61</strong>
                      <span>Following</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pinterest: avatar is real_photo.jpg */}
              <div className="social-btn-wrapper">
                <a href="https://in.pinterest.com/bhallaishmeet/" target="_blank" rel="noreferrer" className="social-btn" id="social-pinterest" aria-label="Pinterest Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.077 3.143 9.414 7.583 11.185-.105-.945-.199-2.396.041-3.429.219-.937 1.411-5.969 1.411-5.969s-.359-.722-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <div className="hover-preview" id="preview-pinterest">
                  <div className="preview-header">
                    <img src="/assets/real_photo.jpg" alt="Avatar" className="preview-avatar" />
                    <div className="preview-meta">
                      <h4 className="preview-name">Ishmeet Bhalla</h4>
                      <p className="preview-handle">@bhallaishmeet</p>
                    </div>
                    <span className="preview-badge preview-badge-pin">Save</span>
                  </div>
                  <p className="preview-bio" style={{fontSize:'0.8rem'}}>
                    📌 Keyboard / Guitar chords (Am, Em sheets)<br />
                    📚 Books (Unwritten by Alicia J. Novo)<br />
                    🎨 Doodle layouts & cartoon sketches
                  </p>
                  <div className="preview-stats">
                    <div className="preview-stat">
                      <strong>1</strong>
                      <span>Following</span>
                    </div>
                    <div className="preview-stat">
                      <strong>10+</strong>
                      <span>Boards</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Icon */}
              <div className="social-btn-wrapper" id="contact-wrapper">
                <button className="social-btn" id="social-email" onClick={handleCopyEmail} aria-label="Send Email">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </button>
                <div className="hover-preview" id="preview-email">
                  <div className="preview-header">
                    <svg className="preview-email-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:24, height:24}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <div className="preview-meta">
                      <h4 className="preview-name">Direct Contact</h4>
                      <p className="preview-handle" id="email-text">bhallaishmeet@gmail.com</p>
                    </div>
                  </div>
                  <div className="preview-actions">
                    <button className="btn btn-secondary btn-sm" onClick={handleCopyEmail}>Copy Address</button>
                    <a href="mailto:bhallaishmeet@gmail.com" className="btn btn-primary btn-sm btn-center-text">Open Mail</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Bordered by ElectricBorder */}
        <section id="projects" className="section projects-section">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Real-world production sites designed for optimal conversions and premium aesthetics.</p>

          <div className="projects-grid">
            {projects.map((proj) => (
              <ElectricBorder 
                key={proj.id} 
                color={theme === 'dark' ? '#ffffff' : '#000000'} 
                speed={1.0} 
                chaos={0.12} 
                borderRadius={20}
                style={{ width: '100%', height: '100%' }}
              >
                <div className="project-card" style={{ height: '100%', border: 'none' }}>
                  <div className="project-image-wrapper">
                    <img src={proj.image} alt={`${proj.name} Website Mockup`} className="project-image" />
                    <div className="project-image-overlay">
                      <span className="view-tag">Live Product</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-name">{proj.name}</h3>
                    <p className="project-description">{proj.description}</p>
                    <div className="project-tech">
                      {proj.tech.map((t, index) => (
                        <span className="tech-tag" key={index}>{t}</span>
                      ))}
                    </div>
                    <a href={proj.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-full-width">
                      Visit Live Site
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="arrow-icon" style={{width:16, height:16}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="section reviews-section">
          <h2 className="section-title">Client Reviews & Feedback</h2>
          <p className="section-subtitle">What business owners and developers say about my work. You can log in to share your experience!</p>

          <div className="reviews-container">
            {/* Stats Summary */}
            <div className="reviews-stats-summary">
              <div className="rating-large">{averageRating}</div>
              <div className="rating-stars">{getStarsHTML(Math.round(parseFloat(averageRating)))}</div>
              <p className="rating-count">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
            </div>

            {/* Review Form Card */}
            <div className="review-form-card glass-panel">
              {!currentUser ? (
                // State: Logged Out
                <div className="auth-required-panel">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lock-icon" style={{width:48, height:48}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <h3>Leave a Review</h3>
                  <p>Sign in or Sign up to write a review for Ishmeet's projects or portfolio.</p>
                  <button className="btn btn-primary" onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }}>Sign In / Sign Up</button>
                </div>
              ) : (
                // State: Logged In
                <div className="review-form-panel">
                  <div className="user-greeting">
                    <span>Logged in as <strong>{currentUser.username}</strong></span>
                    <button className="btn-link" onClick={handleSignOutSubmit}>Sign Out</button>
                  </div>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="form-group">
                      <label htmlFor="review-target">What are you reviewing?</label>
                      <select id="review-target" value={reviewTarget} onChange={(e) => setReviewTarget(e.target.value)} required>
                        <option value="Overall Portfolio">Overall Portfolio / Ishmeet</option>
                        {projects.map(p => (
                          <option key={p.id} value={p.name}>{p.name} Website</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Your Rating</label>
                      <div className="rating-input-stars">
                        {[5, 4, 3, 2, 1].map((val) => (
                          <Fragment key={val}>
                            <input 
                              type="radio" 
                              id={`star${val}`} 
                              name="user-rating" 
                              value={val} 
                              checked={reviewRating === val}
                              onChange={() => setReviewRating(val)}
                              required 
                            />
                            <label htmlFor={`star${val}`} title={`${val} stars`}>★</label>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="review-comment">Review Content</label>
                      <textarea 
                        id="review-comment" 
                        value={reviewComment} 
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write your review here. What did you think about the design, speed, and usability?" 
                        rows="4" 
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full-width">Submit Review</button>
                  </form>
                </div>
              )}
            </div>

            {/* Reviews Grid */}
            <div className="reviews-list-container">
              {reviews.length === 0 ? (
                <p style={{gridColumn:'span 2', textAlign:'center', color:'var(--text-muted)', fontStyle:'italic'}}>No reviews yet. Be the first to write one!</p>
              ) : (
                reviews.map((rev) => (
                  <div className="review-item" key={rev.id}>
                    <div className="review-header-info">
                      <div className="reviewer-user">
                        <div className="reviewer-avatar">{rev.avatarLetter}</div>
                        <div>
                          <span className="reviewer-name">{rev.name}</span>
                          <div className="review-target-badge">{rev.target}</div>
                        </div>
                      </div>
                      <div className="review-item-stars" style={{color:'#fbbf24'}}>{getStarsHTML(rev.rating)}</div>
                    </div>
                    <p className="review-comment">"{rev.comment}"</p>
                    <span className="review-date">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Admin Dashboard (admin user only) */}
        {currentUser?.email === 'admin@ishmeet.dev' && (
          <section id="admin-section" className="section admin-section">
            <div className="admin-panel-card glass-panel">
              <div className="admin-header">
                <h2>Admin Control Panel</h2>
                <span className="admin-badge">System Administrator</span>
              </div>
              <p className="admin-intro">Welcome back, Ishmeet. You can monitor registrations, moderate reviews, and manage your projects.</p>

              <div className="admin-tabs">
                <button 
                  className={`admin-tab-btn ${adminTab === 'users' ? 'active' : ''}`}
                  onClick={() => setAdminTab('users')}
                >
                  Registered Users
                </button>
                <button 
                  className={`admin-tab-btn ${adminTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setAdminTab('reviews')}
                >
                  Moderate Reviews
                </button>
                <button 
                  className={`admin-tab-btn ${adminTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setAdminTab('projects')}
                >
                  Manage Projects
                </button>
              </div>

              <div className="admin-tab-content">
                {/* Pane: Users */}
                {adminTab === 'users' && (
                  <div className="admin-pane" id="pane-users">
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Provider</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, idx) => (
                            <tr key={idx}>
                              <td><strong>{user.username}</strong></td>
                              <td>{user.email}</td>
                              <td>
                                <span className="tech-tag" style={{
                                  background: 'var(--primary-glow)',
                                  color: 'var(--primary-color)'
                                }}>
                                  {user.provider}
                                </span>
                              </td>
                              <td>
                                <span className={`status-badge ${user.status === 'Online' ? 'status-online' : user.status === 'Banned' ? 'status-banned' : 'status-offline'}`}>
                                  {user.status || 'Signed Out'}
                                </span>
                              </td>
                              <td>
                                {user.email.toLowerCase() !== 'admin@ishmeet.dev' ? (
                                  <div style={{display:'flex', gap:'6px'}}>
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveUser(user.email)}>Remove</button>
                                    {user.status !== 'Banned' ? (
                                      <button className="btn btn-danger btn-sm" onClick={() => handleBanUser(user.email)}>Ban</button>
                                    ) : (
                                      <button className="btn btn-unban btn-sm" onClick={() => handleUnbanUser(user.email)}>Unban</button>
                                    )}
                                  </div>
                                ) : (
                                  <span style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>System Admin</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Pane: Reviews Moderation */}
                {adminTab === 'reviews' && (
                  <div className="admin-pane" id="pane-reviews">
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Reviewer</th>
                            <th>Target</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.map((rev) => (
                            <tr key={rev.id}>
                              <td><strong>{rev.name}</strong></td>
                              <td><span className="tech-tag">{rev.target}</span></td>
                              <td><span style={{color:'#fbbf24', fontWeight:'bold'}}>{rev.rating} ★</span></td>
                              <td style={{maxWidth:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} title={rev.comment}>
                                {rev.comment}
                              </td>
                              <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReview(rev.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Pane: Manage Projects */}
                {adminTab === 'projects' && (
                  <div className="admin-pane" id="pane-projects" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem'}}>
                    {/* Left: Add/Edit Project Form */}
                    <div className="project-form-card" style={{borderRight:'1px solid var(--border-color)', paddingRight:'2rem'}}>
                      <h3 id="admin-project-form-title" style={{marginBottom:'1rem'}}>
                        {editingProjectId ? "Edit Project" : "Add New Project"}
                      </h3>
                      <form onSubmit={handleAddProjectSubmit} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <div className="form-group">
                          <label htmlFor="proj-name">Project Name</label>
                          <input 
                            type="text" 
                            id="proj-name" 
                            value={newProjName}
                            onChange={(e) => setNewProjName(e.target.value)}
                            placeholder="e.g. Portfolio Site v2" 
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="proj-desc">Description</label>
                          <textarea 
                            id="proj-desc" 
                            value={newProjDesc}
                            onChange={(e) => setNewProjDesc(e.target.value)}
                            placeholder="Briefly describe what this website accomplishes..." 
                            rows="3" 
                            required
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="proj-tech">Tech Stack (comma-separated)</label>
                          <input 
                            type="text" 
                            id="proj-tech" 
                            value={newProjTech}
                            onChange={(e) => setNewProjTech(e.target.value)}
                            placeholder="e.g. React, CSS Modules, Motion" 
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="proj-url">Live URL</label>
                          <input 
                            type="url" 
                            id="proj-url" 
                            value={newProjUrl}
                            onChange={(e) => setNewProjUrl(e.target.value)}
                            placeholder="https://example.com" 
                            required 
                          />
                        </div>

                        {/* Drag and Drop / Paste / Upload Image Field */}
                        <div className="form-group">
                          <label>Project Cover Image</label>
                          <input 
                            type="file" 
                            id="proj-file-input" 
                            accept="image/*" 
                            onChange={(e) => { if (e.target.files) handleImageFile(e.target.files[0]); }} 
                            style={{display: 'none'}} 
                          />
                          <div 
                            className={`image-drop-zone ${dragOver ? 'dragover' : ''}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files) handleImageFile(e.dataTransfer.files[0]); }}
                            onPaste={handleClipboardPaste}
                            onClick={() => document.getElementById('proj-file-input').click()}
                            tabIndex={0}
                          >
                            {newProjImage ? (
                              <div className="image-preview-wrapper" onClick={(e) => e.stopPropagation()}>
                                <img src={newProjImage} alt="Uploaded Project Thumbnail" className="image-preview-thumbnail" />
                                <button type="button" className="btn-remove-preview" onClick={() => setNewProjImage('')}>&times;</button>
                              </div>
                            ) : (
                              <div className="drop-zone-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:36, height:36, color:'var(--text-muted)'}}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 8.25h21a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0022.5 3H1.5A2.25 2.25 0 00-.75 5.25v13.5A2.25 2.25 0 001.5 21z" />
                                </svg>
                                <span>Drag & drop image here, paste (Ctrl+V) or click to browse</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{display:'flex', gap:'8px', marginTop:'0.5rem'}}>
                          <button type="submit" className="btn btn-primary" style={{flex: 1}}>
                            {editingProjectId ? "Update Project" : "Add Project"}
                          </button>
                          {editingProjectId && (
                            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Right: Existing Projects & Editing list */}
                    <div>
                      <h3 style={{marginBottom:'1rem'}}>Moderate Existing Projects</h3>
                      <div className="table-responsive">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Project Name</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map(p => (
                              <tr key={p.id}>
                                <td><strong>{p.name}</strong></td>
                                <td>
                                  <div style={{display: 'flex', gap: '6px'}}>
                                    <button 
                                      className="btn btn-edit btn-sm" 
                                      onClick={() => handleStartEditProject(p)}
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      className="btn btn-danger btn-sm" 
                                      onClick={() => handleDeleteProject(p.id, p.name)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="contact-box glass-panel">
            <h2>Start a Project</h2>
            <p>Are you a business owner looking for a premium website that loads fast, ranks well on Google, and converts visitors into loyal clients?</p>
            <div className="contact-actions">
              <a href="mailto:bhallaishmeet@gmail.com" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="btn-icon-inline" style={{width:18, height:18}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Email Me Directly
              </a>
              <button className="btn btn-outline" onClick={handleCopyEmail}>Copy Email Address</button>
            </div>
            <p className="contact-email-text">bhallaishmeet@gmail.com</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <p className="footer-copy">&copy; 2026 Ishmeet Bhalla. All Rights Reserved.</p>
          <p className="footer-credits">Curiosity fuels discovery. Creativity drives innovation.</p>
        </div>
      </footer>

      {/* Authenticator Modal - Google Sign-In elements removed */}
      {authModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setAuthModalOpen(false); }}>
          <div className="modal-card auth-modal-card glass-panel">
            <button className="modal-close" onClick={() => setAuthModalOpen(false)} aria-label="Close modal">&times;</button>
            
            <div className="auth-tabs">
              <button className={`auth-tab-btn ${authTab === 'login' ? 'active' : ''}`} onClick={() => setAuthTab('login')}>Sign In</button>
              <button className={`auth-tab-btn ${authTab === 'signup' ? 'active' : ''}`} onClick={() => setAuthTab('signup')}>Sign Up</button>
            </div>

            <div className="auth-forms-container">
              {authTab === 'login' ? (
                // Sign In Form
                <form onSubmit={handleLoginSubmit} className="auth-form">
                  <h3 className="auth-form-title">Welcome Back</h3>
                  <p className="auth-form-subtitle">Enter your email and password to sign in.</p>
                  {loginErrorVisible && <div className="form-error">Invalid email or password.</div>}
                  
                  <div className="form-group">
                    <label htmlFor="login-email">Email Address</label>
                    <input type="email" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <div className="password-input-wrapper">
                      <input 
                        type={showLoginPassword ? "text" : "password"} 
                        id="login-password" 
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)} 
                        placeholder="••••••••" 
                        required 
                      />
                      <button 
                        type="button" 
                        className="btn-password-toggle" 
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showLoginPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:20, height:20}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3-3.671-3.671m0-3.399a3 3 0 0 0-3.399 3.399m-1.42-1.42 3.65 3.65" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:20, height:20}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full-width">Sign In</button>
                </form>
              ) : (
                // Sign Up Form (includes Confirm Password field)
                <form onSubmit={handleSignupSubmit} className="auth-form">
                  <h3 className="auth-form-title">Create Account</h3>
                  <p className="auth-form-subtitle">Sign up to leave reviews and save your profile.</p>
                  {signupErrorVisible && <div className="form-error">{signupErrorText}</div>}

                  <div className="form-group">
                    <label htmlFor="signup-username">Username</label>
                    <input type="text" id="signup-username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} placeholder="johndoe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-email">Email Address</label>
                    <input type="email" id="signup-email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-password">Password (min 6 characters)</label>
                    <div className="password-input-wrapper">
                      <input 
                        type={showSignupPassword ? "text" : "password"} 
                        id="signup-password" 
                        value={signupPassword} 
                        onChange={(e) => setSignupPassword(e.target.value)} 
                        placeholder="••••••••" 
                        required 
                      />
                      <button 
                        type="button" 
                        className="btn-password-toggle" 
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showSignupPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:20, height:20}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3-3.671-3.671m0-3.399a3 3 0 0 0-3.399 3.399m-1.42-1.42 3.65 3.65" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:20, height:20}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-confirm-password">Confirm Password</label>
                    <input 
                      type="password" 
                      id="signup-confirm-password" 
                      value={signupConfirmPassword} 
                      onChange={(e) => setSignupConfirmPassword(e.target.value)} 
                      placeholder="••••••••" 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full-width">Sign Up</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal - Synced directly to iframe PDF viewer */}
      {resumeModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setResumeModalOpen(false); }}>
          <div className="modal-card resume-modal-card glass-panel" style={{maxWidth:'800px'}}>
            <div className="resume-modal-header">
              <h2>Resume Viewer</h2>
              <div className="resume-header-actions">
                <a href="/assets/Ishmeet_Bhalla_Resume.pdf" download="Ishmeet_Bhalla_Resume.pdf" className="btn btn-primary">
                  <svg className="btn-icon-inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width:18, height:18}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download PDF
                </a>
                <button className="modal-close-static" onClick={() => setResumeModalOpen(false)}>&times;</button>
              </div>
            </div>

            <div className="resume-body" style={{padding:0}}>
              {/* Embedded PDF Viewer showing the exact downloaded document */}
              <iframe 
                src="/assets/Ishmeet_Bhalla_Resume.pdf" 
                className="resume-iframe" 
                title="Ishmeet Bhalla Official Resume"
                style={{width:'100%', height:'650px', border:'none', borderRadius:'8px'}}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      <div className={`toast ${toastVisible ? '' : 'hidden'}`}>
        <span className="toast-message">{toastMessage}</span>
      </div>
    </ClickSpark>
  );
}

export default App;
