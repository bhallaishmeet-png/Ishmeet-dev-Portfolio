import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound({ onReturnHome }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px var(--pad)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'var(--ink)'
      }}
    >
      <div style={{ maxWidth: '520px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(224, 35, 28, 0.1)',
            border: '1px solid rgba(224, 35, 28, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'var(--vermilion)'
          }}
        >
          <Compass size={24} />
        </div>

        <div className="eyebrow" style={{ marginBottom: '14px', justifyContent: 'center' }}>
          <span className="dot" />
          <span>CHAPTER ERROR 404</span>
        </div>

        <h1
          className="display-title"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: '16px', color: 'var(--bone)' }}
        >
          LOST BETWEEN<br />CHAPTERS.
        </h1>

        <p style={{ fontSize: '15px', color: 'var(--bone-dim)', lineHeight: 1.7, marginBottom: '32px' }}>
          The coordinate you requested does not exist in this universe. You have drifted past the catalog boundary.
        </p>

        <button
          onClick={onReturnHome}
          className="btn-primary"
          style={{ gap: '8px', margin: '0 auto' }}
        >
          <ArrowLeft size={15} />
          <span>Return to Chapter 00</span>
        </button>
      </div>
    </div>
  );
}
