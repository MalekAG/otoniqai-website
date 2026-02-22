import type { Metadata } from "next";
import { DM_Sans, Instrument_Sans } from "next/font/google";
import { BackToTop, ScrollProgress } from "@/components/ui";
import { SmoothScrollProvider } from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://otoniqai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Otoniq AI | Industrial Automation AI & Consulting | Jordan",
    template: "%s | Otoniq AI",
  },
  description:
    "Industrial automation AI consulting company based in Jordan. We combine Siemens PLC/SCADA expertise with AI to deliver intelligent automation for manufacturing, water treatment, and industrial operations. AI-powered PLC documentation, process optimization, and digital transformation for the Middle East and worldwide.",
  keywords: [
    // Industrial automation + AI (primary targets)
    "industrial automation AI",
    "industrial AI consulting",
    "Siemens AI",
    "Siemens PLC AI",
    "SCADA AI",
    "AI for manufacturing",
    "AI for industrial automation",
    "smart factory AI",
    "industrial digital transformation",
    "PLC documentation AI",
    "AI-powered SCADA",
    "industrial process optimization",
    // AI consulting general
    "AI consulting",
    "AI automation consulting",
    "automation consulting",
    "workflow automation",
    "AI integration services",
    "custom AI solutions",
    // Jordan & Middle East
    "AI consulting Jordan",
    "AI consulting Amman",
    "Jordan AI company",
    "industrial automation Jordan",
    "Siemens Jordan",
    "SCADA consulting Jordan",
    "Middle East AI consulting",
    "AI automation MENA",
    "Arabic AI consulting",
    "Arab AI company",
    // Arabic script keywords
    "استشارات الذكاء الاصطناعي الأردن",
    "أتمتة صناعية ذكاء اصطناعي",
    "سيمنز ذكاء اصطناعي",
    "أتمتة الأعمال الأردن",
    "حلول الذكاء الاصطناعي الصناعية",
    "سكادا ذكاء اصطناعي",
  ],
  authors: [{ name: "Otoniq AI", url: siteUrl }],
  creator: "Otoniq AI",
  publisher: "Otoniq AI",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      ar: siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title:
      "Otoniq AI | Industrial Automation AI & Consulting | Jordan",
    description:
      "Industrial automation meets AI. We combine Siemens PLC/SCADA engineering with artificial intelligence to transform manufacturing and industrial operations. Based in Jordan, serving the Middle East and worldwide.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Otoniq AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Otoniq AI - Industrial Automation AI Consulting",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Otoniq AI | Industrial Automation AI & Consulting | Jordan",
    description:
      "Industrial automation meets AI. Siemens PLC/SCADA expertise combined with artificial intelligence. Based in Jordan, serving the Middle East and worldwide.",
    images: ["/og-image.png"],
    creator: "@otoniqai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "technology",
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Otoniq AI",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "Industrial automation AI consulting company based in Amman, Jordan. We combine Siemens PLC/SCADA engineering expertise with artificial intelligence to deliver smart factory solutions, AI-powered PLC documentation, and industrial process optimization for the Middle East and worldwide.",
  email: "malek@otoniqai.com",
  foundingLocation: {
    "@type": "Place",
    name: "Amman, Jordan",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "JO",
    addressRegion: "Amman Governorate",
  },
  areaServed: [
    { "@type": "Country", name: "Jordan" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsAbout: [
    "Industrial Automation",
    "Siemens TIA Portal",
    "PLC Programming",
    "SCADA Systems",
    "Artificial Intelligence",
    "Machine Learning",
    "Water Treatment Automation",
    "Manufacturing Automation",
  ],
  sameAs: [
    // Add social media URLs when available
    // "https://linkedin.com/company/otoniqai",
    // "https://twitter.com/otoniqai",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "malek@otoniqai.com",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Otoniq AI",
  url: siteUrl,
  description:
    "Industrial automation AI consulting. Combining Siemens PLC/SCADA engineering with artificial intelligence for smart factory solutions, AI-powered documentation, and industrial process optimization.",
  publisher: {
    "@type": "Organization",
    name: "Otoniq AI",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.svg`,
    },
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Industrial Automation AI Consulting",
  provider: {
    "@type": "Organization",
    name: "Otoniq AI",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
  },
  description:
    "Industrial automation AI consulting services. We combine Siemens PLC/SCADA engineering with AI to deliver smart factory solutions, AI-powered PLC documentation, process optimization, and industrial digital transformation. Based in Jordan, serving the Middle East and worldwide.",
  areaServed: [
    { "@type": "Country", name: "Jordan" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Egypt" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Lebanon" },
    "Worldwide",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Industrial AI Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Industrial AI Consulting",
          description:
            "Strategic AI consulting for industrial automation, manufacturing, and process industries. Siemens TIA Portal, SCADA, and PLC expertise combined with AI.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Powered PLC Documentation",
          description:
            "Automatic PLC documentation using AI. Upload Rockwell L5X or Siemens files and get complete documentation with cross-references and plain-English descriptions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Smart Factory Solutions",
          description:
            "AI-driven SCADA dashboards, alarm management, predictive maintenance, and industrial process optimization for manufacturing and water treatment plants.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow & CRM Automation",
          description:
            "Business workflow automation, CRM integration, and AI-powered sales automation for industrial and B2B companies.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is industrial automation AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Industrial automation AI combines traditional PLC/SCADA systems with artificial intelligence to create smarter factories. This includes AI-powered alarm management, predictive maintenance, automatic documentation generation, and intelligent process optimization for manufacturing and industrial operations.",
      },
    },
    {
      "@type": "Question",
      name: "How can AI improve Siemens PLC and SCADA systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI enhances Siemens PLC and SCADA systems by adding intelligent alarm prioritization, automated documentation of PLC programs, predictive analytics for equipment health, and AI-driven process optimization. Otoniq AI specializes in integrating AI with Siemens TIA Portal projects.",
      },
    },
    {
      "@type": "Question",
      name: "Does Otoniq AI work with companies in Jordan and the Middle East?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Otoniq AI is based in Amman, Jordan and serves clients across the Middle East including Jordan, Saudi Arabia, UAE, Qatar, and Kuwait. We provide services in both English and Arabic and specialize in water treatment, manufacturing, and industrial automation projects in the region.",
      },
    },
    {
      "@type": "Question",
      name: "What is PLCDoc?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLCDoc is an AI-powered tool that automatically generates documentation from PLC program files. Upload your Rockwell L5X file and get complete documentation with cross-references, tag mappings, and plain-English descriptions of every routine — in minutes instead of weeks.",
      },
    },
  ],
};

// Prevents </script> tag injection when serializing JSON-LD blocks
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj).replace(/<\/script>/gi, "<\\/script>");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(serviceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(faqSchema),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${instrumentSans.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
