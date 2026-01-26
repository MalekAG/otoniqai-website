"use client";

import { Mail } from "lucide-react";
import { Container, Logo } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background-alt">
      <Container>
        <div className="py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Logo & Copyright */}
            <div className="space-y-4">
              <a href="#" className="inline-block">
                <Logo size="sm" />
              </a>
              <p className="text-sm text-foreground-muted">
                &copy; {currentYear} Otoniq AI. All rights reserved.
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Email */}
              <a
                href="mailto:malek@otoniqai.com"
                className={cn(
                  "flex items-center gap-2 text-foreground-muted",
                  "hover:text-primary transition-colors duration-200"
                )}
              >
                <Mail size={18} />
                <span className="text-sm">malek@otoniqai.com</span>
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}
