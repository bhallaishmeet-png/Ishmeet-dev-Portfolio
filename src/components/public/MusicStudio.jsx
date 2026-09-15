import { useState, useEffect } from 'react';
import { Play, Pause, Radio, Disc3, Mic, Guitar } from 'lucide-react';

export default function MusicStudio({ musicTracks }) {
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [waveBars, setWaveBars] = useState([]);

  // Generate dynamic waveform bars
  useEffect(() => {
    const bars = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      height: 20 + Math.sin(i * 0.4) * 16 + (Math.random() * 24)
    }));
    setWaveBars(bars);
  }, []);

  const togglePlay = (id) => {
    setPlayingTrackId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="music"
      style={{
        padding: '120px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)',
        backgroundColor: 'rgba(7, 10, 15, 0.3)'
      }}
    >
      {/* Chapter Marker */}
      <div style={{ marginBottom: '48px' }}>
        <div className="eyebrow" style={{ marginBottom: '12px' }}>
          <span className="dot" />
          <span>CHAPTER 06 · SONIC STUDIO &amp; INSTRUMENTATION</span>
        </div>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
        >
          MUSIC &amp; FREQUENCIES.
        </h2>
        <p style={{ maxWidth: '600px', color: 'var(--bone-dim)', marginTop: '8px', fontSize: '15px' }}>
          Music is where mathematical rigor meets visceral emotion. Playing keyboard, guitar chords, recording vocals, and producing audio experiments.
        </p>
      </div>

      {/* Main Studio Console Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}
      >
        {/* Left: Waveform & Live Monitor Station */}
        <div
          style={{
            backgroundColor: 'var(--ink-3)',
            border: '1px solid rgba(223, 231, 224, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={14} style={{ color: 'var(--vermilion)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {playingTrackId ? "AUDIO CHANNEL ACTIVE" : "STUDIO IDLE"}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
              44.1 kHz · 24-BIT
            </span>
          </div>

          {/* Dynamic Waveform Visualizer */}
          <div
            style={{
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '4px',
              padding: '0 8px',
              backgroundColor: 'rgba(5, 7, 10, 0.6)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(223, 231, 224, 0.05)',
              marginBottom: '28px',
              overflow: 'hidden'
            }}
          >
            {waveBars.map((bar, idx) => {
              const isAnimated = playingTrackId !== null;
              return (
                <div
                  key={bar.id}
                  style={{
                    flex: 1,
                    height: isAnimated ? `${Math.max(12, (bar.height + Math.sin(idx + Date.now() * 0.002) * 20))}%` : '20%',
                    backgroundColor: isAnimated ? (idx % 3 === 0 ? 'var(--vermilion)' : 'var(--bone-dim)') : 'rgba(223, 231, 224, 0.15)',
                    borderRadius: '2px',
                    transition: 'height 0.18s ease'
                  }}
                />
              );
            })}
          </div>

          {/* Instruments & Capabilities Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px'
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '16px 8px',
                backgroundColor: 'rgba(5, 7, 10, 0.4)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(223, 231, 224, 0.05)'
              }}
            >
              <Disc3 size={18} style={{ color: 'var(--bone-dim)', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '12px', color: 'var(--bone)', fontWeight: 500 }}>Keyboard</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Chords &amp; Piano</div>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '16px 8px',
                backgroundColor: 'rgba(5, 7, 10, 0.4)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(223, 231, 224, 0.05)'
              }}
            >
              <Guitar size={18} style={{ color: 'var(--bone-dim)', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '12px', color: 'var(--bone)', fontWeight: 500 }}>Guitar</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Acoustic Fingerstyle</div>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '16px 8px',
                backgroundColor: 'rgba(5, 7, 10, 0.4)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(223, 231, 224, 0.05)'
              }}
            >
              <Mic size={18} style={{ color: 'var(--bone-dim)', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '12px', color: 'var(--bone)', fontWeight: 500 }}>Vocal / DAW</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Audio Processing</div>
            </div>
          </div>
        </div>

        {/* Right: Audio Tracks Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {musicTracks.map((track) => {
            const isPlaying = playingTrackId === track.id;
            return (
              <div
                key={track.id}
                style={{
                  backgroundColor: isPlaying ? 'rgba(22, 30, 40, 0.9)' : 'rgba(15, 21, 28, 0.55)',
                  border: '1px solid',
                  borderColor: isPlaying ? 'var(--vermilion)' : 'rgba(223, 231, 224, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s',
                  cursor: 'pointer'
                }}
                onClick={() => togglePlay(track.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(track.id);
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isPlaying ? 'var(--vermilion)' : 'rgba(223, 231, 224, 0.08)',
                      color: isPlaying ? '#ffffff' : 'var(--bone)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
                  </button>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--bone)', marginBottom: '2px' }}>
                      {track.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
                      {track.role} · {track.genre}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
                    {track.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
