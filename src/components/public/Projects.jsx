import { useState } from 'react';
import { ExternalLink, ArrowUpRight, Plus, Globe, Sparkles, Check, X } from 'lucide-react';
import { saveProject } from '../../services/database';

export default function Projects({ projects, onSelectProject, setProjects }) {
  const [filter, setFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  // New Project Form State
  const [title, setTitle] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [category, setCategory] = useState('Web Application');
  const [shortDescription, setShortDescription] = useState('');
  const [technologies, setTechnologies] = useState('React, Tailwind CSS');
  const [saving, setSaving] = useState(false);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!title.trim() || !liveUrl.trim()) return;
    setSaving(true);
    try {
      const techArray = technologies.split(',').map(t => t.trim()).filter(Boolean);
      const newProj = {
        title: title.trim(),
        liveUrl: liveUrl.trim(),
        category: category.trim() || 'Web Application',
        shortDescription: shortDescription.trim() || 'Interactive web application by Ishmeet Bhalla.',
        technologies: techArray.length ? techArray : ['React', 'Web App'],
        status: 'Live',
        type: 'BUILD',
        featured: true,
        published: true
      };
      const updated = await saveProject(newProj);
      if (setProjects) setProjects(updated);
      setTitle('');
      setLiveUrl('');
      setShortDescription('');
      setAddModalOpen(false);
    } catch (err) {
      console.error('Error adding project:', err);
    } finally {
      setSaving(false);
    }
  };

  const filteredProjects = projects.filter(p => {
    if (!p.published) return false;
    if (filter === 'ALL') return true;
    if (filter === 'BUILDS') return p.type === 'BUILD';
    if (filter === 'PROTOTYPES') return p.type === 'PROTOTYPE';
    if (filter === 'CONCEPTS') return p.type === 'CONCEPT';
    return true;
  });

  return (
    <section
      id="projects"
      style={{
        padding: '120px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)'
      }}
    >
      {/* Chapter Marker & Header */}
      <div style={{ marginBottom: '48px', display: 'flex', flexDirection: 'column' }}>
        <div className="eyebrow" style={{ marginBottom: '12px' }}>
          <span className="dot" />
          <span>CHAPTER 02 · VERIFIED CREATIONS &amp; PLATFORMS</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <h2
              className="display-title"
              style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
            >
              MY PROJECTS.
            </h2>
            <p style={{ maxWidth: '640px', color: 'var(--bone-dim)', marginTop: '8px', fontSize: '15px' }}>
              Web applications, digital storefronts, civic tools, and sports terminals built by Ishmeet Bhalla.
            </p>
          </div>

          {/* Actions: Filter Pills + Add Project Button */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => setAddModalOpen(true)}
              className="btn-primary"
              style={{
                fontSize: '12px',
                padding: '8px 16px',
                gap: '6px',
                borderRadius: 'var(--radius-pill)',
                boxShadow: '0 0 20px rgba(224, 35, 28, 0.35)'
              }}
            >
              <Plus size={14} />
              <span>Add Project</span>
            </button>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['ALL', 'BUILDS', 'PROTOTYPES'].map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: '1px solid',
                    borderColor: filter === category ? 'var(--vermilion)' : 'rgba(223, 231, 224, 0.1)',
                    backgroundColor: filter === category ? 'rgba(224, 35, 28, 0.18)' : 'rgba(15, 21, 28, 0.5)',
                    color: filter === category ? '#ffffff' : 'var(--bone-dim)',
                    cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px'
        }}
      >
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            style={{
              backgroundColor: 'rgba(15, 21, 28, 0.65)',
              border: '1px solid rgba(223, 231, 224, 0.1)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(224, 35, 28, 0.4)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(224, 35, 28, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Top Bar with Category and Status Badge */}
            <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)'
                }}
              >
                {proj.category || 'Web Application'}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'rgba(65, 184, 176, 0.15)',
                  color: 'var(--cyan-subtle)',
                  border: '1px solid rgba(65, 184, 176, 0.3)'
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan-subtle)' }} />
                <span>{proj.status || 'Live'}</span>
              </span>
            </div>

            {/* Project Content */}
            <div style={{ padding: '16px 24px 20px', flexGrow: 1 }}>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 500,
                  color: 'var(--bone)',
                  marginBottom: '10px'
                }}
              >
                {proj.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--bone-dim)',
                  lineHeight: 1.65,
                  marginBottom: '20px'
                }}
              >
                {proj.shortDescription || proj.fullDescription}
              </p>

              {/* Technologies pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(proj.technologies || []).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      padding: '3px 8px',
                      background: 'rgba(223, 231, 224, 0.05)',
                      border: '1px solid rgba(223, 231, 224, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--muted)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(223, 231, 224, 0.08)',
                background: 'rgba(9, 13, 18, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              {proj.liveUrl ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{
                    fontSize: '12px',
                    padding: '8px 18px',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit Website</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>
                  Local Prototype
                </span>
              )}

              {onSelectProject && (
                <button
                  onClick={() => onSelectProject(proj)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--bone-dim)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Case Study
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Add Project Modal */}
      {addModalOpen && (
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
          onClick={() => setAddModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--ink-2)',
              border: '1px solid rgba(224, 35, 28, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 30px rgba(224, 35, 28, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '22px', color: 'var(--bone)', fontWeight: 500 }}>
                  Add New Project
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  Add a new web application, site, or prototype to your portfolio showcase.
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--bone-dim)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProject}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jute Sutra, Road Doctors..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  Website Link (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
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
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Web Application, Digital Marketplace, Civic Tech..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  Short Description
                </label>
                <textarea
                  rows={3}
                  placeholder="What does this project do and who is it for?"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
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

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Lovable, Tailwind CSS, TypeScript..."
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 18px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                  style={{ padding: '10px 24px', gap: '8px' }}
                >
                  <Check size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
