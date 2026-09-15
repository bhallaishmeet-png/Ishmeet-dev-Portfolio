import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { saveAchievement, deleteAchievement } from '../../services/database';

export default function AchievementsCMS({ achievements, onAchievementsUpdated, onTriggerToast }) {
  const [editingAch, setEditingAch] = useState(null);
  const [formData, setFormData] = useState({});

  const startCreate = () => {
    const emptyAch = {
      title: '',
      organization: '',
      date: '2024',
      category: 'Science & Academics',
      description: '',
      certificateUrl: '/assets/Ishmeet_Bhalla_Resume.pdf',
      verificationUrl: ''
    };
    setFormData(emptyAch);
    setEditingAch(emptyAch);
  };

  const startEdit = (ach) => {
    setFormData({ ...ach });
    setEditingAch(ach);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete honor "${title}"?`)) {
      const updated = await deleteAchievement(id);
      onAchievementsUpdated?.(updated);
      onTriggerToast?.(`Deleted "${title}".`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required.');
      return;
    }
    const updated = await saveAchievement(formData);
    onAchievementsUpdated?.(updated);
    onTriggerToast?.(`Saved honor "${formData.title}".`);
    setEditingAch(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Honors &amp; Achievements CMS
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Manage verified olympiad medals, competition rankings, and certifications.
          </p>
        </div>

        <button onClick={startCreate} className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
          <Plus size={14} />
          <span>Add New Honor</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {achievements.map(ach => (
          <div
            key={ach.id}
            style={{
              backgroundColor: 'var(--ink-2)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  {ach.category}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
                  {ach.date}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--bone)', marginBottom: '4px' }}>
                {ach.title}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--bone-dim)', marginBottom: '12px' }}>
                {ach.organization}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                {ach.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(223, 231, 224, 0.06)', paddingTop: '14px', marginTop: '18px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => startEdit(ach)}
                style={{ padding: '6px', color: 'var(--bone-dim)', borderRadius: '4px', backgroundColor: 'rgba(223, 231, 224, 0.05)' }}
                title="Edit Honor"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(ach.id, ach.title)}
                style={{ padding: '6px', color: '#ff5a3c', borderRadius: '4px', backgroundColor: 'rgba(255, 90, 60, 0.08)' }}
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingAch && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            backgroundColor: 'rgba(5, 7, 10, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setEditingAch(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              backgroundColor: 'var(--ink-elevated)',
              border: '1px solid rgba(223, 231, 224, 0.14)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '17px', color: 'var(--bone)' }}>
                {formData.id ? `Edit Honor: ${formData.title}` : 'Add New Achievement'}
              </h3>
              <button onClick={() => setEditingAch(null)} style={{ color: 'var(--bone-dim)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Awarding Organization
                </label>
                <input
                  type="text"
                  value={formData.organization || ''}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category || 'Science & Academics'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="Science & Academics">Science &amp; Academics</option>
                    <option value="Creative Writing">Creative Writing</option>
                    <option value="Music & Performance">Music &amp; Performance</option>
                    <option value="STEM & Science">STEM &amp; Science</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Verification / Certificate URL
                </label>
                <input
                  type="text"
                  value={formData.certificateUrl || ''}
                  onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                  className="input-field"
                  placeholder="/assets/Ishmeet_Bhalla_Resume.pdf"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setEditingAch(null)} className="btn-secondary" style={{ fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
                  <Save size={14} />
                  <span>Save Honor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
