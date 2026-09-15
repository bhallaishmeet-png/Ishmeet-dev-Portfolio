import {
  FolderGit2,
  BookOpen,
  Trophy,
  Mail,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function AdminOverview({
  projects,
  books,
  achievements,
  skills,
  messages,
  onNavigateTab
}) {
  const publishedProjects = projects.filter(p => p.published).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  const STATS = [
    { label: 'Published Projects', count: `${publishedProjects} / ${projects.length}`, icon: FolderGit2, color: '#41b8b0', tab: 'projects' },
    { label: 'Literature & Books', count: books.length, icon: BookOpen, color: '#d886ff', tab: 'books' },
    { label: 'Verified Honors', count: `${achievements.length} honors`, icon: Trophy, color: '#cfa850', tab: 'achievements' },
    { label: 'Disciplines & Skills', count: `${skills.length} skills`, icon: FolderGit2, color: '#ff5a3c', tab: 'skills' },
    { label: 'Visitor Inquiries', count: unreadMessages > 0 ? `${unreadMessages} unread` : `${messages.length} total`, icon: Mail, color: '#5fe087', tab: 'messages' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          backgroundColor: 'var(--ink-2)',
          border: '1px solid rgba(223, 231, 224, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: '8px' }}>
            <span className="dot" />
            <span>PORTFOLIO CENTRAL INTELLIGENCE</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--bone)', marginBottom: '6px' }}>
            Welcome, Ishmeet.
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--bone-dim)', margin: 0 }}>
            Every project, chapter, book, and setting modified here updates the live portfolio immediately.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onNavigateTab('projects')}
            className="btn-primary"
            style={{ fontSize: '12px', padding: '10px 18px', gap: '6px' }}
          >
            <Plus size={14} />
            <span>Create New Project</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(stat.tab)}
              className="admin-card"
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {stat.label}
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(223, 231, 224, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div style={{ fontSize: '26px', fontWeight: 500, color: 'var(--bone)', marginBottom: '8px' }}>
                {stat.count}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--muted)' }}>
                <span>Manage in {stat.tab}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Left: Recent Projects */}
        <div
          style={{
            backgroundColor: 'var(--ink-2)',
            border: '1px solid rgba(223, 231, 224, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--bone)' }}>
              Recent Projects &amp; Statuses
            </h3>
            <button
              onClick={() => onNavigateTab('projects')}
              style={{ fontSize: '11px', color: 'var(--vermilion)', fontFamily: 'var(--font-mono)' }}
            >
              View All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.slice(0, 5).map(proj => (
              <div
                key={proj.id}
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'rgba(15, 21, 28, 0.6)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(223, 231, 224, 0.05)'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--bone)' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    {proj.category}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`status-pill ${proj.type === 'BUILD' ? 'status-build' : proj.type === 'PROTOTYPE' ? 'status-prototype' : 'status-concept'}`} style={{ fontSize: '9px' }}>
                    {proj.type}
                  </span>
                  <span style={{ fontSize: '11px', color: proj.published ? '#5fe087' : 'var(--muted)' }}>
                    {proj.published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Latest Contact Form Messages */}
        <div
          style={{
            backgroundColor: 'var(--ink-2)',
            border: '1px solid rgba(223, 231, 224, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--bone)' }}>
              Recent Contact Inquiries
            </h3>
            <button
              onClick={() => onNavigateTab('messages')}
              style={{ fontSize: '11px', color: 'var(--vermilion)', fontFamily: 'var(--font-mono)' }}
            >
              Open Inbox →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', padding: '24px' }}>
                No messages yet.
              </p>
            ) : (
              messages.slice(0, 4).map(msg => (
                <div
                  key={msg.id}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: msg.read ? 'rgba(15, 21, 28, 0.4)' : 'rgba(224, 35, 28, 0.07)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: msg.read ? 'rgba(223, 231, 224, 0.05)' : 'rgba(224, 35, 28, 0.25)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: msg.read ? 400 : 600, color: 'var(--bone)' }}>
                      {msg.name}
                    </span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                      {new Date(msg.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--bone-dim)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
