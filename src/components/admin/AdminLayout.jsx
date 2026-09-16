import { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Trophy,
  Cpu,
  Milestone,
  FileEdit,
  Mail,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { logoutAdmin } from '../../services/auth';

const NAV_TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects CMS', icon: FolderGit2 },
  { id: 'books', label: 'Books & Writing', icon: BookOpen },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'skills', label: 'Skills Matrix', icon: Cpu },
  { id: 'journey', label: 'The Journey', icon: Milestone },
  { id: 'content', label: 'Site Content', icon: FileEdit },
  { id: 'messages', label: 'Messages Inbox', icon: Mail },
  { id: 'media', label: 'Media Manager', icon: ImageIcon },
  { id: 'settings', label: 'Site Settings', icon: Settings }
];

export default function AdminLayout({
  activeTab,
  onSelectTab,
  onLogout,
  onViewLiveSite,
  unreadCount = 0,
  children
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleLogoutClick = () => {
    logoutAdmin();
    onLogout?.();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--ink)' }}>
      {/* Desktop Sidebar */}
      <aside className="admin-sidebar" style={{ display: 'none', flexDirection: 'column' }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(223, 231, 224, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(224, 35, 28, 0.15)',
                border: '1px solid rgba(224, 35, 28, 0.35)',
                color: 'var(--vermilion)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px'
              }}
            >
              CMS
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--bone)', textTransform: 'uppercase' }}>
                Ishmeet Studio
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>
                PORTFOLIO ADMIN
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`admin-link ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
                {tab.id === 'messages' && unreadCount > 0 && (
                  <span
                    style={{
                      backgroundColor: 'var(--vermilion)',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-pill)',
                      padding: '1px 7px',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(223, 231, 224, 0.08)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={onViewLiveSite}
            className="btn-secondary"
            style={{ width: '100%', fontSize: '11px', padding: '9px 12px', gap: '8px' }}
          >
            <ExternalLink size={13} />
            <span>View Public Site</span>
          </button>

          <button
            onClick={handleLogoutClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--muted)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff5a3c')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <LogOut size={13} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '64px',
            backgroundColor: 'var(--ink-2)',
            borderBottom: '1px solid rgba(223, 231, 224, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 40
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              style={{ display: 'flex', color: 'var(--bone)' }}
              className="admin-mobile-toggle"
              aria-label="Toggle navigation drawer"
            >
              {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--bone)', textTransform: 'capitalize' }}>
              {activeTab.replace('-', ' ')}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#5fe087',
                  boxShadow: '0 0 6px #5fe087'
                }}
              />
              <span>Live CMS Session</span>
            </div>

            <button
              onClick={onViewLiveSite}
              className="btn-secondary btn-pill"
              style={{ padding: '6px 14px', fontSize: '11px', gap: '6px' }}
            >
              <ExternalLink size={12} />
              <span>Live View</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileDrawerOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              backgroundColor: 'rgba(5, 7, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--vermilion)', textTransform: 'uppercase' }}>
                ADMIN NAVIGATION
              </span>
              <button onClick={() => setMobileDrawerOpen(false)} style={{ color: 'var(--bone)' }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              {NAV_TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileDrawerOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: activeTab === tab.id ? 'rgba(224, 35, 28, 0.15)' : 'transparent',
                      color: activeTab === tab.id ? '#ffffff' : 'var(--bone-dim)',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(223, 231, 224, 0.1)', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onViewLiveSite();
                }}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '12px' }}
              >
                View Live Site
              </button>
              <button
                onClick={handleLogoutClick}
                className="btn-primary"
                style={{ flex: 1, fontSize: '12px', backgroundColor: '#e0231c' }}
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main style={{ flex: 1, padding: 'clamp(20px, 3.5vw, 40px)', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 920px) {
          .admin-sidebar { display: flex !important; }
          .admin-mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}
