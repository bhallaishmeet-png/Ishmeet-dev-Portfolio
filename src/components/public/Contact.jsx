import { useState } from 'react';
import { Mail, Send, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, InstagramIcon } from '../common/BrandIcons';
import { submitContactMessage } from '../../services/database';

export default function Contact({ settings, onMessageSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry / Collaboration',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    const emailToCopy = settings?.email || 'bhallaishmeet@gmail.com';
    navigator.clipboard.writeText(emailToCopy).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry / Collaboration', message: '' });
        onMessageSubmitted?.();
      } else {
        setErrorMessage('Failed to deliver message. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
          <span>CHAPTER 08 · CONTACT &amp; COLLABORATION</span>
        </div>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
        >
          LET'S BUILD SOMETHING.
        </h2>
        <p style={{ maxWidth: '600px', color: 'var(--bone-dim)', marginTop: '8px', fontSize: '15px' }}>
          Have an interesting project, question about my builds, or want to collaborate on STEM education technology? Drop a line.
        </p>
      </div>

      {/* Main Grid: Form + Direct Social Channels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: ' clamp(32px, 5vw, 64px)'
        }}
      >
        {/* Left Column: Interactive Contact Form */}
        <div
          style={{
            backgroundColor: 'rgba(15, 21, 28, 0.65)',
            border: '1px solid rgba(223, 231, 224, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '36px'
          }}
        >
          {submitSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(95, 224, 135, 0.15)',
                  color: '#5fe087',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Check size={22} />
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--bone)', marginBottom: '8px' }}>
                Message Transmitted
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--bone-dim)', marginBottom: '24px' }}>
                Thank you for reaching out! Your dispatch has been securely archived in the portal messages inbox.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="btn-secondary"
                style={{ fontSize: '12px' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px' }}>
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="General Inquiry / Collaboration">General Inquiry / Collaboration</option>
                  <option value="STEM Education & EdTech Project">STEM Education &amp; EdTech Project</option>
                  <option value="Software & Web Architecture">Software &amp; Web Architecture</option>
                  <option value="Literature & Books">Literature &amp; Books</option>
                  <option value="Music & Sonic Experimentation">Music &amp; Sonic Experimentation</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px' }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Share details about what you are thinking..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                  required
                />
              </div>

              {errorMessage && (
                <div style={{ fontSize: '13px', color: '#ff5a3c', backgroundColor: 'rgba(255, 90, 60, 0.1)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', gap: '8px' }}
              >
                <Send size={14} />
                <span>{isSubmitting ? 'Transmitting...' : 'Transmit Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels & Social Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)', marginBottom: '12px' }}>
              Direct Channels
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.7, marginBottom: '28px' }}>
              If you prefer reaching out directly, you can copy my personal address or connect through open professional and creative channels.
            </p>

            {/* Email Copy Card */}
            <div
              style={{
                backgroundColor: 'rgba(15, 21, 28, 0.55)',
                border: '1px solid rgba(223, 231, 224, 0.08)',
                borderRadius: 'var(--radius-sm)',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={16} style={{ color: 'var(--vermilion)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Personal Email
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--bone)', fontWeight: 500 }}>
                    {settings?.email || 'bhallaishmeet@gmail.com'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '11px', gap: '6px' }}
                title="Copy to clipboard"
              >
                {emailCopied ? <Check size={13} style={{ color: '#5fe087' }} /> : <Copy size={13} />}
                <span>{emailCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Social Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {settings?.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '12px 18px', gap: '12px' }}
                >
                  <GithubIcon size={16} style={{ color: 'var(--bone)' }} />
                  <span>GitHub · Code Repositories &amp; Commits</span>
                </a>
              )}

              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '12px 18px', gap: '12px' }}
                >
                  <LinkedinIcon size={16} style={{ color: '#0a66c2' }} />
                  <span>LinkedIn · Professional Journey</span>
                </a>
              )}

              {settings?.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '12px 18px', gap: '12px' }}
                >
                  <YoutubeIcon size={16} style={{ color: '#ff0000' }} />
                  <span>YouTube · Demos &amp; Creative Media</span>
                </a>
              )}

              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '12px 18px', gap: '12px' }}
                >
                  <InstagramIcon size={16} style={{ color: '#e1306c' }} />
                  <span>Instagram · Creative Highlights</span>
                </a>
              )}
            </div>
          </div>

          {/* Identity Location Tag */}
          <div
            style={{
              marginTop: '36px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}
          >
            LOCATED IN HARYANA / DELHI NCR, INDIA · ACTIVE BUILDER
          </div>
        </div>
      </div>
    </section>
  );
}
