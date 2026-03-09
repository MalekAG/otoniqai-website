import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Assessment | Otoniq AI",
  description:
    "Take a 2-minute quiz to discover which AI automations could save your business the most time and money. Get personalized recommendations with specific tools and quick-start guides.",
  keywords: [
    "AI automation assessment",
    "business automation quiz",
    "AI readiness assessment",
    "automation ROI calculator",
    "AI chatbot recommendation",
    "sales automation tool finder",
    "customer support automation",
    "AI lead magnet",
  ],
  openGraph: {
    title: "AI Automation Assessment | Otoniq AI",
    description:
      "Discover which AI automations could save your business the most time and money. Personalized recommendations in 2 minutes.",
    type: "website",
    url: "https://otoniqai.com/ai-assessment",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Automation Assessment by Otoniq AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Assessment | Otoniq AI",
    description:
      "Discover which AI automations could save your business the most time and money. Personalized recommendations in 2 minutes.",
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
      name: "AI Assessment",
      item: "https://otoniqai.com/ai-assessment",
    },
  ],
};

function safeJsonLd(obj: object): string {
  return JSON.stringify(obj).replace(/<\/script>/gi, "<\\/script>");
}

export default function AiAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
