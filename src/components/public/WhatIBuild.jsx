import { Cpu, Globe, Atom, Music, PenTool, Lightbulb } from 'lucide-react';

const DISCIPLINES = [
  {
    id: "ai",
    title: "AI & Intelligent Systems",
    icon: Cpu,
    color: "#ff5a3c",
    description: "Orchestrating hybrid cloud and local offline language models, autonomous web scrapers, and computer vision classification pipelines.",
    items: [
      { name: "Google Gemini 2.0 / API Integrations", status: "BUILDING" },
      { name: "Ollama Local Model Quantization", status: "EXPLORING" },
      { name: "Autonomous News Scrapers & Synthesizers", status: "BUILDING" },
      { name: "Computer Vision (YOLO / OpenCV)", status: "LEARNING" }
    ]
  },
  {
    id: "web",
    title: "Web Architecture & Platforms",
    icon: Globe,
    color: "#41b8b0",
    description: "Designing fast, responsive, database-driven web systems with clean component modularity, dual-mode storage fallbacks, and real-time feed diffing.",
    items: [
      { name: "React 19 & Next.js 15 (App Router)", status: "BUILDING" },
      { name: "TypeScript & JavaScript ES6+", status: "BUILDING" },
      { name: "Prisma ORM & SQLite / PostgreSQL", status: "BUILDING" },
      { name: "Firebase Auth & Supabase Cloud", status: "BUILDING" }
    ]
  },
  {
    id: "science",
    title: "Science & STEM Innovation",
    icon: Atom,
    color: "#cfa850",
    description: "Rooted in competitive scientific inquiry, physics fundamentals, and conceptualizing interactive pedagogy that makes abstract concepts intuitive.",
    items: [
      { name: "National Science Olympiad (Gold Medal)", status: "ACHIEVED" },
      { name: "Physics & Astronomy First Principles", status: "LEARNING" },
      { name: "EdTech Interactive Lab Concepts (Vigyani Path)", status: "EXPLORING" },
      { name: "Hardware E-Waste Repurposing Frameworks", status: "CONCEPT" }
    ]
  },
  {
    id: "creative",
    title: "Creative Tech & Audio",
    icon: Music,
    color: "#a78bfa",
    description: "Exploring the boundary where sound meets code. Playing musical instruments, recording vocals, and experimenting with Web Audio API nodes.",
    items: [
      { name: "Keyboard & Piano Performance", status: "PRACTICING" },
      { name: "Acoustic Guitar & Chords", status: "PRACTICING" },
      { name: "AI Vocal Processing & DAWs (MelodyForge)", status: "EXPERIMENTING" },
      { name: "Three.js & WebGL 3D Atmosphere", status: "EXPLORING" }
    ]
  },
  {
    id: "writing",
    title: "Writing & Speculative Fiction",
    icon: PenTool,
    color: "#f472b6",
    description: "Crafting original fantasy literature, technical documentation, and exploring deep worldbuilding through published multi-chapter novels.",
    items: [
      { name: "Novel Writing ('The Last Spellbinder')", status: "PUBLISHED" },
      { name: "System Architecture & Technical Specs", status: "BUILDING" },
      { name: "Narrative Worldbuilding & Magic Systems", status: "WRITING" }
    ]
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship & Vision",
    icon: Lightbulb,
    color: "#34d399",
    description: "Thinking about long-term problems in education and science. Learning how to transform raw prototypes into sustainable products that empower learners.",
    items: [
      { name: "STEM Educational Solutions", status: "EXPLORING" },
      { name: "Product Architecture & Problem Discovery", status: "LEARNING" },
      { name: "Digital Tools for Young Innovators", status: "BUILDING" }
    ]
  }
];

export default function WhatIBuild() {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'BUILDING':
      case 'PUBLISHED':
      case 'ACHIEVED':
        return 'status-build';
      case 'EXPLORING':
      case 'PRACTICING':
      case 'WRITING':
        return 'status-live';
      case 'EXPERIMENTING':
        return 'status-prototype';
      case 'LEARNING':
      case 'CONCEPT':
      default:
        return 'status-concept';
    }
  };

  return (
    <section
      id="what-i-build"
      style={{
        padding: '120px var(--pad)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(223, 231, 224, 0.08)'
      }}
    >
      {/* Chapter Marker */}
      <div style={{ marginBottom: '56px' }}>
        <div className="eyebrow" style={{ marginBottom: '12px' }}>
          <span className="dot" />
          <span>CHAPTER 02 · MULTIDISCIPLINARY MATRIX</span>
        </div>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--bone)' }}
        >
          WHAT I BUILD &amp; EXPLORE.
        </h2>
        <p style={{ maxWidth: '620px', color: 'var(--bone-dim)', marginTop: '12px', fontSize: '15px' }}>
          I am not a one-track developer. My work spans intelligent software, physical science, audio experimentation, and literature. Everything is labeled honestly according to real depth.
        </p>
      </div>

      {/* Grid of Disciplines */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {DISCIPLINES.map(disc => {
          const Icon = disc.icon;
          return (
            <div
              key={disc.id}
              style={{
                backgroundColor: 'rgba(15, 21, 28, 0.55)',
                border: '1px solid rgba(223, 231, 224, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s, transform 0.25s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.24)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(223, 231, 224, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(223, 231, 224, 0.05)',
                      border: '1px solid rgba(223, 231, 224, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: disc.color
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 500, color: 'var(--bone)' }}>
                    {disc.title}
                  </h3>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {disc.description}
                </p>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {disc.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(5, 7, 10, 0.4)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(223, 231, 224, 0.04)'
                    }}
                  >
                    <span style={{ fontSize: '12px', color: 'var(--bone-dim)', fontWeight: 400 }}>
                      {item.name}
                    </span>
                    <span className={`status-pill ${getBadgeStyle(item.status)}`} style={{ fontSize: '9px' }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
