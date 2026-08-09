"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Smartphone,
  Database, Mail, MapPin,
  Phone, Server,
  Box, Terminal, Zap, Workflow, ShieldCheck,
  ArrowUpRight, Clock, Menu, X, ArrowRight, Activity,
  ChevronLeft, ChevronRight, Maximize2, Star
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Design tokens & helper components (unchanged)                      */
/* ------------------------------------------------------------------ */

function ImageWithFallback({ src, alt, className, fallback = '/og-image.png', ...rest }: { src: string; alt: string; className?: string; fallback?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  useEffect(() => { setImgSrc(src || fallback); }, [src, fallback]);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => { if (imgSrc !== fallback) setImgSrc(fallback); }}
      {...rest}
    />
  );
}

interface Project {
  name: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  tags?: string[];
  link?: string;
  repo?: string;
  live?: string;
  category?: string;
  role?: string;
  year?: string;
  status?: string;
  client?: string;
  overview?: string;
  highlights?: string[];
  createdAt?: string;
}

type ProjectApi = {
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
  gallery?: string[];
  tags?: string[];
  githubUrl?: string;
  repo?: string;
  liveUrl?: string;
  live?: string;
  category?: string;
  link?: string;
  role?: string;
  year?: string;
  status?: string;
  client?: string;
  company?: string;
  overview?: string;
  highlights?: string[];
  createdAt?: string;
};

const TERMINAL_LINES = [
  'GET /engineers/kavindu HTTP/1.1',
  '200 OK',
  '',
  '{',
  '  "role": "Backend & Systems Engineer",',
  '  "focus": ["APIs", "Databases", "Mobile"],',
  '  "based_in": "Colombo, LK",',
  '  "status": "available_for_work"',
  '}',
];

const STACK_TICKER = [
  'NODE.JS', 'EXPRESS', 'SPRING BOOT', 'JAVA', 'PYTHON', 'PHP / LARAVEL', 'MONGODB',
  'MYSQL', 'REDIS', 'KOTLIN', 'JETPACK COMPOSE', 'NEXT.JS', 'FIREBASE', 'REST / gRPC',
];

const FLOATING_CHIPS = [
  { label: '200 OK', sub: 'response', pos: '-left-8 top-6 xl:-left-12', delay: 0, duration: 5.5 },
  { label: '< 40ms', sub: 'avg latency', pos: '-right-6 top-1/3 xl:-right-10', delay: 0.6, duration: 6.5 },
  { label: '99.98%', sub: 'uptime', pos: '-left-10 bottom-10 xl:-left-14', delay: 1.1, duration: 6 },
];

const NAV_LINKS = [
  { id: 'about', method: 'GET', label: '/about' },
  { id: 'stack', method: 'GET', label: '/stack' },
  { id: 'projects', method: 'GET', label: '/projects' },
  { id: 'contact', method: 'POST', label: '/contact' },
];

