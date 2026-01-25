"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { Container, Logo } from "@/components/ui";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

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

            {/* Contact & Social */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Email */}
              <a
                href="mailto:hello@otoniqai.com"
                className={cn(
                  "flex items-center gap-2 text-foreground-muted",
                  "hover:text-primary transition-colors duration-200"
                )}
              >
                <Mail size={18} />
                <span className="text-sm">hello@otoniqai.com</span>
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-10 h-10 rounded-lg",
                      "flex items-center justify-center",
                      "bg-background-elevated border border-border",
                      "text-foreground-muted hover:text-primary",
                      "hover:border-primary/50 transition-all duration-200"
                    )}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}
