import { useState } from 'react';
import { Mail, Trash2, MailOpen, Reply, User } from 'lucide-react';
import { markMessageRead, deleteMessage } from '../../services/database';

export default function MessagesInbox({ messages, onMessagesUpdated, onTriggerToast }) {
  const [filter, setFilter] = useState('ALL'); // ALL, UNREAD, READ

  const filteredMessages = messages.filter(m => {
    if (filter === 'UNREAD') return !m.read;
    if (filter === 'READ') return m.read;
    return true;
  });

  const handleToggleRead = async (id, currentRead) => {
    const updated = await markMessageRead(id, !currentRead);
    onMessagesUpdated?.(updated);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete message from "${name}"?`)) {
      const updated = await deleteMessage(id);
      onMessagesUpdated?.(updated);
      onTriggerToast?.(`Deleted message from "${name}".`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Visitor Messages Inbox
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Inquiries transmitted directly from the public portfolio contact terminal.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'UNREAD', 'READ'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: filter === f ? 'rgba(224, 35, 28, 0.15)' : 'rgba(15, 21, 28, 0.6)',
                border: '1px solid',
                borderColor: filter === f ? 'var(--vermilion)' : 'rgba(223, 231, 224, 0.08)',
                color: filter === f ? '#ffffff' : 'var(--bone-dim)'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredMessages.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--ink-2)',
              border: '1px solid rgba(223, 231, 224, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '48px',
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: '14px'
            }}
          >
            No messages found in this view.
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                backgroundColor: msg.read ? 'var(--ink-2)' : 'rgba(22, 30, 40, 0.95)',
                border: '1px solid',
                borderColor: msg.read ? 'rgba(223, 231, 224, 0.08)' : 'rgba(224, 35, 28, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: msg.read ? 'none' : '0 8px 24px rgba(224, 35, 28, 0.08)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(223, 231, 224, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--bone-dim)'
                    }}
                  >
                    <User size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: msg.read ? 450 : 600, color: 'var(--bone)' }}>
                      {msg.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                      {msg.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {new Date(msg.date).toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleToggleRead(msg.id, msg.read)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(223, 231, 224, 0.05)',
                      color: 'var(--bone-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px'
                    }}
                    title={msg.read ? "Mark as Unread" : "Mark as Read"}
                  >
                    {msg.read ? <Mail size={12} /> : <MailOpen size={12} />}
                    <span>{msg.read ? 'Unread' : 'Read'}</span>
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '11px', gap: '6px' }}
                    title="Reply via Email"
                  >
                    <Reply size={12} />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    style={{ padding: '6px', color: '#ff5a3c', borderRadius: '4px' }}
                    title="Delete Message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div style={{ fontSize: '12px', color: 'var(--vermilion)', fontFamily: 'var(--font-mono)' }}>
                  Topic: {msg.subject}
                </div>
              )}

              <div
                style={{
                  backgroundColor: 'rgba(5, 7, 10, 0.5)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  fontSize: '13px',
                  color: 'var(--bone-dim)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
