import { useState, useEffect } from 'react';

const BOOT_STAGES = [
  "Synchronizing digital identity...",
  "Calibrating neural & STEM models...",
  "Gathering verified project chronicles...",
  "Loading sonic studio & literature archives...",
  "Rendering atmospheric space..."
];

export default function Preloader({ onComplete }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, complete instantly
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 12;
        if (next >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(() => {
            onComplete?.();
          }, 650);
          return 100;
        }
        // Update stage based on progress
        const stage = Math.min(Math.floor((next / 100) * BOOT_STAGES.length), BOOT_STAGES.length - 1);
        setStageIndex(stage);
        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#05070a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.7s var(--ease)',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      <div style={{ width: 'min(440px, 80vw)', textAlign: 'center' }}>
        {/* Monogram / Brand mark */}
        <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              border: '1px solid rgba(223, 231, 224, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.2em', color: 'var(--bone)' }}>
              IB
            </span>
            <div
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--vermilion)',
                borderRadius: '50%',
                boxShadow: '0 0 8px var(--vermilion)'
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--bone)',
            marginBottom: '16px'
          }}
        >
          ISHMEET BHALLA
        </h2>

        {/* Dynamic Stage Text */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            marginBottom: '20px',
            minHeight: '20px'
          }}
        >
          {BOOT_STAGES[stageIndex]}
        </p>

        {/* Minimal Progress Track */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(223, 231, 224, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: `${progress}%`,
              background: 'var(--bone)',
              boxShadow: '0 0 10px rgba(223, 231, 224, 0.5)',
              transition: 'width 0.15s linear'
            }}
          />
        </div>

        {/* Metric Counter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'var(--muted)',
            textTransform: 'uppercase'
          }}
        >
          <span>SYSTEM INIT</span>
          <span style={{ color: 'var(--bone-dim)' }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
