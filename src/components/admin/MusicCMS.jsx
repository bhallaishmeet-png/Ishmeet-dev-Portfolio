import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { saveMusic, deleteMusic } from '../../services/database';

export default function MusicCMS({ music, onMusicUpdated, onTriggerToast }) {
  const [editingMusic, setEditingMusic] = useState(null);
  const [formData, setFormData] = useState({});

  const startCreate = () => {
    const emptyTrack = {
      title: '',
      role: 'Keyboard & Piano',
      genre: 'Instrumental',
      year: '2026',
      description: '',
      audioUrl: ''
    };
    setFormData(emptyTrack);
    setEditingMusic(emptyTrack);
  };

  const startEdit = (track) => {
    setFormData({ ...track });
    setEditingMusic(track);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete audio track "${title}"?`)) {
      const updated = await deleteMusic(id);
      onMusicUpdated?.(updated);
      onTriggerToast?.(`Deleted "${title}".`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Track Title is required.');
      return;
    }
    const updated = await saveMusic(formData);
    onMusicUpdated?.(updated);
    onTriggerToast?.(`Saved track "${formData.title}".`);
    setEditingMusic(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Music &amp; Sonic Studio CMS
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Manage instrumental pieces, vocal recordings, keyboard performances, and audio production stems.
          </p>
        </div>

        <button onClick={startCreate} className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
          <Plus size={14} />
          <span>Add Track</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {music.map(track => (
          <div
            key={track.id}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--vermilion)' }}>
                  {track.role}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
                  {track.year}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--bone)', marginBottom: '4px' }}>
                {track.title}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>
                {track.genre}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--bone-dim)', lineHeight: 1.6, margin: 0 }}>
                {track.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(223, 231, 224, 0.06)', paddingTop: '14px', marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => startEdit(track)}
                style={{ padding: '6px', color: 'var(--bone-dim)', borderRadius: '4px', backgroundColor: 'rgba(223, 231, 224, 0.05)' }}
                title="Edit Track"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(track.id, track.title)}
                style={{ padding: '6px', color: '#ff5a3c', borderRadius: '4px', backgroundColor: 'rgba(255, 90, 60, 0.08)' }}
                title="Delete Track"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingMusic && (
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
          onClick={() => setEditingMusic(null)}
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
                {formData.id ? `Edit Track: ${formData.title}` : 'Add New Sonic Track'}
              </h3>
              <button onClick={() => setEditingMusic(null)} style={{ color: 'var(--bone-dim)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Track Title *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Role / Instrument
                  </label>
                  <select
                    value={formData.role || 'Keyboard & Piano'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input-field"
                  >
                    <option value="Keyboard & Piano">Keyboard &amp; Piano</option>
                    <option value="Acoustic Guitar">Acoustic Guitar</option>
                    <option value="Vocals & Production">Vocals &amp; Production</option>
                    <option value="Synth Production">Synth Production</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Genre / Mood
                </label>
                <input
                  type="text"
                  value={formData.genre || ''}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="input-field"
                  placeholder="Neoclassical, Ambient, Lo-Fi"
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
                <button type="button" onClick={() => setEditingMusic(null)} className="btn-secondary" style={{ fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
                  <Save size={14} />
                  <span>Save Track</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
