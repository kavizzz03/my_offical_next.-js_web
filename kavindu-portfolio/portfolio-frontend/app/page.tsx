"use client";
import React, { useEffect, useRef, useState } from "react";
import "./portfolio.css";

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
const NAVD: [string, string][] = [["talent", "Talent"], ["services", "Services"], ["work", "Work"], ["path", "Experience"], ["hello", "Contact"]];
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
type Tech = { n: string; c: string; t?: string; k: string; d: string };
const TECH: Tech[] = [
  { n: "PHP", c: "#777BB4", k: "php", d: "REST APIs and the 200,000-customer broadcast system" },
  { n: "Node.js", c: "#3C873A", k: "node", d: "Express backends and API services" },
  { n: "React", c: "#0EA5C6", k: "react", d: "Interfaces, sites and web apps" },
  { n: "Kotlin", c: "#7F52FF", k: "kotlin", d: "Native Android apps with Jetpack Compose" },
  { n: "MySQL", c: "#E48E00", k: "mysql", d: "The main database behind most of my systems" },
  { n: "Python", c: "#3776AB", k: "python", d: "XGBoost models, automation and Whisper AI tools" },
  { n: "JavaScript", c: "#F0C419", t: "#0B1230", k: "js", d: "Front ends, scripts and plain-JS apps" },
  { n: "Java", c: "#E76F00", k: "java", d: "Android apps and desktop software" },
  { n: "Next.js", c: "#111827", k: "next", d: "Full-stack sites, including this one" },
  { n: "Tailwind CSS", c: "#06B6D4", k: "tailwind", d: "Fast, consistent styling" },
  { n: "SQL Server", c: "#CC2927", k: "sqlserver", d: "Database administration and server management" },
  { n: "MongoDB", c: "#13AA52", k: "mongo", d: "Flexible document data for web apps" },
  { n: "Firebase", c: "#F5820D", k: "firebase", d: "Auth and data for mobile apps" },
  { n: "Android SDK", c: "#3DDC84", t: "#0B1230", k: "android", d: "Native Android apps and games" },
  { n: "HTML5", c: "#E34F26", k: "html", d: "Semantic, accessible markup" },
  { n: "CSS3", c: "#1572B6", k: "css", d: "Responsive layouts and animation" },
  { n: "Express.js", c: "#2D3748", k: "express", d: "REST APIs on Node.js" },
  { n: "Jetpack Compose", c: "#4285F4", k: "compose", d: "Modern Android interfaces" },
  { n: "Git", c: "#F05032", k: "git", d: "Version control for every project" },
  { n: "GitHub", c: "#181717", k: "github", d: "Code hosting, reviews and releases" },
  { n: "Postman", c: "#FF6C37", k: "postman", d: "API testing and endpoint collections" },
  { n: "Linux", c: "#2B2B2B", k: "linux", d: "Servers and development environments" },
  { n: "FFmpeg", c: "#007808", k: "ffmpeg", d: "Video and audio processing" },
  { n: "C / C++", c: "#00599C", k: "cpp", d: "Part of my core language toolkit" },
  { n: "XGBoost", c: "#D9531E", k: "xgb", d: "Flood-risk prediction in FloodMind" },
  { n: "Whisper AI", c: "#10A37F", k: "whisper", d: "Subtitles from audio and video" },
  { n: "cPanel", c: "#FF6C2C", k: "cpanel", d: "Hosting and deployment" },
  { n: "Hostinger", c: "#673DE6", k: "hostinger", d: "Hosting for the KMD Sweet House and Hire Us sites" },
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

/* drawn icons, so every tool has a logo even offline */
const F = { fill: "currentColor", stroke: "none" } as const;
const TX = { fill: "currentColor", stroke: "none", textAnchor: "middle", fontWeight: 800, fontFamily: "Arial, Helvetica, sans-serif" } as const;
const EYE = "var(--tc, #333)";
const ICONS: Record<string, React.ReactNode> = {
  php: <><ellipse cx="12" cy="12" rx="10.5" ry="6.5" /><text x="12" y="14.8" fontSize="8.6" {...TX}>php</text></>,
  node: <><path d="M12 2.5l8.2 4.7v9.6L12 21.5l-8.2-4.7V7.2z" /><text x="12" y="14.8" fontSize="7.4" {...TX}>JS</text></>,
  react: <><circle cx="12" cy="12" r="1.7" {...F} /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></>,
  kotlin: <path d="M3 21V3h18L12 12l9 9z" {...F} />,
  mysql: <><ellipse cx="12" cy="5.5" rx="8" ry="2.8" /><path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" /></>,
  python: <><path d="M12 2.5c-3.7 0-4.5 1.3-4.5 3v2.2h4.8v.9H5.8C3.8 8.6 2.5 10 2.5 12.6s1.2 4 3.2 4H8v-2.600c0-1.500 1.200-2.800 2.800-2.800h4.200c1.300 0 2.400-1 2.400-2.400V5.500c0-1.700-1.300-3-5.400-3z" {...F} /><path d="M12 21.500c3.700 0 4.500-1.300 4.500-3v-2.200h-4.800v-.9h6.500c2 0 3.300-1.400 3.300-4s-1.200-4-3.200-4H16v2.600c0 1.500-1.200 2.800-2.800 2.800H9c-1.300 0-2.400 1-2.400 2.400v4.300c0 1.700 1.300 3 5.400 3z" {...F} opacity=".8" /><circle cx="9.5" cy="5.2" r=".9" fill={EYE} stroke="none" /><circle cx="14.5" cy="18.8" r=".9" fill={EYE} stroke="none" /></>,
  js: <><rect x="3" y="3" width="18" height="18" rx="2.5" {...F} /><text x="18.8" y="18.6" fontSize="9" {...TX} textAnchor="end" fill={EYE}>JS</text></>,
  java: <><path d="M5 13.5h11.500v2.200a4.300 4.300 0 01-4.300 4.300H9.300A4.300 4.300 0 015 15.700z" {...F} /><path d="M16.500 14.500h1.300a2.300 2.300 0 010 4.600h-1.300" /><path d="M8.500 10.800c-1.300-1.700 1.300-2.700 0-4.600M12.500 10.800c-1.300-1.700 1.300-2.700 0-4.600" /></>,
  next: <><circle cx="12" cy="12" r="9.500" /><path d="M8.800 16V8.200l6.800 8.600M15.200 8v5" /></>,
  tailwind: <><path d="M3.500 9.500c2-3.500 4.700-3.500 7-1.500s5 2 7-1.500" strokeWidth="2.4" /><path d="M6.500 17c2-3.500 4.700-3.500 7-1.500s5 2 7-1.500" strokeWidth="2.4" /></>,
  sqlserver: <><rect x="4" y="3.5" width="16" height="7" rx="1.8" /><rect x="4" y="13.500" width="16" height="7" rx="1.8" /><circle cx="7.800" cy="7" r=".9" {...F} /><circle cx="7.800" cy="17" r=".9" {...F} /><path d="M12 7h5.500M12 17h5.500" /></>,
  mongo: <path d="M12 2c3.200 3.800 5.200 6.800 5.200 10.800A5.200 5.200 0 0113.500 18v4h-3v-4A5.200 5.200 0 016.800 12.800C6.800 8.800 8.800 5.800 12 2z" {...F} />,
  firebase: <path d="M5.500 19.500L7.300 3.800l3.200 5.800 1.700-3.100 5.800 13-6.200 3z" {...F} />,
  android: <><path d="M5 15.500a7 7 0 0114 0z" {...F} /><path d="M8 5.500l1.700 2.600M16 5.500l-1.700 2.600" /><circle cx="9.300" cy="12.400" r=".9" fill={EYE} stroke="none" /><circle cx="14.700" cy="12.400" r=".9" fill={EYE} stroke="none" /><rect x="5" y="16.800" width="14" height="4.200" rx="2" {...F} /></>,
  html: <><path d="M4 3l1.600 17L12 22l6.400-2L20 3z" {...F} /><text x="12" y="16" fontSize="9.500" {...TX} fill={EYE}>5</text></>,
  css: <><path d="M4 3l1.600 17L12 22l6.400-2L20 3z" {...F} /><text x="12" y="16" fontSize="9.500" {...TX} fill={EYE}>3</text></>,
  express: <text x="12" y="16.500" fontSize="12.500" {...TX} fontStyle="italic" fontFamily="Georgia, serif">ex</text>,
  compose: <><path d="M12 2.500l8 4.600v9.200L12 21l-8-4.700V7.100z" /><path d="M12 8l3.800 2.200v4.400L12 16.800l-3.800-2.200v-4.400z" {...F} /></>,
  git: <><path d="M12 2l10 10-10 10L2 12z" {...F} /><circle cx="9.500" cy="8.800" r="1.300" fill={EYE} stroke="none" /><circle cx="9.500" cy="15.500" r="1.300" fill={EYE} stroke="none" /><circle cx="14.800" cy="11.800" r="1.300" fill={EYE} stroke="none" /><path d="M9.500 9v6.200M9.500 12h5" stroke={EYE} strokeWidth="1.400" /></>,
  github: <path d="M12 .5C5.650.5.500 5.650.500 12c0 5.080 3.290 9.390 7.860 10.910.58.110.790-.250.790-.560v-2c-3.200.700-3.870-1.540-3.870-1.540-.520-1.330-1.280-1.690-1.280-1.690-1.040-.710.080-.700.080-.700 1.150.080 1.760 1.180 1.760 1.180 1.030 1.760 2.700 1.250 3.360.960.100-.750.400-1.250.730-1.540-2.560-.290-5.240-1.280-5.240-5.700 0-1.260.450-2.290 1.180-3.100-.120-.290-.510-1.470.110-3.060 0 0 .970-.310 3.170 1.180a10.900 10.900 0 015.780 0c2.200-1.490 3.170-1.180 3.170-1.180.630 1.590.230 2.770.110 3.060.740.810 1.180 1.840 1.180 3.100 0 4.430-2.690 5.400-5.260 5.690.410.360.780 1.060.780 2.140v3.170c0 .310.210.680.800.560A11.510 11.510 0 0023.500 12C23.500 5.650 18.350.5 12 .5z" {...F} />,
  postman: <><circle cx="12" cy="12" r="9.500" /><path d="M8 16l7.500-7.500M11 8.500h4.500V13" /></>,
  linux: <><ellipse cx="12" cy="13" rx="6" ry="8" {...F} /><ellipse cx="12" cy="15" rx="3.400" ry="5" fill={EYE} stroke="none" opacity=".3" /><circle cx="10" cy="8.300" r=".9" fill={EYE} stroke="none" /><circle cx="14" cy="8.300" r=".9" fill={EYE} stroke="none" /><ellipse cx="8.500" cy="21" rx="2.400" ry="1.200" {...F} /><ellipse cx="15.500" cy="21" rx="2.400" ry="1.200" {...F} /></>,
  ffmpeg: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2" /><path d="M10 9.500l5 2.500-5 2.500z" {...F} /></>,
  cpp: <text x="12" y="16" fontSize="10.500" {...TX}>C++</text>,
  xgb: <><circle cx="12" cy="5" r="2" {...F} /><circle cx="6" cy="14" r="2" {...F} /><circle cx="18" cy="14" r="2" {...F} /><circle cx="3.500" cy="20.500" r="1.500" {...F} /><circle cx="8.500" cy="20.500" r="1.500" {...F} /><circle cx="15.500" cy="20.500" r="1.500" {...F} /><circle cx="20.500" cy="20.500" r="1.500" {...F} /><path d="M12 7l-6 5M12 7l6 5M6 16l-2.200 3M6 16l2.200 3M18 16l-2.200 3M18 16l2.200 3" /></>,
  whisper: <path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4" strokeWidth="2.4" />,
  cpanel: <><rect x="3" y="6" width="18" height="12" rx="6" /><text x="12" y="14.600" fontSize="7.800" {...TX}>cP</text></>,
  hostinger: <path d="M4 3l5 2.500v5l6 3V8.500l5 2.500v10l-5-2.500v-5l-6-3V18.500L4 16z" {...F} />,
  hook: <><circle cx="7" cy="7" r="2.500" /><circle cx="17" cy="17" r="2.500" /><path d="M9.500 7h3.500a3 3 0 013 3v4.500M14.500 17H11a3 3 0 01-3-3V9.500" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2.200" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  devices: <><rect x="2.500" y="5" width="14" height="10" rx="1.500" /><rect x="14" y="9" width="7" height="12" rx="1.500" /><path d="M6 18h6" /></>,
  search: <><circle cx="10.500" cy="10.500" r="6.500" /><path d="M15.500 15.500L21 21" /></>,
  chat: <path d="M21 12a8 8 0 01-11.600 7.100L3 21l1.900-6.400A8 8 0 1121 12z" />,
  whatsapp: <><path d="M21 12a8 8 0 01-11.600 7.100L3 21l1.900-6.400A8 8 0 1121 12z" /><path d="M9 9.500c.5 2.500 2.500 4.500 5 5l1.200-1.300-1.800-1-.9.700c-.9-.4-1.700-1.200-2.100-2.100l.7-.9-1-1.800z" {...F} /></>,
  table: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
};
function Glyph({ k, size }: { k: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[k] || ICONS.chip}</svg>
  );
}
/* icon and colour for any label in the skill cards */
const CHIP_RULES: [RegExp, string, string, boolean?][] = [
  [/^php/i, "php", "#777BB4"], [/^node/i, "node", "#3C873A"], [/express/i, "express", "#2D3748"], [/next/i, "next", "#111827"], [/react/i, "react", "#0EA5C6"],
  [/tailwind/i, "tailwind", "#06B6D4"], [/html/i, "html", "#E34F26"], [/css/i, "css", "#1572B6"], [/^javascript/i, "js", "#F0C419", true], [/kotlin/i, "kotlin", "#7F52FF"],
  [/^java$/i, "java", "#E76F00"], [/python/i, "python", "#3776AB"], [/c\/c\+\+/i, "cpp", "#00599C"], [/mysql/i, "mysql", "#E48E00"], [/mssql|sql server/i, "sqlserver", "#CC2927"],
  [/mongo/i, "mongo", "#13AA52"], [/firebase/i, "firebase", "#F5820D"], [/android/i, "android", "#3DDC84", true], [/compose/i, "compose", "#4285F4"], [/xgboost/i, "xgb", "#D9531E"],
  [/whisper/i, "whisper", "#10A37F"], [/git/i, "git", "#F05032"], [/postman/i, "postman", "#FF6C37"], [/ffmpeg/i, "ffmpeg", "#007808"], [/linux/i, "linux", "#2B2B2B"],
  [/cpanel/i, "cpanel", "#FF6C2C"], [/hostinger/i, "hostinger", "#673DE6"], [/webhook/i, "hook", "#6C47FF"], [/auth/i, "lock", "#6C47FF"], [/responsive/i, "devices", "#00B8D9"],
  [/seo/i, "search", "#00A67E"], [/sms/i, "chat", "#FF4FD8"], [/whatsapp/i, "whatsapp", "#25D366"], [/dataset/i, "table", "#8B7BFF"],
];
const chipIcon = (label: string): [string, string, boolean] => { const r = CHIP_RULES.find(([re]) => re.test(label)); return r ? [r[1], r[2], !!r[3]] : ["chip", "#8B7BFF", false]; };

