import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resumePdfUrl = '/assets/Ishmeet_Bhalla_Resume.pdf';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        backgroundColor: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          height: '88vh',
          backgroundColor: 'var(--ink-elevated)',
          border: '1px solid rgba(223, 231, 224, 0.14)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: 'rgba(22, 30, 40, 0.96)',
            borderBottom: '1px solid rgba(223, 231, 224, 0.08)',
            padding: '14px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={16} style={{ color: 'var(--vermilion)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 500, color: 'var(--bone)' }}>
              Ishmeet Bhalla — Official Resume / CV
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={resumePdfUrl}
              download="Ishmeet_Bhalla_Resume.pdf"
              className="btn-primary btn-pill"
              style={{ padding: '6px 14px', fontSize: '11px', gap: '6px' }}
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--bone-dim)',
                backgroundColor: 'rgba(223, 231, 224, 0.06)'
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div style={{ flex: 1, position: 'relative', backgroundColor: '#1a1f26' }}>
          <iframe
            src={`${resumePdfUrl}#view=FitH`}
            title="Ishmeet Bhalla Resume"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#11161d'
            }}
          />
        </div>

        {/* Footer Verification Strip */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--ink-3)',
            borderTop: '1px solid rgba(223, 231, 224, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={13} style={{ color: '#5fe087' }} />
            <span>Factually Verified Document · Class 10, Holy Child Public School</span>
          </div>
          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--bone-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Open in New Tab</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
