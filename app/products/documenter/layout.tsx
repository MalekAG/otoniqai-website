import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLC Documenter - AI-Powered PLC Documentation",
  description:
    "AI-powered PLC documentation tool. Upload your Rockwell L5X or Siemens project file and get complete documentation with cross-references, tag mappings, and plain-English descriptions in minutes. Built by industrial automation engineers.",
  keywords: [
    "PLC documentation",
    "PLC documentation tool",
    "AI PLC documentation",
    "Rockwell L5X",
    "Allen-Bradley documentation",
    "Siemens PLC documentation",
    "Studio 5000 documentation",
    "TIA Portal documentation",
    "PLC cross-reference",
    "automatic PLC documentation",
    "PLC routine descriptions",
    "controls engineering documentation",
    "PLC code documentation tool",
    "industrial automation documentation",
  ],
  openGraph: {
    title: "PLC Documenter - AI-Powered PLC Documentation | Otoniq AI",
    description:
      "Stop writing PLC documentation by hand. Upload your Rockwell L5X or Siemens file and get complete, AI-generated documentation in minutes with automatic parsing, cross-references, and plain-English descriptions.",
    type: "website",
    url: "https://otoniqai.com/products/documenter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PLC Documenter - AI-Powered PLC Documentation by Otoniq AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLC Documenter - AI-Powered PLC Documentation",
    description:
      "Stop writing PLC documentation by hand. Upload your PLC project file and get complete, AI-generated documentation in minutes.",
    images: ["/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://otoniqai.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: "https://otoniqai.com/products",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PLC Documenter",
      item: "https://otoniqai.com/products/documenter",
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PLC Documenter",
  applicationCategory: "Industrial Automation",
  operatingSystem: "Web",
  url: "https://otoniqai.com/products/documenter",
  description:
    "AI-powered tool that automatically generates documentation from PLC program files. Supports Rockwell L5X with Siemens TIA Portal coming soon.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier with 1 project and 10 AI descriptions",
  },
  creator: {
    "@type": "Organization",
    name: "Otoniq AI",
    url: "https://otoniqai.com",
  },
};

export default function DocumenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {children}
    </>
  );
}
