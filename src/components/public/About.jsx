import { useState } from 'react';
import { Award, BookOpen, GraduationCap, Compass, ArrowRight, Target, CheckCircle2 } from 'lucide-react';

export default function About({ onOpenResume }) {
  const [photoHovered, setPhotoHovered] = useState(false);

  const skillsList = [
    'Communication',
    'Leadership',
    'Teamwork',
    'Critical Thinking',
    'Problem Solving',
    'Creativity',
    'Digital Literacy'
  ];

  const activitiesList = [
    'School projects and presentations',
    'STEM and science activities',
    'Technology exploration',
    'Co-curricular participation'
  ];

  const interestsList = [
    'Science',
    'Technology',
    'Entrepreneurship',
    'Music',
    'Reading'
  ];

  return (
    <section
      id="about"
      style={{
        padding: '120px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)'
      }}
    >
      {/* Chapter Marker */}
      <div style={{ marginBottom: '48px' }}>
        <div className="eyebrow" style={{ marginBottom: '12px' }}>
          <span className="dot" />
          <span>CHAPTER 01 · PROFILE &amp; ACADEMIC RECORD</span>
        </div>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
        >
          ISHMEET BHALLA
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
          Class 10 E2 | Holy Child Public School | Session 2026–27
        </p>
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Official Profile Details */}
        <div>
          {/* Career Objective */}
          <div
            style={{
              padding: '24px',
              background: 'rgba(15, 21, 28, 0.65)',
              border: '1px solid rgba(224, 35, 28, 0.28)',
              borderLeft: '4px solid var(--vermilion)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '32px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Target size={16} style={{ color: 'var(--vermilion)' }} />
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bone)' }}>
                Career Objective
              </h3>
            </div>
            <p style={{ color: 'var(--bone)', fontSize: '15px', lineHeight: 1.7, fontWeight: 350 }}>
              Motivated student interested in science, technology, entrepreneurship, and music.
              Eager to develop leadership, creativity, and problem-solving skills through learning and innovation.
            </p>
          </div>

          {/* Education Block */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>
              Education
            </h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                background: 'rgba(15, 21, 28, 0.5)',
                border: '1px solid rgba(223, 231, 224, 0.1)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <GraduationCap size={24} style={{ color: 'var(--cyan-subtle)' }} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--bone)' }}>
                  Holy Child Public School
                </div>
                <div style={{ fontSize: '13px', color: 'var(--bone-dim)', marginTop: '2px' }}>
                  Class X (2026–27) · Section E2
                </div>
              </div>
            </div>
          </div>

          {/* Skills Matrix */}
          <div id="skills" style={{ marginBottom: '32px' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>
              Key Skills
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skillsList.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 21, 28, 0.7)',
                    border: '1px solid rgba(223, 231, 224, 0.12)',
                    fontSize: '13px',
                    color: 'var(--bone)'
                  }}
                >
                  <CheckCircle2 size={13} style={{ color: 'var(--vermilion)' }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Activities */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>
              Achievements &amp; Activities
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {activitiesList.map((act) => (
                <div
                  key={act}
                  style={{
                    padding: '14px 16px',
                    background: 'rgba(15, 21, 28, 0.55)',
                    border: '1px solid rgba(223, 231, 224, 0.08)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    color: 'var(--bone-dim)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <Award size={15} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div style={{ marginBottom: '36px' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>
              Interests
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {interestsList.map((interest) => (
                <span
                  key={interest}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(65, 184, 176, 0.1)',
                    border: '1px solid rgba(65, 184, 176, 0.25)',
                    color: 'var(--bone)',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Future Goal Banner */}
          <div
            id="vision"
            style={{
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(224, 35, 28, 0.15), rgba(15, 21, 28, 0.8))',
              border: '1px solid rgba(224, 35, 28, 0.3)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--vermilion)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Future Goal
            </div>
            <p style={{ color: 'var(--bone)', fontSize: '15px', lineHeight: 1.65, fontWeight: 400, margin: 0 }}>
              To become an entrepreneur in science and education by creating innovative STEM learning solutions.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Portrait & Quick Links */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid rgba(223, 231, 224, 0.12)',
              backgroundColor: 'var(--ink-2)',
              aspectRatio: '4/5',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setPhotoHovered(true)}
            onMouseLeave={() => setPhotoHovered(false)}
          >
            <img
              src={photoHovered ? "/assets/doodle_photo_new.jpg" : "/assets/real_photo.jpg"}
              alt="Ishmeet Bhalla"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(1.06)',
                transition: 'filter 0.5s var(--ease), transform 0.6s var(--ease)',
                transform: photoHovered ? 'scale(1.03)' : 'scale(1.0)'
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 'auto 0 0 0',
                padding: '24px 20px',
                background: 'linear-gradient(to top, rgba(5, 7, 10, 0.95), rgba(5, 7, 10, 0.4) 60%, transparent)',
                zIndex: 2
              }}
            >
              <div className="eyebrow" style={{ marginBottom: '6px' }}>
                <span className="dot" />
                <span>{photoHovered ? "CREATIVE & TECHNICAL EXPLORER" : "ISHMEET BHALLA"}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--bone-dim)', margin: 0 }}>
                Class 10 E2 · Holy Child Public School · Student Builder &amp; Published Author
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '16px 20px',
              background: 'rgba(15, 21, 28, 0.6)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <button
              onClick={onOpenResume}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
            >
              <span>View Full Credentials &amp; Certifications</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
