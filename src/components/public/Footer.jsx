import { ArrowUp, Lock } from 'lucide-react';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '64px var(--pad) 48px',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)',
        backgroundColor: 'var(--ink)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '32px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--bone)',
              marginBottom: '4px'
            }}
          >
            Ishmeet Bhalla
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
            Class 10 Student · Builder at the intersection of Science, Technology &amp; Creativity.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={onOpenResume}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--bone-dim)',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--bone-dim)')}
          >
            Curriculum Vitae
          </button>

          <a
            href="#/admin"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--vermilion)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <Lock size={12} />
            <span>Admin Portal</span>
          </a>

          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Return to Chapter 00"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(223, 231, 224, 0.05)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--muted)'
        }}
      >
        <span>© 2026 ISHMEET BHALLA · ALL RIGHTS RESERVED</span>
        <span>ENGINEERED WITH REACT 19 &amp; THREE.JS · NO CORPORATE FABRICATIONS</span>
      </div>
    </footer>
  );
}
