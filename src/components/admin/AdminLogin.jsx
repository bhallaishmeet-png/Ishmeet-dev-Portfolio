import { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { loginAdmin } from '../../services/auth';

export default function AdminLogin({ onLoginSuccess, onReturnHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('');

    if (!email || !password) {
      setErrorText('Please enter your administrator credentials.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        onLoginSuccess?.(res.session);
      } else {
        setErrorText(res.error || 'Authentication denied.');
      }
    } catch {
      setErrorText('Authentication service error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--ink)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'var(--ink-2)',
          border: '1px solid rgba(223, 231, 224, 0.12)',
          borderRadius: 'var(--radius-md)',
          padding: '40px 32px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Monogram / Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'rgba(224, 35, 28, 0.12)',
              border: '1px solid rgba(224, 35, 28, 0.3)',
              color: 'var(--vermilion)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Lock size={20} />
          </div>

          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '8px' }}>
            <span className="dot" />
            <span>AUTHENTICATED ACCESS ONLY</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 500, color: 'var(--bone)' }}>
            Admin Portal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Private content management system for Ishmeet Bhalla.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px' }}>
              Administrator Email
            </label>
            <input
              type="email"
              placeholder="bhallaishmeet@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              autoFocus
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px' }}>
              Secret Key / Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingRight: '40px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--muted)'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {errorText && (
            <div style={{ fontSize: '13px', color: '#ff5a3c', backgroundColor: 'rgba(255, 90, 60, 0.1)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
              {errorText}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{ width: '100%', gap: '8px', padding: '13px' }}
          >
            <ShieldCheck size={16} />
            <span>{isLoading ? 'Verifying Session...' : 'Authenticate & Unlock'}</span>
          </button>
        </form>

        {/* Back Link */}
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <button
            onClick={onReturnHome}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>← Return to Public Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
