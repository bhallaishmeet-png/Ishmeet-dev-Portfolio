import { useState, useEffect } from 'react';
import { Menu, X, FileText, Lock } from 'lucide-react';

const NAV_LINKS = [
  { label: '01 About', href: '#about' },
  { label: '02 What I Build', href: '#what-i-build' },
  { label: '03 Projects', href: '#projects' },
  { label: '04 Journey', href: '#journey' },
  { label: '05 Books', href: '#books' },
  { label: '06 Music', href: '#music' },
  { label: '07 Honors', href: '#achievements' },
  { label: '08 Future', href: '#future-vision' },
  { label: '09 Contact', href: '#contact' }
];

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_LINKS.map(l => l.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'var(--nav-h)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--pad)',
          transition: 'background-color 0.4s var(--ease), border-color 0.4s var(--ease)',
          backgroundColor: isScrolled ? 'rgba(5, 7, 10, 0.82)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(223, 231, 224, 0.08)' : '1px solid transparent'
        }}
      >
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '1px solid rgba(223, 231, 224, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--bone)',
              position: 'relative'
            }}
          >
            IB
            <span
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--vermilion)',
                boxShadow: '0 0 6px var(--vermilion)'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--bone)'
              }}
            >
              Ishmeet Bhalla
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.22em',
                color: 'var(--muted)',
                textTransform: 'uppercase'
              }}
            >
              Class 10 · Student Builder
            </span>
          </div>
        </a>

        {/* Desktop Chapter Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '22px' }} className="desktop-nav">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--bone)' : 'var(--muted)',
                  transition: 'color 0.25s',
                  position: 'relative',
                  padding: '4px 0'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--bone)' : 'var(--muted)')}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'var(--vermilion)'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="btn-secondary btn-pill"
            style={{
              padding: '7px 14px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              gap: '6px'
            }}
            title="View Curriculum Vitae"
          >
            <FileText size={13} style={{ color: 'var(--vermilion)' }} />
            <span>Resume</span>
          </button>

          {/* Private Admin Access */}
          <a
            href="#/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              color: 'var(--muted)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              transition: 'all 0.25s'
            }}
            title="Private Admin Portal"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(224, 35, 28, 0.3)';
              e.currentTarget.style.color = 'var(--vermilion)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.08)';
              e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            <Lock size={13} />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              color: 'var(--bone)'
            }}
            className="mobile-burger-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(5, 7, 10, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '24px var(--pad)'
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--bone)',
                  borderBottom: '1px solid rgba(223, 231, 224, 0.08)',
                  paddingBottom: '12px'
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ marginTop: '20px', display: 'flex', gap: '14px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="btn-primary"
                style={{ width: '100%', fontSize: '12px' }}
              >
                <FileText size={14} />
                View Full Resume
              </button>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 980px) {
          .desktop-nav { display: flex !important; }
          .mobile-burger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
