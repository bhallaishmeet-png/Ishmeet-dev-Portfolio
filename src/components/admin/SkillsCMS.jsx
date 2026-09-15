import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { saveSkill, deleteSkill } from '../../services/database';

export default function SkillsCMS({ skills, onSkillsUpdated, onTriggerToast }) {
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({});

  const startCreate = () => {
    const emptySkill = {
      category: 'AI & Intelligent Systems',
      name: '',
      status: 'BUILDING',
      priority: 1
    };
    setFormData(emptySkill);
    setEditingSkill(emptySkill);
  };

  const startEdit = (skill) => {
    setFormData({ ...skill });
    setEditingSkill(skill);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete skill entry "${name}"?`)) {
      const updated = await deleteSkill(id);
      onSkillsUpdated?.(updated);
      onTriggerToast?.(`Deleted "${name}".`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Skill Name is required.');
      return;
    }
    const updated = await saveSkill(formData);
    onSkillsUpdated?.(updated);
    onTriggerToast?.(`Saved skill "${formData.name}".`);
    setEditingSkill(null);
  };

  // Group by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Multidisciplinary Matrix CMS
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Manage identity disciplines and honest maturity tags (Building, Exploring, Experimenting, Learning).
          </p>
        </div>

        <button onClick={startCreate} className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
          <Plus size={14} />
          <span>Add Skill Entry</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {categories.map(cat => (
          <div
            key={cat}
            style={{
              backgroundColor: 'var(--ink-2)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--bone)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {cat}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {skills.filter(s => s.category === cat).map(skill => (
                <div
                  key={skill.id}
                  style={{
                    backgroundColor: 'rgba(15, 21, 28, 0.6)',
                    border: '1px solid rgba(223, 231, 224, 0.05)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--bone)', fontWeight: 450 }}>
                      {skill.name}
                    </div>
                    <span className={`status-pill ${skill.status === 'BUILDING' ? 'status-build' : skill.status === 'EXPLORING' ? 'status-live' : 'status-prototype'}`} style={{ fontSize: '9px', marginTop: '4px' }}>
                      {skill.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => startEdit(skill)}
                      style={{ padding: '4px', color: 'var(--bone-dim)' }}
                      title="Edit"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id, skill.name)}
                      style={{ padding: '4px', color: '#ff5a3c' }}
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingSkill && (
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
          onClick={() => setEditingSkill(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
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
                {formData.id ? 'Edit Skill Entry' : 'Add New Skill Entry'}
              </h3>
              <button onClick={() => setEditingSkill(null)} style={{ color: 'var(--bone-dim)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={formData.category || 'AI & Intelligent Systems'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="AI & Intelligent Systems">AI &amp; Intelligent Systems</option>
                  <option value="Web Architecture & Systems">Web Architecture &amp; Systems</option>
                  <option value="Science & STEM Innovation">Science &amp; STEM Innovation</option>
                  <option value="Creative Tech & Audio">Creative Tech &amp; Audio</option>
                  <option value="Writing & Entrepreneurship">Writing &amp; Entrepreneurship</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Skill / Capability Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Maturity Status Tag
                </label>
                <select
                  value={formData.status || 'BUILDING'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field"
                >
                  <option value="BUILDING">BUILDING (Actively constructing)</option>
                  <option value="EXPLORING">EXPLORING (Investigating concepts)</option>
                  <option value="EXPERIMENTING">EXPERIMENTING (Lab &amp; tests)</option>
                  <option value="LEARNING">LEARNING (Foundations)</option>
                  <option value="ACHIEVED">ACHIEVED (Verified credential)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setEditingSkill(null)} className="btn-secondary" style={{ fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
                  <Save size={14} />
                  <span>Save Skill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
