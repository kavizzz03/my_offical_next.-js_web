import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Headset } from "lucide-react"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-tech", // Renamed for SEO distinction
  subsets: ["latin"],
});

// --- ADVANCED SEO CONFIGURATION ---
export const metadata: Metadata = {
  // Title appears in browser tabs and Google Search Results
  title: {
    default: "Kavindu Bogahawatte | Software Engineer & Backend Architect",
    template: "%s | Kavindu Bogahawatte"
  },
  description: "Official Portfolio of Kavindu Bogahawatte. BSc (Hons) Software Engineering Undergrad at University of Bedfordshire & SLIIT. Expert in Node.js, Android Kotlin, and Fullstack Architecture.",
  
  // High-value keywords for search ranking
  keywords: [
    "Kavindu Bogahawatte", 
    "Software Engineer Sri Lanka", 
    "Backend Developer Colombo", 
    "Android Developer Sri Lanka", 
    "SLIIT Software Engineering", 
    "University of Bedfordshire Student Portfolio",
    "React Next.js Developer",
    "Kotlin Mobile Expert"
  ],

  // Verification for Search Engines
  alternates: {
    canonical: "https://kavindu-bogahawatte.vercel.app/",
  },

  // Author details for LinkedIn/Google snippets
  authors: [{ name: "Kavindu Bogahawatte", url: "https://linkedin.com/in/kavindu-bogahawatte" }],
  creator: "Kavindu Bogahawatte",

  // OpenGraph (How your link looks on WhatsApp/Facebook/LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://kavindu-bogahawatte.vercel.app/",
    title: "Kavindu Bogahawatte | Fullstack Architect",
    description: "Building scalable backend systems and high-performance mobile applications.",
    siteName: "Kavindu Bogahawatte Professional Portfolio",
    images: [{
      url: "/og-image.png", // Ensure you add a social preview image in your public folder
      width: 1200,
      height: 630,
      alt: "Kavindu Bogahawatte Portfolio"
    }],
  },

  // --- BRANDED ICON CONFIGURATION (Removes Next.js Icon) ---
  icons: {
    icon: [
      { url: "https://cdn-icons-png.flaticon.com/512/8759/8759045.png", sizes: "32x32", type: "image/png" },
      { url: "https://cdn-icons-png.flaticon.com/512/606/606200.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "https://cdn-icons-png.flaticon.com/512/8759/8759045.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["https://cdn-icons-png.flaticon.com/512/8759/8759045.png"],
  },

  // Mobile Browser Theme
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* 
        Note: The <head> is automatically handled by Next.js Metadata API 
        which replaces the default favicon.ico with the icons listed above.
      */}
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-black">
        
        {/* Main Content */}
        <div className="flex-grow">
          {children}
        </div>

        {/* --- GLOBAL ONLINE SUPPORT WIDGET --- */}
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-2xl animate-bounce mb-2">
            <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Support Online
            </p>
          </div>

          <a 
            href="https://wa.me/94740890730" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full text-black shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300"
          >
            <Headset size={28} />
            <span className="absolute right-20 bg-black text-white text-[10px] font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 uppercase tracking-widest">
              Live Chat
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}