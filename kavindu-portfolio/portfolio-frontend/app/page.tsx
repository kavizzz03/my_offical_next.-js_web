"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, GraduationCap, Cpu, Smartphone, 
  Database, Layers, Mail, MapPin, Code, 
  ExternalLink, Phone, Server, Globe, Box,
  Terminal, Zap, Workflow, ShieldCheck
} from 'lucide-react';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/kavindu-bogahawatte', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
    { label: 'GitHub', href: 'https://github.com/asbfash2_kavizz', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans">
      
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#083344_0%,transparent_50%)] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-black italic shadow-[0_0_20px_rgba(6,182,212,0.4)]">K</div>
            <span className="font-bold tracking-tighter text-lg uppercase italic text-white text-nowrap">K.BOGAHAWATTE</span>
          </motion.div>
          <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            <a href="#about" className="hover:text-cyan-400 transition-colors">Philosophy</a>
            <a href="#stack" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Deployments</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-44">
        
        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-16 items-center mb-48">
          <div className="lg:col-span-7">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 mb-6 text-cyan-500">
              <Activity size={16} className="animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.5em]">Back-End & System Architect</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-6xl md:text-[90px] font-black leading-[0.85] tracking-tighter italic mb-8 uppercase text-white"
            >
              Kavindu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Bogahawatte.</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mb-10"
            >
              Engineering high-concurrency <span className="text-white font-medium italic">Backend Systems</span> and robust <span className="text-white font-medium italic">Mobile Ecosystems</span>. I solve complex logic problems with speed and precision.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, i) => (
                <motion.a 
                  whileHover={{ y: -4, scale: 1.05 }} key={i} href={link.href}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400 transition-all shadow-xl"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="relative z-10 p-2 bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_cyan] animate-scan z-20" />
               <img src="/my-photo.jpg" alt="Kavindu Bogahawatte" className="w-full aspect-[4/5] object-cover rounded-[1.8rem] grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -inset-4 bg-cyan-500/10 blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-all" />
          </div>
        </section>

        {/* ABOUT / PHILOSOPHY SECTION */}
        <section id="about" className="mb-48">
          <div className="grid lg:grid-cols-2 gap-16 bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Workflow size={200} />
            </div>
            <div>
                <h2 className="text-3xl font-black italic uppercase text-white mb-6 tracking-tighter">Core_Philosophy</h2>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                        I am a <span className="text-cyan-400 font-bold">Fast Learner</span> and a dedicated problem solver. While many focus on what the user sees, I focus on the <span className="text-white italic">logic, stability, and speed</span> that happens beneath the surface.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <Zap className="text-yellow-500 mb-2" size={20} />
                            <h4 className="text-white font-bold text-xs uppercase">Adaptive Speed</h4>
                            <p className="text-[10px]">Rapidly mastering new frameworks and API protocols.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <ShieldCheck className="text-cyan-500 mb-2" size={20} />
                            <h4 className="text-white font-bold text-xs uppercase">Helpful Partner</h4>
                            <p className="text-[10px]">Committed to technical excellence and team success.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <blockquote className="text-2xl font-light italic text-slate-300 border-l-4 border-cyan-500 pl-8">
                    "I don't just build features; I architect scalable solutions that stand the test of high-traffic demand."
                </blockquote>
            </div>
          </div>
        </section>

        {/* DETAILED TECH STACK */}
        <section id="stack" className="mb-48">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-cyan-500" />
            <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.5em]">System_Architecture.v2</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all">
                <Server className="text-cyan-500 mb-4" />
                <h3 className="text-white font-bold italic uppercase mb-4">Backend Ecosystem</h3>
                <ul className="space-y-2 text-sm text-slate-500 font-mono">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Node.js & Express</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Java (Enterprise Logic)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Python (Automation)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> PHP (Legacy Support)</li>
                </ul>
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all">
                <Database className="text-cyan-500 mb-4" />
                <h3 className="text-white font-bold italic uppercase mb-4">Data & Messaging</h3>
                <ul className="space-y-2 text-sm text-slate-500 font-mono">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> MongoDB (NoSQL)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> MySQL (Relational)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> WhatsApp Business API</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> SMS Gateway Integration</li>
                </ul>
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all">
                <Smartphone className="text-cyan-500 mb-4" />
                <h3 className="text-white font-bold italic uppercase mb-4">Mobile & Modern Web</h3>
                <ul className="space-y-2 text-sm text-slate-500 font-mono">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Kotlin & Jetpack Compose</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Next.js 14+ (App Router)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Tailwind CSS & Framer</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500" /> Android Studio Pro</li>
                </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-48">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Production_Deployments</h2>
            <div className="h-px flex-1 mx-8 bg-white/10" />
            <Box className="text-cyan-500" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1,2,3].map(n => <div key={n} className="h-64 bg-white/5 rounded-3xl animate-pulse" />)
            ) : (
              projects.map((proj, idx) => (
                <motion.div 
                  whileHover={{ y: -10 }} key={idx}
                  className="group relative bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden"
                >
                  <div className="aspect-video bg-slate-800 relative overflow-hidden">
                    <img src={proj.imageUrl || "/api/placeholder/400/250"} alt={proj.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-80" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2 uppercase italic">{proj.name}</h4>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{proj.description}</p>
                    <div className="flex gap-2 mb-6">
                      {proj.tags?.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                    <a href={proj.link} className="flex items-center gap-2 text-xs font-bold text-white uppercase hover:text-cyan-400 transition-colors">
                      Source Code <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* EDUCATION TIMELINE */}
        <section className="grid lg:grid-cols-2 gap-20 mb-48">
          <div>
            <div className="flex items-center gap-4 mb-16">
              <GraduationCap className="text-cyan-500" />
              <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.5em]">Academic_Path</h2>
            </div>
            <div className="space-y-12 border-l border-white/5 ml-4 pl-8 relative">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[#020617] shadow-[0_0_15px_cyan]" />
                <span className="text-[10px] font-mono text-cyan-500 font-bold tracking-widest">[2026 - PRESENT]</span>
                <h3 className="text-xl font-black italic text-white uppercase mt-1">University of Bedfordshire</h3>
                <p className="text-slate-400 text-sm uppercase">BSc (Hons) Software Engineering</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-700 border-4 border-[#020617]" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">[2023 - 2026]</span>
                <h3 className="text-xl font-black italic text-white uppercase mt-1">SLIIT City Uni</h3>
                <p className="text-slate-400 text-sm uppercase">Computer Science / Software Engineering</p>
              </div>
              <div className="relative opacity-80">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-800 border-4 border-[#020617]" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">[2014 - 2023]</span>
                <h3 className="text-xl font-black italic text-white uppercase mt-1">Mahanama College Colombo</h3>
                <p className="text-slate-400 text-sm uppercase">Secondary Education</p>
              </div>
              <div className="relative opacity-60">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-4 border-[#020617]" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">[2009 - 2014]</span>
                <h3 className="text-xl font-black italic text-white uppercase mt-1 text-nowrap">Roman Catholic Junior School</h3>
                <p className="text-slate-400 text-sm uppercase">Primary Education - Hanwella</p>
              </div>
            </div>
          </div>

          {/* CONTACT BOX */}
          <div id="contact" className="bg-gradient-to-br from-white/[0.03] to-transparent p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black italic uppercase text-white mb-8">Direct_Contact</h2>
              <div className="space-y-8">
                <a href="tel:+94740890730" className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mobile</p>
                    <p className="text-xl font-bold text-white">+94 74 089 0730</p>
                  </div>
                </a>
                <a href="mailto:kavindumalshan2003@gmail.com" className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Email</p>
                    <p className="text-xl font-bold text-white">kavindumalshan2003@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
            <Terminal className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 -rotate-12" />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#010409]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em]">© 2026 Kavindu Bogahawatte</p>
          <div className="flex gap-4 mt-4 md:mt-0 italic font-bold text-xs uppercase tracking-widest">
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