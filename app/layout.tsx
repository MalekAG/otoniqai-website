import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { PageLoader, CursorGlow, NoiseTexture, BackToTop } from "@/components/ui";
import { SmoothScrollProvider } from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://otoniqai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Otoniq AI | AI Automation & Workflow Solutions for Business",
    template: "%s | Otoniq AI",
  },
  description:
    "Transform your business with intelligent AI automation systems. Otoniq AI, based in Jordan, delivers custom workflow automation, AI-powered tools, process consulting, and seamless integrations for businesses in the Middle East and worldwide. Arabic AI automation experts helping you automate, elevate, and dominate.",
  keywords: [
    // Global keywords
    "AI automation",
    "workflow automation",
    "business automation",
    "AI tools",
    "process automation",
    "integration services",
    "AI consulting",
    "business process optimization",
    "custom AI solutions",
    "automation consulting",
    "digital transformation",
    "intelligent automation",
    "RPA solutions",
    "AI integration",
    // Arabic & Jordan specific keywords
    "Arabic AI automation",
    "Jordan AI automation",
    "AI automation Jordan",
    "Middle East AI solutions",
    "Amman AI services",
    "AI automation MENA",
    "Arabic business automation",
    "Jordan workflow automation",
    "AI consulting Jordan",
    "automation services Amman",
    // Arabic script keywords
    "أتمتة الذكاء الاصطناعي",
    "أتمتة الأعمال الأردن",
    "حلول الذكاء الاصطناعي",
    "أتمتة سير العمل",
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
      "en": siteUrl,
      "ar": siteUrl, // Same URL for now - update if you add Arabic version
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: "Otoniq AI | AI Automation & Workflow Solutions | Jordan",
    description:
      "Transform your business with intelligent AI automation systems. Based in Jordan, serving the Middle East and worldwide. Custom workflow automation, AI-powered tools, and seamless integrations.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Otoniq AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Otoniq AI - Automate. Elevate. Dominate.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otoniq AI | AI Automation & Workflow Solutions | Jordan",
    description:
      "Transform your business with intelligent AI automation. Based in Jordan, serving the Middle East and worldwide. Custom workflow automation & AI-powered tools.",
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
    "We build intelligent automation systems that transform how businesses operate. AI-powered solutions for workflow automation, custom tools, and seamless integrations. Based in Jordan, serving the Middle East and worldwide.",
  email: "malek@otoniqai.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "JO",
    addressRegion: "Amman Governorate",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Jordan",
    },
    {
      "@type": "GeoCircle",
      name: "Middle East",
    },
    {
      "@type": "Place",
      name: "Worldwide",
    },
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
    "AI automation and workflow solutions for businesses. Transform your operations with intelligent automation systems.",
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
  serviceType: "AI Automation Consulting",
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
    "Professional AI automation services including workflow automation, custom AI tools, process consulting, and integration services. Based in Jordan, serving businesses in the Middle East, Arab region, and worldwide.",
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
    name: "AI Automation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow Automation",
          description:
            "Automate repetitive tasks and streamline your business processes with custom automation solutions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Powered Tools",
          description:
            "Custom AI applications designed to solve your specific business challenges.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Process Consulting",
          description:
            "Strategic analysis and optimization of your business processes to identify automation opportunities.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Integration Services",
          description:
            "Connect your existing tools and systems into a unified, efficient workflow.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <PageLoader />
        <CursorGlow />
        <NoiseTexture />
        <SmoothScrollProvider>
          {children}
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
