'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CounterProps { end: number; suffix?: string; duration?: number; }

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = end / (duration / 16);
        let cur = 0;
        const timer = setInterval(() => {
          cur = Math.min(cur + step, end);
          setCount(Math.floor(cur));
          if (cur >= end) clearInterval(timer);
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style
    }}>{children}</div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const pidExamples = [
  { icon: '', title: 'Oil Refinery', desc: 'Thousands of P&IDs govern crude distillation, hydrotreating, and fluid catalytic cracking across refineries like Jamnagar or Kochi.' },
  { icon: '', title: 'Chemical Plant', desc: 'Reaction vessels, heat exchangers, and control loops mapped across 500+ diagram sheets for a single plant section.' },
  { icon: '', title: 'Water Treatment', desc: 'Municipal water treatment plants use P&IDs to manage filtration, chlorination, and pump station control logic.' },
  { icon: '', title: 'Power Generation', desc: 'Steam turbine systems, boiler controls, and cooling towers in thermal power plants are all P&ID governed.' },
];

const industryStats = [
  { value: 68, suffix: '%', label: 'of P&IDs still stored as paper or scanned PDFs', color: '#f97316' },
  { value: 6, suffix: ' months', label: 'avg. time to manually digitize a single plant', color: '#ef4444' },
  { value: 1.8, suffix: 'B$', label: 'global AI in industrial applications market by 2032', color: '#00d4ff' },
  { value: 14.6, suffix: '%', label: 'CAGR of industrial digitization market through 2031', color: '#00ff88' },
];

const challenges = [
  {
    icon: '', title: 'Manual Processing Takes Months',
    desc: 'Extracting symbols, tags, and connections from legacy P&IDs manually takes 3–6 months per plant. A single refinery may hold 10,000+ drawings, making manual digitization economically impossible.',
    stat: '3-6 months per plant',
  },
  {
    icon: '', title: 'Error-Prone & Inconsistent',
    desc: 'Human operators miss up to 15% of symbols under time pressure. Mislabeled tags cascade into incorrect asset registers, triggering costly rework during plant shutdowns.',
    stat: '~15% manual error rate',
  },
  {
    icon: '', title: 'Knowledge Locked in Static Images',
    desc: 'Legacy P&IDs are scanned PDFs or DWG files. This data is invisible to ERP, CMMS, or Digital Twin systems — billions of dollars of engineering intelligence sits completely inaccessible.',
    stat: '68% still non-digital',
  },
  {
    icon: '', title: 'Digital Twin Bottleneck',
    desc: 'Industry 4.0 and Digital Twin adoption are blocked by the inability to ingest P&ID topology into simulation and monitoring systems. The missing link is automated digitization.',
    stat: 'Industry 4.0 blocker',
  },
  {
    icon: '', title: 'Symbol Variability Across Standards',
    desc: 'P&IDs follow ISA 5.1, ISO 10628, and company-specific conventions. A centrifugal pump looks different across three client standards — making rule-based systems brittle.',
    stat: '20+ symbol libraries',
  },
  {
    icon: '', title: 'High Cost of Delay',
    desc: 'Delayed digitization stalls compliance audits, safety reviews, and plant expansions. Each month of delay costs $50K–$500K in deferred engineering decisions.',
    stat: '$500K/month cost exposure',
  },
];

const solution = [
  {
    icon: '', tag: 'Computer Vision', title: 'AI Symbol Detection',
    why: 'YOLO architecture trained on 20+ industrial symbol classes eliminates the variability problem across ISA/ISO/proprietary standards.',
    impact: '93% mAP — matching senior engineer accuracy',
    color: '#00d4ff',
  },
  {
    icon: '', tag: 'Text Intelligence', title: 'Dual OCR Pipeline',
    why: 'Two-stage OCR — one for printed text, one for handwritten annotations — ensures tag–symbol association is preserved across all P&ID vintages.',
    impact: 'Tag accuracy >88% on legacy scanned drawings',
    color: '#00ff88',
  },
  {
    icon: '', tag: 'Graph Tracing', title: 'Line Connectivity Engine',
    why: 'Computer vision + graph search traces pipe runs between symbols, reconstructing the full process topology automatically — no human tracing required.',
    impact: '~91% pipeline connectivity accuracy',
    color: '#a78bfa',
  },
  {
    icon: '', tag: 'Knowledge Graph', title: 'Graph Intelligence & JSON Export',
    why: 'The assembled process graph is exported as structured JSON — immediately consumable by Digital Twin, CMMS, ERP, and AVEVA/AutoCAD integration pipelines.',
    impact: 'Industry 4.0 ready in minutes, not months',
    color: '#f97316',
  },
];

const workflow = [
  {
    n: '1', title: 'INPUT IMAGE', sub: 'P&ID Drawing (Scanned / PDF / Image)', color: '#004080',
    items: ['Supports Multiple Formats', 'High Resolution Input', 'Secure Handling', 'Metadata Capture'],
    icons: ['📄', '🔍', '🔒', '🏷️']
  },
  {
    n: '2', title: 'PRE PROCESSING', sub: 'Enhancing Image Quality', color: '#10b981',
    items: ['Noise Removal', 'Contrast Enhancement', 'Deskew & Resize', 'Artifact Filtering'],
    icons: ['🪄', '🔆', '📐', '🧹']
  },
  {
    n: '3', title: 'SYMBOL DETECTION', sub: 'Detecting & Classifying Symbols', color: '#a78bfa',
    items: ['YOLOv8 Based Detection', 'Multi-Class Classification', 'High Detection Accuracy', 'Confidence Scoring'],
    icons: ['🎯', '📦', '✅', '💡']
  },
  {
    n: '4', title: 'TEXT EXTRACTION', sub: 'Extracting Critical Information', color: '#f59e0b',
    items: ['Advanced OCR (DocTR + Tesseract)', 'Multi-Language Support', 'High Accuracy Extraction', 'Structured Output'],
    icons: ['🔤', '🌐', '📥', '🗒️']
  },
  {
    n: '5', title: 'LINE DETECTION', sub: 'Detecting Pipes & Connections', color: '#0ea5e9',
    items: ['Line Segmentation', 'Noise Filtering', 'Line Continuity', 'Orientation Handling'],
    icons: ['〰️', '🫧', '🔗', '🔄']
  },
  {
    n: '6', title: 'GRAPH CONSTRUCTION', sub: 'Building Intelligent Connectivity Graph', color: '#059669',
    items: ['Graph Based Modeling', 'Connectivity Inference', 'Topology Validation', 'Structured Graph Output (JSON)'],
    icons: ['🕸️', '🧠', '🛡️', '📊']
  },
];

