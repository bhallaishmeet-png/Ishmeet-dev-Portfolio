import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { saveBook, deleteBook } from '../../services/database';

export default function BooksCMS({ books, onBooksUpdated, onTriggerToast }) {
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({});

  const startCreate = () => {
    const emptyBook = {
      title: '',
      subtitle: '',
      author: 'Ishmeet Bhalla',
      genre: 'Fantasy / Fiction',
      description: '',
      cover: '/assets/doodle_photo.png',
      platform: 'Self-Published Edition',
      year: '2024',
      link: '#'
    };
    setFormData(emptyBook);
    setEditingBook(emptyBook);
  };

  const startEdit = (book) => {
    setFormData({ ...book });
    setEditingBook(book);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete book "${title}"?`)) {
      const updated = await deleteBook(id);
      onBooksUpdated?.(updated);
      onTriggerToast?.(`Deleted "${title}".`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Book Title is required.');
      return;
    }
    const updated = await saveBook(formData);
    onBooksUpdated?.(updated);
    onTriggerToast?.(`Saved book "${formData.title}".`);
    setEditingBook(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Books &amp; Literature CMS
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Manage published novels, speculative fiction manuscripts, and book links.
          </p>
        </div>

        <button onClick={startCreate} className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
          <Plus size={14} />
          <span>Add New Book</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <div
            key={book.id}
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
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '60px', height: '90px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--ink-3)', flexShrink: 0 }}>
                  <img src={book.cover || '/assets/doodle_photo.png'} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>
                    {book.genre} · {book.year}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--bone)', margin: '4px 0 2px' }}>
                    {book.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--bone-dim)', fontStyle: 'italic' }}>
                    {book.subtitle}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                {book.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(223, 231, 224, 0.06)', paddingTop: '14px', marginTop: '18px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => startEdit(book)}
                style={{ padding: '6px', color: 'var(--bone-dim)', borderRadius: '4px', backgroundColor: 'rgba(223, 231, 224, 0.05)' }}
                title="Edit Book"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(book.id, book.title)}
                style={{ padding: '6px', color: '#ff5a3c', borderRadius: '4px', backgroundColor: 'rgba(255, 90, 60, 0.08)' }}
                title="Delete Book"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingBook && (
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
          onClick={() => setEditingBook(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '640px',
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
                {formData.id ? `Edit Book: ${formData.title}` : 'Add New Literature Title'}
              </h3>
              <button onClick={() => setEditingBook(null)} style={{ color: 'var(--bone-dim)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Book Title *
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
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="input-field"
                  />
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
                  Cover Image Path
                </label>
                <input
                  type="text"
                  value={formData.cover || ''}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                  className="input-field"
                  placeholder="/assets/doodle_photo.png"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Description / Synopsis
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setEditingBook(null)} className="btn-secondary" style={{ fontSize: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '12px', gap: '6px' }}>
                  <Save size={14} />
                  <span>Save Book</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
