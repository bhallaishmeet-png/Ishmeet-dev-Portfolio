import { useState, useEffect } from 'react';
import { Save, Lock, Globe, Share2, Image as ImageIcon, Upload, RotateCcw } from 'lucide-react';
import { saveSettings } from '../../services/database';
import { updateAdminPassword } from '../../services/auth';

export default function SiteSettingsCMS({ settings, onSettingsUpdated, onTriggerToast }) {
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
    }
  }, [settings]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        setFormData(prev => ({ ...prev, profileImage: dataUrl }));
        onTriggerToast?.("New portrait image loaded. Click 'Save Settings' to apply.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    const updated = await saveSettings(formData);
    onSettingsUpdated?.(updated);
    onTriggerToast?.('Site & Social settings updated.');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordNotice('');

    if (newPassword !== confirmPassword) {
      setPasswordNotice('Passwords do not match.');
      return;
    }

    if (newPassword.length < 5) {
      setPasswordNotice('Password must be at least 5 characters.');
      return;
    }

    const res = await updateAdminPassword(newPassword);
    if (res.success) {
      setNewPassword('');
      setConfirmPassword('');
      setPasswordNotice('Master administrator password updated successfully!');
      onTriggerToast?.('Admin security credentials updated.');
    } else {
      setPasswordNotice(res.error || 'Failed to update password.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '840px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
          System Settings &amp; Social Links
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
          Configure SEO metadata, external social profiles, and admin security credentials.
        </p>
      </div>

      {/* SEO & Meta Settings */}
      <form onSubmit={handleSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Profile Picture / Portrait Management */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--vermilion)', marginBottom: '4px' }}>
            <ImageIcon size={16} />
            <h3 style={{ fontSize: '14px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Profile Portrait Photo
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '120px',
                height: '150px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid rgba(223, 231, 224, 0.15)',
                backgroundColor: 'var(--ink-3)',
                flexShrink: 0
              }}
            >
              <img
                src={formData.profileImage || "/assets/real_photo.jpg"}
                alt="Profile Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minWidth: '240px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Upload New Photo from Computer
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label
                    className="btn-secondary"
                    style={{
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      fontSize: '12px'
                    }}
                  >
                    <Upload size={14} />
                    <span>Choose Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, profileImage: "/assets/real_photo.jpg" }));
                      onTriggerToast?.("Reset to default portrait.");
                    }}
                    className="btn-secondary"
                    style={{ fontSize: '12px', padding: '8px 14px', gap: '6px' }}
                  >
                    <RotateCcw size={13} />
                    <span>Reset Default</span>
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Or Direct Image URL / Local Asset Path
                </label>
                <input
                  type="text"
                  value={formData.profileImage || ''}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  placeholder="/assets/real_photo.jpg or https://..."
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--vermilion)', marginBottom: '4px' }}>
            <Globe size={16} />
            <h3 style={{ fontSize: '14px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              SEO &amp; Identity Metadata
            </h3>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Meta Title (Browser Tab)
            </label>
            <input
              type="text"
              value={formData.seoTitle || ''}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Meta Description (Search &amp; Social Cards)
            </label>
            <textarea
              rows={3}
              value={formData.seoDescription || ''}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
              Primary Notification Email
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        {/* Social Profiles */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--vermilion)', marginBottom: '4px' }}>
            <Share2 size={16} />
            <h3 style={{ fontSize: '14px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Central Social Links Hub
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl || ''}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl || ''}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={formData.instagramUrl || ''}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary" style={{ gap: '8px', padding: '12px 24px' }}>
            <Save size={15} />
            <span>Save Settings &amp; Links</span>
          </button>
        </div>
      </form>

      {/* Security Credentials Update */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--vermilion)', marginBottom: '4px' }}>
          <Lock size={16} />
          <h3 style={{ fontSize: '14px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            Admin Master Password Update
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
                placeholder="Minimum 5 characters"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {passwordNotice && (
            <div style={{ fontSize: '12px', color: passwordNotice.includes('success') ? '#5fe087' : '#ff5a3c', fontFamily: 'var(--font-mono)' }}>
              {passwordNotice}
            </div>
          )}

          <div>
            <button type="submit" className="btn-secondary" style={{ fontSize: '12px' }}>
              Update Master Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