const features = [
  { title: 'AI Symbol Detection', desc: 'YOLO-powered model with mAP ≈ 93% identifies pumps, valves, tanks and 20+ industrial symbols with confidence scores', icon: '', tag: 'Computer Vision', color: '#00d4ff' },
  { title: 'Dual OCR Pipeline', desc: 'Accurate tag–symbol association ensures every label, spec, and annotation is correctly extracted and linked', icon: '', tag: 'Text Extraction', color: '#00ff88' },
  { title: 'Line Connectivity', desc: '~91% accuracy in reconstructing pipeline topology and mapping flow directions between all components', icon: '', tag: 'Graph Tracing', color: '#a78bfa' },
  { title: 'Graph Intelligence', desc: 'Assembles JSON-ready process topology graphs suitable for Digital Twin and Industry 4.0 integration', icon: '', tag: 'Knowledge Graph', color: '#f97316' },
  { title: 'Batch Processing', desc: 'Process hundreds of P&ID diagrams simultaneously with consistent accuracy and scalable cloud deployment', icon: '', tag: 'Scalability', color: '#ec4899' },
  { title: 'Human Review UI', desc: 'Intuitive validation interface for QA corrections and AVEVA/AutoCAD integration workflows', icon: '', tag: 'Quality Assurance', color: '#14b8a6' },
];

const industryImpact = [
  { industry: 'Oil & Gas', impact: 'Compress 6-month P&ID audits to 72 hours. Enable real-time asset register sync.', icon: '', saving: '85% time reduction' },
  { industry: 'Power Generation', impact: 'Feed turbine and boiler P&IDs directly into Digital Twin simulation environments.', icon: '', saving: 'Digital Twin ready' },
  { industry: 'Chemical Processing', impact: 'Automate P&ID-to-ERP sync for plant expansion, safety compliance, and MOC workflows.', icon: '', saving: 'Zero manual re-entry' },
  { industry: 'Water Infrastructure', impact: 'Digitize municipal treatment plant drawings for SCADA and predictive maintenance integration.', icon: '', saving: 'Full SCADA integration' },
];

const results = [
  { value: 93, suffix: '%', label: 'Symbol Detection (mAP)', color: '#00d4ff', sub: 'YOLO on industrial symbols' },
  { value: 91, suffix: '%', label: 'Line Connectivity Accuracy', color: '#00ff88', sub: 'Pipeline topology reconstruction' },
  { value: 82, suffix: '%', label: 'Overall System Accuracy', color: '#a78bfa', sub: 'End-to-end pipeline' },
];

const techStack = [
  { name: 'YOLO v8', cat: 'AI / CV', color: '#7c3aed' },
  { name: 'OpenCV', cat: 'Image Processing', color: '#16a34a' },
  { name: 'Python', cat: 'Core', color: '#ca8a04' },
  { name: 'FastAPI', cat: 'Backend', color: '#059669' },
  { name: 'Next.js', cat: 'Frontend', color: '#e2e8f0' },
  { name: 'React', cat: 'UI', color: '#0ea5e9' },
  { name: 'Tailwind', cat: 'Styling', color: '#06b6d4' },
  { name: 'Tesseract OCR', cat: 'Text AI', color: '#dc2626' },
  { name: 'NetworkX', cat: 'Graph', color: '#f97316' },
  { name: 'Vercel', cat: 'Deploy', color: '#94a3b8' },
];

const roadmap = [
  {
    phase: 'Phase 1 — Model Refinement', icon: '', color: '#00d4ff',
    items: ['Optimize YOLO model across more symbol categories', 'Fine-tune OCR for handwritten and low-res drawings', 'Enable AVEVA integration for editable P&ID output'],
    timeline: 'Months 1–2',
  },
  {
    phase: 'Phase 2 — Feature Integration', icon: '', color: '#00ff88',
    items: ['AutoCAD and AVEVA bidirectional sync', 'Cross-industry symbol libraries (ISA, ISO, IEC)', 'Enhanced batch processing pipelines'],
    timeline: 'Months 3–4',
  },
  {
    phase: 'Phase 3 — Testing & Evaluation', icon: '', color: '#a78bfa',
    items: ['Benchmarking precision across 5+ industries', 'Cross-site validation with real plant drawings', 'Performance stress testing at 1,000+ diagram scale'],
    timeline: 'Months 5–6',
  },
  {
    phase: 'Phase 4 — Cloud Deployment', icon: '', color: '#f97316',
    items: ['Production cloud infrastructure (AWS/GCP)', 'Enterprise SaaS model with API access', 'SOC 2 compliance and security hardening'],
    timeline: 'Month 7+',
  },
];

