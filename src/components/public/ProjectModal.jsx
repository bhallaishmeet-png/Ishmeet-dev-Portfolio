import { X, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const getStatusBadge = (type) => {
    switch (type) {
      case 'BUILD':
        return 'status-build';
      case 'PROTOTYPE':
        return 'status-prototype';
      case 'CONCEPT':
      default:
        return 'status-concept';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          backgroundColor: 'var(--ink-elevated)',
          border: '1px solid rgba(223, 231, 224, 0.14)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'rgba(22, 30, 40, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(223, 231, 224, 0.08)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={`status-pill ${getStatusBadge(project.type)}`}>
              {project.type || 'PROJECT'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bone-dim)',
              backgroundColor: 'rgba(223, 231, 224, 0.06)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = 'rgba(224, 35, 28, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--bone-dim)';
              e.currentTarget.style.backgroundColor = 'rgba(223, 231, 224, 0.06)';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px 28px' }}>
          {/* Project Title & Status */}
          <div style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.8vw, 40px)',
                color: 'var(--bone)',
                marginBottom: '12px'
              }}
            >
              {project.title}
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--bone-dim)', lineHeight: 1.6 }}>
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ fontSize: '12px', padding: '9px 18px' }}
              >
                <ExternalLink size={13} />
                <span>Visit Live Platform</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '9px 18px' }}
              >
                <GithubIcon size={13} />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div style={{ marginBottom: '36px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px'
              }}
            >
              Technologies &amp; Architecture
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(project.technologies || []).map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(223, 231, 224, 0.05)',
                    border: '1px solid rgba(223, 231, 224, 0.09)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--bone-dim)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Dive Sections: Problem, Solution, Results, Lessons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* The Problem */}
            {project.problem && (
              <div
                style={{
                  backgroundColor: 'rgba(10, 14, 20, 0.6)',
                  border: '1px solid rgba(223, 231, 224, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ff5a3c' }}>
                  <AlertCircle size={15} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    The Problem &amp; Opportunity
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.7, margin: 0 }}>
                  {project.problem}
                </p>
              </div>
            )}

            {/* The Solution */}
            {project.solution && (
              <div
                style={{
                  backgroundColor: 'rgba(10, 14, 20, 0.6)',
                  border: '1px solid rgba(223, 231, 224, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#41b8b0' }}>
                  <CheckCircle2 size={15} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Engineered Solution
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.7, margin: 0 }}>
                  {project.solution}
                </p>
              </div>
            )}

            {/* Results & Impact */}
            {project.result && (
              <div
                style={{
                  backgroundColor: 'rgba(10, 14, 20, 0.6)',
                  border: '1px solid rgba(223, 231, 224, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#5fe087' }}>
                  <Lightbulb size={15} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Results &amp; Real Impact
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.7, margin: 0 }}>
                  {project.result}
                </p>
              </div>
            )}

            {/* Lessons Learned */}
            {project.lessonsLearned && (
              <div
                style={{
                  backgroundColor: 'rgba(10, 14, 20, 0.6)',
                  border: '1px solid rgba(223, 231, 224, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#cfa850' }}>
                  <BookOpen size={15} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Lessons Learned
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.7, margin: 0 }}>
                  {project.lessonsLearned}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