function formatUptime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function StatusDot({ ok = true }: { ok?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      <span className={`absolute inline-flex h-full w-full rounded-full ${ok ? 'bg-[#33D17A]' : 'bg-amber-400'} opacity-60 motion-safe:animate-ping`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${ok ? 'bg-[#33D17A]' : 'bg-amber-400'}`} />
    </span>
  );
}

/* Reveal – enhanced with spring */
function Reveal({ children, delay = 0, className = '', y = 22, duration = 0.6 }: { children: React.ReactNode; delay?: number; className?: string; y?: number; duration?: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* RotatingSeal – unchanged */
function RotatingSeal({ label = 'AVAILABLE FOR WORK' }: { label?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const full = `${label} • ${label} • `;
  return (
    <div className="relative w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] md:w-24 md:h-24 shrink-0" aria-hidden="true">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
      >
        <defs>
          <path id="sealPath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="7" letterSpacing="1.5" className="fill-slate-500 font-mono uppercase">
          <textPath href="#sealPath">{full}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-[#33D17A] shadow-[0_0_12px_2px_rgba(51,209,122,0.5)]" />
      </div>
    </div>
  );
}

function FloatingChip({ label, sub, pos, delay, duration }: { label: string; sub: string; pos: string; delay: number; duration: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={`hidden lg:flex absolute ${pos} z-20 items-center gap-2 rounded-xl border border-white/10 bg-[#0E1015]/90 backdrop-blur-md px-3 py-2 shadow-xl`}
      animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
    >
      <Activity size={13} className="text-[#33D17A] shrink-0" />
      <div className="leading-tight">
        <p className="font-mono text-[11px] font-semibold text-white">{label}</p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Modal & lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselAutoRef = useRef<NodeJS.Timeout | null>(null);

  // --- Effects (uptime, header, scroll, nav, etc.) ---
  useEffect(() => {
    const id = setInterval(() => setUptime((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const setVar = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => { ro.disconnect(); window.removeEventListener('resize', setVar); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNavOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  // --- Fetch projects ---
  useEffect(() => {
    const apiUrls = [
      'http://localhost:5000/api/projects',
      'https://my-offical-next-js-web-2.onrender.com/api/projects'
    ];

    async function load() {
      setLoading(true);
      for (const url of apiUrls) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`status:${res.status}`);
          const raw = await res.json();

          if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            console.info('[backend payload]', url, raw);
          }

          const mapped: Project[] = (Array.isArray(raw) ? raw : []).map((p: ProjectApi) => ({
            name: p.title || p.name || 'Untitled Project',
            description: p.description || 'System architecture and implementation details.',
            imageUrl: p.image || p.imageUrl || '/og-image.png',
            images: Array.isArray(p.images) ? p.images : Array.isArray(p.gallery) ? p.gallery : [],
            tags: Array.isArray(p.tags) ? p.tags : [],
            repo: p.githubUrl || p.repo || '',
            live: p.liveUrl || p.live || '',
            category: p.category || 'Engineering',
            link: p.githubUrl || p.liveUrl || p.link || '#',
            role: p.role || 'Full-stack delivery',
            year: p.year || new Date(p.createdAt || Date.now()).getFullYear().toString(),
            status: p.status || (p.liveUrl && p.liveUrl !== '#' ? 'Live' : 'Concept'),
            client: p.client || p.company || 'Private project',
            overview: p.overview || p.description || '',
            highlights: Array.isArray(p.highlights) ? p.highlights : [],
            createdAt: p.createdAt || new Date().toISOString(),
          }));

          mapped.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
          });

          setProjects(mapped);
          setLoading(false);
          return;
        } catch (err) {
          console.debug('fetch failed', url, err);
        }
      }
      setProjects([]);
      setLoading(false);
    }
    load();
  }, []);

  // --- Auto-play carousel ---
  useEffect(() => {
    const featured = projects.slice(0, 3);
    if (featured.length === 0) return;
    if (carouselAutoRef.current) clearInterval(carouselAutoRef.current);
    if (!prefersReducedMotion) {
      carouselAutoRef.current = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % featured.length);
      }, 6000);
    }
    return () => {
      if (carouselAutoRef.current) clearInterval(carouselAutoRef.current);
    };
  }, [projects, prefersReducedMotion]);

  // --- Modal auto-play ---
  useEffect(() => {
    if (!selectedProject) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    const images = activeProjectImages;
    if (images.length <= 1) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    if (isAutoPlaying && !lightboxOpen) {
      autoPlayRef.current = setInterval(() => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [selectedProject, isAutoPlaying, lightboxOpen]);

  const stopAutoPlay = useCallback(() => {
    if (isAutoPlaying) setIsAutoPlaying(false);
  }, [isAutoPlaying]);

  // --- Social links ---
  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/kavindu-bogahawatte-7b3810320', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg> },
    { label: 'GitHub', href: 'https://github.com/kavizzz03', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg> },
    { label: 'X', href: 'https://x.com/_kavizz_', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg> },
    { label: 'Instagram', href: 'https://www.instagram.com/kaviz.z_?igsh=MWI5OGpsOGF2a3RzcA==', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { label: 'Facebook', href: 'https://www.facebook.com/kavindu.malshan.739', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> }
  ];

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
    setIsAutoPlaying(true);
    setLightboxOpen(false);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
    setIsAutoPlaying(true);
    setLightboxOpen(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const activeProjectImages = selectedProject
    ? [selectedProject.imageUrl || '/og-image.png', ...(selectedProject.images || [])].filter((image, index, images) => Boolean(image) && images.indexOf(image) === index)
    : [];

  const activeImage = activeProjectImages[selectedImageIndex] || selectedProject?.imageUrl || '/og-image.png';

  const goToPrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeProjectImages.length === 0) return;
    stopAutoPlay();
    setSelectedImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
  }, [activeProjectImages.length, stopAutoPlay]);

  const goToNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeProjectImages.length === 0) return;
    stopAutoPlay();
    setSelectedImageIndex((prev) => (prev + 1) % activeProjectImages.length);
  }, [activeProjectImages.length, stopAutoPlay]);

  const openLightbox = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // --- Navigation ---
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const scrollToTarget = () => {
      const headerH = headerRef.current?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', `#${id}`);
      setNavOpen(false);
    };

    if (navOpen) {
      setNavOpen(false);
      setTimeout(scrollToTarget, 300);
    } else {
      scrollToTarget();
    }
  }, [navOpen, prefersReducedMotion]);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#top');
    setNavOpen(false);
  }, [prefersReducedMotion]);

  // --- Carousel navigation ---
  const goToCarouselSlide = (index: number) => {
    setCarouselIndex(index);
    // reset auto-play timer
    if (carouselAutoRef.current) clearInterval(carouselAutoRef.current);
    if (!prefersReducedMotion) {
      carouselAutoRef.current = setInterval(() => {
        const featured = projects.slice(0, 3);
        setCarouselIndex((prev) => (prev + 1) % featured.length);
      }, 6000);
    }
  };

  const prevCarousel = () => {
    const featured = projects.slice(0, 3);
    setCarouselIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const nextCarousel = () => {
    const featured = projects.slice(0, 3);
    setCarouselIndex((prev) => (prev + 1) % featured.length);
  };

  // ===== RENDER =====
  const featuredProjects = projects.slice(0, 3);
  const currentFeatured = featuredProjects[carouselIndex] || null;

  return (
    <div className="portfolio-root min-h-screen bg-[#08090C] text-slate-300 selection:bg-[#FF8A3D]/30 overflow-x-hidden">
      <a
        href="#top"
        onClick={scrollToTop}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#FF8A3D] focus:text-black focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Background gradients (subtle animated) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,#1a1206_0%,transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,#0d1230_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, #FF8A3D10 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, #7C9CFF10 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, #FF8A3D10 0%, transparent 50%)',
            ]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        />
      </div>

      {/* HEADER (unchanged) */}
      <div ref={headerRef} className="fixed top-0 inset-x-0 z-[60]">
        <div className="w-full bg-[#050609]/95 backdrop-blur border-b border-white/5">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-7 sm:h-8 flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-500">
            <div className="flex items-center gap-2 min-w-0">
              <StatusDot ok />
              <span className="text-[#33D17A]">operational</span>
              <span className="hidden sm:inline text-slate-600">— all endpoints responding</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
              <Clock size={11} />
              <span suppressHydrationWarning>uptime {formatUptime(uptime)}</span>
            </div>
          </div>
        </div>

        <nav className={`w-full px-3 md:px-6 pt-2 pb-2 transition-shadow ${scrolled ? 'shadow-lg shadow-black/40' : ''}`}>
          <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-[#0B0C10]/90 backdrop-blur-xl">
            <div className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6">
              <a href="#top" onClick={scrollToTop} className="flex items-center gap-2 md:gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8A3D]">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[#FF8A3D] rounded-lg flex items-center justify-center text-black font-black text-sm md:text-base font-display shrink-0">K</div>
                <span className="font-display font-bold tracking-tight text-sm md:text-base text-white whitespace-nowrap">Kavindu Bogahawatte</span>
              </a>

              <div className="hidden md:flex items-center gap-1 font-mono text-[11px] tracking-wide">
                {NAV_LINKS.map((l) => {
                  const isActive = activeSection === l.id;
                  return (
                    <a
                      key={l.id}
                      href={`#${l.id}`}
                      onClick={(e) => handleNavClick(e, l.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`px-3 py-2 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8A3D] ${isActive ? 'text-[#FF8A3D] bg-[#FF8A3D]/10' : 'text-slate-500 hover:text-white hover:bg-white/[0.04]'}`}
                    >
                      <span className={isActive ? 'text-[#FF8A3D]/70' : 'text-slate-600'}>{l.method}</span> {l.label}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="ml-2 px-4 py-2 rounded-lg bg-[#FF8A3D] text-black font-semibold hover:bg-[#ffa15e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A3D]"
                >
                  Hire me
                </a>
              </div>

              <button
                type="button"
                onClick={() => setNavOpen((v) => !v)}
                aria-expanded={navOpen}
                aria-controls="mobile-menu"
                className="md:hidden flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400 border border-white/10 rounded-lg px-3 py-2.5 active:scale-95 transition-transform"
                aria-label="Toggle navigation menu"
              >
                {navOpen ? <X size={14} /> : <Menu size={14} />} Menu
              </button>
            </div>

            <AnimatePresence>
              {navOpen && (
                <motion.div
                  id="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="md:hidden overflow-hidden border-t border-white/10"
                >
                  <div className="flex flex-col p-3 gap-1 font-mono text-xs">
                    {NAV_LINKS.map((l) => {
                      const isActive = activeSection === l.id;
                      return (
                        <a
                          key={l.id}
                          href={`#${l.id}`}
                          onClick={(e) => handleNavClick(e, l.id)}
                          aria-current={isActive ? 'true' : undefined}
                          className={`flex items-center gap-2 py-3 px-3 rounded-lg transition-colors ${isActive ? 'text-[#FF8A3D] bg-[#FF8A3D]/10' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'}`}
                        >
                          <span className="text-slate-600">{l.method}</span> {l.label}
                        </a>
                      );
                    })}
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, 'contact')}
                      className="mt-1 text-center py-3 px-3 rounded-lg bg-[#FF8A3D] text-black font-semibold"
                    >
                      Hire me
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      <main id="top" className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 pt-28 sm:pt-32 md:pt-36">
        {/* HERO (unchanged but with enhanced animation) */}
        <section className="grid lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 md:mb-28 lg:mb-40">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between gap-4 sm:gap-6 mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                <StatusDot />
                <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400">Backend &amp; Systems Engineer</span>
              </div>
              <RotatingSeal />
            </motion.div>

            <motion.h1
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[2rem] xs:text-[2.3rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.4rem] font-bold tracking-tight mb-5 sm:mb-6 md:mb-8 text-white"
            >
              I build the backbone
              <br />
              behind apps that
              <br />
              <span className="bg-gradient-to-r from-[#7C9CFF] via-[#A78BFA] to-[#C084FC] bg-clip-text text-transparent">never go down.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.16, duration: 0.6 }}
              className="text-sm sm:text-base md:text-base lg:text-lg text-slate-400 leading-relaxed max-w-xl mb-7 sm:mb-8 md:mb-10"
            >
              I design and ship the APIs, databases, and mobile backends that hold a product together engineered for stability under real load, not just a working demo.
            </motion.p>

            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.22 }} className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects')}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#FF8A3D] text-black font-semibold text-sm hover:bg-[#ffa15e] active:scale-[0.98] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A3D]"
              >
                View projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-white/10 bg-white/[0.02] font-semibold text-sm text-slate-300 hover:border-[#FF8A3D]/50 hover:text-white active:scale-[0.98] transition-all"
              >
                Let&apos;s talk
              </a>
            </motion.div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF8A3D]/50 hover:bg-[#FF8A3D]/5 text-slate-400 hover:text-[#FF8A3D] transition-all"
                  title={link.label}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative max-w-[300px] xs:max-w-sm sm:max-w-md mx-auto lg:max-w-none">
            {FLOATING_CHIPS.map((chip) => (
              <FloatingChip key={chip.label} {...chip} />
            ))}

            <div className="relative p-1.5 bg-[#101218] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback src="/my-photo.jpg" alt="Kavindu Bogahawatte" className="w-full aspect-[4/5] object-cover rounded-xl" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] text-slate-300 uppercase tracking-widest">
                <StatusDot /> live
              </div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? {} : { y: 16, opacity: 0 }}
              animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 rounded-2xl border border-white/10 bg-[#0E1015] overflow-hidden shadow-xl"
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="ml-2 font-mono text-[10px] text-slate-500">response.json</span>
              </div>
              <div className="p-4 font-mono text-[10.5px] sm:text-[11px] md:text-xs leading-relaxed overflow-x-auto">
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? {} : { opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className={`whitespace-pre ${line.trim().startsWith('"status"') ? 'text-[#33D17A]' : line === '200 OK' ? 'text-[#33D17A]' : 'text-slate-400'}`}
                  >
                    {line === '' ? '\u00A0' : line}
                    {i === TERMINAL_LINES.length - 1 && (
                      <span className="inline-block w-[6px] h-[12px] bg-[#FF8A3D] ml-1 align-middle motion-safe:animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* STACK TICKER (unchanged) */}
        <Reveal className="mb-16 sm:mb-20 md:mb-28 lg:mb-40 -mx-4 sm:-mx-5 md:-mx-6">
          <div className="overflow-hidden border-y border-white/5 bg-[#050609] py-3.5 sm:py-4">
            <motion.div
              className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-14 whitespace-nowrap font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-slate-600"
              animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
            >
              {[...STACK_TICKER, ...STACK_TICKER].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
                  {item}
                  <span className="text-[#FF8A3D]/50">◆</span>
                </span>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* ABOUT (unchanged) */}
        <section id="about" className="mb-16 sm:mb-20 md:mb-24 lg:mb-36 scroll-mt-24">
          <Reveal className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="font-mono text-[10px] text-slate-600">GET</span>
            <h2 className="font-mono text-[10px] text-[#FF8A3D] uppercase tracking-[0.3em]">/about</h2>
            <div className="h-px flex-1 bg-white/5" />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-10 lg:gap-16 bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] hidden md:block"><Workflow size={200} /></div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">Core philosophy</h3>
                <div className="space-y-4 sm:space-y-5 md:space-y-6 text-slate-400 leading-relaxed text-sm md:text-base">
                  <p>I focus on what happens beneath the surface: <span className="text-[#FF8A3D] font-semibold">logic, stability, and speed</span>. While others polish the interface, I&apos;m architecting the APIs and database structures that carry the load.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FF8A3D]/30 transition-colors">
                      <Zap className="text-[#FF8A3D] mb-2" size={20} />
                      <h4 className="text-white font-semibold text-xs uppercase tracking-wide">Adaptive logic</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Rapidly mastering complex protocols and high load architectures.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#33D17A]/30 transition-colors">
                      <ShieldCheck className="text-[#33D17A] mb-2" size={20} />
                      <h4 className="text-white font-semibold text-xs uppercase tracking-wide">System integrity</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Fail-safe backends and secure integrations, by default.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <blockquote className="font-display text-base sm:text-lg md:text-lg lg:text-2xl font-medium italic text-slate-300 border-l-2 border-[#FF8A3D] pl-4 sm:pl-5 md:pl-6 lg:pl-8">
                  I don&apos;t just write code, I engineer scalable foundations that hold up under the pressure of real world demand.
                </blockquote>
              </div>
            </div>
          </Reveal>
        </section>

        {/* STACK (unchanged) */}
        <section id="stack" className="mb-16 sm:mb-20 md:mb-24 lg:mb-36 scroll-mt-24">
          <Reveal className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="font-mono text-[10px] text-slate-600">GET</span>
            <h2 className="font-mono text-[10px] text-[#FF8A3D] uppercase tracking-[0.3em]">/stack</h2>
            <div className="h-px flex-1 bg-white/5" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[
              { icon: <Server className="text-[#FF8A3D] mb-4" size={22} />, title: 'Server-side logic', items: ['Node.js & Express', 'Java (Spring Boot)', 'Python (Automation)', 'PHP & Laravel'] },
              { icon: <Database className="text-[#FF8A3D] mb-4" size={22} />, title: 'Data & communications', items: ['MongoDB & MySQL', 'Redis (Caching)', 'WhatsApp Business API', 'Bulk SMS gateways'] },
              { icon: <Smartphone className="text-[#FF8A3D] mb-4" size={22} />, title: 'Mobile ecosystem', items: ['Kotlin & Compose', 'Next.js (App Router)', 'API design (REST/gRPC)', 'Firebase services'] },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }} className="p-5 sm:p-6 md:p-6 lg:p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#FF8A3D]/30 transition-all h-full">
                  {col.icon}
                  <h3 className="font-display text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">{col.title}</h3>
                  <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm text-slate-500 font-mono">
                    {col.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS with Carousel ===== */}
        <section id="projects" className="mb-16 sm:mb-20 md:mb-24 lg:mb-36 scroll-mt-24">
          <Reveal className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="font-mono text-[10px] text-slate-600">GET</span>
            <h2 className="font-mono text-[10px] text-[#FF8A3D] uppercase tracking-[0.3em]">/projects</h2>
            <div className="h-px flex-1 bg-white/5" />
            <Box className="text-slate-600" size={16} />
          </Reveal>

          <div>
            {loading ? (
              <div className="bg-[#101218] border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16">
                <div className="flex flex-col items-center justify-center gap-5 text-center">
                  <div className="flex items-center gap-3">
                    <Terminal className="text-[#FF8A3D] motion-safe:animate-pulse" size={22} />
                    <span className="font-mono text-sm text-slate-300">
                      GET <span className="text-[#FF8A3D]">/projects</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      awaiting response
                    </span>
                  </div>
                  <div className="w-full max-w-md h-1.5 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                    <motion.div
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-[#FF8A3D] via-[#C084FC] to-[#7C9CFF] rounded-full shadow-[0_0_12px_rgba(255,138,61,0.3)]"
                      animate={prefersReducedMotion ? {} : { x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.15em]">⏳ Wake-up sequence in progress</p>
                    <p className="font-mono text-[9px] text-slate-600 tracking-widest">Render backend is spinning up · this may take a few seconds</p>
                  </div>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <p className="text-slate-500 font-mono text-sm">// no deployments returned by the API</p>
            ) : (
              <>
                {/* --- FEATURED CAROUSEL --- */}
                {featuredProjects.length > 0 && (
                  <div className="mb-12 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="text-[#FF8A3D] w-4 h-4 fill-[#FF8A3D]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Featured Projects</span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1015] shadow-xl">
                      <AnimatePresence mode="wait">
                        {currentFeatured && (
                          <motion.div
                            key={currentFeatured.name}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="grid md:grid-cols-2 gap-0"
                          >
                            <div className="aspect-video md:aspect-auto bg-slate-900 relative">
                              <ImageWithFallback
                                src={currentFeatured.imageUrl || '/og-image.png'}
                                alt={currentFeatured.name}
                                className="object-cover w-full h-full"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-60 md:hidden" />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-center">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF8A3D]">{currentFeatured.category}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{currentFeatured.year}</span>
                              </div>
                              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">{currentFeatured.name}</h3>
                              <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">{currentFeatured.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {currentFeatured.tags?.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-[9px] font-mono text-[#FF8A3D] bg-[#FF8A3D]/10 px-2 py-0.5 rounded-md">{tag}</span>
                                ))}
                              </div>
                              <button
                                onClick={() => openProject(currentFeatured)}
                                className="self-start px-5 py-2 rounded-lg bg-[#FF8A3D] text-black font-semibold text-sm hover:bg-[#ffa15e] transition-all flex items-center gap-2"
                              >
                                View Project <ArrowRight size={14} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation arrows */}
                      {featuredProjects.length > 1 && (
                        <>
                          <button
                            onClick={prevCarousel}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-all z-10"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextCarousel}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-all z-10"
                          >
                            <ChevronRight size={20} />
                          </button>
                          {/* Dots */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {featuredProjects.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => goToCarouselSlide(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === carouselIndex ? 'bg-[#FF8A3D] w-4' : 'bg-white/30 hover:bg-white/50'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* --- PROJECT GRID (all projects or first 3) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  {(showAllProjects ? projects : projects.slice(0, 3)).map((proj, idx) => {
                    const isLive = (proj.status || '').toLowerCase() === 'live';
                    return (
                      <Reveal key={`${proj.name}-${idx}`} delay={(idx % 3) * 0.08}>
                        <motion.article
                          whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}
                          onClick={() => openProject(proj)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(proj); } }}
                          className="group relative bg-[#101218] border border-white/10 rounded-2xl overflow-hidden shadow-lg cursor-pointer h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8A3D]"
                        >
                          <div className="aspect-video bg-slate-900 relative overflow-hidden">
                            <ImageWithFallback src={proj.imageUrl || '/og-image.png'} alt={proj.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/10 to-transparent opacity-90" />
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[9px] text-white/90 bg-black/50 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full uppercase">
                              <StatusDot ok={isLive} /> {proj.status}
                            </div>
                          </div>
                          <div className="p-4 sm:p-5 md:p-5 lg:p-6">
                            <div className="flex justify-between items-start gap-3 mb-2">
                              <h4 className="font-display text-base md:text-lg font-bold text-white line-clamp-1">{proj.name}</h4>
                              <span className="text-[9px] font-mono text-slate-500 border border-white/10 px-2 py-0.5 rounded-full uppercase shrink-0">{proj.category}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-3">{proj.description}</p>
                            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-4">
                              <span>{proj.year}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-5">
                              {proj.tags?.map(tag => (
                                <span key={tag} className="text-[10px] font-mono text-[#FF8A3D] bg-[#FF8A3D]/10 px-2 py-1 rounded-md">{tag}</span>
                              ))}
                            </div>
                            <div className="flex items-center gap-3">
                              {proj.repo && <a href={proj.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="px-4 py-2 text-xs font-semibold bg-white/[0.04] border border-white/10 rounded-lg hover:bg-[#FF8A3D]/10 transition-colors">Repo</a>}
                              {proj.live && <a href={proj.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="px-4 py-2 text-xs font-semibold bg-[#FF8A3D] text-black rounded-lg hover:bg-[#ffa15e] transition-colors">Live</a>}
                              {!proj.repo && !proj.live && proj.link !== '#' && <a href={proj.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="px-4 py-2 text-xs font-semibold bg-white/[0.06] rounded-lg hover:bg-[#FF8A3D]/20 transition-colors">View details</a>}
                            </div>
                          </div>
                        </motion.article>
                      </Reveal>
                    );
                  })}
                </div>

                {/* Toggle button */}
                {projects.length > 3 && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setShowAllProjects(!showAllProjects)}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] font-mono text-sm text-slate-300 hover:border-[#FF8A3D]/50 hover:text-white hover:bg-[#FF8A3D]/5 transition-all active:scale-[0.97]"
                    >
                      {showAllProjects ? (
                        <>Show less <ArrowUpRight size={16} className="group-hover:rotate-180 transition-transform" /></>
                      ) : (
                        <>View all projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* PROJECT MODAL (unchanged – you already have it) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-8"
              onClick={closeProject}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.name}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                onClick={(event) => event.stopPropagation()}
                className="w-full sm:max-w-6xl h-[92vh] sm:h-auto sm:max-h-[92vh] overflow-y-auto bg-[#0E1015] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl"
              >
                <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-4 border-b border-white/10 bg-[#0E1015]/95 backdrop-blur-xl">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF8A3D] mb-1 truncate">/projects/{idSlug(selectedProject.name)}</p>
                    <h3 className="font-display text-lg md:text-2xl font-bold text-white truncate">{selectedProject.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeProject}
                    className="shrink-0 w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-[#FF8A3D] hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8A3D]"
                    aria-label="Close project details"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
                  <div className="p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 relative group">
                      <div className="relative aspect-[16/10] bg-slate-900">
                        <ImageWithFallback
                          src={activeImage}
                          alt={selectedProject.name}
                          className="w-full h-full object-cover cursor-zoom-in"
                          onClick={openLightbox}
                        />
                        <button
                          onClick={openLightbox}
                          className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-colors"
                          aria-label="View full size"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </div>
                      {activeProjectImages.length > 1 && (
                        <>
                          <button
                            onClick={goToPrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={goToNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight size={20} />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                            {selectedImageIndex + 1} / {activeProjectImages.length}
                          </div>
                        </>
                      )}
                    </div>

                    {activeProjectImages.length > 1 && (
                      <div className="mt-4 md:mt-5">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">Gallery</p>
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
                            {selectedImageIndex + 1} / {activeProjectImages.length}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                          {activeProjectImages.map((image, imageIndex) => (
                            <button
                              key={`${image}-${imageIndex}`}
                              type="button"
                              onClick={() => {
                                stopAutoPlay();
                                setSelectedImageIndex(imageIndex);
                              }}
                              className={`relative aspect-video overflow-hidden rounded-lg border transition-all ${
                                selectedImageIndex === imageIndex
                                  ? 'border-[#FF8A3D] ring-2 ring-[#FF8A3D]/30'
                                  : 'border-white/10 hover:border-[#FF8A3D]/40'
                              }`}
                            >
                              <ImageWithFallback
                                src={image}
                                alt={`${selectedProject.name} gallery ${imageIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-2">Overview</p>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed">{selectedProject.overview || selectedProject.description}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-2">Highlights</p>
                        <div className="space-y-2">
                          {(selectedProject.highlights && selectedProject.highlights.length > 0 ? selectedProject.highlights : [
                            'Production-ready implementation tailored to the project domain.',
                            'Performance-focused structure with maintainable architecture.',
                            'Responsive UI with a polished deployment presentation.'
                          ]).map((highlight) => (
                            <div key={highlight} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF8A3D] shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 bg-white/[0.02]">
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-2">Project summary</p>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed">{selectedProject.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/10 bg-[#101218] p-4">
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-1">Category</p>
                          <p className="text-white font-semibold text-sm">{selectedProject.category}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#101218] p-4">
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-1">Status</p>
                          <p className="text-white font-semibold text-sm flex items-center gap-1.5"><StatusDot ok={(selectedProject.status || '').toLowerCase() === 'live'} />{selectedProject.status}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#101218] p-4">
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-1">Role</p>
                          <p className="text-white font-semibold text-sm">{selectedProject.role}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#101218] p-4">
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-1">Year</p>
                          <p className="text-white font-semibold text-sm">{selectedProject.year}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-3">Tech stack</p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.tags || []).map((tag) => (
                            <span key={tag} className="text-[10px] font-mono text-[#FF8A3D] bg-[#FF8A3D]/10 border border-[#FF8A3D]/20 px-2.5 py-1.5 rounded-md uppercase tracking-wide">{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-3">Delivery links</p>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.repo && selectedProject.repo !== '#' && (
                            <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-semibold bg-white/[0.04] border border-white/10 rounded-lg hover:bg-[#FF8A3D]/10 transition-colors">Repo</a>
                          )}
                          {selectedProject.live && selectedProject.live !== '#' && (
                            <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-semibold bg-[#FF8A3D] text-black rounded-lg hover:bg-[#ffa15e] transition-colors">Live</a>
                          )}
                          {selectedProject.link && selectedProject.link !== '#' && selectedProject.link !== selectedProject.repo && selectedProject.link !== selectedProject.live && (
                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-semibold bg-white/[0.06] rounded-lg hover:bg-[#FF8A3D]/20 transition-colors flex items-center gap-1">Open <ArrowUpRight size={12} /></a>
                          )}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-2">Client / context</p>
                        <p className="text-sm text-slate-300">{selectedProject.client}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIGHTBOX (unchanged) */}
        <AnimatePresence>
          {lightboxOpen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-6xl w-full max-h-[90vh] bg-[#0E1015] rounded-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 md:p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 truncate">{selectedProject.name}</span>
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-full bg-white/10 hover:bg-[#FF8A3D] text-white hover:text-black transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="relative flex items-center justify-center p-4 md:p-6 pt-16 md:pt-20">
                  <ImageWithFallback
                    src={activeImage}
                    alt={selectedProject.name}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                </div>
                {activeProjectImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-all"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-[#FF8A3D] transition-all"
                      aria-label="Next"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
                      {selectedImageIndex + 1} / {activeProjectImages.length}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EDUCATION + CONTACT (unchanged) */}
        <section className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 mb-16 sm:mb-20 md:mb-24 lg:mb-36">
          <div>
            <Reveal className="flex items-center gap-3 mb-6 md:mb-8 lg:mb-10">
              <span className="font-mono text-[10px] text-slate-600">GET</span>
              <h2 className="font-mono text-[10px] text-[#FF8A3D] uppercase tracking-[0.3em]">/education</h2>
              <GraduationCap className="text-slate-600" size={16} />
            </Reveal>
            <div className="space-y-8 sm:space-y-9 md:space-y-10 border-l border-white/5 ml-3 sm:ml-4 pl-5 sm:pl-6 md:pl-8 relative">
              {[
                { period: '2026 — PRESENT', school: 'University of Bedfordshire', detail: 'BSc (Hons) Software Engineering', dot: 'bg-[#FF8A3D]' },
                { period: '2023 — 2026', school: 'SLIIT City Uni', detail: 'Computer Science / Software Engineering', dot: 'bg-slate-700' },
                { period: '2014 — 2023', school: 'Mahanama College Colombo', detail: 'Secondary Education', dot: 'bg-slate-800' },
                { period: '2009 — 2014', school: 'Roman Catholic Junior School Hanwella', detail: 'Primary Education', dot: 'bg-slate-800' },
              ].map((edu, i) => (
                <Reveal key={edu.school} delay={i * 0.06} y={14}>
                  <div className="relative">
                    <div className={`absolute -left-[29px] sm:-left-[33px] md:-left-[41px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full ${edu.dot} border-4 border-[#08090C]`} />
                    <span className="font-mono text-[10px] text-[#FF8A3D] font-semibold tracking-widest">{edu.period}</span>
                    <h3 className="font-display text-base md:text-lg font-bold text-white mt-1">{edu.school}</h3>
                    <p className="text-slate-500 text-xs uppercase tracking-wide">{edu.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div id="contact" className="bg-white/[0.02] p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 relative overflow-hidden h-fit lg:mt-16 scroll-mt-24">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FF8A3D]/10 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="font-mono text-[10px] text-slate-600">POST</span>
                  <h2 className="font-mono text-[10px] text-[#FF8A3D] uppercase tracking-[0.3em]">/contact</h2>
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8">Let&apos;s build something reliable.</h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <a href="tel:+94740890730" className="flex items-center gap-4 group rounded-2xl p-3 md:p-4 bg-white/[0.02] border border-white/5 hover:border-[#FF8A3D]/30 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-[#FF8A3D] transition-colors shrink-0">
                      <Phone className="text-white group-hover:text-black" size={17} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mobile</p>
                      <p className="text-base md:text-lg font-semibold text-white break-words">+94 74 089 0730</p>
                    </div>
                  </a>
                  <a href="mailto:kavindumalshan2003@gmail.com" className="flex items-center gap-4 group rounded-2xl p-3 md:p-4 bg-white/[0.02] border border-white/5 hover:border-[#FF8A3D]/30 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-[#FF8A3D] transition-colors shrink-0">
                      <Mail className="text-white group-hover:text-black" size={17} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Direct mail</p>
                      <p className="text-sm md:text-lg font-semibold text-white truncate">kavindumalshan2003@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              <Terminal className="absolute -bottom-10 -right-10 w-32 h-32 text-white/[0.03] -rotate-12" />
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER (unchanged, from previous update) */}
      <footer className="border-t border-white/5 bg-[#050609] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FF8A3D] rounded-lg flex items-center justify-center text-black font-black text-sm font-display">K</div>
                <span className="font-display font-bold tracking-tight text-white">Kavindu Bogahawatte</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Backend &amp; Systems Engineer · Building scalable APIs and robust mobile backends.
              </p>
              <div className="flex gap-3 mt-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-slate-400 hover:text-[#FF8A3D] hover:border-[#FF8A3D]/50 transition-all"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF8A3D] mb-3">Navigation</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-sm text-slate-400 hover:text-white transition-colors font-mono"
                    >
                      <span className="text-slate-600">{link.method}</span> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF8A3D] mb-3">Core Stack</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Node.js / Express</li>
                <li>Java / Spring Boot</li>
                <li>PHP / Laravel</li>
                <li>Kotlin / Compose</li>
                <li>Next.js / React</li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF8A3D] mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-[#FF8A3D]" />
                  <a href="mailto:kavindumalshan2003@gmail.com" className="hover:text-white transition-colors">kavindumalshan2003@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#FF8A3D]" />
                  <a href="tel:+94740890730" className="hover:text-white transition-colors">+94 74 089 0730</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#FF8A3D]" />
                  <span>Colombo, Sri Lanka</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500">
            <p>© {new Date().getFullYear()} Kavindu Bogahawatte - Backend &amp; Mobile Specialist</p>
           
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .portfolio-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .portfolio-root .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .portfolio-root .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        html { scroll-behavior: smooth; }

        section[id], div#contact { scroll-margin-top: var(--header-h, 96px); }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .motion-safe\\:animate-ping, .motion-safe\\:animate-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function idSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}