const team = [
  { name: 'Darshan R.A', role: 'AI & Computer Vision', detail: 'YOLO model training, image preprocessing pipeline, symbol detection architecture', Phone: '+91 9489241506', email: '', avatar: 'DA', grad: 'linear-gradient(135deg,#00d4ff,#0066cc)' },
  { name: 'SujayNithish N', role: 'Backend & API Architecture', detail: 'FastAPI backend, graph assembly engine, JSON output pipeline, system integration', Phone: '+91 9444274237', avatar: 'SN', grad: 'linear-gradient(135deg,#00ff88,#00cc66)' },
  { name: 'Barath ViswaRaj S', role: 'Frontend & UX', detail: 'Next.js interface, human review UI, demo presentation, design system', Phone: '+91 9600678204', avatar: 'BV', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { name: 'Mohammed Aswath M', role: 'AI & Computer Vision', detail: 'YOLO model training, image preprocessing pipeline, symbol detection architecture', Phone: '+91 8248547453', avatar: 'MA', grad: 'linear-gradient(135deg,#f97316,#dc2626)' },
];

const sampleJSON = `{
  "pid_id": "TG0912524",
  "plant": "Refinery Unit 3 — Crude Distillation",
  "components": [
    {
      "id": "P-101",
      "type": "CentrifugalPump",  
      "label": "Feed Pump",
      "tag": "P-101A",
      "confidence": 0.97,
      "connections": ["V-201", "T-301"]
    },
    {
      "id": "V-201",
      "type": "ControlValve",
      "label": "Flow Control Valve",
      "tag": "FCV-201",
      "confidence": 0.94,
      "connections": ["P-101", "T-301"]
    },
    {
      "id": "T-301",
      "type": "StorageTank",
      "label": "Feed Tank",
      "tag": "T-301",
      "confidence": 0.98,
      "connections": ["V-201"]
    }
  ],
  "pipes": [
    { "from": "P-101", "to": "V-201", "flow": "forward", "size": "6-IN" },
    { "from": "V-201", "to": "T-301", "flow": "forward", "size": "4-IN" }
  ],
  "accuracy": {
    "symbol_map": 0.93,
    "connectivity": 0.91,
    "overall": 0.82
  }
}`;

const references = [
  'S. Mani et al., "Automatic Digitization of Engineering Diagrams Using Deep Learning and Graph Search," CVPRW 2020.',
  '"End-to-end digitization of P&IDs at industrially applicable level," J. Comput. Design Eng., vol. 9, no. 4, 2022.',
  '"A Novel Approach for P&ID Digitization using Transformers," arXiv, Nov. 2024.',
  '"Engineering Document (P&ID) Digitization," Microsoft ISE Developer Blog, 2024.',
  '"Smart P&ID — Process Safety Office Enterprise Software," IOMosaic.',
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveStep(s => (s + 1) % workflow.length), 2400);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'What is P&ID', href: '#pid' },
    { label: 'Problem', href: '#challenge' },
    { label: 'Solution', href: '#solution' },
    { label: 'Implementation', href: '#implementation' },
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
  ];

  const S = { // shared style helpers
    section: (bg?: string): React.CSSProperties => ({ padding: '60px 24px', background: bg || '#ffffff' }),
    container: (): React.CSSProperties => ({ maxWidth: 1140, margin: '0 auto' }),
    eyebrow: (color = '#004080'): React.CSSProperties => ({ fontSize: 12, color, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' as const, marginBottom: 12 }),
    h2: (): React.CSSProperties => ({ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, margin: '0 0 16px', color: '#000080', lineHeight: 1.1 }),
    sub: (): React.CSSProperties => ({ color: '#334155', fontSize: 16, lineHeight: 1.75, maxWidth: 640 }),
    card: (hover = true): React.CSSProperties => ({ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, transition: hover ? 'all 0.3s' : 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }),
    accent: (c = '#004080'): React.CSSProperties => ({ color: c }),
    tag: (c = '#004080'): React.CSSProperties => ({ display: 'inline-block', fontSize: 11, color: c, background: `${c}12`, border: `1px solid ${c}33`, borderRadius: 20, padding: '2px 10px', fontWeight: 700, letterSpacing: 0.5 }),
  };

  return (
    <div style={{ background: '#ffffff', color: '#000080', fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif", minHeight: '100vh' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.4;} }
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes scanline { 0%{transform:translateY(-100%);}100%{transform:translateY(100vh);} }
        @keyframes glow { 0%,100%{opacity:0.6;}50%{opacity:1;} }
        @keyframes spin { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',system-ui,sans-serif;}
        h1,h2,h3,h4,h5{font-family:'Syne',system-ui,sans-serif;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#f1f5f9;}
        ::-webkit-scrollbar-thumb{background:#004080;border-radius:3px;}
        .card-hover:hover{border-color:rgba(0,212,255,0.35)!important;transform:translateY(-4px)!important;}
        .btn-primary{background:linear-gradient(135deg,#004080,#00264d);color:#ffffff;font-weight:700;padding:14px 32px;border-radius:10px;border:none;cursor:pointer;font-size:15px;font-family:'Syne',sans-serif;transition:all 0.25s;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,64,128,0.25);}
        .btn-ghost{background:transparent;color:#004080;font-weight:600;padding:14px 32px;border-radius:10px;border:1.5px solid rgba(0,64,128,0.4);cursor:pointer;font-size:15px;font-family:'Syne',sans-serif;transition:all 0.25s;}
        .btn-ghost:hover{background:rgba(0,64,128,0.04);transform:translateY(-2px);}
        @media(max-width:1024px){.hide-mobile{display:none!important;}.mob-col{flex-direction:column!important;}}
        @media(min-width:1025px){.show-mobile{display:none!important;}}
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 200,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,128,0.1)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>
          {/* Left Side: Brand Unit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src="/sri-eshwar.png" alt="Sri Eshwar" style={{ height: 42, width: 'auto', objectFit: 'contain' }} />
            <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} className="hide-mobile" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#000080', fontFamily: 'Syne,sans-serif', letterSpacing: -0.5 }}>DigiP&amp;ID</span>
              <span style={{ fontSize: 9, color: '#004080', border: '1px solid #00408044', borderRadius: 4, padding: '1px 5px', fontWeight: 600 }}>POC</span>
            </div>
          </div>

          {/* Right Side: Navigation & Partner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }} className="hide-mobile">
              {navLinks.slice(1, 5).map(l => (
                <a key={l.label} href={l.href} style={{
                  color: '#475569', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'color 0.2s',
                  fontFamily: 'DM Sans,sans-serif'
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#004080')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>{l.label}</a>
              ))}
            </div>

            <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 8px' }} className="hide-mobile" />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src="/techgium.png" alt="TECHgium" style={{ height: 22, width: 'auto', objectFit: 'contain' }} />
              <a href="#demo" className="btn-primary hide-mobile" style={{ textDecoration: 'none', padding: '9px 18px', borderRadius: 8, fontSize: 12 }}>Watch Demo</a>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#000080', fontSize: 24, cursor: 'pointer' }} className="show-mobile">☰</button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
        {/* Animated grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,128,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,128,0.03) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
        {/* Scan line */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.15),transparent)', animation: 'scanline 8s linear infinite' }} />
        </div>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '12%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.1) 0%,transparent 70%)', pointerEvents: 'none', animation: 'glow 4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,255,136,0.08) 0%,transparent 70%)', pointerEvents: 'none', animation: 'glow 5s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(0,212,255,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 32, background: 'rgba(0,212,255,0.05)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, color: '#00d4ff', fontWeight: 500, fontFamily: 'DM Mono,monospace' }}>TECHgium® 9th Edition · POC Round · TG0912524 · Sri Eshwar College of Engineering</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(40px, 10vw, 100px)', marginBottom: 48, opacity: 0.9 }}>
              <img src="/sri-eshwar.png" alt="Sri Eshwar Logo" style={{ height: 'clamp(60px, 12vw, 110px)', width: 'auto', objectFit: 'contain' }} />
              <img src="/techgium.png" alt="TECHgium Logo" style={{ height: 'clamp(40px, 8vw, 70px)', width: 'auto', objectFit: 'contain' }} />
            </div>

            <h1 style={{ fontSize: 'clamp(42px,8vw,90px)', fontWeight: 900, lineHeight: 1.0, marginBottom: 24, letterSpacing: '-2px', color: '#000080', fontFamily: 'Syne,sans-serif' }}>
              DigiP&amp;ID
            </h1>
            <p style={{ fontSize: 'clamp(16px,2.5vw,22px)', color: '#334155', fontWeight: 400, marginBottom: 16, lineHeight: 1.5, fontFamily: 'DM Sans,sans-serif' }}>
              From <strong style={{ color: '#004080' }}>Static Engineering Drawing</strong> to <strong style={{ color: '#0066cc' }}>Machine-Ready Intelligence</strong>
            </p>
            <p style={{ fontSize: 16, color: '#475569', maxWidth: 600, margin: '0 auto 44px', lineHeight: 1.8, fontFamily: 'DM Sans,sans-serif' }}>
              AI-powered industrial diagram digitization that transforms decades of legacy P&amp;ID drawings into structured JSON — powered by YOLO computer vision, dual OCR, and graph intelligence.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#demo" className="btn-primary" style={{ textDecoration: 'none', boxShadow: '0 0 40px rgba(0,212,255,0.25)' }}>Watch Demo →</a>
              <a href="#pid" className="btn-ghost" style={{ textDecoration: 'none' }}>Explore the Problem ↓</a>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 72, flexWrap: 'wrap', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
              {[['93%', 'Symbol Detection mAP', '#00d4ff'], ['91%', 'Line Connectivity', '#00ff88'], ['82%', 'System Accuracy', '#a78bfa'], ['6', 'Pipeline Stages', '#f97316']].map(([v, l, c], i) => (
                <div key={l} style={{ padding: '24px 36px', borderRight: i < 3 ? '1px solid #1e293b' : 'none', textAlign: 'center', flex: '1 1 120px' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: c as string, lineHeight: 1, fontFamily: 'Syne,sans-serif' }}>{v}</div>
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'float 2s ease-in-out infinite' }}>
          <span style={{ fontSize: 11, color: '#334155', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ── WHAT IS P&ID ────────────────────────────────────────────────── */}
      <section id="pid" style={S.section('#f8fafc')}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow()}>Understanding the Domain</p>
              <h2 style={S.h2()}>What is a <span style={{ color: '#004080' }}>P&amp;ID</span>?</h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>
                Piping and Instrumentation Diagram — the master blueprint of every industrial process plant.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 40, alignItems: 'start' }}>
            <RevealSection delay={100}>
              <div>
                <div style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 20, padding: 36, marginBottom: 24 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#2c76c0ff', marginBottom: 16, fontFamily: 'Syne,sans-serif' }}>Full Form</h3>
                  <div style={{ fontSize: 18, color: '#004080', fontWeight: 700, marginBottom: 20, fontFamily: 'DM Mono,monospace' }}>
                    <span style={{ color: '#000080' }}>P</span>iping and <span style={{ color: '#000080' }}>I</span>nstrumentation <span style={{ color: '#000080' }}>D</span>iagram
                  </div>
                  <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8 }}>
                    A P&amp;ID is a detailed schematic that represents the complete picture of a process plant — all pipes, equipment, instruments, control loops, and the relationships between them, drawn to internationally recognized standards (ISA 5.1, ISO 10628).
                  </p>
                </div>

                {/* Visual Anchor: Real P&ID Fragment */}
                <div style={{ marginBottom: 24, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '12px', boxShadow: '0 8px 20px -12px rgba(0,0,0,0.1)' }}>
                  <img
                    src="/pid_sample.png"
                    alt="Standard P&ID Diagram Fragment"
                    style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block' }}
                  />
                  <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 10, textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Standard Piping & Instrumentation Drawing Detail</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { label: 'Pipes & Lines', desc: 'All fluid pathways with size and material', icon: '⎯' },
                    { label: 'Equipment', desc: 'Pumps, tanks, reactors, heat exchangers', icon: '⬡' },
                    { label: 'Instruments', desc: 'Sensors, transmitters, analyzers', icon: '◎' },
                    { label: 'Control Loops', desc: 'Valves, actuators, logic controllers', icon: '⟳' },
                  ].map(item => (
                    <div key={item.label} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ fontSize: 24, color: '#004080', marginBottom: 10, fontWeight: 900 }}>{item.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#000080', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.5, flex: 1 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#000080', marginBottom: 20, fontFamily: 'Syne,sans-serif' }}>Real-World Industry Examples</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {pidExamples.map((ex, i) => (
                    <div key={ex.title} className="card-hover" style={{ ...S.card(), display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 32, flexShrink: 0 }}>{ex.icon}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#000080', marginBottom: 6, fontFamily: 'Syne,sans-serif' }}>{ex.title}</div>
                        <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>{ex.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secondary Visual: Industry Sample */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '12px', marginTop: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <img
                    src="/pid_sample_2.png"
                    alt="Complex Industrial P&ID"
                    style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block' }}
                  />
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 8, textAlign: 'center' }}>AI identifies complex interconnectivity in multi-layered schematics</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE STATEMENT ─────────────────────────────────────────── */}
      <section id="challenge" style={S.section()}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow('#ef4444')}>The Problem</p>
              <h2 style={S.h2()}>The P&amp;ID <span style={{ color: '#004080' }}>Digitization Crisis</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>
                Billions of dollars of engineering intelligence is trapped inside static drawings. Manual digitization is slow, expensive, and dangerously error-prone.
              </p>
            </div>
          </RevealSection>

          {/* Industry Stats */}
          <RevealSection delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 56 }}>
              {industryStats.map(stat => (
                <div key={stat.label} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: `1px solid ${stat.color}22`, borderRadius: 16, padding: '28px 20px', textAlign: 'center', borderTop: `3px solid ${stat.color}` }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: stat.color, fontFamily: 'Syne,sans-serif', marginBottom: 8 }}>
                    <AnimatedCounter end={typeof stat.value === 'number' ? Math.floor(stat.value) : 14} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Challenge Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {challenges.map((c, i) => (
              <RevealSection key={c.title} delay={i * 80} style={{ height: '100%' }}>
                <div className="card-hover" style={{ ...S.card(), height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ ...S.tag('#ef4444'), display: 'inline-block' }}>{c.stat}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#000080', fontFamily: 'Syne,sans-serif', lineHeight: 1.4 }}>{c.title}</h3>
                  </div>
                  <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.75, flex: 1 }}>{c.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Quote */}
          <RevealSection delay={200}>
            <div style={{ marginTop: 56, background: 'linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.02))', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, padding: '40px 48px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, left: 28, fontSize: 80, color: 'rgba(239,68,68,0.1)', fontFamily: 'Georgia,serif', lineHeight: 1 }}>"</div>
              <p style={{ fontSize: 20, color: '#1e293b', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', maxWidth: 800, position: 'relative', zIndex: 1, fontFamily: 'DM Sans,sans-serif' }}>
                Traditional manual data extraction and redrawing of P&amp;IDs takes days or even months, delaying projects and adding unnecessary costs. Despite advancements in digital tools, P&amp;ID management remains one of the <strong style={{ color: '#ef4444' }}>most outdated aspects</strong> of engineering workflows.
              </p>
              <div style={{ marginTop: 20, fontSize: 12, color: '#475569', letterSpacing: 1, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>— IPS-AI Industry Analysis, 2025</div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── REAL-TIME INDUSTRY INFO ─────────────────────────────────────── */}
      <section style={S.section('#f1f5f9')}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <p style={S.eyebrow('#f97316')}>Market Intelligence</p>
              <h2 style={S.h2()}>Industry Reality <span style={{ color: '#f97316' }}>Right Now</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>
                The global push for Industry 4.0 is making P&amp;ID digitization a billion-dollar urgency across every process-heavy sector.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginBottom: 40 }}>
            {[
              { icon: '', title: '$1.68B → $3.84B', sub: 'Digitization market 2024–2031 (14.6% CAGR)', color: '#00ff88' },
              { icon: '', title: '68% Non-Digital', sub: 'P&IDs still stored as paper or scanned PDFs globally', color: '#f97316' },
              { icon: '', title: '3–6 Months/Plant', sub: 'Average manual digitization time per industrial facility', color: '#ef4444' },
              { icon: '', title: '$1.8B by 2032', sub: 'AI in industrial applications global market projection', color: '#00d4ff' },
            ].map(item => (
              <RevealSection key={item.title} style={{ height: '100%' }}>
                <div className="card-hover" style={{ ...S.card(), height: '100%', textAlign: 'center', borderTop: `2px solid ${item.color}44`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: item.color, fontFamily: 'Syne,sans-serif', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.6 }}>{item.sub}</div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Industry impact matrix */}
          <RevealSection delay={150}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 12, color: '#f97316', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'DM Mono,monospace' }}>Live Industry Impact Matrix</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))' }}>
                {industryImpact.map((item, i) => (
                  <div key={item.industry} style={{ padding: '28px 32px', border: '1px solid #e2e8f0', margin: '-0.5px' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon || ''}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#000080', marginBottom: 6, fontFamily: 'Syne,sans-serif' }}>{item.industry}</div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, marginBottom: 12, flex: 1 }}>{item.impact}</div>
                    <span style={{ ...S.tag('#00ff88'), alignSelf: 'flex-start' }}>{item.saving}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── PROPOSED SOLUTION ───────────────────────────────────────────── */}
      <section id="solution" style={S.section()}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow('#00d4ff')}>Proposed Solution</p>
              <h2 style={S.h2()}>Why <span style={{ color: '#00d4ff' }}>DigiP&amp;ID</span>?</h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>
                We built an end-to-end AI pipeline that solves every limitation of manual digitization — with computer vision, OCR, and graph intelligence working in concert.
              </p>
            </div>
          </RevealSection>

          {/* Why we built this */}
          <RevealSection delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 32, marginBottom: 64, alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#000080', marginBottom: 20, fontFamily: 'Syne,sans-serif' }}>The Why Behind the Solution</h3>
                {[
                  { point: 'No existing open-source solution handles the full P&ID pipeline', color: '#00d4ff' },
                  { point: 'Manual digitization is economically unviable at scale — AI is the only path forward', color: '#00ff88' },
                  { point: 'Digital Twin and Industry 4.0 adoption is blocked without structured P&ID data', color: '#a78bfa' },
                  { point: 'Transfer learning allows our model to generalize across company-specific symbol libraries', color: '#f97316' },
                ].map(item => (
                  <div key={item.point} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{item.point}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: 36, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'DM Mono,monospace' }}>Competitive Advantage</div>
                {[
                  { label: 'Manual Digitization', mAP: 60, time: '3–6 months', cost: 'Very High' },
                  { label: 'Rule-Based OCR', mAP: 72, time: '2–4 weeks', cost: 'High' },
                  { label: 'DigiP&ID (Ours)', mAP: 93, time: 'Minutes', cost: 'Near-zero' },
                ].map((row, i) => (
                  <div key={row.label} style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: i === 2 ? '#00d4ff' : '#64748b', fontWeight: i === 2 ? 700 : 400 }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: i === 2 ? '#00ff88' : '#475569', fontFamily: 'DM Mono,monospace' }}>{row.mAP}% mAP</span>
                    </div>
                    <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${row.mAP}%`, background: i === 2 ? 'linear-gradient(90deg,#00d4ff,#00ff88)' : '#cbd5e1', borderRadius: 3, transition: 'width 1s ease' }} />
                    </div>
                    <div style={{ fontSize: 11, color: '#334155', marginTop: 4 }}>{row.time} · Cost: {row.cost}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Solution pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {solution.map((s, i) => (
              <RevealSection key={s.title} delay={i * 100} style={{ height: '100%' }}>
                <div className="card-hover" style={{ ...S.card(), borderTop: `2px solid ${s.color}55`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <div style={{ fontSize: 28 }}>{s.icon}</div>
                    <span style={S.tag(s.color)}>{s.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#000080', marginBottom: 12, fontFamily: 'Syne,sans-serif' }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.75, marginBottom: 16, flex: 1 }}>{s.why}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 16, borderTop: '1px solid #e2e8f0', marginTop: 'auto' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.impact}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPLEMENTATION & DIAGRAM ─────────────────────────────────────── */}
      <section id="implementation" style={S.section('#f8fafc')}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow('#a78bfa')}>Implementation</p>
              <h2 style={S.h2()}>How It <span style={{ color: '#a78bfa' }}>Works</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>The complete AI pipeline — from raw image to structured JSON in minutes.</p>
            </div>
          </RevealSection>

          {/* High-Fidelity Architecture Image */}
          <RevealSection delay={100}>
            <div style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '20px', marginBottom: 56,
              boxShadow: '0 12px 24px -10px rgba(0,0,0,0.05)', textAlign: 'center', overflow: 'hidden'
            }}>
              <img
                src="/architecture.png"
                alt="DigiP&ID Complete System Architecture"
                style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block' }}
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CORE FEATURES & INDUSTRY IMPACT ─────────────────────────────── */}
      <section id="features" style={S.section()}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow('#00ff88')}>Core Features</p>
              <h2 style={S.h2()}>What Makes DigiP&amp;ID <span style={{ color: '#00ff88' }}>Powerful</span></h2>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '20px',
              boxShadow: '0 12px 24px -10px rgba(0,0,0,0.05)', textAlign: 'center', overflow: 'hidden'
            }}>
              <img
                src="/features.png"
                alt="DigiP&ID Powerful Features Showcase"
                style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block' }}
              />
            </div>
          </RevealSection>

          {/* Model Metrics Section */}
          <RevealSection delay={120}>
            <div style={{ textAlign: 'center', marginBottom: 64, marginTop: 100 }}>
              <p style={S.eyebrow('#6366f1')}>Performance Analysis</p>
              <h2 style={S.h2()}>Deep Learning <span style={{ color: '#6366f1' }}>Metrics</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>Rigorous evaluation of our symbol detection and OCR pipeline performance.</p>
            </div>

            <div style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '24px',
              boxShadow: '0 12px 24px -10px rgba(0,0,0,0.05)', textAlign: 'center'
            }}>
              <img
                src="/metrics.png"
                alt="AI Model Metrics and Training Results"
                style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block' }}
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── DEMO ────────────────────────────────────────────────────────── */}
      <section id="demo" style={S.section('#f1f5f9')}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={S.eyebrow('#00d4ff')}>Prototype Demo</p>
              <h2 style={S.h2()}>See DigiP&amp;ID <span style={{ color: '#00d4ff' }}>in Action</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>Watch the complete pipeline: upload → detection → OCR → graph → JSON output.</p>
            </div>
          </RevealSection>

          {/* Demo video player */}
          <RevealSection delay={100}>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#000', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.2)', maxWidth: 1000, margin: '0 auto' }}>
              <iframe
                src="https://drive.google.com/file/d/10xTkahsYczMPDA_-c0xoh8pu3u5uZq5G/preview"
                width="100%"
                style={{ aspectRatio: '16/9', border: 'none' }}
                allow="autoplay"
                title="DigiP&ID Project Demo"
              ></iframe>
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(0,64,128,0.05)', borderRadius: 100, padding: '8px 20px', border: '1px solid rgba(0,64,128,0.1)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 13, color: '#004080', fontWeight: 600 }}>Interactive Prototype Walkthrough</span>
              </div>
            </div>
          </RevealSection>

          {/* JSON output viewer */}
          <RevealSection delay={150}>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 24, alignItems: 'stretch' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: 12, color: '#475569', marginLeft: 8, fontFamily: 'DM Mono,monospace' }}>output.json</span>
                </div>
                <pre style={{ padding: '20px', margin: 0, fontSize: 11, lineHeight: 1.7, color: '#64748b', fontFamily: 'DM Mono,monospace', overflow: 'auto', flex: 1, maxHeight: 400 }}>
                  <span style={{ color: '#64748b' }}>{sampleJSON.split('\n').map((line, i) => {
                    if (line.includes('"')) {
                      return line.replace(/"([^"]+)":/g, (_m, k) => `"<span style="color:#00d4ff">${k}</span>":`);
                    }
                    return line;
                  }).join('\n')}</span>
                </pre>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
                {[
                  { icon: '', label: '93% Symbol Detection', sub: 'YOLO mAP across all classes', color: '#00d4ff' },
                  { icon: '', label: 'Dual OCR Pipeline', sub: 'Printed + handwritten annotation support', color: '#00ff88' },
                  { icon: '', label: '91% Line Connectivity', sub: 'Topology reconstruction accuracy', color: '#a78bfa' },
                  { icon: '', label: 'JSON → Digital Twin', sub: 'Industry 4.0 ready in minutes', color: '#f97316' },
                ].map(h => (
                  <div key={h.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flex: 1 }}>
                    <div style={{ fontSize: 26, flexShrink: 0 }}>{h.icon}</div>
                    <div>
                      <div style={{ color: h.color, fontWeight: 700, fontSize: 14 }}>{h.label}</div>
                      <div style={{ color: '#475569', fontSize: 12, marginTop: 2 }}>{h.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────────────────── */}
      <section style={S.section()}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={S.eyebrow('#a78bfa')}>Built With</p>
              <h2 style={S.h2()}>Technology <span style={{ color: '#a78bfa' }}>Stack</span></h2>
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {techStack.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid #1e293b', borderRadius: 40, padding: '10px 20px', transition: 'all 0.25s', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = t.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.background = `${t.color}12`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.background = '#ffffff'; }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                  <span style={{ fontWeight: 600, color: '#334155', fontSize: 14, fontFamily: 'DM Sans,sans-serif' }}>{t.name}</span>
                  <span style={{ fontSize: 11, color: '#475569' }}>{t.cat}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── ROADMAP POC → MVP ────────────────────────────────────────────── */}
      <section id="roadmap" style={S.section('#f1f5f9')}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow('#f97316')}>What's Next</p>
              <h2 style={S.h2()}>POC → <span style={{ color: '#f97316' }}>MVP Roadmap</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>
                High-level plan for scaling DigiP&amp;ID from a proof of concept into a production-grade industrial SaaS platform.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginBottom: 48 }}>
            {roadmap.map((r, i) => (
              <RevealSection key={r.phase} delay={i * 100}>
                <div className="card-hover" style={{ ...S.card(), borderTop: `2px solid ${r.color}55`, height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 32 }}>{r.icon}</div>
                    <span style={S.tag(r.color)}>{r.timeline}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000080', marginBottom: 16, fontFamily: 'Syne,sans-serif' }}>{r.phase}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {r.items.map(item => (
                      <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: r.color, flexShrink: 0, marginTop: 1 }}>→</span>
                        <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Cost breakdown */}
          <RevealSection delay={200}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginBottom: 48 }}>
              <div style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 18, padding: 32 }}>
                <h3 style={{ color: '#00ff88', fontWeight: 700, marginBottom: 20, fontSize: 17, fontFamily: 'Syne,sans-serif' }}>POC Cost</h3>
                {['All core modules leverage open-source technologies', 'No licensing cost during prototype phase', 'Infrastructure hosted in dev/test environment', 'Negligible direct cost — fully bootstrap-funded'].map(c => (
                  <div key={c} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <span style={{ color: '#00ff88', flexShrink: 0, marginTop: 2 }}>-</span>
                    <span style={{ color: '#475569', fontSize: 13, lineHeight: 1.6 }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 18, padding: 32 }}>
                <h3 style={{ color: '#004080', fontWeight: 700, marginBottom: 20, fontSize: 17, fontFamily: 'Syne,sans-serif' }}>MVP Cost Factors</h3>
                {['Cloud infrastructure for production deployment (AWS/GCP)', 'Compute cost for model inference at scale', 'Storage for drawings, metadata, and versioning', 'Integration, maintenance & enterprise compliance overhead', 'Optional SOC 2 security and enterprise licensing'].map(c => (
                  <div key={c} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <span style={{ color: '#004080', flexShrink: 0, marginTop: 2 }}>→</span>
                    <span style={{ color: '#475569', fontSize: 13, lineHeight: 1.6 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Industry transformation impact */}
          <RevealSection delay={150}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px 48px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#000080', marginBottom: 24, fontFamily: 'Syne,sans-serif' }}>Complete Product Vision: Industry-Level Impact</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
                {[
                  { title: 'Compress audit cycles', desc: '6-month P&ID audits → 72 hours with AI-powered digitization', icon: '' },
                  { title: 'Enable Digital Twin', desc: 'Provide the structured topology backbone that Digital Twin systems require', icon: '' },
                  { title: 'Zero-error asset registers', desc: 'Machine-generated JSON eliminates transcription errors from ERP/CMMS imports', icon: '' },
                  { title: 'Cross-industry reach', desc: 'From oil & gas to pharma to water treatment — one platform, all sectors', icon: '' },
                ].map(item => (
                  <div key={item.title} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f97316', marginBottom: 8, fontFamily: 'Syne,sans-serif' }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── RESULTS & CONCLUSION ────────────────────────────────────────── */}
      <section style={S.section()}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: 36, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#004080', marginBottom: 20, fontFamily: 'Syne,sans-serif' }}>Results</h3>
                {['Successfully converts static P&IDs into structured JSON graphs', 'Achieved high symbol detection (93%) and connectivity accuracy (91%)', 'Enables graph-based querying and topology analysis', 'Stable training convergence with improving precision/recall'].map(r => (
                  <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <span style={{ color: '#004080', flexShrink: 0, marginTop: 2 }}>-</span>
                    <span style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: 36, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0066cc', marginBottom: 20, fontFamily: 'Syne,sans-serif' }}>Conclusion</h3>
                {['Demonstrates a scalable AI-driven digitization framework for industry', 'Effectively mitigates domain shift via transfer learning', 'Provides strong foundation for Digital Twin integration at scale', 'Bridges the gap between legacy drawings and Industry 4.0 systems'].map(r => (
                  <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <span style={{ color: '#0066cc', flexShrink: 0, marginTop: 2 }}>-</span>
                    <span style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────────── */}
      <section id="team" style={S.section('#f8fafc')}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={S.eyebrow('#00ff88')}>The Team</p>
              <h2 style={S.h2()}>Built at <span style={{ color: '#004080' }}>Sri Eshwar College</span></h2>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>Team TG0912524 · TECHgium® 9th Edition · Coimbatore, Tamil Nadu</p>
              <p style={{ ...S.sub(), margin: '0 auto', textAlign: 'center' }}>By Pentium Predators</p>
            </div>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
            {team.map((m, i) => (
              <RevealSection key={m.name} delay={i * 100}>
                <div className="card-hover" style={{ ...S.card(), textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: m.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#ffffff', margin: '0 auto 20px', fontFamily: 'Syne,sans-serif', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                    {m.avatar}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#000080', marginBottom: 6, fontFamily: 'Syne,sans-serif' }}>{m.name}</h3>
                  <div style={{ fontSize: 13, color: '#004080', fontWeight: 600, marginBottom: 12 }}>{m.role}</div>
                  <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{m.detail}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Mentor */}

        </div>
      </section>

      {/* ── QUOTE & CLOSING ──────────────────────────────────────────────── */}
      <section style={S.section()}>
        <div style={S.container()}>
          <RevealSection>
            <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto', marginBottom: 64 }}>
              <div style={{ fontSize: 72, color: 'rgba(0,0,128,0.05)', fontFamily: 'Georgia,serif', lineHeight: 0.8, marginBottom: 24 }}>"</div>
              <p style={{ fontSize: 'clamp(20px,2.5vw,28px)', color: '#1e293b', fontWeight: 400, lineHeight: 1.65, fontStyle: 'italic', fontFamily: 'DM Sans,sans-serif', marginBottom: 24 }}>
                The future of industrial engineering is not in drawing better P&amp;IDs — it's in making every P&amp;ID already drawn <strong style={{ color: '#004080' }}>intelligent, queryable, and connected</strong> to the systems that run the world.
              </p>
              <div style={{ fontSize: 13, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'DM Mono,monospace' }}>— Team DigiP&amp;ID · TG0912524</div>
            </div>
          </RevealSection>

          {/* CTA */}
          <RevealSection delay={100}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 24, padding: 'clamp(40px,6vw,72px)', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 900, color: '#000080', marginBottom: 16, fontFamily: 'Syne,sans-serif' }}>Transform Your Industrial Diagrams</h2>
              <p style={{ color: '#475569', fontSize: 16, marginBottom: 40, lineHeight: 1.75, maxWidth: 540, margin: '0 auto 40px', fontFamily: 'DM Sans,sans-serif' }}>
                Unlock decades of engineering knowledge trapped in legacy P&amp;IDs. Join the digitization revolution with DigiP&amp;ID.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary">Get Started Free</button>
                <button className="btn-ghost">Schedule a Demo</button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── REFERENCES ──────────────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#334155', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'DM Mono,monospace' }}>References</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {references.map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: '#334155', lineHeight: 1.7, fontFamily: 'DM Mono,monospace' }}>
                [{i + 1}] {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="/sri-eshwar.png" alt="Sri Eshwar" style={{ height: 24, width: 'auto', objectFit: 'contain' }} />
            <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
            <span style={{ fontWeight: 800, color: '#000080', fontFamily: 'Syne,sans-serif' }}>DigiP&amp;ID</span>
            <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
            <img src="/techgium.png" alt="TECHgium" style={{ height: 20, width: 'auto', objectFit: 'contain' }} />
            <span style={{ color: '#475569', fontSize: 12, marginLeft: 8 }}>· Sri Eshwar College of Engineering, Coimbatore</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: '#334155', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s', fontFamily: 'DM Sans,sans-serif' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#004080')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>{l}</a>
            ))}
          </div>
          <p style={{ color: '#475569', fontSize: 13, fontFamily: 'DM Mono,monospace' }}>© 2025 DigiP&amp;ID · TG0912524</p>
        </div>
      </footer>
    </div>
  );
}