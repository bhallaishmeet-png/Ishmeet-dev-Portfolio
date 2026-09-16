import { Compass, Sparkles } from 'lucide-react';

export default function FutureVision() {
  return (
    <section
      id="future-vision"
      style={{
        padding: '100px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          <span className="dot" />
          <span>CHAPTER 07 · FUTURE GOAL</span>
        </div>

        <h2
          className="display-title"
          style={{
            fontSize: 'clamp(32px, 5.2vw, 68px)',
            color: 'var(--bone)',
            marginBottom: '28px',
            lineHeight: 1.15
          }}
        >
          ENTREPRENEURSHIP IN SCIENCE &amp; EDUCATION.
        </h2>

        <div
          style={{
            padding: '36px clamp(20px, 4vw, 48px)',
            background: 'linear-gradient(135deg, rgba(224, 35, 28, 0.12), rgba(15, 21, 28, 0.8))',
            border: '1px solid rgba(224, 35, 28, 0.28)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6), 0 0 40px rgba(224, 35, 28, 0.1)'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(17px, 2.2vw, 24px)',
              color: 'var(--bone)',
              lineHeight: 1.6,
              fontWeight: 350,
              fontStyle: 'italic',
              marginBottom: '16px'
            }}
          >
            "To become an entrepreneur in science and education by creating innovative STEM learning solutions."
          </p>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--vermilion)'
            }}
          >
            — ISHMEET BHALLA · CLASS 10 E2 · HOLY CHILD PUBLIC SCHOOL
          </span>
        </div>
      </div>
    </section>
  );
}
