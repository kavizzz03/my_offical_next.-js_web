import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono-tech", subsets: ["latin"] });

/* ---------- one place to change your details ---------- */
const SITE_URL = "https://www.kavindubogahawatte.dev";
const NAME = "Kavindu Bogahawatte";
const ROLE = "Independent Software Engineer";
const DESCRIPTION =
  "Independent software engineer in Colombo, Sri Lanka. Reliable REST APIs, backend systems, full-stack web apps and native Android apps. Available for projects.";
const LINKEDIN = "https://linkedin.com/in/kavindu-bogahawatte-7b3810320";
const GITHUB = "https://github.com/kavizzz03";

/* ---------- SEO and social metadata ---------- */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${NAME} | ${ROLE} in Colombo`,
    template: `%s | ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: NAME,
  category: "technology",

  keywords: [
    NAME,
    "Kavindu Malshan",
    "Kavindu Nethvitha",
    "software engineer Colombo",
    "freelance software engineer Sri Lanka",
    "backend developer Sri Lanka",
    "REST API developer",
    "Node.js developer",
    "PHP developer",
    "Android developer Kotlin",
    "Jetpack Compose",
    "WhatsApp Business API integration",
    "SMS gateway integration",
    "full-stack developer Next.js",
  ],

  authors: [{ name: NAME, url: LINKEDIN }],
  creator: NAME,
  publisher: NAME,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },

  verification: { google: "FzKegiPkrjdWbLh3CY29yRzZX6NbKco1vU7qXEpVDfs" },

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} | ${ROLE}`,
    description: "I build reliable backends, REST APIs, full-stack web apps and native Android apps. Based in Colombo, available for projects.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${NAME}, ${ROLE}: backend, APIs and Android` }],
  },

  twitter: {
    card: "summary_large_image",
    title: `${NAME} | ${ROLE}`,
    description: "Reliable backends, REST APIs, full-stack web and native Android apps. Available for projects.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // lets the page use the full screen on phones with notches
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFD" },
    { media: "(prefers-color-scheme: dark)", color: "#080918" },
  ],
};

/* ---------- structured data (rich results) ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: NAME,
      alternateName: ["Kavindu Malshan", "Kavindu Nethvitha"],
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      jobTitle: ROLE,
      description: DESCRIPTION,
      address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
      sameAs: [LINKEDIN, GITHUB],
      knowsAbout: ["Backend development", "REST APIs", "Node.js", "PHP", "Kotlin", "Jetpack Compose", "MySQL", "Microsoft SQL Server", "WhatsApp Business API", "Android development", "Next.js"],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Bedfordshire" },
        { "@type": "CollegeOrUniversity", name: "SLIIT City University" },
        { "@type": "EducationalOrganization", name: "Mahanama College" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${NAME}, software development`,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: "Sri Lanka and remote clients",
      address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: ["Backend and REST API development", "Messaging platform integration (SMS, WhatsApp, email)", "Full-stack web development", "Native Android app development"].map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s },
        })),
      },
    },
  ],
};

// runs before first paint so the saved light/dark choice never flashes
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* if JavaScript is off, skip the loading screen and show the page */}
        <noscript><style>{".app.hide{visibility:visible!important}.loader{display:none!important}"}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      {/* no bg/text/font classes here on purpose: the page controls light and dark itself */}
      <body className="min-h-full flex flex-col selection:bg-indigo-600 selection:text-white">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
