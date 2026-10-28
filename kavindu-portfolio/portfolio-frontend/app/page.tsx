"use client";
import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------- */
/* Data (same shape your Node backend returns)                      */
/* ---------------------------------------------------------------- */

const MAIL = "kavindumalshan2003@gmail.com";
// Contact form posts to your PHP script on cPanel (it emails kavindumalshan2003@gmail.com).
// Override with NEXT_PUBLIC_CONTACT_URL in .env.local if you move the script.
const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
// Your photos live in /public: profile.svg (hero illustration) and avatar.svg (round face illustration). Real photos are also in public as profile.jpg and avatar.jpg.
const PHOTO = "/profile.svg";
const AVATAR = "/avatar.svg";

interface Project { k: string; y: string; n: string; d: string; tags: string[]; pts: string[] }

const P: Project[] = [
  { k: "bc", y: "ASB Fashion, 2026", n: "A broadcast system for 200,000+ customers", d: "A communication platform that manages SMS, WhatsApp and email campaigns for the retailer's loyalty customers. Built to keep working well past 1 million.", tags: ["PHP", "MySQL", "Hutch SMS API", "Meta WhatsApp Business API", "cPanel"], pts: ["Customer segmentation and campaign scheduling.", "Message tracking and delivery reporting in one place.", "Architecture designed to scale beyond 1 million customers."] },
  { k: "po", y: "ASB Fashion, 2026", n: "Purchasing orders, from request to quality check", d: "An internal system for creating purchase orders, approving them, receiving goods and checking quality. Built without a JavaScript framework.", tags: ["HTML5", "Tailwind CSS", "JavaScript", "PHP", "MySQL", "REST APIs"], pts: ["Approvals and goods receiving in one workflow.", "Plain HTML, CSS, PHP and vanilla JavaScript.", "MySQL database with a REST API layer."] },
  { k: "web", y: "ASB Fashion, 2026", n: "The official ASB Fashion website", d: "The online home of one of Sri Lanka's leading fashion retailers, with product showcases, promotions, company information and online gift vouchers.", tags: ["React.js", "PHP", "MySQL", "CSS", "SEO", "cPanel"], pts: ["Responsive interface with SEO optimisation.", "Online gift voucher purchasing.", "Secure database integration and a performance-focused build."] },
  { k: "fl", y: "University of Bedfordshire, 2026", n: "FloodMind: an early flood warning for the Kelani River", d: "My BSc research project. I prepared the datasets, trained XGBoost models to predict water levels and flood risk, and built a working prototype.", tags: ["Python", "XGBoost", "PHP REST API", "MySQL", "Arduino UNO", "Ultrasonic sensors"], pts: ["Python prediction pipeline for water level and flood risk.", "PHP REST APIs, a MySQL database and a web dashboard.", "Automated email alerts and an Arduino ultrasonic sensor prototype."] },
  { k: "ph", y: "Personal project", n: "Brainana, a maths and logic game for Android", d: "A game built around interactive maths and logic challenges, with a modern Jetpack Compose interface.", tags: ["Kotlin", "Jetpack Compose", "Android SDK"], pts: ["Native Android UI built with Jetpack Compose.", "Interactive maths and logic challenges."] },
  { k: "ap", y: "Personal project", n: "Arrow Food, a Node.js backend", d: "A backend-focused application covering REST API design and server-side application logic.", tags: ["Node.js", "Express.js", "REST API"], pts: ["Clean REST API design.", "Server-side logic built with Express.js."] },
];

const SKETCH = [
  ["DownVid", "A video downloader", "React.js, Node.js, Express.js, Python, yt-dlp, FFmpeg", "--p1"],
  ["AI Subtitle Pro", "Subtitles from audio and video with Whisper AI", "Python, Whisper AI, Node.js, React", "--p2"],
  ["Hire Us", "Worker registration, ID verification and job tracking", "PHP, MySQL, Java, Hostinger", "--p3"],
  ["KMD Sweet House", "A business site with product showcases and admin tools", "React.js, PHP, MySQL, Hostinger", "--p4"],
  ["StatusBox", "An Android app for handling and saving status media", "Java, Kotlin, Android SDK", "--p1"],
  ["MediCare", "A Java desktop app for patients, appointments and medicines", "Java, OOP, MySQL, SMTP", "--p2"],
];

const TOOLS: [string, string, string[]][] = [
  ["Languages", "--p1", ["Java", "Kotlin", "JavaScript", "PHP", "Python", "C/C++"]],
  ["Frontend", "--p3", ["HTML5", "CSS3", "Tailwind CSS", "React.js", "Next.js", "Responsive UI", "SEO"]],
  ["Backend and integrations", "--p2", ["PHP REST APIs", "Node.js", "Express.js", "Webhooks", "Authentication", "Hutch SMS API", "Meta WhatsApp Business API"]],
  ["Databases", "--p4", ["MySQL", "MSSQL", "MongoDB", "Firebase"]],
  ["Mobile", "--p1", ["Android SDK", "Java / Kotlin", "Jetpack Compose", "Firebase"]],
  ["AI, data and tools", "--p3", ["XGBoost", "Whisper AI", "Dataset preparation", "Git/GitHub", "cPanel", "Hostinger", "Postman", "FFmpeg", "Linux"]],
];

const STEPS: [string, string, string, string[]][] = [
  ["Now", "Independent Software Engineer", "Freelance, based in Colombo, Sri Lanka", ["Working directly with clients on backend systems, REST APIs and messaging platforms.", "Building full-stack web apps and native Android apps from first idea to deployment."]],
  ["From May 2026", "Associate Software Engineer", "ASB Fashion (Pvt) Ltd, IT Department", ["Turning business workflows into software, from requirements to deployment.", "Building the Purchasing Order Management System, the official website and ASB Loyal Vault, the loyalty platform.", "API integrations, database optimisation, troubleshooting and maintenance."]],
  ["Nov 2025 to May 2026", "Software Engineering Intern", "ASB Fashion (Pvt) Ltd, IT Department", ["Microsoft SQL Server administration and server management.", "Built the Broadcast Management System and the Token Management System, and contributed to the Returns Management System."]],
  ["2023 to 2026", "BSc (Hons) Software Engineering", "University of Bedfordshire, UK, with a Higher Diploma in IT at SLIIT City University, Colombo 03", []],
  ["Earlier", "G.C.E. A/L Physical Science and O/L", "Mahanama College, Colombo 03", []],
];

const MARQUEE = ["PHP", "Node.js", "React", "Next.js", "Kotlin", "Jetpack Compose", "MySQL", "MSSQL", "Python", "XGBoost", "WhatsApp API", "REST", "Firebase", "Whisper AI"];
const ORBIT = ["PHP", "React", "Kotlin", "Node", "MySQL", "Python"];
const TYPED = ["reliable APIs.", "Jetpack Compose.", "WhatsApp automation.", "flood prediction.", "tidy databases."];
const GREET = ["Hello!", "ආයුබෝවන්!", "வணக்கம்!", "Hi there!"];
const SYM = ["</>", "{ }", "=>", ";", "01", "#", "()", "[]", "&&", "::"];
const DOCK: [string, string, string][] = [
  ["top", "Home", "M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"],
  ["talent", "Skills", "M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"],
  ["work", "Work", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"],
  ["path", "Path", "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2"],
  ["hello", "Contact", "M3 6h18v12H3zM3 7l9 7 9-7"],
];
const LOG = ["neural core online", "loading projects", "syncing satellites", "year 2040: ready"];
const SKY: [number, number][] = [[0, 90], [60, 150], [110, 110], [170, 190], [230, 130], [290, 230], [350, 120], [410, 170], [470, 100], [520, 210], [580, 140], [640, 260], [700, 120], [760, 180], [820, 110], [880, 240], [940, 150], [1000, 120], [1060, 200], [1120, 130], [1180, 170], [1240, 100], [1300, 220], [1360, 140]];
const CONTACT = process.env.NEXT_PUBLIC_CONTACT_URL || "https://admin.asbfashion.com/Contact/contact.php";
type Tech = { n: string; s: string; c: string; t?: string; slug: string; d: string };
const TECH: Tech[] = [
  { n: "PHP", s: "php", c: "#777BB4", slug: "php", d: "REST APIs and the 200,000-customer broadcast system" },
  { n: "Node.js", s: "Nd", c: "#3C873A", slug: "nodedotjs", d: "Express backends and API services" },
  { n: "React", s: "Re", c: "#0EA5C6", slug: "react", d: "Interfaces, sites and web apps" },
  { n: "Kotlin", s: "Kt", c: "#7F52FF", slug: "kotlin", d: "Native Android apps with Jetpack Compose" },
  { n: "MySQL", s: "SQL", c: "#E48E00", slug: "mysql", d: "The main database behind most of my systems" },
  { n: "Python", s: "Py", c: "#3776AB", slug: "python", d: "XGBoost models, automation and Whisper AI tools" },
  { n: "JavaScript", s: "JS", c: "#F0C419", t: "#0B1230", slug: "javascript", d: "Front ends, scripts and plain-JS apps" },
  { n: "Java", s: "Jv", c: "#E76F00", slug: "openjdk", d: "Android apps and desktop software" },
  { n: "Next.js", s: "Nx", c: "#111827", slug: "nextdotjs", d: "Full-stack sites, including this one" },
  { n: "Tailwind CSS", s: "Tw", c: "#06B6D4", slug: "tailwindcss", d: "Fast, consistent styling" },
  { n: "SQL Server", s: "MS", c: "#CC2927", slug: "microsoftsqlserver", d: "Database administration and server management" },
  { n: "MongoDB", s: "Mg", c: "#13AA52", slug: "mongodb", d: "Flexible document data for web apps" },
  { n: "Firebase", s: "Fb", c: "#F5820D", slug: "firebase", d: "Auth and data for mobile apps" },
  { n: "Android", s: "An", c: "#3DDC84", t: "#0B1230", slug: "android", d: "Android SDK apps and games" },
];
const GUIDE: Record<string, string> = {
  top: "Welcome to 2040! I'm KB-9, Kavindu's guide. Scroll down and I'll show you around.",
  talent: "This is Kavindu's lab: code, data and a hologram, all running. He built a platform for 200,000+ customers.",
  reactor: "These are the tools he builds with. Tap any tile to see what it's used for.",
  services: "Need something built? Pick a service and I'll fill in the contact form for you.",
  work: "Six real projects. Scroll or swipe and you'll fly through them.",
  sketch: "Smaller side projects. Kavindu builds the ideas he can't leave alone.",
  process: "Every project follows these five steps, from first idea to a system that keeps running.",
  terminal: "Try it! Type 'help' and ask my terminal anything.",
  path: "Kavindu's journey: student, intern, engineer, and now independent.",
  hello: "Ready to build something? Your message goes straight to Kavindu's inbox.",
};
const LABEL: Record<string, string> = { top: "Home", talent: "Skills and services", work: "Projects", path: "Experience", hello: "Contact" };
const RAIL: [string, string][] = [["top", "Home"], ["talent", "Skills"], ["services", "Services"], ["work", "Projects"], ["process", "Process"], ["terminal", "Terminal"], ["path", "Experience"], ["hello", "Contact"]];
const MENU: [string, string, string, string][] = [
  ["top", "Home", "Back to the start", "M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"],
  ["talent", "Skills", "Lab, tech reactor, services", "M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"],
  ["work", "Projects", "Fly through six real builds", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"],
  ["process", "How I work", "From idea to shipped", "M5 5h6v6H5zM13 13h6v6h-6zM8 11v4h5M16 13V8h-5"],
  ["terminal", "Terminal", "Ask me anything", "M4 17l6-6-6-6M12 19h8"],
  ["path", "Experience", "Where I've been", "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2"],
  ["hello", "Contact", "Start a project", "M3 6h18v12H3zM3 7l9 7 9-7"],
];
const CAT_ICON = [
  "M8 7L3 12l5 5M16 7l5 5-5 5M14 4l-4 16",
  "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01",
  "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zM11 18h2",
  "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zM10 10h4v4h-4z",
];
const SERVICES = [
  { t: "Backend and REST APIs", c: "#6C47FF", ic: "M8 7L3 12l5 5M16 7l5 5-5 5M14 4l-4 16", b: ["Clean, well-structured endpoints", "Authentication, validation and webhooks", "PHP or Node.js with MySQL or MongoDB"] },
  { t: "Messaging platforms", c: "#00B8D9", ic: "M21 12a8 8 0 01-11.6 7.1L3 21l1.9-6.4A8 8 0 1121 12z", b: ["SMS, WhatsApp and email campaigns", "Segmentation and scheduling", "Delivery tracking and reports"] },
  { t: "Full-stack web apps", c: "#FF5C8A", ic: "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01", b: ["Next.js and React front ends", "Admin dashboards and databases", "Responsive, fast and SEO-ready"] },
  { t: "Android apps", c: "#3DB86B", ic: "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zM11 18h2", b: ["Native Kotlin with Jetpack Compose", "API and Firebase integration", "From first idea to a finished app"] },
];
const PROCESS: [string, string, string][] = [
  ["Understand", "Goals, users and constraints, in plain language.", "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5"],
  ["Design", "Architecture, API contract and database schema.", "M5 5h6v6H5zM13 13h6v6h-6zM8 11v4h5M16 13V8h-5"],
  ["Build", "Backend, integrations and the interface.", "M8 7L3 12l5 5M16 7l5 5-5 5M14 4l-4 16"],
  ["Test", "Postman, integration and error-path testing.", "M9 3h6M10 3v6L4 20a1 1 0 001 1h14a1 1 0 001-1l-6-11V3"],
  ["Ship", "Deploy, monitor and keep improving.", "M12 2c3 3 4 7 3 11l-3 3-3-3c-1-4 0-8 3-11zM9 16l-3 3 3 1M15 16l3 3-3 1"],
];
const ACC: Record<string, string> = { bc: "#6C47FF", po: "#00A67E", web: "#FF5C8A", fl: "#1AA7EC", ph: "#F29A00", ap: "#8A5CF6" };

/* ---------------------------------------------------------------- */
/* Components                                                       */
/* ---------------------------------------------------------------- */

/* interactive node network behind the hero: nodes link up and chase the pointer */
function Net() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d")!;
    let w = 0, h = 0, raf = 0, vis = true;
    const m = { x: -999, y: -999 };
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const size = () => {
      const r = cv.getBoundingClientRect(); const d = Math.min(devicePixelRatio, 2);
      w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = w < 700 ? 34 : 70;
      while (nodes.length < n) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
      nodes.length = n;
    };
    const mv = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!vis) return;
      ctx.clearRect(0, 0, w, h);
      for (const a of nodes) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1;
        const dx = m.x - a.x, dy = m.y - a.y, dm = Math.hypot(dx, dy);
        if (dm < 160) { a.x += dx * 0.012; a.y += dy * 0.012; }
        ctx.fillStyle = "#6C47FF"; ctx.beginPath(); ctx.arc(a.x, a.y, 2.2, 0, 7); ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 130) { ctx.strokeStyle = `rgba(108,71,255,${(1 - d / 130) * 0.28})`; ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
      }
    };
    size(); io.observe(cv); draw();
    addEventListener("resize", size); addEventListener("pointermove", mv, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", size); removeEventListener("pointermove", mv); };
  }, []);
  return <canvas ref={ref} className="net" aria-hidden="true" />;
}

