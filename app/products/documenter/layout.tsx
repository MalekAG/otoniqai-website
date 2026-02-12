import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLC Documenter - AI-Powered PLC Documentation",
  description:
    "Upload your Rockwell L5X file and get complete, AI-generated PLC documentation in minutes. Automatic parsing, cross-references, and plain-English descriptions for every routine.",
  keywords: [
    "PLC documentation",
    "Rockwell L5X",
    "Allen-Bradley documentation",
    "PLC code documentation",
    "AI PLC documentation",
    "Studio 5000 documentation",
    "PLC cross-reference",
    "automatic PLC documentation",
    "PLC routine descriptions",
    "controls engineering documentation",
  ],
  openGraph: {
    title: "PLC Documenter - AI-Powered PLC Documentation | Otoniq AI",
    description:
      "Stop writing PLC documentation by hand. Upload your Rockwell L5X file and get complete, AI-generated documentation in minutes with automatic parsing, cross-references, and plain-English descriptions.",
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
      "Stop writing PLC documentation by hand. Upload your Rockwell L5X file and get complete, AI-generated documentation in minutes.",
    images: ["/og-image.png"],
  },
};

export default function DocumenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
