import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { saveJourney, deleteJourney } from '../../services/database';

export default function JourneyCMS({ journey, onJourneyUpdated, onTriggerToast }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const startCreate = () => {
    const emptyItem = {
      year: '2026',
      title: '',
      category: 'Software & AI',
      description: '',
      tag: 'New Milestone'
    };
    setFormData(emptyItem);
    setEditingItem(emptyItem);
  };

  const startEdit = (item) => {
    setFormData({ ...item });
    setEditingItem(item);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete journey entry "${title}"?`)) {
      const updated = await deleteJourney(id);
      onJourneyUpdated?.(updated);
      onTriggerToast?.(`Deleted milestone "${title}".`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required.');
      return;
    }
    const updated = await saveJourney(formData);
    onJourneyUpdated?.(updated);
    onTriggerToast?.(`Saved milestone "${formData.title}".`);
    setEditingItem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            The Journey (Building in Public) CMS
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Manage the chronological milestones and developmental progression timeline.
          </p>
        </div>

        <button onClick={startCreate} className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
          <Plus size={14} />
          <span>Add Milestone</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {journey.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'var(--ink-2)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 500, color: 'var(--vermilion)', minWidth: '48px' }}>
                {item.year}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--bone)' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    ({item.category})
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--bone-dim)', margin: 0, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => startEdit(item)}
                style={{ padding: '6px', color: 'var(--bone-dim)', borderRadius: '4px', backgroundColor: 'rgba(223, 231, 224, 0.05)' }}
                title="Edit Milestone"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                style={{ padding: '6px', color: '#ff5a3c', borderRadius: '4px', backgroundColor: 'rgba(255, 90, 60, 0.08)' }}
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
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
          onClick={() => setEditingItem(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
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
                {formData.id ? 'Edit Milestone' : 'Add New Milestone'}
              </h3>
              <button onClick={() => setEditingItem(null)} style={{ color: 'var(--bone-dim)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Year *
                  </label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                    placeholder="Software & AI, Honors, Creative"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Milestone Headline *
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
                  Badge Tag (Optional)
                </label>
                <input
                  type="text"
                  value={formData.tag || ''}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="input-field"
                  placeholder="Major Milestones, Launches"
                />
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setEditingItem(null)} className="btn-secondary" style={{ fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
                  <Save size={14} />
                  <span>Save Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