function Scramble({ t }: { t: string }) {
  const [s, setS] = useState(t);
  const id = useRef<ReturnType<typeof setInterval> | null>(null);
  const run = () => {
    if (id.current) clearInterval(id.current);
    let i = 0;
    id.current = setInterval(() => {
      setS(t.split("").map((c, j) => (j < i ? c : "#@$%&*+?<>/"[Math.floor(Math.random() * 11)])).join(""));
      i += 0.5;
      if (i > t.length && id.current) { clearInterval(id.current); setS(t); }
    }, 30);
  };
  useEffect(() => { const x = setTimeout(run, 1700); return () => { clearTimeout(x); if (id.current) clearInterval(id.current); }; }, []); // eslint-disable-line
  return <span onPointerEnter={run} aria-label={t}>{s}</span>;
}

/* headline words rise out of a mask, one after another */
function Split({ t }: { t: string }) {
  return <>{t.split(" ").map((w, i) => <span className="sw" key={i}><span style={{ transitionDelay: `${i * 80}ms` }}>{w}&nbsp;</span></span>)}</>;
}

function Count({ n, plus }: { n: number; plus?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const s = performance.now();
      const f = (t: number) => { const p = Math.min((t - s) / 1500, 1); setV(Math.round(n * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, [n]);
  const text = n >= 1_000_000 ? `${(v / 1_000_000).toFixed(v >= n ? 0 : 1)}M` : v.toLocaleString();
  return <b ref={ref as React.RefObject<HTMLElement>}>{text}{plus ? "+" : ""}</b>;
}

/* friendly robot assistant */
function Robot({ w = 120, awake = true, wave = true }: { w?: number; awake?: boolean; wave?: boolean }) {
  return (
    <svg viewBox="0 0 140 170" width={w} className={`robot${awake ? " awake" : ""}`} aria-hidden="true">
      <defs><linearGradient id="rbb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#D5DEFA" /></linearGradient></defs>
      <ellipse cx="70" cy="162" rx="38" ry="6" fill="#6C47FF" opacity=".16" />
      <g className="rb-bob">
        <line x1="70" y1="16" x2="70" y2="30" stroke="#9AA7D8" strokeWidth="4" strokeLinecap="round" />
        <circle className="rb-ant" cx="70" cy="11" r="7" fill="#00B8D9" />
        <path d="M34 112Q34 92 54 92H86Q106 92 106 112V140Q106 150 96 150H44Q34 150 34 140Z" fill="url(#rbb)" stroke="#B8C4F0" strokeWidth="2" />
        <rect x="56" y="108" width="28" height="18" rx="6" fill="#0B1230" /><circle className="blk" cx="70" cy="117" r="5" fill="#B8F040" />
        <rect x="20" y="100" width="14" height="38" rx="7" fill="#D5DEFA" stroke="#B8C4F0" strokeWidth="2" />
        <g className={wave ? "rb-arm" : ""}><rect x="106" y="100" width="14" height="38" rx="7" fill="#D5DEFA" stroke="#B8C4F0" strokeWidth="2" /><circle cx="113" cy="138" r="8" fill="#fff" stroke="#B8C4F0" strokeWidth="2" /></g>
        <rect x="28" y="28" width="84" height="62" rx="24" fill="url(#rbb)" stroke="#B8C4F0" strokeWidth="2" />
        <rect x="38" y="40" width="64" height="38" rx="16" fill="#0B1230" />
        <rect className="rb-eye" x="50" y="52" width="14" height="14" rx="7" fill="#35E0FF" /><rect className="rb-eye" x="76" y="52" width="14" height="14" rx="7" fill="#35E0FF" />
        <path className="rb-mouth" d="M60 71Q70 77 80 71" stroke="#35E0FF" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="20" y="52" width="8" height="20" rx="4" fill="#9AA7D8" /><rect x="112" y="52" width="8" height="20" rx="4" fill="#9AA7D8" />
      </g>
    </svg>
  );
}

function Drone({ w = 70 }: { w?: number }) {
  return (
    <svg viewBox="0 0 100 50" width={w} className="drone" aria-hidden="true">
      {[14, 86].map((x) => <g key={x}><line x1={x} y1="14" x2={x < 50 ? 38 : 62} y2="26" stroke="#9AA7D8" strokeWidth="3" /><ellipse className="rotor" cx={x} cy="12" rx="14" ry="2.6" fill="#6C47FF" opacity=".55" /></g>)}
      <ellipse cx="50" cy="28" rx="22" ry="9" fill="#fff" stroke="#9AA7D8" strokeWidth="2" /><rect x="38" y="23" width="24" height="8" rx="4" fill="#0B1230" />
      <circle className="blk" cx="50" cy="27" r="2.4" fill="#35E0FF" /><path className="blk" d="M42 38L50 47L58 38Z" fill="#35E0FF" opacity=".5" />
    </svg>
  );
}

/* the 2040 city behind the hero */
function Skyline() {
  return (
    <svg className="sky" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8B7BFF" stopOpacity=".6" /><stop offset="1" stopColor="#35E0FF" stopOpacity=".14" /></linearGradient>
        <pattern id="win" width="12" height="14" patternUnits="userSpaceOnUse"><rect x="3" y="4" width="4" height="5" rx="1" fill="#fff" /></pattern>
      </defs>
      <g opacity=".5">{SKY.map(([x, h], i) => <rect key={i} x={x + 22} y={300 - h * 0.8} width="46" height={h * 0.8} fill="url(#sg)" />)}</g>
      {SKY.map(([x, h], i) => <g key={i}><rect x={x} y={300 - h} width="52" height={h} rx="3" fill="url(#sg)" /><rect className={`tw t${i % 3}`} x={x} y={300 - h} width="52" height={h} fill="url(#win)" /></g>)}
      <line x1="666" y1="40" x2="666" y2="6" stroke="#6C47FF" strokeWidth="3" /><circle className="blk" cx="666" cy="6" r="4.5" fill="#FF7AB6" />
    </svg>
  );
}

/* animated desk: scrolling code, live chart, hologram */
function Workstation() {
  const L: [number, string][] = [[40, "#35E0FF"], [70, "#B8F040"], [55, "#FF7AB6"], [85, "#8B7BFF"], [45, "#35E0FF"], [65, "#B8F040"], [30, "#FF7AB6"]];
  return (
    <svg viewBox="0 0 600 320" className="ws" role="img" aria-label="Animated futuristic workstation with scrolling code, a live chart and a hologram">
      <defs>
        <linearGradient id="deskg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#DCE4F7" /></linearGradient>
        <radialGradient id="holo" cx=".5" cy=".4"><stop offset="0" stopColor="#35E0FF" stopOpacity=".95" /><stop offset="1" stopColor="#6C47FF" stopOpacity=".2" /></radialGradient>
      </defs>
      <ellipse cx="300" cy="304" rx="270" ry="12" fill="#6C47FF" opacity=".12" />
      <rect x="150" y="30" width="230" height="150" rx="16" fill="#0B1230" /><rect x="150" y="30" width="230" height="22" rx="14" fill="#18214A" />
      {[0, 1, 2].map((i) => <circle key={i} cx={166 + i * 14} cy="41" r="3.5" fill={["#FF7AB6", "#B8F040", "#35E0FF"][i]} />)}
      {L.map(([w, c], i) => <rect key={i} className="cl" x={170 + (i % 3) * 12} y={66 + i * 15} width={w * 2.2} height="8" rx="4" fill={c} style={{ animationDelay: `${i * 0.35}s` }} />)}
      <rect className="caret" x="244" y="154" width="7" height="12" fill="#35E0FF" />
      <path d="M250 180H280L286 214H244Z" fill="#B8C4F0" />
      <rect x="30" y="86" width="100" height="78" rx="12" fill="#0B1230" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="sb" x={44 + i * 17} y="116" width="11" height="40" rx="3" fill={["#35E0FF", "#8B7BFF", "#B8F040", "#FF7AB6", "#35E0FF"][i]} style={{ animationDelay: `${i * 0.25}s` }} />)}
      <path d="M72 164H88L92 214H68Z" fill="#B8C4F0" />
      <rect x="20" y="226" width="560" height="22" rx="11" fill="url(#deskg)" stroke="#C5D0F2" /><rect className="blk" x="20" y="246" width="560" height="4" rx="2" fill="#35E0FF" opacity=".6" />
      <rect x="50" y="250" width="14" height="46" fill="#C5D0F2" /><rect x="536" y="250" width="14" height="46" fill="#C5D0F2" />
      <rect x="190" y="210" width="150" height="14" rx="5" fill="#fff" stroke="#C5D0F2" />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} className="blk" x={196 + i * 11.5} y="213" width="8" height="3.5" rx="1.5" fill="#35E0FF" style={{ animationDelay: `${((i * 5) % 12) * 0.12}s` }} />)}
      <g><ellipse cx="440" cy="222" rx="38" ry="9" fill="#35E0FF" opacity=".35" /><path d="M410 222H470L454 112H426Z" fill="url(#holo)" opacity=".4" /><circle cx="440" cy="100" r="30" fill="url(#holo)" opacity=".85" />
        <ellipse className="or1" cx="440" cy="100" rx="44" ry="12" fill="none" stroke="#35E0FF" strokeWidth="2" /><ellipse className="or2" cx="440" cy="100" rx="44" ry="12" fill="none" stroke="#8B7BFF" strokeWidth="2" /></g>
    </svg>
  );
}

/* one tool in the reactor, shown with its real logo */
function Tile({ t, i, onHover }: { t: Tech; i: number; onHover: (t: Tech | null) => void }) {
  const [bad, setBad] = useState(false);
  return (
    <button className="tile" style={{ "--tc": t.c, "--i": i, color: t.t || "#fff" } as React.CSSProperties}
      onPointerEnter={() => onHover(t)} onFocus={() => onHover(t)} onClick={() => onHover(t)}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") onHover(null); }} onBlur={() => onHover(null)} aria-label={t.n}>
      {bad ? t.s : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://cdn.simpleicons.org/${t.slug}/${t.t ? "0B1230" : "ffffff"}`} alt="" width={30} height={30} loading="lazy" onError={() => setBad(true)} />
      )}
    </button>
  );
}

/* tech reactor: two rings of tools orbiting a glowing core, linked by data beams */
function Reactor({ hov, setHov }: { hov: Tech | null; setHov: (t: Tech | null) => void }) {
  const place = (n: number, i: number, R: number) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; return [50 + R * Math.cos(a), 50 + R * Math.sin(a)]; };
  const ring = (items: Tech[], R: number, cls: string, off: number, beams: boolean) => (
    <div className={`rngs ${cls}`}>
      {beams && <svg className="beams" viewBox="0 0 100 100" aria-hidden="true">{items.map((t, i) => { const [x, y] = place(items.length, i, R); return <line key={t.n} x1="50" y1="50" x2={x} y2={y} />; })}</svg>}
      {items.map((t, i) => { const [x, y] = place(items.length, i, R); return <span key={t.n} className="pos" style={{ left: `${x}%`, top: `${y}%` }}><Tile t={t} i={i + off} onHover={setHov} /></span>; })}
    </div>
  );
  return (
    <div className="rwrap">
      <div className="rx">
        <i className="sweep" aria-hidden="true" /><i className="pulse1" /><i className="pulse2" />
        {ring(TECH.slice(0, 6), 26, "rn1", 0, true)}
        {ring(TECH.slice(6), 44, "rn2", 6, false)}
        <div className="core"><b>{hov ? hov.n : "KB"}</b><small>{hov ? "in my toolbox" : "tech reactor"}</small></div>
      </div>
      <div className="rinfo" aria-live="polite">
        {hov ? <><span className="rdot" style={{ background: hov.c }} /><b>{hov.n}</b><span>{hov.d}</span></> : <span>Hover or tap a tile to see what I use it for.</span>}
      </div>
    </div>
  );
}

