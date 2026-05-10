import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Headset } from "lucide-react"; 

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
  // Sets the base URL for absolute links (like OG images)
  metadataBase: new URL('https://my-offical-next-js-web-jwe4.vercel.app/'),
  
  title: {
    default: "Kavindu Bogahawatte | Backend Engineer & System Architect",
    template: "%s | Kavindu Malshan Nethvitha"
  },
  description: "Official Portfolio of Kavindu Malshan Bogahawatte. Backend Engineer & Mobile Specialist based in Colombo. Expert in Node.js, Kotlin, and System Architecture. Alumnus of Mahanama College & SLIIT.",
  
  keywords: [
    // Identity Search (Broad & Specific)
    "Kavindu Bogahawatte", 
    "Kavindu Malshan", 
    "Kavindu Nethvitha",
    "Kavindu Bogahawatte Software Engineer",
    // Education & Institutional SEO (Local Trust)
    "Mahanama College Software Engineer",
    "SLIIT Software Engineering Student", 
    "SCU Australia Computer Science Sri Lanka",
    "University of Bedfordshire Computing",
    // Localized Professional Keywords
    "Best Backend Developer Sri Lanka", 
    "Software Engineering Services Colombo", 
    "Freelance Android Developer Sri Lanka",
    "Fullstack Engineer Colombo",
    // Niche Technical Keywords (Backend Focus)
    "Scalable API Architect Node.js",
    "Kotlin Mobile Expert Sri Lanka",
    "WhatsApp Business API Specialist",
    "Enterprise System Architect Sri Lanka"
  ],

  alternates: {
    canonical: "/",
  },

  authors: [{ name: "Kavindu Bogahawatte", url: "https://linkedin.com/in/kavindu-bogahawatte-7b3810320" }],
  creator: "Kavindu Bogahawatte",
   verification: {
    google: "-ans5D5iRGn-Be9GXXWuc68YTLlE41cmcuMyJhqvFjg",
  },

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://my-offical-next-js-web-jwe4.vercelapp/",
    title: "Kavindu Bogahawatte | Backend Architect & Mobile Specialist",
    description: "Developing robust backend systems and high-performance mobile applications with a focus on logic and stability.",
    siteName: "Kavindu Bogahawatte Professional Portfolio",
    // --- OG IMAGE CONFIGURATION ---
    images: [{
      url: "og-image.png", // Now standardized to use metadataBase
      width: 1200,
      height: 630,
      alt: "Kavindu Bogahawatte - Professional Software Engineering Portfolio Preview"
    }],
  },

  // --- RELEVANT BRANDED ICONS ---
  icons: {
    icon: [
      { url: "https://cdn-icons-png.flaticon.com/512/8759/8759045.png", sizes: "32x32", type: "image/png" },
      { url: "https://cdn-icons-png.flaticon.com/512/606/606200.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "https://cdn-icons-png.flaticon.com/512/8759/8759045.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export const viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD for Search Engines to understand your "Person" entity
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kavindu Bogahawatte",
    "alternateName": ["Kavindu Malshan", "Kavindu Nethvitha"],
    "url": "https://my-offical-next-js-web-jwe4.vercelapp/",
    "jobTitle": "Backend Engineer & System Architect",
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
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-black">
        <main className="flex-grow">
          {children}
        </main>

        {/* --- GLOBAL ONLINE SUPPORT WIDGET --- */}
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-2xl animate-pulse mb-2">
            <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Engineer Active
            </p>
          </div>

          <a 
            href="https://wa.me/94740890730" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full text-black shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <Headset size={28} />
            <span className="absolute right-20 bg-slate-900 text-white text-[10px] font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 uppercase tracking-tighter">
              Instant Connect
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}