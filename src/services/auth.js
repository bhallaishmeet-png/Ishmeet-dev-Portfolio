/* =====================================================================
   ISHMEET BHALLA — ADMIN AUTHENTICATION SERVICE
   Provides secure session handling, salted SHA-256 hash validation,
   and route authorization guards for the private /admin portal.
   ===================================================================== */

const AUTH_KEY = 'ishmeet_admin_session';
const CREDENTIALS_KEY = 'ishmeet_admin_credentials';

// Salted SHA-256 hashing using Web Crypto API
export async function hashPassword(password, salt = 'ishmeet_secure_salt_2026') {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial hashed credentials
// Default email: bhallaishmeet@gmail.com
// Default initial password: "admin" (can be updated inside CMS)

async function getStoredCredentials() {
  const stored = localStorage.getItem(CREDENTIALS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  const defaultHash = await hashPassword('admin');
  const creds = {
    email: 'bhallaishmeet@gmail.com',
    secondaryEmail: 'admin@ishmeet.dev',
    passwordHash: defaultHash,
    role: 'SUPER_ADMIN',
    lastLogin: null
  };
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  return creds;
}

export async function loginAdmin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const creds = await getStoredCredentials();

  const isEmailValid = cleanEmail === creds.email.toLowerCase() || cleanEmail === (creds.secondaryEmail || '').toLowerCase();
  if (!isEmailValid) {
    return { success: false, error: 'Invalid admin credentials.' };
  }

  const inputHash = await hashPassword(password);
  if (inputHash !== creds.passwordHash) {
    return { success: false, error: 'Invalid password.' };
  }

  // Create secure session token
  const sessionToken = {
    token: `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
    email: creds.email,
    role: creds.role,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours validity
    createdAt: Date.now()
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(sessionToken));

  // Update last login
  creds.lastLogin = new Date().toISOString();
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));

  return { success: true, session: sessionToken };
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
  return true;
}

export function getAdminSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      logoutAdmin();
      return null;
    }
    return session;
  } catch {
    logoutAdmin();
    return null;
  }
}

export function isAuthenticated() {
  const session = getAdminSession();
  return session !== null;
}

export async function updateAdminPassword(newPassword) {
  if (!newPassword || newPassword.length < 5) {
    return { success: false, error: 'Password must be at least 5 characters.' };
  }
  const creds = await getStoredCredentials();
  creds.passwordHash = await hashPassword(newPassword);
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  return { success: true };
}
