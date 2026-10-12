"use client";
import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------- */
/* Data (same shape your Node backend returns)                      */
/* ---------------------------------------------------------------- */

const MAIL = "kavindumalshan2003@gmail.com";
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
  ["May 2026 to now", "Associate Software Engineer", "ASB Fashion (Pvt) Ltd, IT Department", ["Turning business workflows into software, from requirements to deployment.", "Building the Purchasing Order Management System, the official website and ASB Loyal Vault, the loyalty platform.", "API integrations, database optimisation, troubleshooting and maintenance."]],
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      const res = await fetch(`${API}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error(String(res.status));
      setSending("sent"); setForm({ name: "", email: "", message: "" }); burst(); showToast("Message sent");
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
    const layout = () => {
      const s = hs.current, t = track.current; if (!s || !t) return;
      s.style.height = innerWidth > 900 ? `${t.scrollWidth - innerWidth + innerHeight + 80}px` : "auto";
    };
    const onScroll = () => {
      const h = root.scrollHeight - innerHeight;
      root.style.setProperty("--sp", String(h > 0 ? scrollY / h : 0));
      const tl = document.querySelector<HTMLElement>(".path");
      if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty("--tp", String(Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height)))); }
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
  }, [projects]);

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
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setSec(e.target.id === "sketch" ? "work" : e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    ["top", "talent", "work", "sketch", "path", "hello"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
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

  const p = active !== null ? projects[active] : null;

  return (
    <>
      <div className="sprog" aria-hidden="true" />
      <div className="cursor" ref={cur} aria-hidden="true"><i /></div>

      <div className={`loader${loading ? "" : " done"}`} role="status" aria-live="polite" aria-hidden={!loading}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lav" src={AVATAR} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        <div className="lg">kavindu<span>.dev</span></div>
        <div className="bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${progress}%` }} /></div>
        <div className="lt"><span>&gt; {status}</span><b>{progress}%</b></div>
      </div>

      <div className="blobs" aria-hidden="true"><i /><i /><i />
        {SYM.map((x, i) => <b key={i} style={{ "--l": `${5 + i * 9.5}%`, "--t": `${15 + (i % 4) * 5}s`, animationDelay: `-${i * 2.4}s` } as React.CSSProperties}>{x}</b>)}
      </div>

      <nav className="pill" aria-label="Main">
        <a className="logo" href="#top">kb<span>.</span></a>
        {[["talent", "Talent"], ["work", "Work"], ["path", "Experience"], ["hello", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className={sec === id ? "on" : ""}>{l}</a>)}
        <button className="kbd" onClick={() => setCmd(true)} aria-label="Open command menu">Ctrl K</button>
        <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "✕" : "☰"}</button>
      </nav>
      {menu && <div className="mm">{["talent", "work", "path", "hello"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{id === "path" ? "Experience" : id[0].toUpperCase() + id.slice(1)}</a>)}</div>}

      <nav className="dock" aria-label="Quick navigation">
        {DOCK.map(([id, l, d]) => (
          <a key={id} href={`#${id}`} className={sec === id ? "on" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>{l}</a>
        ))}
      </nav>
      <a className="up" href="#top" aria-label="Back to top"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" className="t" /><circle cx="22" cy="22" r="19" className="g" /><path d="M16 25l6-6 6 6" /></svg></a>

      {/* HERO */}
      <header className={`hero${loading ? "" : " go"}`} id="top">
        <Net />
        <div className="w hg">
          <div className="hl">
            <span className="avail"><i />Open to backend and full-stack roles</span>
            <h1><span className="l1"><Scramble t="Kavindu" /></span><span className="l2">Bogahawatte</span></h1>
            <p className="role">Software engineer who ships <u>dependable</u> systems.</p>
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
              <span className="hi" key={gi} aria-hidden="true">{GREET[gi]}</span>
              <span className="tapme" aria-hidden="true">tap me</span>
            </div>
            <div className="code" aria-hidden="true">
              <div className="cb"><i /><i /><i /><span>kavindu.ts</span></div>
              <pre>
                <span style={{ "--d": "1.6s" } as React.CSSProperties}><s>const</s> kavindu = {"{"}</span>
                <span style={{ "--d": "1.9s" } as React.CSSProperties}>  role: <q>&quot;Associate Software Engineer&quot;</q>,</span>
                <span style={{ "--d": "2.2s" } as React.CSSProperties}>  at: <q>&quot;ASB Fashion&quot;</q>,</span>
                <span style={{ "--d": "2.5s" } as React.CSSProperties}>  shipped: <q>&quot;200,000+ customer platform&quot;</q>,</span>
                <span style={{ "--d": "2.8s" } as React.CSSProperties}>  openTo: <q>&quot;backend, full-stack&quot;</q>,</span>
                <span style={{ "--d": "3.1s" } as React.CSSProperties}>{"}"};</span>
              </pre>
            </div>
          </div>
        </div>
      </header>

      <div className="mq" aria-hidden="true"><div>{[0, 1].flatMap((r) => MARQUEE.map((w) => ({ w, r }))).map((o, i) => <span key={i}>{o.w}</span>)}</div><div className="rev">{[0, 1].flatMap((r) => MARQUEE.slice().reverse().map((w) => ({ w, r }))).map((o, i) => <span key={i}>{o.w}</span>)}</div></div>

      {/* TALENT */}
      <div className="w">
        <section id="talent">
          <h2 className="rv split"><Split t="What I'm good at" /></h2>
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
          <div className="tools">
            {TOOLS.map((t, i) => (
              <div className="tb rv" key={t[0]} onPointerMove={glow} style={{ "--bgc": `var(${t[1]})`, transitionDelay: `${(i % 2) * 100}ms` } as React.CSSProperties}>
                <h3>{t[0]}</h3>
                <div className="chips">{t[2].map((c, j) => <span key={c} style={{ transitionDelay: `${j * 40}ms` }}>{c}</span>)}</div>
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
              <p>I&apos;m looking for backend and full-stack roles, plus contract work on APIs, messaging and Android apps. References are available on request.</p>
              <div className="links">
                <a href={`mailto:${MAIL}`}>{MAIL}</a>
                <a href="https://wa.me/94740890730" target="_blank" rel="noopener noreferrer">WhatsApp +94 74 089 0730</a>
                <a href="https://github.com/kavizzz03" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/kavindu-bogahawatte-7b3810320" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <form className="fm" onSubmit={send}>
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

      <div className={`toast${toast ? " on" : ""}`} role="status">{toast}</div>

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
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}.rv,.wipe,.hl>*,.hr,.code pre span{opacity:1!important;transform:none!important;clip-path:none!important}.hs{height:auto!important}.pin{position:static;height:auto;padding:90px 0 30px}.track{flex-direction:column;width:auto;transform:none!important}.pc{width:100%}}
      `}</style>
    </>
  );
}