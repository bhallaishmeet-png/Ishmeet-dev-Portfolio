import { Milestone, Sparkles, Code, Trophy } from 'lucide-react';

export default function Journey({ journey }) {
  const getIcon = (category) => {
    switch (category) {
      case 'Software & AI':
        return Code;
      case 'Science & Literature':
      case 'Honors':
        return Trophy;
      case 'Creative & Coding':
        return Sparkles;
      case 'Foundations':
      default:
        return Milestone;
    }
  };

  return (
    <section
      id="journey"
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
          <span>CHAPTER 04 · CHRONOLOGICAL MILESTONES</span>
        </div>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
        >
          BUILDING IN PUBLIC.
        </h2>
        <p style={{ maxWidth: '600px', color: 'var(--bone-dim)', marginTop: '8px', fontSize: '15px' }}>
          Not a corporate work history, but a timeline of genuine learning: first scripts, competitive science examinations, published novels, and full-stack software launches.
        </p>
      </div>

      {/* Timeline Tree */}
      <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
        {/* Central Vertical Spine */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '24px',
            left: '20px',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--vermilion), rgba(223, 231, 224, 0.1) 85%, transparent)'
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {journey.map((item, index) => {
            const Icon = getIcon(item.category);
            return (
              <div
                key={item.id || index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                  position: 'relative'
                }}
              >
                {/* Timeline Node */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ink-3)',
                    border: '1px solid rgba(223, 231, 224, 0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 2,
                    boxShadow: '0 0 12px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <Icon size={16} style={{ color: index === 0 ? 'var(--vermilion)' : 'var(--bone-dim)' }} />
                </div>

                {/* Timeline Card */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(15, 21, 28, 0.55)',
                    border: '1px solid rgba(223, 231, 224, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    transition: 'border-color 0.25s, transform 0.25s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.22)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--vermilion)',
                          fontWeight: 500
                        }}
                      >
                        {item.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--muted)',
                          padding: '2px 8px',
                          backgroundColor: 'rgba(5, 7, 10, 0.4)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {item.tag && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--bone-dim)',
                          backgroundColor: 'rgba(223, 231, 224, 0.06)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)'
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 500, color: 'var(--bone)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--bone-dim)', lineHeight: 1.65, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
