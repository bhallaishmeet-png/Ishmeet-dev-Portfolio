import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { saveSettings } from '../../services/database';

export default function ContentCMS({ settings, onSettingsUpdated, onTriggerToast }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await saveSettings(formData);
    onSettingsUpdated?.(updated);
    onTriggerToast?.('Live site editorial content updated successfully.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
          Editorial Copy &amp; Identity CMS
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
          Modify the primary editorial statements, about narrative, and future vision.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Hero Section Copy */}
        <div
          style={{
            backgroundColor: 'var(--ink-2)',
            border: '1px solid rgba(223, 231, 224, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--vermilion)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Chapter 00 · Hero Opening Copy
          </h3>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Hero Primary Title
            </label>
            <input
              type="text"
              value={formData.heroTitle || ''}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Hero Identity Subtitle
            </label>
            <input
              type="text"
              value={formData.heroSubtitle || ''}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Hero Statement / Tagline
            </label>
            <textarea
              rows={2}
              value={formData.heroStatement || ''}
              onChange={(e) => setFormData({ ...formData, heroStatement: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        {/* About Narrative */}
        <div
          style={{
            backgroundColor: 'var(--ink-2)',
            border: '1px solid rgba(223, 231, 224, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--vermilion)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Chapter 01 · About Story Narrative
          </h3>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Editorial Story Biography
            </label>
            <textarea
              rows={6}
              value={formData.aboutStory || ''}
              onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Resume / CV File Path or URL
            </label>
            <input
              type="text"
              value={formData.resumeUrl || ''}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              className="input-field"
              placeholder="/assets/Ishmeet_Bhalla_Resume.pdf"
            />
          </div>
        </div>

        {/* Future Vision */}
        <div
          style={{
            backgroundColor: 'var(--ink-2)',
            border: '1px solid rgba(223, 231, 224, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--vermilion)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Chapter 08 · Long-Term Vision Quote
          </h3>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Future Vision Statement
            </label>
            <textarea
              rows={3}
              value={formData.futureVision || ''}
              onChange={(e) => setFormData({ ...formData, futureVision: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        {/* Save CTA */}
        <div>
          <button type="submit" className="btn-primary" style={{ gap: '8px', padding: '12px 24px' }}>
            <Save size={15} />
            <span>Publish Editorial Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
