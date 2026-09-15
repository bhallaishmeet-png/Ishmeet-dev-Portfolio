import { useEffect, useRef } from 'react';

/**
 * KageAtmosphere
 * Embeds the exact ThreeUI Kyoto mountain temple WebGL atmosphere:
 * - 3D Sanmon temple gate & charred cypress halls
 * - Vermilion moon & lanterns with warm illumination
 * - Falling autumn maple leaves particle system
 * - Atmospheric mist, shaders, vignette & film grain
 * - Synchronized scroll camera & cursor parallax tilt
 */
export default function CinematicAtmosphere() {
  const frameRef = useRef(null);

  useEffect(() => {
    // Forward scroll progress to Kage's camera
    const handleScroll = () => {
      const frame = frameRef.current;
      if (!frame || !frame.contentWindow) return;
      try {
        const docEl = document.documentElement;
        const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
        const scrollPct = window.scrollY / maxScroll;
        // Kage has 5 camera anchor chapters (0 to 4.5)
        const targetProgress = scrollPct * 4.5;

        if (frame.contentWindow.__kage && frame.contentWindow.__kage.RIG) {
          frame.contentWindow.__kage.RIG.prog = targetProgress;
        }
      } catch (e) {}
    };

    // Forward mouse parallax to Kage's camera
    const handlePointerMove = (e) => {
      const frame = frameRef.current;
      if (!frame || !frame.contentWindow) return;
      try {
        if (frame.contentWindow.__kage && frame.contentWindow.__kage.RIG) {
          frame.contentWindow.__kage.RIG.tmx = (e.clientX / window.innerWidth) * 2 - 1;
          frame.contentWindow.__kage.RIG.tmy = -((e.clientY / window.innerHeight) * 2 - 1);
        }
      } catch (e) {}
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handleFrameLoad = () => {
    const frame = frameRef.current;
    if (!frame) return;

    const setupKage = () => {
      try {
        const doc = frame.contentDocument;
        if (!doc) return;

        // Inject isolation styles so only 3D Kyoto temple, moon, falling leaves & fog are shown
        let style = doc.getElementById('kage-bg-theme');
        if (!style) {
          style = doc.createElement('style');
          style.id = 'kage-bg-theme';
          style.textContent = `
            .page, .nav, #rail, #cursor, .word-fb, #pre {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            body {
              overflow: hidden !important;
              background: #05070a !important;
              pointer-events: none !important;
            }
            #gl {
              position: fixed !important;
              inset: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              z-index: 1 !important;
              display: block !important;
              pointer-events: none !important;
            }
            #vignette {
              position: fixed !important;
              inset: 0 !important;
              z-index: 2 !important;
              pointer-events: none !important;
            }
            #grain {
              position: fixed !important;
              inset: 0 !important;
              z-index: 3 !important;
              pointer-events: none !important;
              opacity: 0.045 !important;
            }
          `;
          doc.head.appendChild(style);
        }

        const win = frame.contentWindow;
        if (win) {
          // Hide 3D "KAGE" letters so Ishmeet Bhalla's hero text takes center stage
          if (win.__kage && win.__kage.WORD && win.__kage.WORD.group) {
            win.__kage.WORD.group.visible = false;
          }

          // Override progressFor so frame loop respects portfolio scroll
          win.progressFor = () => {
            const docEl = document.documentElement;
            const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
            return (window.scrollY / maxScroll) * 4.5;
          };
        }
      } catch (err) {
        console.warn('Kage setup warning:', err);
      }
    };

    setupKage();
    // Re-check periodically during Kage 3D scene boot
    const interval = setInterval(() => {
      const win = frame.contentWindow;
      if (win && win.__kage && win.__kage.WORD && win.__kage.WORD.group) {
        win.__kage.WORD.group.visible = false;
        clearInterval(interval);
      }
      setupKage();
    }, 400);

    setTimeout(() => clearInterval(interval), 8000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#05070a'
      }}
      aria-hidden="true"
    >
      <iframe
        ref={frameRef}
        src="/landing-pages/kage.html?shot=0"
        title="Kage Kyoto Temple Atmosphere"
        onLoad={handleFrameLoad}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none',
          background: '#05070a',
          opacity: 1
        }}
      />
    </div>
  );
}
