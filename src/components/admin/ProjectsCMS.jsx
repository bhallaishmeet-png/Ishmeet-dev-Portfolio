import { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Star,
  X,
  Save
} from 'lucide-react';
import { saveProject, deleteProject } from '../../services/database';

export default function ProjectsCMS({ projects, onProjectsUpdated, onTriggerToast }) {
  const [editingProject, setEditingProject] = useState(null); // null = table view, object = editing/creating
  const [formData, setFormData] = useState({});

  const startCreate = () => {
    const emptyProj = {
      title: '',
      slug: '',
      category: 'Web Architecture & Systems',
      type: 'BUILD',
      status: 'Live',
      technologies: ['React', 'TypeScript'],
      shortDescription: '',
      fullDescription: '',
      problem: '',
      solution: '',
      result: '',
      lessonsLearned: '',
      image: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      published: true
    };
    setFormData(emptyProj);
    setEditingProject(emptyProj);
  };

  const startEdit = (project) => {
    setFormData({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies : []
    });
    setEditingProject(project);
  };

  const handleDuplicate = async (project) => {
    const dup = {
      ...project,
      id: undefined,
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy`,
      published: false
    };
    const updated = await saveProject(dup);
    onProjectsUpdated?.(updated);
    onTriggerToast?.(`Duplicated "${project.title}" as draft.`);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = await deleteProject(id);
      onProjectsUpdated?.(updated);
      onTriggerToast?.(`Deleted "${title}".`);
    }
  };

  const handleTogglePublish = async (project) => {
    const updatedProject = { ...project, published: !project.published };
    const updated = await saveProject(updatedProject);
    onProjectsUpdated?.(updated);
    onTriggerToast?.(`Project "${project.title}" marked as ${updatedProject.published ? 'Published' : 'Draft'}.`);
  };

  const handleToggleFeatured = async (project) => {
    const updatedProject = { ...project, featured: !project.featured };
    const updated = await saveProject(updatedProject);
    onProjectsUpdated?.(updated);
    onTriggerToast?.(`Project "${project.title}" featured status updated.`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Project Title is required.');
      return;
    }

    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      technologies: typeof formData.technologies === 'string'
        ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : formData.technologies
    };

    const updated = await saveProject(payload);
    onProjectsUpdated?.(updated);
    onTriggerToast?.(`Saved project "${payload.title}".`);
    setEditingProject(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Projects Catalog Management
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Create, edit, duplicate, and publish builds, prototypes, and concepts.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="btn-primary"
          style={{ fontSize: '12px', gap: '6px' }}
        >
          <Plus size={14} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table / Cards */}
      <div
        style={{
          backgroundColor: 'var(--ink-2)',
          border: '1px solid rgba(223, 231, 224, 0.08)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(15, 21, 28, 0.8)', borderBottom: '1px solid rgba(223, 231, 224, 0.08)' }}>
                <th style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Project Title</th>
                <th style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Discipline</th>
                <th style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Classification</th>
                <th style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Featured</th>
                <th style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(proj => (
                <tr
                  key={proj.id}
                  style={{ borderBottom: '1px solid rgba(223, 231, 224, 0.05)', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(223, 231, 224, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 500, color: 'var(--bone)' }}>{proj.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>/{proj.slug}</div>
                  </td>
                  <td style={{ padding: '16px 18px', color: 'var(--bone-dim)' }}>
                    {proj.category}
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <span className={`status-pill ${proj.type === 'BUILD' ? 'status-build' : proj.type === 'PROTOTYPE' ? 'status-prototype' : 'status-concept'}`} style={{ fontSize: '9px' }}>
                      {proj.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: proj.published ? 'rgba(95, 224, 135, 0.12)' : 'rgba(255, 90, 60, 0.12)',
                        color: proj.published ? '#5fe087' : '#ff5a3c',
                        border: '1px solid',
                        borderColor: proj.published ? 'rgba(95, 224, 135, 0.28)' : 'rgba(255, 90, 60, 0.28)'
                      }}
                      title="Click to toggle publish"
                    >
                      {proj.published ? <Eye size={11} /> : <EyeOff size={11} />}
                      <span>{proj.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      style={{
                        color: proj.featured ? '#cfa850' : 'var(--muted)',
                        padding: '4px',
                        transition: 'color 0.2s'
                      }}
                      title="Toggle Featured on Hero"
                    >
                      <Star size={16} fill={proj.featured ? '#cfa850' : 'none'} />
                    </button>
                  </td>
                  <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => startEdit(proj)}
                        style={{ padding: '6px', color: 'var(--bone-dim)', borderRadius: '4px', backgroundColor: 'rgba(223, 231, 224, 0.05)' }}
                        title="Edit Project"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDuplicate(proj)}
                        style={{ padding: '6px', color: 'var(--bone-dim)', borderRadius: '4px', backgroundColor: 'rgba(223, 231, 224, 0.05)' }}
                        title="Duplicate"
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        style={{ padding: '6px', color: '#ff5a3c', borderRadius: '4px', backgroundColor: 'rgba(255, 90, 60, 0.08)' }}
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Project Modal Drawer */}
      {editingProject && (
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
          onClick={() => setEditingProject(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '860px',
              maxHeight: '92vh',
              backgroundColor: 'var(--ink-elevated)',
              border: '1px solid rgba(223, 231, 224, 0.14)',
              borderRadius: 'var(--radius-md)',
              overflowY: 'auto',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid rgba(223, 231, 224, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                backgroundColor: 'rgba(22, 30, 40, 0.95)',
                zIndex: 10
              }}
            >
              <h3 style={{ fontSize: '17px', fontWeight: 500, color: 'var(--bone)' }}>
                {formData.id ? `Edit Project: ${formData.title}` : 'Create New Portfolio Project'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                style={{ color: 'var(--bone-dim)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Project Title *
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
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="input-field"
                    placeholder="e.g. jobstream"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category || 'Web Architecture & Systems'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="Web Architecture & Systems">Web Architecture &amp; Systems</option>
                    <option value="AI & Intelligent Systems">AI &amp; Intelligent Systems</option>
                    <option value="Science & EdTech">Science &amp; EdTech</option>
                    <option value="Creative Tech & Audio">Creative Tech &amp; Audio</option>
                    <option value="Literature & Writing">Literature &amp; Writing</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Classification Type
                  </label>
                  <select
                    value={formData.type || 'BUILD'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="BUILD">BUILD (Deployed / Functional)</option>
                    <option value="PROTOTYPE">PROTOTYPE (Working System)</option>
                    <option value="CONCEPT">CONCEPT (Researched Blueprint)</option>
                    <option value="EXPERIMENT">EXPERIMENT (Code Lab)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Lifecycle Status
                  </label>
                  <select
                    value={formData.status || 'Live'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="input-field"
                  >
                    <option value="Live">Live</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Archived">Archived</option>
                    <option value="Concept">Concept</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="input-field"
                  placeholder="Next.js 15, Prisma, TypeScript, Tailwind"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Live Deployed URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl || ''}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Thumbnail / Preview Image Asset Path or URL
                </label>
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input-field"
                  placeholder="/assets/sitemart_preview.png"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  Short Card Summary *
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              {/* Case Study Details */}
              <div style={{ borderTop: '1px solid rgba(223, 231, 224, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--vermilion)', textTransform: 'uppercase' }}>
                  Case Study Deep Dive Details
                </span>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    The Problem &amp; Opportunity
                  </label>
                  <textarea
                    rows={2}
                    value={formData.problem || ''}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Engineered Solution &amp; Architecture
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution || ''}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Results &amp; Real Impact
                  </label>
                  <textarea
                    rows={2}
                    value={formData.result || ''}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    Lessons Learned
                  </label>
                  <textarea
                    rows={2}
                    value={formData.lessonsLearned || ''}
                    onChange={(e) => setFormData({ ...formData, lessonsLearned: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Publishing & Feature Flags */}
              <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(223, 231, 224, 0.08)', paddingTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={formData.published !== false}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                  <span>Published to Live Website</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Feature on Hero Chapter</span>
                </label>
              </div>

              {/* Footer Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="btn-secondary"
                  style={{ fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: '12px', gap: '6px' }}
                >
                  <Save size={14} />
                  <span>Save Project Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
