import { ArrowDown, Sparkles, BookOpen, ExternalLink, Briefcase } from 'lucide-react';

export default function Hero({ onOpenResume }) {
  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100svh',
        padding: 'calc(var(--nav-h) + 32px) var(--pad) 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Identity Block */}
      <div style={{ maxWidth: 'min(860px, 94vw)', zIndex: 5 }}>
        {/* Eyebrow / Class & School Banner */}
        <div className="eyebrow" style={{ marginBottom: '22px' }}>
          <span className="dot" />
          <span>CLASS 10 E2 · HOLY CHILD PUBLIC SCHOOL · SESSION 2026–27</span>
        </div>

        {/* Cinematic Name */}
        <h1
          className="display-title"
          style={{
            fontSize: 'clamp(42px, 8.4vw, 108px)',
            letterSpacing: '-0.025em',
            marginBottom: '20px',
            color: 'var(--bone)',
            textShadow: '0 4px 40px rgba(0, 0, 0, 0.8)'
          }}
        >
          ISHMEET<br />BHALLA
        </h1>

        {/* Career Objective from exact screenshot */}
        <p
          className="body-lg"
          style={{
            maxWidth: '640px',
            marginBottom: '28px',
            color: 'var(--bone)',
            lineHeight: 1.7,
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            fontWeight: 350
          }}
        >
          Motivated student interested in science, technology, entrepreneurship, and music.
          Eager to develop leadership, creativity, and problem-solving skills through learning and innovation.
        </p>

        {/* Quick Interest Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {['Science', 'Technology', 'Entrepreneurship', 'Music', 'Reading'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(224, 35, 28, 0.12)',
                border: '1px solid rgba(224, 35, 28, 0.3)',
                color: 'var(--bone)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <button
            onClick={() => scrollToChapter('projects')}
            className="btn-primary"
            style={{ gap: '8px' }}
          >
            <span>Explore Projects</span>
            <ArrowDown size={14} />
          </button>
          <button
            onClick={() => scrollToChapter('books')}
            className="btn-secondary"
            style={{ gap: '8px' }}
          >
            <BookOpen size={14} style={{ color: 'var(--vermilion)' }} />
            <span>3D Books Showcase</span>
          </button>
          <button
            onClick={() => scrollToChapter('about')}
            className="btn-secondary"
            style={{ border: 'none', background: 'transparent', color: 'var(--bone-dim)' }}
          >
            <span>View Profile &amp; Bio →</span>
          </button>
        </div>
      </div>

      {/* Middle Spacer to let WebGL breathe */}
      <div style={{ minHeight: 'clamp(40px, 8vh, 120px)' }} />

      {/* Hero Foot: Fast-Travel Chapter Chips */}
      <div style={{ zIndex: 5 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--muted)'
          }}
        >
          <span>QUICK NAVIGATION</span>
          <span>HOLY CHILD PUBLIC SCHOOL · 2026–27</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { id: 'about', label: '01 · Profile & Objective' },
            { id: 'projects', label: '02 · Live Projects (5)' },
            { id: 'books', label: '03 · Books & Publications (3)' },
            { id: 'skills', label: '04 · Skills Matrix' },
            { id: 'achievements', label: '05 · Activities & Honors' },
            { id: 'vision', label: '06 · Future Goal' }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => scrollToChapter(chip.id)}
              className="chip-btn"
              style={{
                background: 'rgba(15, 21, 28, 0.65)',
                border: '1px solid rgba(223, 231, 224, 0.1)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--bone-dim)',
                cursor: 'pointer',
                transition: 'all 0.25s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--vermilion)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.1)';
                e.currentTarget.style.color = 'var(--bone-dim)';
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
