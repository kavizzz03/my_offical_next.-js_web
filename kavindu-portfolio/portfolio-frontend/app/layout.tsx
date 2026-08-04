import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Headset, Terminal } from "lucide-react"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-tech",
  subsets: ["latin"],
});

// --- ELITE SEO & GLOBAL BRANDING ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.kavindubogahawatte.dev/"),
  
  title: {
    default: "Kavindu Bogahawatte | Backend Engineer & System Architect",
    template: "%s | Kavindu Bogahawatte"
  },
  description: "Official Portfolio of Kavindu Bogahawatte. Senior Backend Engineer & Mobile Specialist based in Colombo. Expert in Distributed Systems, Node.js, Kotlin, Microservices, and High-Throughput APIs.",
  
  keywords: [
    // Identity Search
    "Kavindu Bogahawatte", 
    "Kavindu Malshan", 
    "Kavindu Nethvitha",
    "Kavindu Bogahawatte Backend Engineer",
    
    // Core Technical Specializations (Backend & Architecture Focus)
    "Backend Systems Architect Sri Lanka",
    "Scalable API Developer Colombo",
    "Kotlin Android Specialist",
    "Node.js Microservices Architecture",
    "WhatsApp Business API Gateway Specialist",
    "Distributed Systems Engineer",
    "Database Optimization & Security",

    // Institutional & Trust SEO
    "Mahanama College Software Engineer",
    "SLIIT Computer Science Alumnus"
  ],

  alternates: {
    canonical: "/",
  },

  authors: [{ name: "Kavindu Bogahawatte", url: "https://linkedin.com/in/kavindu-bogahawatte-7b3810320" }],
  creator: "Kavindu Bogahawatte",
  publisher: "Kavindu Bogahawatte",
  
  verification: {
    google: "FzKegiPkrjdWbLh3CY29yRzZX6NbKco1vU7qXEpVDfs",
  },

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://www.kavindubogahawatte.dev/",
    title: "Kavindu Bogahawatte | Backend Architect & Mobile Specialist",
    description: "Architecting high-throughput backend systems, robust API integrations, and resilient mobile applications built for scale.",
    siteName: "Kavindu Bogahawatte Engine",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Kavindu Bogahawatte - Backend Systems & API Architecture"
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kavindu Bogahawatte | Backend Engineer & System Architect",
    description: "Specializing in server-side architecture, high-performance APIs, and robust mobile engines.",
    images: ["/og-image.png"],
  },

  // --- BRANDED BACKEND / SERVER ARCHITECTURE ICONS ---
  icons: {
    icon: [
      { url: "https://cdn-icons-png.flaticon.com/512/906/906343.png", sizes: "32x32", type: "image/png" }, // Server/Terminal icon
      { url: "https://cdn-icons-png.flaticon.com/512/2165/2165061.png", sizes: "16x16", type: "image/png" }, // API/Code icon
    ],
    apple: [
      { url: "https://cdn-icons-png.flaticon.com/512/906/906343.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1015",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich JSON-LD Entity Markup for Search Crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kavindu Bogahawatte",
    "alternateName": ["Kavindu Malshan", "Kavindu Nethvitha"],
    "url": "https://www.kavindubogahawatte.dev/",
    "jobTitle": "Backend Engineer & System Architect",
    "knowsAbout": [
      "Backend Architecture",
      "API Development",
      "Node.js",
      "Kotlin",
      "MySQL",
      "Distributed Systems",
      "System Automation"
    ],
    "sameAs": [
      "https://linkedin.com/in/kavindu-bogahawatte-7b3810320",
      "https://github.com/kavindubogahawatte"
    ],
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "SLIIT" },
      { "@type": "EducationalOrganization", "name": "Mahanama College" }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Colombo",
      "addressCountry": "LK"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0E1015] text-[#E7E9EE] selection:bg-[#FF8A3D]/20 selection:text-[#FF8A3D] font-sans">
        <main className="flex-grow">
          {children}
        </main>

        {/* --- LIVE API / MONITORED SUPPORT WIDGET --- */}
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
          {/* Response Chip / Live Status Seal */}
          <div className="bg-[#0E1015]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#33D17A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#33D17A]"></span>
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-wide text-slate-300 uppercase flex items-center gap-1.5">
              API <span className="text-[#33D17A]">200 OK</span> • Node Active
            </span>
          </div>

          {/* Interactive Action Hub */}
          <a 
            href="https://wa.me/94740890730" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct Engineer Connect"
            className="group relative flex items-center justify-center w-14 h-14 bg-[#FF8A3D] rounded-2xl text-[#0E1015] shadow-[0_0_20px_rgba(255,138,61,0.35)] hover:shadow-[0_0_30px_rgba(255,138,61,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          >
            <Headset size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Hover Tooltip Response Chip */}
            <span className="absolute right-16 bg-[#0E1015] text-[#E7E9EE] text-[11px] font-mono font-medium py-2 px-3.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10 shadow-xl pointer-events-none flex items-center gap-2">
              <Terminal size={12} className="text-[#FF8A3D]" />
              <span>POST /direct_connect</span>
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}