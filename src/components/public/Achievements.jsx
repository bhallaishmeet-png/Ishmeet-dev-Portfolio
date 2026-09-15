import { Trophy, ExternalLink, FileCheck } from 'lucide-react';

export default function Achievements({ achievements, onOpenResume }) {

  return (
    <section
      id="achievements"
      style={{
        padding: '120px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)'
      }}
    >
      {/* Chapter Marker */}
      <div style={{ marginBottom: '56px' }}>
        <div className="eyebrow" style={{ marginBottom: '12px' }}>
          <span className="dot" />
          <span>CHAPTER 07 · HONORS &amp; SCIENTIFIC MERIT</span>
        </div>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
        >
          VERIFIED HONORS.
        </h2>
        <p style={{ maxWidth: '600px', color: 'var(--bone-dim)', marginTop: '8px', fontSize: '15px' }}>
          Recognized achievements in competitive science, academics, literature, and instrumental performance.
        </p>
      </div>

      {/* Grid of Achievements */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {achievements.map((ach) => (
          <div
            key={ach.id}
            style={{
              backgroundColor: 'rgba(15, 21, 28, 0.55)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.25s, transform 0.25s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(207, 168, 80, 0.35)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(207, 168, 80, 0.1)',
                    border: '1px solid rgba(207, 168, 80, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)'
                  }}
                >
                  <Trophy size={16} />
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
                    {ach.date}
                  </span>
                </div>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 500, color: 'var(--bone)', marginBottom: '4px' }}>
                {ach.title}
              </h3>

              <div style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                {ach.organization}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '20px' }}>
                {ach.description}
              </p>
            </div>

            {/* Action Bar */}
            <div
              style={{
                borderTop: '1px solid rgba(223, 231, 224, 0.06)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <button
                onClick={onOpenResume}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--bone-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--bone-dim)')}
              >
                <FileCheck size={13} style={{ color: 'var(--gold)' }} />
                <span>Verified in Resume PDF</span>
              </button>

              {ach.verificationUrl && (
                <a
                  href={ach.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center' }}
                  title="Official Verification"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
