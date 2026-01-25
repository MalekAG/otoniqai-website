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

export const metadata: Metadata = {
  title: "Otoniq AI | Automate. Elevate. Dominate.",
  description:
    "We build intelligent automation systems that transform how businesses operate. AI-powered solutions for workflow automation, custom tools, and seamless integrations.",
  keywords: [
    "AI automation",
    "workflow automation",
    "business automation",
    "AI tools",
    "process automation",
    "integration services",
  ],
  authors: [{ name: "Otoniq AI" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Otoniq AI | Automate. Elevate. Dominate.",
    description:
      "We build intelligent automation systems that transform how businesses operate.",
    type: "website",
    locale: "en_US",
    siteName: "Otoniq AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Otoniq AI | Automate. Elevate. Dominate.",
    description:
      "We build intelligent automation systems that transform how businesses operate.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
