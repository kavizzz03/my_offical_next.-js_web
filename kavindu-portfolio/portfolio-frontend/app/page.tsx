"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, GraduationCap, Smartphone, 
  Database, Mail, MapPin, 
  Phone, Server, 
  Box, Terminal, Zap, Workflow, ShieldCheck
} from 'lucide-react';

interface Project {
  name: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  link?: string;
  repo?: string;
  live?: string;
  category?: string;
}

export default function Portfolio() {
  function ImageWithFallback({ src, alt, className, fallback = '/og-image.png', ...rest }: { src: string; alt: string; className?: string; fallback?: string }) {
    const [imgSrc, setImgSrc] = useState(src || fallback);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={() => { if (imgSrc !== fallback) setImgSrc(fallback); }}
        {...rest}
      />
    );
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

          // UPDATED LOGIC: Map all projects without strict backend-only exclusion
          // This ensures "Brainana", "ASB Digital Hub", and others show up.
          const mapped: Project[] = (Array.isArray(raw) ? raw : []).map((p: any) => ({
            name: p.title || p.name || 'Untitled Project',
            description: p.description || 'System architecture and implementation details.',
            imageUrl: p.image || p.imageUrl || '/og-image.png',
            tags: Array.isArray(p.tags) ? p.tags : [],
            repo: p.githubUrl || p.repo || '',
            live: p.liveUrl || p.live || '',
            category: p.category || 'Engineering',
            link: p.githubUrl || p.liveUrl || p.link || '#',
          }));

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

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/kavindu-bogahawatte-7b3810320', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
    { label: 'GitHub', href: 'https://github.com/kavizzz03', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
    { label: 'X', href: 'https://x.com/_kavizz_', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> },
    { label: 'Instagram', href: 'https://www.instagram.com/kaviz.z_?igsh=MWI5OGpsOGF2a3RzcA==', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { label: 'Facebook', href: 'https://www.facebook.com/kavindu.malshan.739', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#083344_0%,transparent_50%)] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-black italic shadow-[0_0_20px_rgba(6,182,212,0.4)] text-sm md:text-base">K</div>
            <span className="font-bold tracking-tighter text-sm md:text-lg uppercase italic text-white whitespace-nowrap">K.BOGAHAWATTE</span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            <a href="#about" className="hover:text-cyan-400 transition-colors">Philosophy</a>
            <a href="#stack" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Deployments</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-44">
        <section className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-48">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 mb-6 text-cyan-500">
              <Activity size={16} className="animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">Back-End & System Architect</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-black leading-[1.1] md:leading-[0.85] tracking-tighter italic mb-8 uppercase text-white"
            >
              Kavindu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Bogahawatte.</span>
            </motion.h1>

            <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mb-10">
              Engineering high-concurrency <span className="text-white font-medium italic">Backend Systems</span> and robust <span className="text-white font-medium italic">Mobile Ecosystems</span>. I solve complex logic problems with architectural precision.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              {socialLinks.map((link, i) => (
                <motion.a 
                  whileHover={{ y: -4, scale: 1.05 }} 
                  key={i} 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400 transition-all shadow-xl"
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative group max-w-xs sm:max-w-md mx-auto lg:max-w-none">
            <div className="relative z-10 p-2 bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_cyan] animate-scan z-20" />
              <ImageWithFallback src="/my-photo.jpg" alt="Kavindu Bogahawatte" className="w-full aspect-[4/5] object-cover rounded-[1.8rem] grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -inset-4 bg-cyan-500/10 blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-all" />
          </div>
        </section>

        <section id="about" className="mb-24 md:mb-48">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block"><Workflow size={200} /></div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase text-white mb-6 tracking-tighter">Core_Philosophy</h2>
              <div className="space-y-6 text-slate-400 leading-relaxed text-sm md:text-base">
                <p>I focus on what happens beneath the surface: <span className="text-cyan-400 font-bold">Logic, Stability, and Speed</span>. While others polish the UI, I am architecting the APIs and database structures that power the experience.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Zap className="text-yellow-500 mb-2" size={20} />
                    <h4 className="text-white font-bold text-xs uppercase">Adaptive Logic</h4>
                    <p className="text-[10px]">Rapidly mastering complex protocols and high-load architectures.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <ShieldCheck className="text-cyan-500 mb-2" size={20} />
                    <h4 className="text-white font-bold text-xs uppercase">System Integrity</h4>
                    <p className="text-[10px]">Committed to building fail-safe backends and secure integrations.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <blockquote className="text-lg md:text-2xl font-light italic text-slate-300 border-l-4 border-cyan-500 pl-6 md:pl-8">
                "I don't just write code; I engineer scalable foundations that thrive under the pressure of real-world demand."
              </blockquote>
            </div>
          </div>
        </section>

        <section id="stack" className="mb-24 md:mb-48">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-8 md:w-12 bg-cyan-500" />
            <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] md:tracking-[0.5em]">Engineering_Stack.v3</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all">
              <Server className="text-cyan-500 mb-4" />
              <h3 className="text-white font-bold italic uppercase mb-4 text-sm md:text-base">Server-Side Logic</h3>
              <ul className="space-y-2 text-[12px] md:text-sm text-slate-500 font-mono">
                <li>Node.js & Express</li>
                <li>Java (Spring Boot)</li>
                <li>Python (Automation)</li>
                <li>PHP & Laravel</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all">
              <Database className="text-cyan-500 mb-4" />
              <h3 className="text-white font-bold italic uppercase mb-4 text-sm md:text-base">Data & Communications</h3>
              <ul className="space-y-2 text-[12px] md:text-sm text-slate-500 font-mono">
                <li>MongoDB & MySQL</li>
                <li>Redis (Caching)</li>
                <li>WhatsApp Business API</li>
                <li>Bulk SMS Gateways</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all">
              <Smartphone className="text-cyan-500 mb-4" />
              <h3 className="text-white font-bold italic uppercase mb-4 text-sm md:text-base">Mobile Ecosystem</h3>
              <ul className="space-y-2 text-[12px] md:text-sm text-slate-500 font-mono">
                <li>Kotlin & Compose</li>
                <li>Next.js (App Router)</li>
                <li>API Design (REST/gRPC)</li>
                <li>Firebase Services</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className="mb-24 md:mb-48">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl md:text-3xl font-black italic uppercase text-white tracking-tighter">Live_Deployments</h2>
            <div className="h-px flex-1 mx-4 md:mx-8 bg-white/10" />
            <Box className="text-cyan-500" />
          </div>
          
          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[1,2,3].map(n => <div key={n} className="h-64 bg-white/5 rounded-3xl animate-pulse" />)}
              </div>
            ) : projects.length === 0 ? (
              <p className="text-slate-400">No projects found in the repository.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {projects.map((proj, idx) => (
                  <motion.article
                    whileHover={{ y: -8 }}
                    key={`${proj.name}-${idx}`}
                    className="group relative bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-lg"
                  >
                    <div className="aspect-video bg-slate-800 relative overflow-hidden">
                      <ImageWithFallback src={proj.imageUrl || '/og-image.png'} alt={proj.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-85" />
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-lg md:text-xl font-black text-white uppercase italic line-clamp-1">{proj.name}</h4>
                         <span className="text-[9px] font-mono text-slate-500 border border-white/10 px-2 py-0.5 rounded-full uppercase">{proj.category}</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {proj.tags?.map(tag => (
                          <span key={tag} className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {proj.repo && <a href={proj.repo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-bold bg-white/5 border border-white/10 rounded-md hover:bg-cyan-500/10 transition-colors">Repo</a>}
                        {proj.live && <a href={proj.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-bold bg-cyan-500 text-black rounded-md hover:bg-cyan-400 transition-colors">Live</a>}
                        {!proj.repo && !proj.live && proj.link !== '#' && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-bold bg-white/10 rounded-md hover:bg-cyan-500/20 transition-colors">View Details</a>}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-16 md:gap-20 mb-24 md:mb-48">
          <div>
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <GraduationCap className="text-cyan-500" />
              <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">Academic_Path</h2>
            </div>
            <div className="space-y-12 border-l border-white/5 ml-4 pl-8 relative">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[#020617] shadow-[0_0_15px_cyan]" />
                <span className="text-[10px] font-mono text-cyan-500 font-bold tracking-widest">[2026 - PRESENT]</span>
                <h3 className="text-lg md:text-xl font-black italic text-white uppercase mt-1">University of Bedfordshire</h3>
                <p className="text-slate-400 text-xs md:text-sm uppercase">BSc (Hons) Software Engineering</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-700 border-4 border-[#020617]" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">[2023 - 2026]</span>
                <h3 className="text-lg md:text-xl font-black italic text-white uppercase mt-1">SLIIT City Uni</h3>
                <p className="text-slate-400 text-xs md:text-sm uppercase">Computer Science / Software Engineering</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-800 border-4 border-[#020617]" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">[2014 - 2023]</span>
                <h3 className="text-lg md:text-xl font-black italic text-white uppercase mt-1">Mahanama College Colombo</h3>
                <p className="text-slate-400 text-xs md:text-sm uppercase">Secondary Education</p>
              </div>
          <div className="relative opacity-70">
  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-4 border-[#020617]" />
  <span className="text-[10px] font-mono text-slate-600 font-bold tracking-widest">[2009 - 2014]</span>
  <h3 className="text-lg md:text-xl font-black italic text-white uppercase mt-1">Roman Catholic Junior School Hanwella</h3>
  <p className="text-slate-400 text-xs md:text-sm uppercase">Primary Education</p>
</div>
            </div>
          </div>

          <div id="contact" className="bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 relative overflow-hidden h-fit lg:mt-24">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase text-white mb-8">System_Contact</h2>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <a href="tel:+94740890730" className="flex items-center gap-4 md:gap-6 group rounded-2xl p-3 md:p-4 bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors shrink-0">
                    <Phone className="text-white" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mobile</p>
                    <p className="text-base md:text-xl font-bold text-white break-words">+94 74 089 0730</p>
                  </div>
                </a>
                <a href="mailto:kavindumalshan2003@gmail.com" className="flex items-center gap-4 md:gap-6 group rounded-2xl p-3 md:p-4 bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors shrink-0">
                    <Mail className="text-white" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Direct Mail</p>
                    <p className="text-sm md:text-xl font-bold text-white truncate">kavindumalshan2003@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
            <Terminal className="absolute -bottom-10 -right-10 w-28 md:w-48 h-28 md:h-48 text-white/5 -rotate-12" />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#010409]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-center md:text-left">© 2026 Kavindu Bogahawatte | Backend & Mobile Specialist</p>
          <div className="flex gap-4 italic font-bold text-[10px] md:text-xs uppercase tracking-widest">
            <MapPin size={14} className="text-cyan-500" /> Colombo, Sri Lanka
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 3s linear infinite; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}