/* animated illustration for each project */
function Scene({ k }: { k: string }) {
  const c = ACC[k] || ACC.bc;
  const body = {
    bc: (<><g stroke={c} strokeWidth="2" strokeDasharray="5 6" className="dash"><path d="M200 125L70 55M200 125L60 150M200 125L90 215M200 125L335 60M200 125L345 160M200 125L315 215" /></g>
      {[[70, 55], [60, 150], [90, 215], [335, 60], [345, 160], [315, 215]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="11" fill="#fff" stroke={c} strokeWidth="3" className="pulse" style={{ animationDelay: `${i * 0.25}s` }} />)}
      <rect x="165" y="75" width="70" height="100" rx="14" fill={c} /><rect x="175" y="88" width="50" height="10" rx="5" fill="#fff" /><rect x="175" y="106" width="36" height="10" rx="5" fill="#ffffffaa" /><circle cx="200" cy="148" r="10" fill="#C8F53C" /></>),
    po: (<>{[0, 1, 2].map((i) => <g key={i} className="fl1" style={{ animationDelay: `${i * 0.3}s` }}><rect x="90" y={50 + i * 56} width="220" height="44" rx="12" fill="#fff" /><rect x="132" y={66 + i * 56} width={110 - i * 18} height="9" rx="4" fill="#14112B22" /><circle cx="112" cy={72 + i * 56} r="12" fill={c} /><path d={`M106 ${72 + i * 56}l5 5 9-10`} stroke="#fff" strokeWidth="3" fill="none" className="tick" style={{ animationDelay: `${i * 0.5}s` }} /></g>)}</>),
    web: (<><rect x="50" y="36" width="300" height="180" rx="16" fill="#fff" /><rect x="50" y="36" width="300" height="28" rx="14" fill="#14112B" /><rect x="68" y="82" width="86" height="112" rx="12" fill="#FFD3E0" className="fl1" /><rect x="164" y="82" width="86" height="112" rx="12" fill="#FFF0B8" className="fl1" style={{ animationDelay: ".3s" }} /><rect x="260" y="82" width="74" height="112" rx="12" fill="#DCD5FF" className="fl1" style={{ animationDelay: ".6s" }} /><rect x="272" y="160" width="50" height="22" rx="11" fill={c} /><path d="M300 120l0 30 8-8 6 14 5-2-6-14 11 0z" fill="#14112B" className="cursor" /></>),
    fl: (<><path d="M0 150Q50 122 100 150T200 150T300 150T400 150V250H0z" fill={c} opacity=".35" className="wave" /><path d="M0 182Q50 154 100 182T200 182T300 182T400 182V250H0z" fill={c} opacity=".7" className="wave w2" /><rect x="190" y="40" width="20" height="128" rx="6" fill="#14112B" /><rect x="170" y="40" width="60" height="28" rx="9" fill="#C8F53C" /><g stroke="#14112B" strokeWidth="3" fill="none" strokeLinecap="round" className="pulse"><path d="M244 52q16-12 32 0M254 40q22-18 44 0" /></g></>),
    ph: (<><rect x="150" y="18" width="100" height="214" rx="24" fill="#14112B" /><rect x="158" y="34" width="84" height="182" rx="14" fill="#fff" /><text x="200" y="76" fontSize="20" fontWeight="800" textAnchor="middle" fill={c}>7 × 8</text>{[[168, 94, "#FFD3E0"], [202, 94, "#C8F53C"], [168, 128, "#FFF0B8"], [202, 128, "#CFEAFF"]].map(([x, y, f], i) => <rect key={i} x={x as number} y={y as number} width="30" height="30" rx="9" fill={f as string} className="fl1" style={{ animationDelay: `${i * 0.2}s` }} />)}<rect x="168" y="178" width="64" height="24" rx="12" fill={c} /></>),
    ap: (<><g stroke={c} strokeWidth="2.5" opacity=".6" className="dash"><path d="M200 125L90 60M200 125L90 190M200 125L310 60M200 125L310 190" /></g><circle cx="200" cy="125" r="34" fill="#14112B" /><text x="200" y="131" fontSize="16" fontWeight="800" textAnchor="middle" fill="#fff">API</text>{[[90, 60], [90, 190], [310, 60], [310, 190]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="20" fill={i % 2 ? "#fff" : c} className="pulse" style={{ animationDelay: `${i * 0.3}s` }} />)}</>),
  } as Record<string, React.ReactNode>;
  return (
    <svg viewBox="0 0 400 250" role="img" aria-label="Animated illustration of the project" className="scene">
      <rect width="400" height="250" fill={c} opacity=".14" />
      {body[k] || body.bc}
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                             */
/* ---------------------------------------------------------------- */

export default function Portfolio() {
  const [active, setActive] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [menu, setMenu] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [q, setQ] = useState("");
  const [photoOk, setPhotoOk] = useState(true);
  const [gi, setGi] = useState(0);
  const [sec, setSec] = useState("top");
  const [hov, setHov] = useState<Tech | null>(null);
  const [rsec, setRsec] = useState("top");
  const [guideOn, setGuideOn] = useState(true);
  const [say, setSay] = useState("");
  const [typedSay, setTypedSay] = useState("");
  const [tlines, setTlines] = useState<string[]>(["KB-OS 2040 · online", "Type 'help' to see what I can do."]);
  const [tin, setTin] = useState("");
  const termRef = useRef<HTMLDivElement | null>(null);
  const guideRef = useRef(true);
  const seen = useRef<Set<string>>(new Set());
  guideRef.current = guideOn;
  const speak = (k: string) => { if (guideRef.current && GUIDE[k]) setSay(GUIDE[k]); };
  const dlg = useRef<HTMLDialogElement | null>(null);
  const cur = useRef<HTMLDivElement | null>(null);
  const hs = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2200); };
  const burst = () => {
    const cols = ["#6C47FF", "#C8F53C", "#FF7AB6", "#FFD34D", "#1AA7EC"];
    const x = innerWidth / 2, y = innerHeight * 0.62;
    for (let i = 0; i < 30; i++) {
      const el = document.createElement("i"); el.className = "cf";
      el.style.cssText = `left:${x}px;top:${y}px;background:${cols[i % 5]}`;
      document.body.appendChild(el);
      const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 170;
      el.animate([{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 120}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => el.remove();
    }
  };
  const copyMail = () => { try { navigator.clipboard.writeText(MAIL); } catch { /* ignore */ } burst(); showToast("Email copied"); };

  const [projects, setProjects] = useState<Project[]>(P);
  const [sketch, setSketch] = useState<string[][]>(SKETCH);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("connecting to server");
  const [online, setOnline] = useState<boolean | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [sending, setSending] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // loader + backend fetch
  useEffect(() => {
    const ctrl = new AbortController(); const start = performance.now();
    let alive = true, p = 0;
    const bar = setInterval(() => { p += (90 - p) * 0.06; setProgress(Math.round(p)); }, 120);
    const t1 = setTimeout(() => setStatus("loading projects"), 700);
    const t2 = setTimeout(() => setStatus("compiling portfolio"), 1500);
    const kill = setTimeout(() => ctrl.abort(), 8000);
    (async () => {
      let ok = false;
      try {
        const res = await fetch(`${API}/api/portfolio`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (Array.isArray(data.projects) && data.projects.length) setProjects(data.projects);
        if (Array.isArray(data.sketch) && data.sketch.length) setSketch(data.sketch);
        ok = true;
      } catch { /* offline: keep built-in content */ }
      clearTimeout(kill);
      const wait = Math.max(0, 1400 - (performance.now() - start));
      setTimeout(() => {
        if (!alive) return;
        clearInterval(bar); setOnline(ok); setStatus(ok ? "ready" : "server offline, showing saved content"); setProgress(100);
        setTimeout(() => { if (alive) setLoading(false); }, 600);
      }, wait);
    })();
    return () => { alive = false; clearInterval(bar); clearTimeout(t1); clearTimeout(t2); clearTimeout(kill); ctrl.abort(); };
  }, []);
  useEffect(() => { document.body.style.overflow = loading ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [loading]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setSending("sending");
    try {
      const res = await fetch(CONTACT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error(String(res.status));
      setSending("sent"); setForm({ name: "", email: "", message: "", website: "" }); burst(); showToast("Message sent");
    } catch { setSending("error"); }
  };

  // typing line
  useEffect(() => {
    let pi = 0, ci = 0, del = false; let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = TYPED[pi]; ci += del ? -1 : 1; setTyped(w.slice(0, ci));
      let t = del ? 35 : 75;
      if (!del && ci === w.length) { del = true; t = 1500; } else if (del && ci === 0) { del = false; pi = (pi + 1) % TYPED.length; t = 300; }
      timer = setTimeout(tick, t);
    };
    tick(); return () => clearTimeout(timer);
  }, []);

  // scroll progress, timeline, pinned horizontal gallery
  useEffect(() => {
    const root = document.documentElement;
    let lastY = scrollY;
    const layout = () => {
      const s = hs.current, t = track.current; if (!s || !t) return;
      s.style.height = innerWidth > 900 ? `${t.scrollWidth - innerWidth + innerHeight + 80}px` : "auto";
    };
    const onScroll = () => {
      const y = scrollY, dy = y - lastY;
      if (Math.abs(dy) > 6) { root.dataset.head = dy > 0 && y > 120 ? "hide" : "show"; lastY = y; }
      if (y < 80) root.dataset.head = "show";
      root.dataset.scrolled = y > 30 ? "1" : "";
      const h = root.scrollHeight - innerHeight;
      root.style.setProperty("--sp", String(h > 0 ? scrollY / h : 0));
      const tl = document.querySelector<HTMLElement>(".path");
      if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty("--tp", String(Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height)))); }
      const pr = document.querySelector<HTMLElement>(".proc");
      if (pr) { const r = pr.getBoundingClientRect(); const v = Math.min(1, Math.max(0, (innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.15))); pr.style.setProperty("--pp", String(v)); pr.querySelectorAll(".pstep").forEach((el, i) => el.classList.toggle("act", v > (i + 0.35) / 5)); }
      const s = hs.current, t = track.current;
      if (s && t) {
        if (innerWidth > 900) {
          const total = s.offsetHeight - innerHeight;
          const pr = Math.min(1, Math.max(0, -s.getBoundingClientRect().top / total));
          t.style.transform = `translateX(${-pr * (t.scrollWidth - innerWidth + 48)}px)`;
          s.style.setProperty("--hp", String(pr));
        } else t.style.transform = "";
      }
    };
    layout(); onScroll();
    const both = () => { layout(); onScroll(); };
    addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", both);
    const id = setTimeout(both, 300);
    return () => { clearTimeout(id); removeEventListener("scroll", onScroll); removeEventListener("resize", both); };
  }, [projects, loading]);

  // custom cursor
  useEffect(() => {
    const c = cur.current; if (!c || matchMedia("(hover:none)").matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const mv = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; c.classList.toggle("big", !!(e.target as HTMLElement).closest("a,button,input,textarea,.cv")); };
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; c.style.transform = `translate(${x}px,${y}px)`; raf = requestAnimationFrame(loop); };
    c.style.opacity = "1"; loop(); addEventListener("pointermove", mv, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); };
  }, []);

  // reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: 0.15 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [projects, sketch]);

  // rotating greeting, active section tracking, tap ripples
  useEffect(() => { const id = setInterval(() => setGi((g) => (g + 1) % GREET.length), 2600); return () => clearInterval(id); }, []);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setRsec(e.target.id); setSec(({ sketch: "work", process: "work", services: "talent", terminal: "path" } as Record<string, string>)[e.target.id] || e.target.id); } }), { rootMargin: "-45% 0px -50% 0px" });
    ["top", "talent", "services", "work", "sketch", "process", "terminal", "path", "hello"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [projects]);
  useEffect(() => {
    const dn = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".btn,.dock a,.pc .cv,.up"); if (!el) return;
      const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, s = document.createElement("span");
      s.className = "rip"; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      el.appendChild(s); setTimeout(() => s.remove(), 700);
    };
    addEventListener("pointerdown", dn, { passive: true }); return () => removeEventListener("pointerdown", dn);
  }, []);

  // keep the header visible while the menu is open
  useEffect(() => { const r = document.documentElement; if (menu) r.dataset.menu = "1"; else delete r.dataset.menu; }, [menu]);

  // robot guide: remembers your choice, welcomes you, then comments on each section the first time you reach it
  useEffect(() => { try { if (localStorage.getItem("guide") === "off") setGuideOn(false); } catch { /* ignore */ } }, []);
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => { seen.current.add("top"); speak("top"); }, 900);
    return () => clearTimeout(t);
  }, [loading]); // eslint-disable-line
  useEffect(() => {
    if (loading) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !seen.current.has(e.target.id)) { seen.current.add(e.target.id); speak(e.target.id); }
    }), { rootMargin: "-30% 0px -50% 0px" });
    ["talent", "reactor", "services", "work", "sketch", "process", "terminal", "path", "hello"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [loading, projects]); // eslint-disable-line
  useEffect(() => {
    if (!say) { setTypedSay(""); return; }
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0; let id: ReturnType<typeof setInterval> | undefined;
    if (calm) setTypedSay(say); else { id = setInterval(() => { i++; setTypedSay(say.slice(0, i)); if (i >= say.length && id) clearInterval(id); }, 22); }
    const hide = setTimeout(() => setSay(""), 3200 + say.length * 55);
    return () => { if (id) clearInterval(id); clearTimeout(hide); };
  }, [say]);

  // dialog
  useEffect(() => { const d = dlg.current; if (!d) return; if (active !== null && !d.open) d.showModal(); if (active === null && d.open) d.close(); }, [active]);

  // command palette (Ctrl/Cmd + K)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmd((v) => !v); setQ(""); }
      if (e.key === "Escape") setCmd(false);
    };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);
  const go = (id: string) => { setCmd(false); setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const cmds: [string, () => void][] = [
    ["Go to talent", () => go("talent")], ["Go to work", () => go("work")], ["Go to experience", () => go("path")], ["Go to contact", () => go("hello")],
    ["Copy email address", () => { setCmd(false); copyMail(); }], ["Open GitHub", () => { setCmd(false); open("https://github.com/kavizzz03", "_blank"); }],
    ["Open LinkedIn", () => { setCmd(false); open("https://linkedin.com/in/kavindu-bogahawatte-7b3810320", "_blank"); }],
  ];
  const shown = cmds.filter(([l]) => l.toLowerCase().includes(q.toLowerCase()));

  const mag = (e: React.PointerEvent<HTMLElement>) => { const el = e.currentTarget, r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`; };
  const unmag = (e: React.PointerEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; };
  const tilt = (e: React.PointerEvent<HTMLElement>) => { const el = e.currentTarget, r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`; };
  const glow = (e: React.PointerEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`); };

  const toggleGuide = () => {
    const v = !guideOn; setGuideOn(v);
    try { localStorage.setItem("guide", v ? "on" : "off"); } catch { /* ignore */ }
    if (v) setTimeout(() => speak(sec in GUIDE ? sec : "top"), 350); else { setSay(""); showToast("Robot guide turned off"); }
  };
  const run = (raw: string) => {
    const c = raw.trim().toLowerCase(); if (!c) return;
    const out: string[] = [];
    switch (c) {
      case "help": out.push("about · skills · services · projects · contact · hire · clear"); break;
      case "about": case "whoami": out.push("Kavindu Bogahawatte, independent software engineer in Colombo.", "I build dependable backends, REST APIs, full-stack web and Android apps."); break;
      case "skills": TOOLS.forEach((t) => out.push(`${t[0]}: ${t[2].join(", ")}`)); break;
      case "services": SERVICES.forEach((x) => out.push(`- ${x.t}`)); break;
      case "projects": projects.forEach((x) => out.push(`- ${x.n}`)); break;
      case "contact": out.push(MAIL, "WhatsApp +94 74 089 0730", "github.com/kavizzz03"); break;
      case "hire": out.push("Opening the contact form..."); setTimeout(() => go("hello"), 700); break;
      case "clear": setTlines([]); setTin(""); return;
      default: out.push(`command not found: ${c}. Type 'help'.`);
    }
    setTlines((l) => [...l, `$ ${raw.trim()}`, ...out]); setTin("");
  };
  useEffect(() => { const el = termRef.current; if (el) el.scrollTop = el.scrollHeight; }, [tlines]);
  const startProject = (title: string) => { setForm((f) => ({ ...f, message: `Hi Kavindu, I'd like to talk about: ${title}.\n\n` })); go("hello"); };

  const p = active !== null ? projects[active] : null;

  return (
    <>
      {/* boot screen: while it shows, nothing else on the page is visible */}
      <div className={`loader${loading ? "" : " done"}`} role="status" aria-live="polite" aria-hidden={!loading}>
        <div className="lgrid" aria-hidden="true" />
        <div className="ringw" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Loading">
          <svg viewBox="0 0 160 160" className="rr" aria-hidden="true"><circle className="rt" cx="80" cy="80" r="70" /><circle className="rg" cx="80" cy="80" r="70" style={{ strokeDashoffset: 440 * (1 - progress / 100) }} /></svg>
          <div className="rbt"><Robot w={92} awake={progress > 45} wave={false} /></div>
        </div>
        <div className="lg">KB<span>.</span>OS <em>2040</em></div>
        <ul className="blog">{LOG.map((l, i) => progress >= i * 25 + 10 && <li key={l}>&gt; {l} {progress >= (i + 1) * 25 + 10 || progress === 100 ? "✓" : "..."}</li>)}</ul>
        <div className="lt"><span>{status}</span><b>{progress}%</b></div>
      </div>

      <div className={`app${loading ? " hide" : ""}`}>
      <div className="sprog" aria-hidden="true" />
      <div className="cursor" ref={cur} aria-hidden="true"><i /></div>

      <div className="blobs" aria-hidden="true"><i /><i /><i />
        {SYM.map((x, i) => <b key={i} style={{ "--l": `${5 + i * 9.5}%`, "--t": `${15 + (i % 4) * 5}s`, animationDelay: `-${i * 2.4}s` } as React.CSSProperties}>{x}</b>)}
      </div>

      {/* desktop: floating bar with a guide switch and a call to action */}
      <nav className="pill" aria-label="Main">
        <a className="logo" href="#top">kb<span>.</span></a>
        {[["talent", "Talent"], ["services", "Services"], ["work", "Work"], ["path", "Experience"], ["hello", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className={sec === id ? "on" : ""}>{l}</a>)}
        <button className={`gtog${guideOn ? " on" : ""}`} onClick={toggleGuide} aria-pressed={guideOn} aria-label={guideOn ? "Turn off the robot guide" : "Turn on the robot guide"} title={guideOn ? "Robot guide: on" : "Robot guide: off"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M7 8h10a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6a3 3 0 013-3zM9 13h.01M15 13h.01M9 17h6" /></svg>
        </button>
        <button className="kbd" onClick={() => setCmd(true)} aria-label="Open command menu">Ctrl K</button>
        <a className="btn sm" href="#hello">Hire me</a>
        <i className="pprog" aria-hidden="true" />
      </nav>

      {/* desktop: dots on the right edge show where you are */}
      <nav className="rail" aria-label="Section navigation">
        {RAIL.map(([id, l]) => <a key={id} href={`#${id}`} className={rsec === id ? "on" : ""} aria-label={l}><span>{l}</span><i /></a>)}
      </nav>

      {/* phone: header with a live section label and an expanding full-screen menu */}
      <div className="mhead">
        <a className="mlogo" href="#top" aria-label="Kavindu, back to the top"><span>kb<em>.</em></span></a>
        <div className="mlab" aria-live="polite">
          <b className="mn">{String(Math.max(0, DOCK.findIndex((d) => d[0] === sec)) + 1).padStart(2, "0")}</b>
          <span key={sec}>{LABEL[sec] || "Home"}</span>
        </div>
        <button className={`mg2${guideOn ? " on" : ""}`} onClick={toggleGuide} aria-pressed={guideOn} aria-label={guideOn ? "Turn off the robot guide" : "Turn on the robot guide"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M7 8h10a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6a3 3 0 013-3zM9 13h.01M15 13h.01M9 17h6" /></svg>
        </button>
        <button className={`mbtn${menu ? " open" : ""}`} onClick={() => setMenu(!menu)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu}><b /><b /><b /></button>
        <i className="mprog" aria-hidden="true" />
      </div>
      <div className={`msheet${menu ? " open" : ""}`} aria-hidden={!menu}>
        <ul>
          {MENU.map(([id, l, d, ic], i) => (
            <li key={id} style={{ "--i": i } as React.CSSProperties}>
              <a href={`#${id}`} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
                <span className="mi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ic} /></svg></span>
                <span><b>{l}</b><small>{d}</small></span><em>→</em>
              </a>
            </li>
          ))}
        </ul>
        <div className="mq2">
          <a href={`mailto:${MAIL}`} tabIndex={menu ? 0 : -1}>Email</a>
          <a href="https://wa.me/94740890730" target="_blank" rel="noopener noreferrer" tabIndex={menu ? 0 : -1}>WhatsApp</a>
          <a href="https://github.com/kavizzz03" target="_blank" rel="noopener noreferrer" tabIndex={menu ? 0 : -1}>GitHub</a>
          <a href="https://linkedin.com/in/kavindu-bogahawatte-7b3810320" target="_blank" rel="noopener noreferrer" tabIndex={menu ? 0 : -1}>LinkedIn</a>
        </div>
        <button className="mg" onClick={toggleGuide} tabIndex={menu ? 0 : -1}>Robot guide: {guideOn ? "on (tap to turn off)" : "off (tap to turn on)"}</button>
      </div>

      {/* phone: bottom bar with a sliding highlight */}
      <nav className="dock" aria-label="Quick navigation" style={{ "--i": Math.max(0, DOCK.findIndex((d) => d[0] === sec)) } as React.CSSProperties}>
        <i className="ind" aria-hidden="true" />
        {DOCK.map(([id, l, d]) => (
          <a key={id} href={`#${id}`} className={sec === id ? "on" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>{l}</a>
        ))}
      </nav>
      <a className="up" href="#top" aria-label="Back to top"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" className="t" /><circle cx="22" cy="22" r="19" className="g" /><path d="M16 25l6-6 6 6" /></svg></a>

      {/* HERO */}
      <header className={`hero${loading ? "" : " go"}`} id="top">
        <Net />
        <Skyline />
        <span className="fly d1" aria-hidden="true"><Drone w={74} /></span><span className="fly d2" aria-hidden="true"><Drone w={48} /></span>
        <span className="car c1" aria-hidden="true" /><span className="car c2" aria-hidden="true" /><span className="car c3" aria-hidden="true" />
        <div className="w hg">
          <div className="hl">
            <span className="avail"><i />Independent engineer: open for projects<code>SYS.ONLINE</code></span>
            <h1><span className="l1"><Scramble t="Kavindu" /></span><span className="l2">Bogahawatte</span></h1>
            <p className="role">Building the <u>dependable</u> systems of 2040, today.</p>
            <p className="intro">I build the quiet systems behind everyday things: the message that lands on a customer&apos;s phone, the order that gets approved, the app that just works.</p>
            <p className="typed">$ now_learning --about <b>{typed}</b></p>
            <div className="row">
              <a className="btn" href="#work" onPointerMove={mag} onPointerLeave={unmag}>See my work</a>
              <button className="btn o" onClick={copyMail} onPointerMove={mag} onPointerLeave={unmag}>Copy email</button>
            </div>
          </div>
          <div className="hr">
            <div className="orbit" aria-hidden="true">
              {ORBIT.map((o, i) => <span key={o} className="ob" style={{ "--a": `${i * 60}deg` } as React.CSSProperties}><em>{o}</em></span>)}
            </div>
            <div className="pf" onPointerMove={tilt} onPointerLeave={unmag} onClick={() => { setGi((g) => (g + 1) % GREET.length); burst(); }}>
              <i className="ring" aria-hidden="true" />
              <div className="ph">
                {photoOk && /* eslint-disable-next-line @next/next/no-img-element */ <img src={PHOTO} alt="Kavindu Bogahawatte, software engineer" onError={() => setPhotoOk(false)} />}
                {!photoOk && <b>KB</b>}
              </div>
              <span className="tag">Colombo, Sri Lanka</span>
              <span className="tapme" aria-hidden="true">tap me</span>
            </div>
            <button className="bot" onClick={() => { setGi((g) => (g + 1) % GREET.length); burst(); }} aria-label="Say hello to my robot assistant">
              <span className="hi" key={gi} aria-hidden="true">{GREET[gi]}</span>
              <Robot w={150} />
            </button>
          </div>
        </div>
        <a className="cue" href="#talent" aria-label="Scroll to explore"><i /></a>
      </header>

      <div className="mq" aria-hidden="true"><div>{[0, 1].flatMap((r) => MARQUEE.map((w) => ({ w, r }))).map((o, i) => <span key={i}>{o.w}</span>)}</div><div className="rev">{[0, 1].flatMap((r) => MARQUEE.slice().reverse().map((w) => ({ w, r }))).map((o, i) => <span key={i}>{o.w}</span>)}</div></div>

      {/* TALENT */}
      <div className="w">
        <section id="talent">
          <h2 className="rv split"><Split t="What I'm good at" /></h2>
          <p className="sub">My 2040 workstation: code compiling, data streaming, a robot on standby.</p>
          <div className="lab rv"><Workstation /><div className="labbot" aria-hidden="true"><Robot w={110} /></div><span className="fly d3" aria-hidden="true"><Drone w={44} /></span></div>
          <div className="power">
            {[["Messaging at scale", "SMS, WhatsApp and email campaigns for 200,000+ customers, built to reach 1 million."], ["Business workflows", "Purchasing, approvals, goods receiving and quality checks turned into reliable software."], ["Android, AI and data", "Jetpack Compose games, Whisper AI tools and an XGBoost flood-prediction prototype."]].map(([t, d], i) => (
              <div className="pw rv" key={t} style={{ transitionDelay: `${i * 120}ms` }}><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
          <div className="nums">
            <div className="num rv"><Count n={200000} plus /><span>loyalty customers on the platform I built</span></div>
            <div className="num rv"><Count n={1000000} /><span>customers it&apos;s designed to scale to</span></div>
            <div className="num rv"><Count n={30} plus /><span>personal projects</span></div>
            <div className="num rv"><Count n={6} /><span>stacks I ship in, PHP to Kotlin</span></div>
          </div>
          <h3 className="mini rv">Tech reactor</h3>
          <p className="sub">Hover or tap a tile. These are the tools I build with.</p>
          <div className="rv" id="reactor"><Reactor hov={hov} setHov={setHov} /></div>
          <div className="tools">
            {TOOLS.map((t, i) => (
              <div className="tb rv" key={t[0]} onPointerMove={glow} style={{ "--bgc": `var(${t[1]})`, transitionDelay: `${(i % 3) * 90}ms` } as React.CSSProperties}>
                <span className="ci"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={CAT_ICON[i] || CAT_ICON[0]} /></svg></span>
                <h3>{t[0]}</h3>
                <div className="chips">{t[2].map((c, j) => <span key={c} style={{ transitionDelay: `${j * 40}ms` }}>{c}</span>)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="w">
        <section id="services">
          <h2 className="rv split"><Split t="How I can help" /></h2>
          <p className="sub">Pick a starting point. The button fills in the contact form for you.</p>
          <div className="svc">
            {SERVICES.map((x, i) => (
              <div className="sv rv" key={x.t} style={{ "--sc": x.c, transitionDelay: `${i * 90}ms` } as React.CSSProperties}>
                <span className="sico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={x.ic} /></svg></span>
                <h3>{x.t}</h3>
                <ul>{x.b.map((l) => <li key={l}>{l}</li>)}</ul>
                <button className="btn o" onClick={() => startProject(x.t)}>Start this project</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* WORK: pinned, scrolls sideways */}
      <section id="work" className="hs" ref={hs}>
        <div className="pin">
          <div className="w wh"><h2 className="rv split"><Split t="Things I've built" /></h2><p className="sub">Scroll to move through six projects. Open one for the full story.</p><span className="swipe" aria-hidden="true">Swipe sideways</span></div>
          <div className="track" ref={track} onScroll={(e) => { const t = e.currentTarget; if (innerWidth <= 900) hs.current?.style.setProperty("--hp", String(t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth))); }}>
            {projects.map((pr, i) => (
              <article className="pc" key={pr.n} style={{ "--ac": ACC[pr.k] || ACC.bc } as React.CSSProperties}>
                <button className="cv" onClick={() => setActive(i)} onPointerMove={tilt} onPointerLeave={unmag} aria-label={`Read about ${pr.n}`}><Scene k={pr.k} /></button>
                <small>{pr.y}</small>
                <h3>{pr.n}</h3>
                <p>{pr.d}</p>
                <div className="tg">{pr.tags.slice(0, 4).map((t) => <i key={t}>{t}</i>)}</div>
                <button className="btn o" onClick={() => setActive(i)}>Read the story</button>
              </article>
            ))}
            <div className="pc end"><h3>More below</h3><p>The sketchbook has smaller builds from my 30+ side projects.</p><a className="btn" href="#sketch">Keep scrolling</a></div>
          </div>
          <div className="hbar" aria-hidden="true"><i /></div>
        </div>
      </section>

      <div className="w">
        <section id="sketch">
          <h2 className="rv split"><Split t="The sketchbook" /></h2>
          <p className="sub">Smaller builds from the side projects.</p>
          <div className="sk">
            {sketch.map((m) => (
              <div className="nt rv" key={m[0]} onPointerMove={glow} style={{ "--bgc": `var(${m[3] || "--p1"})` } as React.CSSProperties}>
                <h3>{m[0]}</h3><p>{m[1]}</p><small>{m[2]}</small>
              </div>
            ))}
          </div>
        </section>

        <section id="process">
          <h2 className="rv split"><Split t="How I work" /></h2>
          <p className="sub">From first idea to a system that keeps running.</p>
          <div className="proc">
            <i className="pl" aria-hidden="true" />
            {PROCESS.map(([t, d, ic]) => (
              <div className="pstep" key={t}><span className="pn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ic} /></svg></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <section id="terminal">
          <h2 className="rv split"><Split t="Ask my terminal" /></h2>
          <p className="sub">Type a command, or tap one below.</p>
          <div className="term rv">
            <div className="tb2"><i /><i /><i /><span>kavindu@kb-os:~</span></div>
            <div className="tout" ref={termRef} aria-live="polite">{tlines.map((l, i) => <div key={i} className={l.startsWith("$") ? "c2" : ""}>{l}</div>)}</div>
            <form className="tin" onSubmit={(e) => { e.preventDefault(); run(tin); }}><span>$</span><input value={tin} onChange={(e) => setTin(e.target.value)} aria-label="Terminal command" placeholder="try: help" autoComplete="off" autoCapitalize="off" spellCheck={false} /></form>
          </div>
          <div className="tq">{["help", "about", "skills", "services", "projects", "contact", "hire"].map((c) => <button key={c} onClick={() => run(c)}>{c}</button>)}</div>
        </section>

        <section id="path">
          <h2 className="rv split"><Split t="Experience" /></h2>
          <div className="path">
            {STEPS.map((s) => (
              <div className="step rv" key={s[1]}>
                <time>{s[0]}</time>
                <div><h3>{s[1]}</h3><p>{s[2]}</p>{s[3].length > 0 && <ul>{s[3].map((x) => <li key={x}>{x}</li>)}</ul>}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="hello">
          <div className="cta rv">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="av" src={AVATAR} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <h2>Let&apos;s build something dependable.</h2>
              <p>I&apos;m working independently and taking on freelance projects and long-term contracts: APIs, messaging, full-stack web and Android apps. Full-time roles too, for the right team. References are available on request.</p>
              <div className="links">
                <a href={`mailto:${MAIL}`}>{MAIL}</a>
                <a href="https://wa.me/94740890730" target="_blank" rel="noopener noreferrer">WhatsApp +94 74 089 0730</a>
                <a href="https://github.com/kavizzz03" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/kavindu-bogahawatte-7b3810320" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <form className="fm" onSubmit={send}>
              <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              <input required placeholder="Your name" aria-label="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="email" placeholder="Your email" aria-label="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea required placeholder="What would you like to build?" aria-label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button className="btn lime" type="submit" disabled={sending === "sending"} onPointerMove={mag} onPointerLeave={unmag}>{sending === "sending" ? "Sending" : "Send message"}</button>
              <span className="fmsg" role="status">{sending === "sent" && "Sent. I'll reply soon."}{sending === "error" && "Couldn't reach the server. Please email or WhatsApp me instead."}</span>
            </form>
          </div>
        </section>
      </div>

      <footer><div className="w"><span>© 2026 Kavindu Bogahawatte, Colombo, Sri Lanka</span>{online !== null && <span className={online ? "ok" : "off"}>{online ? "Live data" : "Offline mode"}</span>}</div></footer>

      {cmd && (
        <div className="cmd" onClick={() => setCmd(false)}>
          <div className="cbx" role="dialog" aria-label="Command menu" onClick={(e) => e.stopPropagation()}>
            <input autoFocus placeholder="Type a command" aria-label="Search commands" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && shown[0]) shown[0][1](); }} />
            {shown.map(([l, f]) => <button key={l} onClick={f}>{l}</button>)}
            {!shown.length && <p>No command matches. Try &quot;work&quot; or &quot;email&quot;.</p>}
          </div>
        </div>
      )}

      <dialog ref={dlg} onClose={() => setActive(null)} onClick={(e) => { if (e.target === dlg.current) setActive(null); }}>
        <button className="x" onClick={() => setActive(null)} aria-label="Close">×</button>
        {p && (
          <div className="dm" style={{ "--ac": ACC[p.k] || ACC.bc } as React.CSSProperties}>
            <Scene k={p.k} />
            <div className="b"><small>{p.y}</small><h3>{p.n}</h3><p className="dd">{p.d}</p><ul>{p.pts.map((x) => <li key={x}>{x}</li>)}</ul><div className="tg">{p.tags.map((t) => <i key={t}>{t}</i>)}</div></div>
          </div>
        )}
      </dialog>

      {guideOn && (
        <div className={`guide${say ? " talk" : ""}`}>
          {say && (
            <div className="gbub" role="status" aria-live="polite">
              <p>{typedSay}<i className="gc" /></p>
              <div className="gact"><button onClick={() => setSay("")}>Got it</button><button onClick={toggleGuide}>Turn off guide</button></div>
            </div>
          )}
          <button className="gbot" onClick={() => (say ? setSay("") : speak(sec in GUIDE ? sec : "top"))} aria-label={say ? "Hide the robot's message" : "Ask the robot guide to talk"}><Robot w={70} /></button>
        </div>
      )}

      <div className={`toast${toast ? " on" : ""}`} role="status">{toast}</div>
      </div>

      <style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Manrope:wght@400;500;700&family=Fira+Code:wght@400;500&family=Noto+Sans+Sinhala:wght@700&family=Noto+Sans+Tamil:wght@700&display=swap');

:root{color-scheme:light;--bg:#F6F5FF;--ink:#14112B;--mute:#5E5A7A;--line:#E1DDF5;--v:#6C47FF;--lime:#C8F53C;--pink:#FF7AB6;--p1:#E3DCFF;--p2:#D3F6E9;--p3:#FFF0B8;--p4:#FFD9E6;--sp:0}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:90px}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.65 'Manrope',system-ui,sans-serif;overflow-x:clip}
h1,h2,h3{font-family:'Unbounded','Manrope',sans-serif;margin:0;line-height:1.05;letter-spacing:-.04em}
a{color:inherit}.w{max-width:1180px;margin:0 auto;padding:0 24px;position:relative;z-index:1}
:focus-visible{outline:3px solid var(--v);outline-offset:3px;border-radius:8px}
.sprog{position:fixed;left:0;top:0;height:4px;width:100%;background:linear-gradient(90deg,var(--v),var(--pink),var(--lime));transform-origin:0 50%;transform:scaleX(var(--sp));z-index:300}

/* cursor */
.cursor{position:fixed;left:0;top:0;z-index:290;pointer-events:none;opacity:0}.cursor i{display:block;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;border:2px solid var(--v);transition:transform .25s,background .25s}
.cursor.big i{transform:scale(1.9);background:#6C47FF22}
@media(hover:none){.cursor{display:none}}

/* soft moving colour blobs */
.blobs{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.blobs i{position:absolute;border-radius:50%;filter:blur(80px);opacity:.55;animation:drift 38s ease-in-out infinite alternate}
.blobs i:nth-child(1){width:520px;height:520px;left:-8%;top:-8%;background:#D9CEFF}.blobs i:nth-child(2){width:460px;height:460px;right:-6%;top:30%;background:#FFD1E4;animation-duration:50s}.blobs i:nth-child(3){width:480px;height:480px;left:30%;bottom:-16%;background:#DDF9A8;animation-duration:44s}
@keyframes drift{to{transform:translate(80px,60px) scale(1.15)}}

/* floating pill nav */
.pill{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:100;display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:99px;background:#ffffffcc;backdrop-filter:blur(14px);border:1px solid var(--line);box-shadow:0 14px 34px -20px #6C47FF88}
.pill a{text-decoration:none;font-weight:500;font-size:14px;padding:8px 14px;border-radius:99px;transition:background .2s}.pill a:hover{background:var(--p1)}
.pill .logo{font:800 16px 'Unbounded';padding:8px 14px;background:var(--ink);color:#fff}.pill .logo span{color:var(--lime)}.pill .logo:hover{background:var(--v)}
.kbd{font:500 12px 'Fira Code';border:1px solid var(--line);background:#fff;border-radius:8px;padding:6px 10px;cursor:pointer;color:var(--mute)}
.burger{display:none;width:38px;height:38px;border-radius:50%;border:0;background:var(--p1);cursor:pointer}
@media(max-width:700px){.pill a:not(.logo){display:none}.kbd{display:none}.burger{display:block}}
.mm{position:fixed;top:72px;left:16px;right:16px;z-index:99;display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:22px;padding:8px;animation:fi .25s both}.mm a{padding:14px 16px;text-decoration:none;font-weight:700;border-radius:14px}.mm a:active{background:var(--p1)}

.btn{display:inline-block;padding:15px 28px;border-radius:99px;background:var(--ink);color:#fff;font:700 15px 'Manrope';text-decoration:none;border:2px solid var(--ink);cursor:pointer;transition:transform .15s ease-out,background .2s,color .2s}
.btn:hover{background:var(--v);border-color:var(--v)}.btn.o{background:transparent;color:var(--ink)}.btn.o:hover{color:#fff}.btn.lime{background:var(--lime);color:var(--ink);border-color:var(--lime)}.btn.lime:hover{background:#fff;border-color:#fff;color:var(--ink)}
.row{display:flex;flex-wrap:wrap;gap:12px}

/* hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;padding:110px 0 70px;overflow:hidden}
.net{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.hg{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;width:100%}@media(max-width:940px){.hg{grid-template-columns:1fr}.hero{padding-top:100px}}
.avail{display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 12px;border-radius:99px;background:#fff;border:1px solid var(--line);font-size:14px;font-weight:700;margin-bottom:22px}
.avail i{width:9px;height:9px;border-radius:50%;background:#00A67E;animation:ping 2s infinite}@keyframes ping{0%{box-shadow:0 0 0 0 #00A67E99}70%,100%{box-shadow:0 0 0 10px #00A67E00}}
h1{font-weight:800;font-size:clamp(46px,9.4vw,120px)}
h1 span{display:block}.l1{color:var(--ink)}.l2{font-size:.62em;color:transparent;-webkit-text-stroke:2px var(--ink);margin-top:.08em;letter-spacing:-.03em}
.role{font:700 clamp(20px,2.4vw,28px)/1.25 'Unbounded';letter-spacing:-.03em;margin:24px 0 14px;max-width:560px}.role u{text-decoration:none;background:linear-gradient(var(--lime),var(--lime)) 0 90%/100% .45em no-repeat}
.intro{color:var(--mute);max-width:500px;margin:0 0 14px}.typed{font:500 14px 'Fira Code';margin:0 0 26px}.typed b{color:var(--v);font-weight:500;border-right:2px solid var(--v);padding-right:3px;animation:bl 1s steps(1) infinite}@keyframes bl{50%{border-color:transparent}}
.hl>*{opacity:0;transform:translateY(24px)}.go .hl>*{animation:in .8s cubic-bezier(.2,.8,.2,1) forwards}
.go .hl>:nth-child(2){animation-delay:.1s}.go .hl>:nth-child(3){animation-delay:.25s}.go .hl>:nth-child(4){animation-delay:.35s}.go .hl>:nth-child(5){animation-delay:.45s}.go .hl>:nth-child(6){animation-delay:.55s}
@keyframes in{to{opacity:1;transform:none}}@keyframes fi{from{opacity:0}to{opacity:1}}

/* portrait with orbiting tech + floating code window */
.hr{position:relative;height:580px;display:grid;place-items:center;opacity:0}.go .hr{animation:fi 1s .4s forwards}@media(max-width:940px){.hr{height:500px}}
.pf{position:relative;width:330px;height:410px;transition:transform .25s ease-out;z-index:1}
.ring{position:absolute;inset:0;transform:translate(22px,22px);border-radius:63% 37% 54% 46%/55% 48% 52% 45%;background:var(--lime);animation:morph 10s ease-in-out infinite}
.tag{position:absolute;right:-18px;top:26px;background:#fff;border:1px solid var(--line);font-weight:700;font-size:13px;padding:8px 14px;border-radius:99px;box-shadow:0 12px 24px -12px #6C47FF99;animation:bob 6s ease-in-out infinite;z-index:3}
.ph{position:absolute;inset:0;border-radius:63% 37% 54% 46%/55% 48% 52% 45%;background:linear-gradient(135deg,var(--v),var(--pink));overflow:hidden;display:grid;place-items:center;animation:morph 10s ease-in-out infinite;box-shadow:0 30px 60px -30px #6C47FF99}
.ph img{width:100%;height:100%;object-fit:cover;object-position:50% 12%}.ph b{font:800 76px 'Unbounded';color:#fff;letter-spacing:-.06em}
@keyframes morph{50%{border-radius:40% 60% 38% 62%/48% 56% 44% 52%}}
.orbit{position:absolute;width:520px;height:520px;border-radius:50%;border:1.5px dashed #6C47FF55;animation:spin 40s linear infinite}@media(max-width:520px){.orbit{width:360px;height:360px}.pf{width:230px;height:290px}}
.ob{position:absolute;left:50%;top:50%;transform:rotate(var(--a)) translateY(-260px)}@media(max-width:520px){.ob{transform:rotate(var(--a)) translateY(-180px)}.tag{right:-6px}}
.ob em{display:block;font:700 13px 'Manrope';padding:7px 14px;border-radius:99px;background:#fff;border:1px solid var(--line);box-shadow:0 8px 18px -10px #6C47FF88;transform:translate(-50%,-50%) rotate(calc(var(--a) * -1));animation:unspin 40s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes unspin{to{transform:translate(-50%,-50%) rotate(calc(var(--a) * -1 - 360deg))}}
.code{position:absolute;left:-14px;bottom:-14px;width:min(340px,92%);background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 30px 50px -28px #14112B66;overflow:hidden;animation:bob 7s ease-in-out infinite;z-index:2}
@keyframes bob{50%{transform:translateY(-10px)}}
.cb{display:flex;align-items:center;gap:6px;padding:10px 12px;background:#F1EFFC}.cb i{width:9px;height:9px;border-radius:50%;background:#CFC9EC}.cb span{margin-left:8px;font:400 11px 'Fira Code';color:var(--mute)}
.code pre{margin:0;padding:12px 14px;font:400 11.5px/1.7 'Fira Code',monospace;color:var(--ink);overflow:hidden}
.code pre span{display:block;opacity:0;transform:translateX(-8px);white-space:pre}.go .code pre span{animation:in .5s var(--d) forwards}
.code s{text-decoration:none;color:var(--v);font-weight:500}.code q{quotes:none;color:#00835F}
@media(max-width:940px){.code{left:0}}

.av{display:block;width:92px;height:92px;border-radius:50%;object-fit:cover;border:4px solid var(--lime);margin-bottom:20px;box-shadow:0 14px 30px -14px #000}
.lav{width:96px;height:96px;border-radius:50%;object-fit:cover;border:4px solid var(--lime);animation:bob 3s ease-in-out infinite}
/* marquee */
.mq{overflow:hidden;padding:14px 0;background:var(--ink);position:relative;z-index:1;transform:rotate(-1.2deg) scale(1.03);margin:10px 0}
.mq div{display:flex;gap:14px;width:max-content;animation:mq 45s linear infinite}.mq span{padding:6px 18px;border-radius:99px;border:1.5px solid #ffffff44;color:#fff;font:500 15px 'Manrope'}.mq span:nth-child(3n){background:var(--lime);color:var(--ink);border-color:var(--lime)}
@keyframes mq{to{transform:translateX(-50%)}}
section{padding:110px 0 20px}
h2{font-size:clamp(30px,5vw,60px);font-weight:800;margin-bottom:16px;max-width:820px}.sub{color:var(--mute);max-width:520px;margin:0 0 40px}

/* reveals */
.rv{opacity:0;transform:translateY(34px) scale(.98);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1)}.rv.on{opacity:1;transform:none}
.wipe{opacity:1;transform:none;clip-path:inset(0 100% 0 0);transition:clip-path 1s cubic-bezier(.7,0,.2,1)}.wipe.on{clip-path:inset(0 0 0 0)}

/* talent */
.power{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:40px 0 16px}@media(max-width:860px){.power{grid-template-columns:1fr}}
.pw{padding:28px;border-radius:26px;background:var(--ink);color:#fff;position:relative;overflow:hidden}.pw:nth-child(2){background:var(--v)}.pw:nth-child(3){background:#fff;color:var(--ink);border:1px solid var(--line)}
.pw h3{font-size:22px;margin-bottom:10px}.pw p{margin:0;opacity:.85;font-size:15px}
.nums{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:16px}@media(max-width:860px){.nums{grid-template-columns:1fr 1fr}}@media(max-width:480px){.nums{grid-template-columns:1fr}}
.num{padding:24px;border-radius:26px;display:flex;flex-direction:column;gap:8px;min-height:150px;justify-content:space-between}.num:nth-child(1){background:var(--p1)}.num:nth-child(2){background:var(--p3)}.num:nth-child(3){background:var(--p2)}.num:nth-child(4){background:var(--p4)}
.num b{font:800 clamp(30px,3.6vw,46px) 'Unbounded';letter-spacing:-.05em;line-height:1}.num span{font-size:14px}
.tools{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}@media(max-width:700px){.tools{grid-template-columns:1fr}}
.tb,.nt{position:relative;padding:28px;border-radius:26px;background:#fff;border:1px solid var(--line);overflow:hidden}
.tb:before,.nt:before{content:"";position:absolute;inset:0;background:radial-gradient(260px circle at var(--gx,50%) var(--gy,0),var(--bgc),transparent 70%);opacity:0;transition:opacity .3s}.tb:hover:before,.nt:hover:before{opacity:1}
.tb>*,.nt>*{position:relative}.tb h3{font-size:20px;margin-bottom:14px}.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips span{background:var(--bg);border:1px solid var(--line);padding:6px 14px;border-radius:99px;font-size:14px;font-weight:500;transition:transform .2s,background .2s,color .2s}.chips span:hover{transform:translateY(-4px) rotate(-2deg);background:var(--v);color:#fff;border-color:var(--v)}

/* work: pinned horizontal scroll */
.hs{padding:0;position:relative;z-index:1}
.pin{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;gap:26px;overflow:hidden;padding-top:70px}
.wh h2{margin-bottom:8px}.wh .sub{margin:0}
.track{display:flex;gap:26px;padding:10px 24px;width:max-content;will-change:transform}
.pc{width:min(480px,82vw);flex:none;background:#fff;border:1px solid var(--line);border-radius:30px;padding:20px 20px 26px;box-shadow:0 30px 50px -36px var(--ac,#6C47FF)}
.pc .cv{border:0;padding:0;background:none;cursor:pointer;display:block;width:100%;border-radius:20px;overflow:hidden;margin-bottom:16px;transition:transform .25s ease-out}
.scene{display:block;width:100%;height:auto}
.pc small{color:var(--ac);font-weight:700;font-size:13px}.pc h3{font-size:21px;margin:6px 0 10px;letter-spacing:-.03em;line-height:1.15}.pc p{color:var(--mute);margin:0 0 14px;font-size:15px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.pc.end{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:14px;background:var(--lime);border-color:var(--lime);box-shadow:none}.pc.end h3{font-size:34px}.pc.end p{-webkit-line-clamp:unset}.pc.end .btn:hover{background:var(--ink);border-color:var(--ink)}
.tg{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.tg i{font-style:normal;font-size:12px;font-weight:700;padding:4px 11px;border-radius:99px;background:var(--bg);border:1px solid var(--line)}
.hbar{position:absolute;left:24px;right:24px;bottom:26px;height:4px;border-radius:9px;background:var(--line)}.hbar i{display:block;height:100%;border-radius:9px;background:var(--v);transform-origin:0 50%;transform:scaleX(var(--hp,0))}
@media(max-width:900px){.pin{position:static;height:auto;padding:90px 0 30px}.track{width:auto;transform:none!important;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding:0 24px;padding:10px 24px 26px;scrollbar-width:none}.track::-webkit-scrollbar{display:none}.pc{width:82vw;max-width:420px;scroll-snap-align:center}.hbar{position:relative;left:auto;right:auto;bottom:auto;margin:0 24px}}
.dash path{stroke-dashoffset:0;animation:dsh 2s linear infinite}@keyframes dsh{to{stroke-dashoffset:-22}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pl 2.2s ease-in-out infinite}@keyframes pl{50%{transform:scale(1.18)}}
.fl1{animation:fy 3.4s ease-in-out infinite}@keyframes fy{50%{transform:translateY(-6px)}}
.wave{animation:wv 5s ease-in-out infinite alternate}.wave.w2{animation-duration:7s;animation-direction:alternate-reverse}@keyframes wv{to{transform:translateX(-30px)}}
.tick{stroke-dasharray:24;animation:tk 3s ease-in-out infinite}@keyframes tk{0%{stroke-dashoffset:24}30%,100%{stroke-dashoffset:0}}
.cursor.big{}svg .cursor{animation:fy 2.4s ease-in-out infinite}

/* sketch */
.sk{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:900px){.sk{grid-template-columns:1fr 1fr}}@media(max-width:560px){.sk{grid-template-columns:1fr}}
.nt h3{font-size:19px;margin-bottom:8px}.nt p{margin:0 0 12px;font-size:15px}.nt small{color:var(--mute);font:400 12px/1.5 'Fira Code';display:block}

/* experience */
.path{position:relative;max-width:880px;margin-top:44px;padding-left:36px}
.path:before,.path:after{content:"";position:absolute;left:6px;top:8px;bottom:8px;width:3px;border-radius:3px;background:var(--line)}.path:after{background:linear-gradient(var(--v),var(--pink));transform-origin:0 0;transform:scaleY(var(--tp,0));transition:transform .15s linear}
.step{position:relative;display:grid;grid-template-columns:180px 1fr;gap:24px;padding-bottom:46px}.step:before{content:"";position:absolute;left:-36px;top:6px;width:15px;height:15px;border-radius:50%;background:#fff;border:3px solid var(--v)}
@media(max-width:620px){.step{grid-template-columns:1fr;gap:4px}}
.step time{font:500 13px 'Fira Code';color:var(--v);padding-top:4px}.step h3{font-size:22px;margin-bottom:6px;letter-spacing:-.03em}.step p{margin:0 0 10px;color:var(--mute)}.step ul{margin:0;padding-left:20px;color:var(--mute)}.step li{margin-bottom:4px}

/* contact */
.cta{display:grid;grid-template-columns:1fr 1fr;gap:44px;background:var(--ink);color:#fff;border-radius:40px;padding:clamp(28px,6vw,68px);align-items:start;position:relative;overflow:hidden}
.cta:before{content:"";position:absolute;width:380px;height:380px;right:-120px;top:-140px;border-radius:50%;background:var(--v);filter:blur(70px);opacity:.7;animation:drift 20s ease-in-out infinite alternate}
.cta>*{position:relative}@media(max-width:900px){.cta{grid-template-columns:1fr}}
.cta h2{font-size:clamp(28px,3.8vw,46px)}.cta p{color:#C9C5E6;margin:0 0 24px}
.links{display:flex;flex-direction:column}.links a{text-decoration:none;font-weight:700;padding:11px 0;border-bottom:1px solid #ffffff2a;transition:padding .2s,color .2s;overflow-wrap:anywhere}.links a:hover{padding-left:10px;color:var(--lime)}
.fm{display:grid;gap:12px}.fm input,.fm textarea{width:100%;padding:15px 18px;border-radius:16px;border:1.5px solid #ffffff33;background:#ffffff12;color:#fff;font:inherit}
.fm ::placeholder{color:#ffffffaa}.fm input:focus,.fm textarea:focus{outline:2px solid var(--lime);background:#ffffff1c}.fm textarea{min-height:130px;resize:vertical}.fm .btn{justify-self:start}.fm .btn:disabled{opacity:.6;cursor:wait}.fmsg{font-size:14px;min-height:20px;color:#C9C5E6}
footer{padding:50px 0 46px;color:var(--mute);font-size:14px;position:relative;z-index:1}footer .w{display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between}
footer .ok:before,footer .off:before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:8px;background:#00A67E}footer .off:before{background:#F29A00}

/* command palette + dialog + toast */
.cmd{position:fixed;inset:0;z-index:250;background:#14112B88;backdrop-filter:blur(5px);display:grid;place-items:start center;padding-top:16vh;animation:fi .2s both}
.cbx{width:min(520px,calc(100% - 28px));background:#fff;border-radius:22px;padding:10px;box-shadow:0 40px 80px -30px #000}.cbx input{width:100%;border:0;border-bottom:1px solid var(--line);padding:14px 14px 16px;font:500 16px 'Manrope';outline:0;color:var(--ink);margin-bottom:6px}
.cbx button{display:block;width:100%;text-align:left;border:0;background:none;padding:12px 14px;border-radius:12px;font:500 15px 'Manrope';cursor:pointer;color:var(--ink)}.cbx button:hover,.cbx button:focus-visible{background:var(--p1)}.cbx p{padding:12px 14px;margin:0;color:var(--mute)}
dialog{border:0;border-radius:30px;padding:0;max-width:700px;width:calc(100% - 28px);background:#fff;color:var(--ink);max-height:88vh;overflow:auto}
dialog::backdrop{background:#14112BAA;backdrop-filter:blur(5px)}dialog[open]{animation:fi .25s both,dp .35s}@keyframes dp{from{transform:scale(.94) translateY(16px)}}
.dm .b{padding:26px 30px 32px}.dm small{color:var(--ac);font-weight:700}.dm h3{font-size:28px;margin:6px 0 10px;letter-spacing:-.03em}.dd{color:var(--mute)}.dm ul{color:var(--mute);padding-left:20px;margin:0 0 20px}.dm li{margin-bottom:6px}
.x{position:absolute;right:14px;top:14px;width:42px;height:42px;border-radius:50%;border:0;background:#fff;color:var(--ink);font-size:22px;cursor:pointer;z-index:2;box-shadow:0 4px 14px #14112B33}
.toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,90px);background:var(--ink);color:#fff;padding:12px 22px;border-radius:99px;font-size:14px;transition:transform .3s;z-index:260}.toast.on{transform:translate(-50%,0)}

/* loader: curtain lifts when ready */
.loader{position:fixed;inset:0;z-index:400;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;background:var(--ink);color:#fff;padding:24px;transition:clip-path .9s cubic-bezier(.7,0,.2,1),visibility .9s;clip-path:inset(0 0 0 0)}
.loader.done{clip-path:inset(0 0 100% 0);visibility:hidden;pointer-events:none}
.lg{font:800 clamp(38px,9vw,64px) 'Unbounded';letter-spacing:-.05em}.lg span,.logo span{color:var(--lime)}
.bar{width:min(380px,82vw);height:8px;border-radius:99px;background:#ffffff22;overflow:hidden}.bar i{display:block;height:100%;border-radius:99px;background:var(--lime);transition:width .35s ease}
.lt{width:min(380px,82vw);display:flex;justify-content:space-between;gap:12px;font:400 13px 'Fira Code';color:#C9C5E6}

@media(max-width:600px){.w{padding:0 18px}section{padding:70px 0 10px}.row .btn{flex:1 1 auto;text-align:center}.cta{border-radius:28px}.dm .b{padding:20px}.l2{-webkit-text-stroke-width:1.5px}}
@media(min-width:1500px){.w{max-width:1300px}body{font-size:18px}}
@media(hover:none){.chips span:hover{transform:none}}

/* ---- extra motion and mobile app feel ---- */
.blobs b{position:absolute;left:var(--l);bottom:-40px;font:500 22px 'Fira Code';color:var(--v);opacity:0;animation:rise var(--t) linear infinite}
@keyframes rise{0%{transform:translateY(0) rotate(0);opacity:0}10%{opacity:.28}90%{opacity:.18}100%{transform:translateY(-112vh) rotate(40deg);opacity:0}}
.sw{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}.sw>span{display:inline-block;transform:translateY(112%) rotate(7deg);transform-origin:0 100%;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.split.rv{opacity:1;transform:none}.split.on .sw>span{transform:none}
.l2{transition:color .4s,-webkit-text-stroke-color .4s}.l2:hover{color:var(--v);-webkit-text-stroke-color:var(--v)}
.mq .rev{animation-direction:reverse;animation-duration:60s;margin-top:10px}
.pill a.on:not(.logo){background:var(--ink);color:#fff}
.btn,.dock a,.up{position:relative;overflow:hidden}.pc .cv{position:relative}
.rip{position:absolute;border-radius:50%;background:currentColor;opacity:.25;transform:scale(0);animation:rp .65s ease-out forwards;pointer-events:none}@keyframes rp{to{transform:scale(1);opacity:0}}
.cf{position:fixed;width:9px;height:14px;border-radius:2px;z-index:500;pointer-events:none}
.pc .cv:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,#ffffffaa 50%,transparent 60%);transform:translateX(-120%);transition:transform .8s}.pc .cv:hover:after{transform:translateX(120%)}
.pf{cursor:pointer}
.hi{position:absolute;left:-34px;top:8px;background:var(--ink);color:#fff;font:700 15px 'Manrope','Noto Sans Sinhala','Noto Sans Tamil',sans-serif;padding:10px 16px;border-radius:18px 18px 18px 4px;z-index:3;animation:popb .55s cubic-bezier(.3,1.6,.5,1) both;box-shadow:0 14px 26px -14px #14112B}
@keyframes popb{from{transform:scale(0) rotate(-14deg);transform-origin:0 100%}}
.tapme,.swipe,.dock{display:none}
.up{position:fixed;right:20px;bottom:22px;z-index:120;width:46px;height:46px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 12px 26px -12px #6C47FF99;opacity:min(1,calc(var(--sp) * 30))}
.up svg{width:46px;height:46px;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.up .t{stroke:var(--line)}.up .g{stroke:var(--v);stroke-dasharray:119.4;stroke-dashoffset:calc(119.4 * (1 - var(--sp)));transform:rotate(-90deg);transform-origin:center}.up path{stroke:var(--ink)}
@media(hover:none){
  .tapme{display:block;position:absolute;left:50%;margin-left:-26px;bottom:-34px;font:500 12px 'Fira Code';color:var(--mute);animation:fy 1.8s ease-in-out infinite}
  .swipe{display:inline-block;margin:12px 24px 0;font:700 13px 'Manrope';padding:7px 14px;border-radius:99px;background:var(--lime);animation:nudge 1.6s ease-in-out infinite}
  @keyframes nudge{50%{transform:translateX(12px)}}
}
@media(max-width:700px){
  body{padding-bottom:92px}
  .burger{display:none!important}.mm{display:none}
  .pill{padding:6px}.pill .logo{padding:8px 16px}
  .dock{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:120;gap:4px;padding:6px;border-radius:26px;background:#ffffffe6;backdrop-filter:blur(16px);border:1px solid var(--line);box-shadow:0 20px 40px -18px #6C47FFaa}
  .dock a{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;font-weight:700;padding:9px 0 7px;border-radius:20px;text-decoration:none;color:var(--mute);transition:background .3s,color .3s,transform .3s}
  .dock a.on{background:var(--ink);color:#fff;transform:translateY(-6px);box-shadow:0 14px 22px -12px #14112B}
  .dock svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .up{bottom:100px;right:14px;width:42px;height:42px}.up svg{width:42px;height:42px}
  .toast{bottom:104px}
  .hi{left:-6px;top:-4px}
  .hl .row .btn{flex:1 1 100%}
  .pw,.num,.tb{border-radius:22px}
  .blobs b{font-size:18px}
}
@supports (animation-timeline:view()){@media(max-width:900px){.pc{animation:cardin linear both;animation-timeline:view(inline);animation-range:entry 0% cover 35%}@keyframes cardin{from{transform:scale(.88);opacity:.45}}}}

/* ================= 2040 · light theme ================= */
:root{--bg:#F3F7FF;--ink:#0B1230;--mute:#55608A;--line:#DCE4F7;--c:#00B8D9;--lime:#B8F040;--p1:#E0E7FF;--p2:#D2F7F2;--p3:#EEF9CF;--p4:#FFE0F0}
body{background:linear-gradient(180deg,#F3F7FF,#EAF2FF 55%,#F6F3FF)}
.app.hide{visibility:hidden}
.blk{animation:blk 1.4s ease-in-out infinite}@keyframes blk{50%{opacity:.25}}

/* boot screen */
.loader{background:radial-gradient(120% 90% at 50% 0,#fff,#E3ECFF 70%);color:var(--ink);gap:16px;clip-path:inset(0 0 0 0);overflow:hidden}
.loader.done{clip-path:inset(50% 0 50% 0);visibility:hidden}
.lgrid{position:absolute;inset:0;background-image:linear-gradient(#6C47FF14 1px,transparent 1px),linear-gradient(90deg,#6C47FF14 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(circle at 50% 45%,#000,transparent 72%);mask-image:radial-gradient(circle at 50% 45%,#000,transparent 72%)}
.ringw{position:relative;width:176px;height:176px;display:grid;place-items:center}
.rr{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg);fill:none;stroke-width:6}.rt{stroke:var(--line)}.rg{stroke:var(--v);stroke-linecap:round;stroke-dasharray:440;transition:stroke-dashoffset .35s ease;filter:drop-shadow(0 0 6px #6C47FF99)}
.rbt{position:relative;z-index:1;margin-top:6px}
.loader .lg{font:800 clamp(28px,7vw,42px) 'Unbounded';letter-spacing:-.04em;position:relative}.loader .lg span{color:var(--c)}.loader .lg em{font-style:normal;color:var(--v)}
.blog{position:relative;list-style:none;margin:0;padding:0;font:400 13px/1.8 'Fira Code';color:var(--mute);min-height:96px;width:min(300px,80vw)}.blog li{animation:fi .4s both}
.loader .lt{position:relative;color:var(--mute)}

/* robots, drones, city */
.robot{display:block;overflow:visible}.rb-bob{animation:bob 4s ease-in-out infinite}
.rb-eye,.rb-mouth{transition:opacity .4s}.rb-eye{transform-box:fill-box;transform-origin:center;animation:eb 4.2s infinite}@keyframes eb{93%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
.robot:not(.awake) .rb-eye,.robot:not(.awake) .rb-mouth{opacity:.12}
.rb-ant{transform-box:fill-box;transform-origin:center;animation:pl 1.8s ease-in-out infinite}@keyframes pl{50%{transform:scale(1.35)}}
.rb-arm{transform-origin:113px 104px;animation:wv2 2.6s ease-in-out infinite}@keyframes wv2{0%,55%,100%{transform:rotate(0)}15%{transform:rotate(-40deg)}30%{transform:rotate(-8deg)}42%{transform:rotate(-40deg)}}
.fly{position:absolute;left:-120px;animation:cross var(--t,26s) linear infinite;animation-delay:var(--dl,0s);z-index:1;pointer-events:none}
.d1{top:20%;--t:30s}.d2{top:36%;--t:21s;--dl:-9s}.d3{top:8%;--t:18s;--dl:-4s}
@keyframes cross{to{transform:translateX(calc(100vw + 260px))}}
.drone{display:block;animation:bob 2.4s ease-in-out infinite}.rotor{transform-box:fill-box;transform-origin:center;animation:rot .12s linear infinite alternate}@keyframes rot{to{transform:scaleX(.5)}}
.sky{position:absolute;left:0;right:0;bottom:0;width:100%;height:40%;z-index:0;pointer-events:none;-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.2) 0,rgba(0,0,0,.2) 36%,#000 70%);mask-image:linear-gradient(90deg,rgba(0,0,0,.2) 0,rgba(0,0,0,.2) 36%,#000 70%)}
@media(max-width:940px){.sky{height:30%;opacity:.5;-webkit-mask-image:none;mask-image:none}.d2{display:none}}
.tw{animation:tw 4s ease-in-out infinite alternate}.t1{animation-delay:-1.3s}.t2{animation-delay:-2.6s}@keyframes tw{from{opacity:.2}to{opacity:.95}}
.car{position:absolute;left:-120px;height:3px;width:90px;border-radius:3px;background:linear-gradient(90deg,transparent,#35E0FF,#fff);filter:drop-shadow(0 0 6px #35E0FF);animation:cross var(--t) linear infinite;animation-delay:var(--dl,0s);z-index:1}
.c1{bottom:16%;--t:9s}.c2{bottom:23%;--t:13s;--dl:-5s;opacity:.8}.c3{bottom:10%;--t:7s;--dl:-2s}
.avail code{font:500 11px 'Fira Code';color:var(--c);margin-left:6px;padding-left:10px;border-left:1px solid var(--line)}
.bot{position:absolute;left:-14px;bottom:-8px;z-index:4;background:none;border:0;padding:0;cursor:pointer;transition:transform .3s cubic-bezier(.3,1.6,.5,1)}.bot:hover{transform:scale(1.06) rotate(-3deg)}
.bot .hi{left:84px;top:-30px;white-space:nowrap}
.hr .pf{margin-right:-30px}

/* lab */
.lab{position:relative;margin:34px 0 22px;padding:18px;border-radius:32px;background:linear-gradient(160deg,#fff,#E8F0FF);border:1px solid var(--line);overflow:hidden;box-shadow:0 40px 80px -50px #6C47FF}
.lab:before{content:"";position:absolute;inset:0;background-image:linear-gradient(#6C47FF12 1px,transparent 1px),linear-gradient(90deg,#6C47FF12 1px,transparent 1px);background-size:34px 34px}
.ws{position:relative;display:block;width:100%;height:auto;max-height:430px}
.labbot{position:absolute;right:2%;bottom:20%;width:17%;min-width:70px}.labbot svg{width:100%;height:auto}
.cl{transform-box:fill-box;transform-origin:0 50%;animation:type 4s steps(14) infinite}@keyframes type{0%{transform:scaleX(0)}55%,100%{transform:scaleX(1)}}
.caret{animation:blk .8s steps(1) infinite}
.sb{transform-box:fill-box;transform-origin:50% 100%;animation:grow 2.4s ease-in-out infinite alternate}@keyframes grow{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
.or1,.or2{transform-box:fill-box;transform-origin:center;animation:spin 6s linear infinite}.or2{animation-duration:9s;animation-direction:reverse}

/* HUD corners on project cards, reticle cursor, light ticker */
.pc{position:relative}.pc:before,.pc:after{content:"";position:absolute;width:20px;height:20px;border:2px solid var(--v);opacity:.55;pointer-events:none;transition:all .3s}
.pc:before{left:10px;top:10px;border-right:0;border-bottom:0;border-radius:8px 0 0 0}.pc:after{right:10px;bottom:10px;border-left:0;border-top:0;border-radius:0 0 8px 0}.pc:hover:before,.pc:hover:after{width:30px;height:30px;opacity:1}
.cursor i{position:relative;border-color:var(--c)}.cursor i:before,.cursor i:after{content:"";position:absolute;background:var(--c);left:50%;top:50%}.cursor i:before{width:2px;height:10px;margin:-5px 0 0 -1px}.cursor i:after{width:10px;height:2px;margin:-1px 0 0 -5px}
.mq{background:#fff;color:var(--ink);border-block:1px solid var(--line);transform:none;margin:0}.mq span{background:var(--bg);color:var(--ink);border-color:var(--line)}.mq span:nth-child(3n){background:var(--v);color:#fff;border-color:var(--v)}
.pill .logo{background:var(--ink)}

/* contact in light */
.cta{background:#fff;color:var(--ink);border:1px solid var(--line);box-shadow:0 40px 90px -56px #6C47FF}.cta p{color:var(--mute)}.links a{border-bottom-color:var(--line)}.links a:hover{color:var(--v)}
.fm input,.fm textarea{background:var(--bg);color:var(--ink);border-color:var(--line)}.fm ::placeholder{color:#8A93B8}.fm input:focus,.fm textarea:focus{outline:2px solid var(--v);background:#fff}.fmsg{color:var(--mute)}
.btn.lime{background:var(--ink);border-color:var(--ink);color:#fff}.btn.lime:hover{background:var(--v);border-color:var(--v);color:#fff}
.av{border-color:var(--v);box-shadow:0 14px 30px -14px var(--v)}
@media(max-width:700px){.bot{left:-6px}.bot svg{width:112px;height:auto}.bot .hi{left:62px;top:-26px}.hr .pf{margin-right:0}.labbot{bottom:22%}}
@media(prefers-reduced-motion:reduce){.fly,.car,.cl,.sb,.rb-arm,.rb-bob{animation:none!important}.fly,.car{display:none}.cl,.sb{transform:none!important}}

/* ================= talent: reactor, icons ================= */
.mini{font-size:clamp(22px,3vw,30px);margin:46px 0 6px}
.rx{position:relative;width:min(540px,94vw);aspect-ratio:1;margin:10px auto 40px}
.rx .rngs{position:absolute;inset:0;border-radius:50%;animation:spin 46s linear infinite}
.rx .rn2{animation-duration:70s;animation-direction:reverse}
.rx .rngs:before{content:"";position:absolute;border-radius:50%;border:1.5px dashed #6C47FF44;inset:var(--ri,0)}
.rn1{--ri:24%}.rn2{--ri:6%}
.pos{position:absolute;width:0;height:0}
.tile{position:absolute;left:-30px;top:-30px;width:60px;height:60px;border-radius:18px;border:2px solid #ffffffaa;background:var(--tc);color:#fff;font:800 16px 'Unbounded';display:grid;place-items:center;cursor:pointer;box-shadow:0 14px 26px -12px var(--tc);animation:spin 46s linear infinite reverse;transition:scale .25s cubic-bezier(.3,1.6,.5,1)}
.rn2 .tile{animation:spin 70s linear infinite}.tile:hover,.tile:focus-visible{scale:1.25;z-index:3}
.rx:hover .rngs,.rx:hover .tile{animation-play-state:paused}
.core{position:absolute;left:50%;top:50%;width:26%;aspect-ratio:1;margin:-13% 0 0 -13%;border-radius:50%;background:linear-gradient(135deg,var(--v),var(--c));color:#fff;display:grid;place-content:center;text-align:center;box-shadow:0 0 50px #6C47FF77,inset 0 0 20px #ffffff55}
.core b{font:800 clamp(15px,3.2vw,22px) 'Unbounded';letter-spacing:-.04em;line-height:1.1}.core small{font:500 11px 'Fira Code';opacity:.9}
.pulse1,.pulse2{position:absolute;left:50%;top:50%;width:26%;aspect-ratio:1;margin:-13% 0 0 -13%;border-radius:50%;border:2px solid var(--v);animation:rp2 3s ease-out infinite}.pulse2{animation-delay:1.5s}
@keyframes rp2{to{transform:scale(2.6);opacity:0}}
.ci{width:46px;height:46px;border-radius:15px;display:grid;place-items:center;background:var(--bgc,var(--p1));margin-bottom:14px;transition:transform .4s cubic-bezier(.3,1.6,.5,1)}.tb:hover .ci{transform:rotate(-10deg) scale(1.12)}
.ci svg,.sico svg,.pn svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.tools{grid-template-columns:repeat(3,1fr)}@media(max-width:980px){.tools{grid-template-columns:1fr 1fr}}@media(max-width:620px){.tools{grid-template-columns:1fr}}
.tb h3{font-size:18px}

/* services */
.svc{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}@media(max-width:1060px){.svc{grid-template-columns:1fr 1fr}}@media(max-width:600px){.svc{grid-template-columns:1fr}}
.sv{position:relative;padding:26px;border-radius:28px;background:#fff;border:1px solid var(--line);display:flex;flex-direction:column;gap:14px;overflow:hidden;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .3s}
.sv:before{content:"";position:absolute;inset:0 0 auto 0;height:5px;background:var(--sc)}.sv:after{content:"";position:absolute;width:180px;height:180px;right:-70px;top:-70px;border-radius:50%;background:var(--sc);opacity:.12;filter:blur(24px)}
.sv:hover{transform:translateY(-8px);border-color:var(--sc);box-shadow:0 30px 50px -34px var(--sc)}
.sico{width:58px;height:58px;border-radius:18px;background:var(--sc);color:#fff;display:grid;place-items:center;animation:bob 4s ease-in-out infinite;position:relative;z-index:1}.sv:nth-child(even) .sico{animation-delay:-2s}
.sv h3{font-size:19px;line-height:1.2}.sv ul{list-style:none;margin:0;padding:0;color:var(--mute);font-size:15px;display:grid;gap:8px}
.sv li{padding-left:24px;position:relative}.sv li:before{content:"";position:absolute;left:0;top:7px;width:12px;height:7px;border-left:2.5px solid var(--sc);border-bottom:2.5px solid var(--sc);transform:rotate(-45deg)}
.sv .btn{margin-top:auto;align-self:flex-start;padding:12px 22px}

/* how I work */
.proc{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:18px;margin-top:46px}
.proc .pl{position:absolute;left:10%;right:10%;top:31px;height:4px;border-radius:4px;background:var(--line)}
.proc .pl:after{content:"";position:absolute;inset:0;border-radius:4px;background:linear-gradient(90deg,var(--v),var(--c));transform-origin:0 50%;transform:scaleX(var(--pp,0));transition:transform .15s linear}
.pstep{position:relative;text-align:center;padding:0 6px}.pn{width:64px;height:64px;border-radius:50%;margin:0 auto 14px;background:#fff;border:3px solid var(--line);color:var(--mute);display:grid;place-items:center;position:relative;z-index:1;transition:all .5s cubic-bezier(.3,1.6,.5,1)}
.pstep.act .pn{background:var(--v);border-color:var(--v);color:#fff;transform:scale(1.1);box-shadow:0 0 0 9px #6C47FF22}
.pstep h3{font-size:18px;margin-bottom:6px}.pstep p{margin:0;font-size:14.5px;color:var(--mute)}
@media(max-width:820px){.proc{grid-template-columns:1fr;gap:26px}.pstep{display:grid;grid-template-columns:64px 1fr;gap:0 18px;text-align:left;align-items:center}.pn{margin:0;grid-row:span 2}.pstep h3{align-self:end}.pstep p{align-self:start}
 .proc .pl{left:31px;right:auto;top:32px;bottom:32px;width:4px;height:auto}.proc .pl:after{transform-origin:50% 0;transform:scaleY(var(--pp,0))}}

/* terminal */
.term{border-radius:22px;overflow:hidden;background:#0B1230;color:#CFE8FF;border:1px solid #1d2a63;box-shadow:0 40px 80px -50px #6C47FF;max-width:820px}
.tb2{display:flex;align-items:center;gap:7px;padding:12px 16px;background:#141d4a}.tb2 i{width:11px;height:11px;border-radius:50%;background:#FF7AB6}.tb2 i:nth-child(2){background:#B8F040}.tb2 i:nth-child(3){background:#35E0FF}.tb2 span{margin-left:10px;font:400 12px 'Fira Code';color:#8FA0D8}
.tout{height:250px;overflow-y:auto;padding:16px 18px;font:400 14px/1.7 'Fira Code',monospace;white-space:pre-wrap}.tout .c2{color:#B8F040;margin-top:6px}
.tin{display:flex;align-items:center;gap:10px;padding:12px 18px;border-top:1px solid #1d2a63;font:500 14px 'Fira Code'}.tin span{color:#35E0FF}.tin input{flex:1;background:transparent;border:0;outline:0;color:#fff;font:inherit;min-width:0}
.tq{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.tq button{font:600 13px 'Fira Code';padding:8px 14px;border-radius:99px;border:1px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;transition:all .2s}.tq button:hover{background:var(--v);color:#fff;border-color:var(--v);transform:translateY(-2px)}
.hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none}
@media(prefers-reduced-motion:reduce){.rx .rngs,.tile,.sico{animation:none!important}}

/* ============ reactor v2: real logos, beams, scanner ============ */
.rwrap{width:min(560px,94vw);margin:10px auto 44px}
.rx{width:100%;margin:0 auto 20px}
.rx .tile{scale:0;overflow:hidden}
.rv.on .rx .tile{scale:1;transition:scale .7s cubic-bezier(.3,1.6,.5,1);transition-delay:calc(var(--i) * 70ms)}
.rv.on .rx .tile:hover,.rv.on .rx .tile:focus-visible{scale:1.3;transition-delay:0s;z-index:3}
.tile img{width:30px;height:30px;display:block;transition:transform .4s cubic-bezier(.3,1.6,.5,1)}.tile:hover img{transform:rotate(-10deg) scale(1.12)}
.sweep{position:absolute;inset:4%;border-radius:50%;background:conic-gradient(from 0deg,#35E0FF44,transparent 24%);animation:spin 5s linear infinite;-webkit-mask:radial-gradient(circle,transparent 28%,#000 29%);mask:radial-gradient(circle,transparent 28%,#000 29%)}
.beams{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.beams line{stroke:var(--v);stroke-width:.35;stroke-dasharray:1.4 1.6;opacity:.45;animation:dsh2 2.4s linear infinite}@keyframes dsh2{to{stroke-dashoffset:-6}}
.rinfo{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-height:56px;padding:12px 20px;border-radius:99px;background:#fff;border:1px solid var(--line);font-size:15px;color:var(--mute);text-align:center;box-shadow:0 18px 36px -26px #6C47FF;transition:all .3s}
.rinfo b{color:var(--ink);font:700 14px 'Unbounded'}.rdot{width:12px;height:12px;border-radius:50%;box-shadow:0 0 12px currentColor}

/* ============ robot guide ============ */
.guide{position:fixed;left:18px;bottom:18px;z-index:95;display:flex;flex-direction:column;align-items:flex-start;gap:8px;pointer-events:none}.guide>*{pointer-events:auto}
.gbub{position:relative;width:min(330px,calc(100vw - 36px));background:#fff;border:1px solid var(--line);border-radius:20px 20px 20px 6px;padding:14px 16px 12px;box-shadow:0 26px 50px -24px #6C47FF,0 0 0 4px #6C47FF14;animation:popb .5s cubic-bezier(.3,1.6,.5,1) both;transform-origin:0 100%}
.gbub p{margin:0 0 10px;font-size:15px;line-height:1.5;color:var(--ink);min-height:3em}
.gc{display:inline-block;width:2px;height:1em;background:var(--v);margin-left:2px;vertical-align:-2px;animation:bl 1s steps(1) infinite}
.gact{display:flex;gap:8px;flex-wrap:wrap}.gact button{font:700 12px 'Manrope';padding:6px 12px;border-radius:99px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer;transition:all .2s}.gact button:hover{border-color:var(--v);color:var(--v)}
.gbot{background:none;border:0;padding:0;cursor:pointer;filter:drop-shadow(0 14px 18px #6C47FF55);transition:transform .3s cubic-bezier(.3,1.6,.5,1)}.gbot:hover{transform:scale(1.08) rotate(-4deg)}
.guide.talk .gbot{animation:bob 1.1s ease-in-out infinite}

/* ============ desktop navigation ============ */
.gtog{width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--mute);display:grid;place-items:center;cursor:pointer;transition:all .25s}
.gtog svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.gtog.on{background:var(--v);border-color:var(--v);color:#fff;box-shadow:0 8px 18px -8px var(--v)}.gtog:hover{transform:rotate(-8deg) scale(1.06)}
.pill .btn.sm{padding:9px 18px;margin-left:2px}.pill .btn.sm:hover{color:#fff}
.rail{position:fixed;right:18px;top:50%;transform:translateY(-50%);z-index:90;display:none;flex-direction:column;gap:4px}
@media(min-width:1260px){.rail{display:flex}}
.rail a{display:flex;align-items:center;justify-content:flex-end;gap:10px;height:24px;text-decoration:none}
.rail i{width:8px;height:8px;border-radius:50%;background:#9AA7D8;transition:all .35s cubic-bezier(.3,1.6,.5,1)}.rail a:hover i{background:var(--v);transform:scale(1.4)}.rail a.on i{height:26px;border-radius:8px;background:linear-gradient(var(--v),var(--c))}
.rail span{opacity:0;transform:translateX(8px);transition:all .25s;font:700 12px 'Manrope';background:var(--ink);color:#fff;padding:4px 11px;border-radius:99px;white-space:nowrap;pointer-events:none}.rail a:hover span,.rail a:focus-visible span{opacity:1;transform:none}
.cue{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);z-index:3;width:26px;height:42px;border:2px solid var(--v);border-radius:16px;opacity:.7;transition:opacity .3s}.cue:hover{opacity:1}
.cue i{position:absolute;left:50%;top:8px;width:4px;height:8px;margin-left:-2px;border-radius:2px;background:var(--v);animation:cue 1.6s ease-in-out infinite}@keyframes cue{50%{transform:translateY(14px);opacity:.2}}

/* ============ phone navigation ============ */
.mhead,.msheet{display:none}
@media(max-width:700px){
  .pill,.cue{display:none}
  .mhead{display:flex;position:fixed;top:10px;left:10px;right:10px;z-index:110;height:54px;align-items:center;gap:10px;padding:7px;border-radius:99px;background:#ffffffd9;backdrop-filter:blur(16px);border:1px solid var(--line);box-shadow:0 16px 36px -22px #6C47FF}
  .mhead .logo{font:800 16px 'Unbounded';padding:9px 16px;border-radius:99px;background:var(--ink);color:#fff;text-decoration:none}.mhead .logo span{color:var(--lime)}
  .mlab{flex:1;display:flex;align-items:center;gap:8px;justify-content:center;font:700 13px 'Manrope';color:var(--ink);min-width:0}
  .mlab i{width:8px;height:8px;border-radius:50%;background:#00A67E;animation:ping 2s infinite;flex:none}
  .mlab span{animation:lab .45s cubic-bezier(.2,.8,.2,1) both;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@keyframes lab{from{opacity:0;transform:translateY(10px)}}
  .mbtn{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:linear-gradient(135deg,var(--v),var(--c));cursor:pointer;flex:none}
  .mbtn b{position:absolute;left:11px;width:18px;height:2.5px;border-radius:2px;background:#fff;transition:transform .4s cubic-bezier(.3,1.4,.5,1),opacity .2s,top .4s}
  .mbtn b:nth-child(1){top:14px}.mbtn b:nth-child(2){top:19px}.mbtn b:nth-child(3){top:24px}
  .mbtn.open b:nth-child(1){top:19px;transform:rotate(45deg)}.mbtn.open b:nth-child(2){opacity:0}.mbtn.open b:nth-child(3){top:19px;transform:rotate(-45deg)}
  .msheet{display:flex;flex-direction:column;position:fixed;inset:0;z-index:105;padding:92px 20px 28px;background:radial-gradient(120% 70% at 100% 0,#E6E0FF,#F3F7FF 60%);overflow-y:auto;clip-path:circle(0 at calc(100% - 38px) 37px);visibility:hidden;transition:clip-path .7s cubic-bezier(.7,0,.2,1),visibility 0s .7s}
  .msheet.open{clip-path:circle(160% at calc(100% - 38px) 37px);visibility:visible;transition:clip-path .7s cubic-bezier(.7,0,.2,1)}
  .msheet ul{list-style:none;margin:0;padding:0}
  .msheet li{opacity:0;transform:translateY(26px);transition:opacity .4s,transform .4s}
  .msheet.open li{opacity:1;transform:none;transition:opacity .5s calc(var(--i) * 60ms + 250ms),transform .5s calc(var(--i) * 60ms + 250ms)}
  .msheet li a{display:flex;align-items:center;gap:14px;padding:11px 4px;text-decoration:none;border-bottom:1px solid var(--line)}
  .mi{width:46px;height:46px;border-radius:16px;background:var(--p1);display:grid;place-items:center;color:var(--v);flex:none}.mi svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .msheet li b{display:block;font:700 19px 'Unbounded';letter-spacing:-.03em;line-height:1.2}.msheet li small{color:var(--mute);font-size:13px}.msheet li em{margin-left:auto;font-style:normal;color:var(--v);font-size:20px}
  .mq2{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.mq2 a{font:700 14px 'Manrope';padding:10px 18px;border-radius:99px;background:#fff;border:1px solid var(--line);text-decoration:none}
  .mg{margin-top:16px;font:700 14px 'Manrope';padding:12px 18px;border-radius:16px;border:1px dashed var(--v);background:transparent;color:var(--v);cursor:pointer}
  .dock{display:grid;grid-template-columns:repeat(5,1fr);gap:0}
  .dock a{position:relative;z-index:1}.dock a.on{background:none;box-shadow:none;color:#fff;transform:translateY(-3px)}
  .ind{position:absolute;top:6px;bottom:6px;left:6px;width:calc((100% - 12px) / 5);border-radius:20px;background:linear-gradient(135deg,var(--ink),#1d2a63);transform:translateX(calc(var(--i) * 100%));transition:transform .55s cubic-bezier(.3,1.4,.5,1);box-shadow:0 14px 22px -12px #0B1230;z-index:0}
  .guide{left:10px;bottom:98px}.gbot svg{width:56px;height:auto}
  .rinfo{border-radius:22px}
}
@media(prefers-reduced-motion:reduce){.rx .tile{scale:1!important}.sweep,.beams line,.cue i{animation:none!important}}

/* hidden toast must never peek out above the phone dock */
.toast{opacity:0;visibility:hidden;transition:transform .3s,opacity .3s,visibility .3s}.toast.on{opacity:1;visibility:visible}
@media(max-width:700px){.msheet{padding-bottom:118px}}

/* ============ header v2: hides on scroll down, returns on scroll up ============ */
.pill{transition:transform .55s cubic-bezier(.3,1.2,.4,1),box-shadow .3s;overflow:hidden}
.pprog{position:absolute;left:14px;right:14px;bottom:0;height:2.5px;border-radius:3px;background:linear-gradient(90deg,var(--v),var(--c),var(--lime));transform-origin:0 50%;transform:scaleX(var(--sp));pointer-events:none}
html[data-head="hide"]:not([data-menu]) .pill{transform:translate(-50%,calc(-100% - 28px));pointer-events:none}
html[data-scrolled="1"] .pill{box-shadow:0 18px 40px -22px #6C47FF}
@media(max-width:820px){
  .pill,.cue{display:none}
  .mhead{display:flex;position:fixed;top:calc(10px + env(safe-area-inset-top,0px));left:10px;right:10px;z-index:110;height:58px;align-items:center;gap:8px;padding:8px;border-radius:20px;background:#ffffffe0;backdrop-filter:blur(18px) saturate(1.5);border:1px solid var(--line);box-shadow:0 14px 30px -26px #6C47FF;overflow:hidden;transition:transform .55s cubic-bezier(.3,1.2,.4,1),box-shadow .3s}
  html[data-scrolled="1"] .mhead{box-shadow:0 20px 40px -22px #6C47FF}
  html[data-head="hide"]:not([data-menu]) .mhead{transform:translateY(calc(-100% - 24px));pointer-events:none}
  .mlogo{position:relative;isolation:isolate;flex:none;width:42px;height:42px;border-radius:14px;background:var(--ink);display:grid;place-items:center;text-decoration:none}
  .mlogo:before{content:"";position:absolute;inset:-2px;border-radius:16px;background:conic-gradient(from 0deg,#6C47FF,#35E0FF,#B8F040,#FF7AB6,#6C47FF);animation:spin 5s linear infinite;z-index:-1}
  .mlogo span{font:800 15px 'Unbounded';color:#fff;letter-spacing:-.05em}.mlogo em{font-style:normal;color:var(--lime)}
  .mlab{flex:1;min-width:0;display:flex;align-items:center;gap:9px;padding-left:4px}
  .mlab .mn{flex:none;font:500 11px 'Fira Code';color:#fff;background:linear-gradient(135deg,var(--v),var(--c));padding:4px 7px;border-radius:8px}
  .mlab span{font:700 14px 'Manrope';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:lab .45s cubic-bezier(.2,.8,.2,1) both}
  .mg2{position:relative;flex:none;width:42px;height:42px;border-radius:14px;border:1px solid var(--line);background:#fff;color:var(--mute);display:grid;place-items:center;cursor:pointer;transition:all .25s}
  .mg2 svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .mg2.on{color:var(--v);border-color:var(--v);background:#F3F0FF}.mg2.on:after{content:"";position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:#00A67E;box-shadow:0 0 0 2px #fff}
  .mbtn{flex:none;width:42px;height:42px;border-radius:14px}.mbtn b{left:12px}
  .mbtn b:nth-child(1){top:15px}.mbtn b:nth-child(2){top:20px}.mbtn b:nth-child(3){top:25px}
  .mbtn.open b:nth-child(1){top:20px}.mbtn.open b:nth-child(3){top:20px}
  .mprog{position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--v),var(--c),var(--lime));transform-origin:0 50%;transform:scaleX(var(--sp))}
  .msheet{padding-top:96px}
}
@media(max-width:360px){.mlab .mn{display:none}.mg2{display:none}}
@media(prefers-reduced-motion:reduce){.pill,.mhead{transition:none!important}.mlogo:before{animation:none!important}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}.rv,.wipe,.hl>*,.hr,.code pre span{opacity:1!important;transform:none!important;clip-path:none!important}.hs{height:auto!important}.pin{position:static;height:auto;padding:90px 0 30px}.track{flex-direction:column;width:auto;transform:none!important}.pc{width:100%}}
      `}</style>
    </>
  );
}
