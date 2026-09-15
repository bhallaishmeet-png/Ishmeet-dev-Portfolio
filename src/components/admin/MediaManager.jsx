import { useState, useEffect } from 'react';
import { Upload, Copy, Check, Trash2, File } from 'lucide-react';
import { getMediaList, saveMediaItem, deleteMediaItem } from '../../services/database';

export default function MediaManager({ onTriggerToast }) {
  const [media, setMedia] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const list = await getMediaList();
    setMedia(list);
  };

  const handleCopyUrl = (id, url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      onTriggerToast?.('Asset path copied to clipboard!');
    });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete media asset "${name}"?`)) {
      const updated = await deleteMediaItem(id);
      setMedia(updated);
      onTriggerToast?.(`Deleted "${name}".`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB for local storage)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = event.target?.result;
      const newMedia = {
        id: `media_${Date.now()}`,
        name: file.name,
        url: base64Url,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type
      };
      const updated = await saveMediaItem(newMedia);
      setMedia(updated);
      setIsUploading(false);
      onTriggerToast?.(`Uploaded "${file.name}" successfully!`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--bone)' }}>
            Media &amp; Asset Manager
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>
            Upload project screenshots, book covers, and official certificates.
          </p>
        </div>

        <div>
          <label
            className="btn-primary"
            style={{ cursor: 'pointer', fontSize: '12px', gap: '6px' }}
          >
            <Upload size={14} />
            <span>{isUploading ? 'Uploading...' : 'Upload Asset'}</span>
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept="image/*,application/pdf"
            />
          </label>
        </div>
      </div>

      {/* Grid of Media Assets */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}
      >
        {media.map(item => {
          const isPdf = item.type === 'application/pdf' || item.url.endsWith('.pdf');
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--ink-2)',
                border: '1px solid rgba(223, 231, 224, 0.08)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Preview Thumbnail */}
              <div
                style={{
                  height: '140px',
                  backgroundColor: 'var(--ink-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isPdf ? (
                  <div style={{ textAlign: 'center', color: 'var(--vermilion)' }}>
                    <File size={36} style={{ margin: '0 auto 6px' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>PDF Document</span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--bone)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
                    {item.size} · {item.type || 'Asset'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(223, 231, 224, 0.06)', paddingTop: '12px', marginTop: '14px' }}>
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="btn-secondary"
                    style={{ padding: '5px 10px', fontSize: '11px', gap: '4px' }}
                    title="Copy URL"
                  >
                    {isCopied ? <Check size={12} style={{ color: '#5fe087' }} /> : <Copy size={12} />}
                    <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    style={{ padding: '6px', color: '#ff5a3c' }}
                    title="Delete Asset"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
