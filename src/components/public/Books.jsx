import { useState, useMemo } from 'react';
import { BookOpen, ExternalLink, Star, Compass, Sparkles, Plus, X, Check } from 'lucide-react';
import { BooksShowcase } from '../ui/books-showcase';
import { saveBook } from '../../services/database';

export default function Books({ books, setBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  // Add Book form state
  const [bookTitle, setBookTitle] = useState('');
  const [bookLink, setBookLink] = useState('');
  const [bookGenre, setBookGenre] = useState('Literature & Fiction');
  const [bookDesc, setBookDesc] = useState('');
  const [savingBook, setSavingBook] = useState(false);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!bookTitle.trim() || !bookLink.trim()) return;
    setSavingBook(true);
    try {
      const newBook = {
        title: bookTitle.trim(),
        author: 'Ishmeet Bhalla',
        year: '2024',
        stars: 5,
        genre: bookGenre.trim() || 'Literature',
        link: bookLink.trim(),
        description: bookDesc.trim() || 'Published book by Ishmeet Bhalla on BriBooks.',
        platform: 'BriBooks Bookstore',
        featured: true
      };
      const updated = await saveBook(newBook);
      if (setBooks) setBooks(updated);
      setBookTitle('');
      setBookLink('');
      setBookDesc('');
      setAddBookModalOpen(false);
    } catch (err) {
      console.error('Error saving book:', err);
    } finally {
      setSavingBook(false);
    }
  };

  // Convert books into 3D BookCfg format expected by VengeanceUI BooksShowcase
  const showcaseBooks = useMemo(() => {
    return books.map((b, idx) => ({
      id: b.id || `book_${idx}`,
      title: b.title,
      author: b.author || 'Ishmeet Bhalla',
      year: b.year || '2024',
      stars: b.stars || 5,
      desc: b.description || b.desc || 'Authored work by Ishmeet Bhalla on BriBooks.',
      spineBg: b.spineBg || (idx === 0 ? '#991b1b' : idx === 1 ? '#1e3a8a' : '#78350f'),
      spineInk: b.spineInk || (idx === 0 ? '#fef08a' : idx === 1 ? '#93c5fd' : '#fed7aa'),
      spineFont: b.spineFont || '700 42px Georgia',
      backBg: b.backBg || (idx === 0 ? '#450a0a' : idx === 1 ? '#0f172a' : '#291104'),
      backInk: b.backInk || '255,255,255',
      edge: b.edge || '#fef3c7',
      link: b.link
    }));
  }, [books]);

  return (
    <section
      id="books"
      style={{
        padding: '120px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)'
      }}
    >
      {/* Chapter Marker & Header */}
      <div style={{ marginBottom: '48px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: '12px' }}>
            <span className="dot" />
            <span>CHAPTER 03 · PUBLISHED AUTHOR &amp; BOOKS</span>
          </div>
          <h2
            className="display-title"
            style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
          >
            PUBLISHED BOOKS.
          </h2>
          <p style={{ maxWidth: '640px', color: 'var(--bone-dim)', marginTop: '8px', fontSize: '15px' }}>
            Published titles authored by Ishmeet Bhalla on BriBooks. Explore them in interactive 3D WebGL below.
          </p>
        </div>

        <button
          onClick={() => setAddBookModalOpen(true)}
          className="btn-primary"
          style={{
            fontSize: '12px',
            padding: '8px 16px',
            gap: '6px',
            borderRadius: 'var(--radius-pill)'
          }}
        >
          <Plus size={14} />
          <span>Add Book</span>
        </button>
      </div>

      {/* 3D Interactive Books Showcase Container */}
      <div
        style={{
          width: '100%',
          height: 'clamp(520px, 68vh, 720px)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(223, 231, 224, 0.12)',
          backgroundColor: '#07090e',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          marginBottom: '56px'
        }}
      >
        <BooksShowcase
          books={showcaseBooks}
          heroTitle="ISHMEET'S LIBRARY"
          navTitle="BRIBOOKS EDITIONS"
          showNav={true}
          showDetailPanel={true}
          showCarousel={true}
          className="w-full h-full"
          onBookSelect={(b) => setSelectedBook(b)}
        />
      </div>

      {/* BriBooks Quick Links Grid */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--bone)', fontWeight: 500, marginBottom: '18px' }}>
          Official BriBooks Bookstore Editions
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: 'rgba(15, 21, 28, 0.6)',
                border: '1px solid rgba(223, 231, 224, 0.1)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(224, 35, 28, 0.35)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--vermilion)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                    {book.genre || 'BriBooks Edition'}
                  </span>
                  <div style={{ display: 'flex', gap: '2px', color: 'var(--gold)' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <h4 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--bone)', marginBottom: '8px' }}>
                  {book.title}
                </h4>

                <p style={{ fontSize: '13px', color: 'var(--bone-dim)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {book.description}
                </p>
              </div>

              <div>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '12px',
                    padding: '10px 16px',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <BookOpen size={14} />
                  <span>Read on BriBooks</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Book Modal */}
      {addBookModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(5, 7, 10, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setAddBookModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--ink-2)',
              border: '1px solid rgba(224, 35, 28, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--bone)', fontWeight: 500 }}>
                Add New Book
              </h3>
              <button
                onClick={() => setAddBookModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--bone-dim)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBook}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Indian Festivals"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 21, 28, 0.8)',
                    border: '1px solid rgba(223, 231, 224, 0.15)',
                    color: 'var(--bone)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  BriBooks Link (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.bribooks.com/bookstore/..."
                  value={bookLink}
                  onChange={(e) => setBookLink(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 21, 28, 0.8)',
                    border: '1px solid rgba(223, 231, 224, 0.15)',
                    color: 'var(--bone)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Genre / Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Culture, Fantasy, Speculative..."
                  value={bookGenre}
                  onChange={(e) => setBookGenre(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 21, 28, 0.8)',
                    border: '1px solid rgba(223, 231, 224, 0.15)',
                    color: 'var(--bone)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Book Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief synopsis or themes of the book..."
                  value={bookDesc}
                  onChange={(e) => setBookDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 21, 28, 0.8)',
                    border: '1px solid rgba(223, 231, 224, 0.15)',
                    color: 'var(--bone)',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setAddBookModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingBook}
                  className="btn-primary"
                  style={{ gap: '6px' }}
                >
                  <Check size={14} />
                  <span>{savingBook ? 'Saving...' : 'Save Book'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
