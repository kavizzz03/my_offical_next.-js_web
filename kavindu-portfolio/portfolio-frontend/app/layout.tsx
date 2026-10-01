import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 

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
  description: "Official Portfolio of Kavindu Bogahawatte. Backend Engineer & Mobile Specialist based in Colombo. Expert in Distributed Systems, Node.js, Kotlin, Microservices, and High-Throughput APIs.",
  
  keywords: [
    "Kavindu Bogahawatte", 
    "Kavindu Malshan", 
    "Kavindu Nethvitha",
    "Backend Systems Architect Sri Lanka",
    "Scalable API Developer Colombo",
    "Kotlin Android Specialist",
    "Node.js Microservices Architecture",
    "WhatsApp Business API Gateway Specialist",
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

  icons: {
    icon: [
      { url: "https://cdn-icons-png.flaticon.com/512/906/906343.png", sizes: "32x32", type: "image/png" },
      { url: "https://cdn-icons-png.flaticon.com/512/2165/2165061.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "https://cdn-icons-png.flaticon.com/512/906/906343.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-slate-900 selection:text-white font-sans">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}