/* one tool in the reactor */
function Tile({ t, i, onHover }: { t: Tech; i: number; onHover: (t: Tech | null) => void }) {
  return (
    <button className="tile" style={{ "--tc": t.c, "--i": i, color: t.t || "#fff" } as React.CSSProperties}
      onPointerEnter={() => onHover(t)} onFocus={() => onHover(t)} onClick={() => onHover(t)}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") onHover(null); }} onBlur={() => onHover(null)} aria-label={t.n}>
      <Glyph k={t.k} />
    </button>
  );
}

/* tech reactor: three rings of tools orbiting a glowing core */
function Reactor({ hov, setHov }: { hov: Tech | null; setHov: (t: Tech | null) => void }) {
  const r3 = (v: number) => Math.round(v * 1000) / 1000;
  const place = (n: number, i: number, R: number) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; return [r3(50 + R * Math.cos(a)), r3(50 + R * Math.sin(a))]; };
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
        {ring(TECH.slice(0, 6), 22, "rn1", 0, true)}
        {ring(TECH.slice(6, 14), 34, "rn2", 6, false)}
        {ring(TECH.slice(14), 45, "rn3", 14, false)}
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
  const [clock, setClock] = useState("");
  const [say, setSay] = useState("");
  const [typedSay, setTypedSay] = useState("");
  const [tlines, setTlines] = useState<string[]>(["KB-OS 2040 · online", "Type 'help' to see what I can do."]);
  const [tin, setTin] = useState("");
  const termRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
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

  // Colombo local time for the phone menu (set after load, so server and browser always match)
  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Colombo" }));
    t(); const id = setInterval(t, 30000); return () => clearInterval(id);
  }, []);

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

  // sliding highlight under the desktop links, plus number keys 1-5 to jump around
  const moveLens = (el: HTMLElement) => {
    const n = navRef.current; if (!n) return;
    n.style.setProperty("--lx", `${el.offsetLeft}px`); n.style.setProperty("--lw", `${el.offsetWidth}px`); n.style.setProperty("--lo", "1");
    n.querySelectorAll("a").forEach((a) => a.classList.toggle("lit", a === el));
  };
  const resetLens = () => {
    const n = navRef.current; if (!n) return;
    const a = n.querySelector<HTMLElement>("a.on");
    if (a) moveLens(a); else { n.style.setProperty("--lo", "0"); n.querySelectorAll("a").forEach((x) => x.classList.remove("lit")); }
  };
  useEffect(() => { resetLens(); }, [sec]); // eslint-disable-line
  useEffect(() => {
    const f = () => resetLens();
    addEventListener("resize", f); addEventListener("load", f); document.fonts?.ready.then(f);
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || t.isContentEditable || e.ctrlKey || e.metaKey || e.altKey) return;
      const i = "12345".indexOf(e.key);
      if (e.key.length === 1 && i >= 0) go(NAVD[i][0]);
    };
    addEventListener("keydown", k);
    return () => { removeEventListener("resize", f); removeEventListener("load", f); removeEventListener("keydown", k); };
  }, []); // eslint-disable-line

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
        <a className="logo" href="#top" aria-label="Kavindu Bogahawatte, back to the top">
          <span className="lk">
            <svg className="lring" viewBox="0 0 44 44" aria-hidden="true"><circle className="lt0" cx="22" cy="22" r="19" /><circle className="lt1" cx="22" cy="22" r="19" /></svg>
            <b>KB</b>
          </span>
          <span className="nm">Kavindu Bogahawatte</span>
        </a>
        <div className="links2" ref={navRef} onPointerLeave={resetLens} title="Tip: press 1 to 5 to jump between sections">
          <i className="lens" aria-hidden="true" />
          {NAVD.map(([id, l], i) => (
            <a key={id} href={`#${id}`} className={sec === id ? "on" : ""} onPointerEnter={(e) => moveLens(e.currentTarget)} onFocus={(e) => moveLens(e.currentTarget)} onBlur={resetLens}><em>{i + 1}</em>{l}</a>
          ))}
        </div>
        <button className={`gtog${guideOn ? " on" : ""}`} onClick={toggleGuide} aria-pressed={guideOn} aria-label={guideOn ? "Turn off the robot guide" : "Turn on the robot guide"} title={guideOn ? "Robot guide: on" : "Robot guide: off"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M7 8h10a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6a3 3 0 013-3zM9 13h.01M15 13h.01M9 17h6" /></svg>
        </button>
        <button className="kbd" onClick={() => setCmd(true)} aria-label="Open command menu"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg><span>Ctrl K</span></button>
        <a className="cta2" href="#hello">Hire me<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
        <i className="pprog" aria-hidden="true" />
      </nav>

      {/* desktop: dots on the right edge show where you are */}
      <nav className="rail" aria-label="Section navigation">
        {RAIL.map(([id, l]) => <a key={id} href={`#${id}`} className={rsec === id ? "on" : ""} aria-label={l}><span>{l}</span><i /></a>)}
      </nav>

      {/* phone: header with a live section label and an expanding full-screen menu */}
      <div className="mhead">
        <a className="mlogo" href="#top" aria-label="Kavindu Bogahawatte, back to the top"><span>KB</span></a>
        <div className="mname">
          <b>Kavindu Bogahawatte</b>
          <small aria-live="polite"><i className="mn">{String(Math.max(0, DOCK.findIndex((d) => d[0] === sec)) + 1).padStart(2, "0")}</i><span key={sec}>{LABEL[sec] || "Home"}</span></small>
        </div>
        <a className="mhire" href="#hello">Hire me</a>
        <button className={`mg2${guideOn ? " on" : ""}`} onClick={toggleGuide} aria-pressed={guideOn} aria-label={guideOn ? "Turn off the robot guide" : "Turn on the robot guide"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M7 8h10a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6a3 3 0 013-3zM9 13h.01M15 13h.01M9 17h6" /></svg>
        </button>
        <button className={`mbtn${menu ? " open" : ""}`} onClick={() => setMenu(!menu)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu}><b /><b /><b /></button>
        <i className="mprog" aria-hidden="true" />
      </div>
      <div className={`msheet${menu ? " open" : ""}`} aria-hidden={!menu}>
        <div className="mid"><b>Kavindu Bogahawatte</b><span>Independent Software Engineer</span><span className="mclk"><i />Colombo, Sri Lanka · {clock || "--:--"} local time</span></div>
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
                <div className="chips">{t[2].map((c, j) => { const [k, col, dk] = chipIcon(c); return <span key={c} style={{ transitionDelay: `${j * 40}ms` }}><i className="cic" style={{ "--tc": col, color: dk ? "#0B1230" : "#fff" } as React.CSSProperties}><Glyph k={k} /></i>{c}</span>; })}</div>
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

    </>
  );
}
