"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Upload,
  Cpu,
  FileText,
  Brain,
  GitCompareArrows,
  Download,
  Users,
  Shield,
  Clock,
  BookX,
  UserX,
  Check,
  X,
  Mail,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import {
  Button,
  Badge,
  Card,
  Container,
  IconBox,
  SectionHeading,
  SectionDivider,
} from "@/components/ui";
import { cn } from "@/lib/utils";

// ─── Environment ──────────────────────────────────────────────────────────────

const DOCUMENTER_APP_URL =
  process.env.NEXT_PUBLIC_DOCUMENTER_APP_URL || "https://documenter.otoniqai.com";

// ─── Animation Variants ───────────────────────────────────────────────────────

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    icon: Clock,
    iconLabel: "Clock icon for tedious documentation",
    title: "Manual Documentation Is Tedious",
    description:
      "Engineers spend hours writing documentation that becomes outdated the moment code changes. Copy-paste from rungs to Word documents is nobody's idea of productive work.",
    color: "primary" as const,
  },
  {
    icon: BookX,
    iconLabel: "Book icon for missing cross-references",
    title: "No Cross-References",
    description:
      "Understanding which tags are used across which programs requires flipping between dozens of routines. There's no easy way to trace a signal through the entire project.",
    color: "primary" as const,
  },
  {
    icon: UserX,
    iconLabel: "User icon for tribal knowledge",
    title: "Tribal Knowledge Walks Out the Door",
    description:
      "When experienced engineers leave, they take years of undocumented knowledge with them. New team members are left reverse-engineering logic with zero context.",
    color: "primary" as const,
  },
];

const howItWorksSteps = [
  {
    number: "01",
    icon: Upload,
    iconLabel: "Upload file icon",
    title: "Upload Your L5X File",
    description:
      "Export your project from Rockwell Studio 5000 as an L5X file and upload it. We support all controller types and project sizes.",
  },
  {
    number: "02",
    icon: Cpu,
    iconLabel: "CPU processing icon",
    title: "Automatic Parse & Cross-Reference",
    description:
      "Our deterministic parser extracts every program, routine, rung, tag, and I/O point. The cross-reference engine maps tag usage across your entire project.",
  },
  {
    number: "03",
    icon: FileText,
    iconLabel: "Document icon",
    title: "AI Docs & Export",
    description:
      "Claude AI generates plain-English descriptions for each routine. Export everything to professional PDF or Excel reports with one click.",
  },
];

const features = [
  {
    icon: Cpu,
    iconLabel: "Automatic parsing icon",
    title: "Automatic Parsing",
    description:
      "Deterministic parser handles AWL/STL, SCL, and LAD/FBD formats. Full project structure extraction in seconds.",
    color: "primary" as const,
  },
  {
    icon: Brain,
    iconLabel: "AI descriptions icon",
    title: "AI Descriptions",
    description:
      "Powered by Claude AI. Each routine gets a clear, plain-English description of what it does and why it matters.",
    color: "primary" as const,
  },
  {
    icon: GitCompareArrows,
    iconLabel: "Cross-reference engine icon",
    title: "Cross-Reference Engine",
    description:
      "Map tag usage across every routine in your project. Trace any signal from input to output in one view.",
    color: "accent" as const,
  },
  {
    icon: Download,
    iconLabel: "PDF and Excel export icon",
    title: "PDF & Excel Export",
    description:
      "Generate professional documentation ready for handover, audits, or commissioning packages.",
    color: "primary" as const,
  },
  {
    icon: Users,
    iconLabel: "Team collaboration icon",
    title: "Team Collaboration",
    description:
      "Share projects with colleagues and build a shared knowledge base across your engineering team.",
    color: "primary" as const,
    comingSoon: true,
  },
  {
    icon: Shield,
    iconLabel: "Security icon",
    title: "Secure & Private",
    description:
      "Your PLC data stays safe. Files are processed securely and never shared. You control access to every project.",
    color: "primary" as const,
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started and see what automated PLC documentation looks like.",
    features: [
      { text: "1 project", included: true },
      { text: "10 AI routine descriptions", included: true },
      { text: "Full parsing & cross-reference", included: true },
      { text: "PDF & Excel export", included: true },
      { text: "Knowledge base", included: false },
      { text: "SSO / team management", included: false },
    ],
    cta: "Get Started Free",
    ctaHref: `${DOCUMENTER_APP_URL}/signup`,
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "TBD",
    period: "per month",
    description: "Unlimited projects, unlimited AI, full team features.",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Unlimited AI descriptions", included: true },
      { text: "Full parsing & cross-reference", included: true },
      { text: "PDF & Excel export", included: true },
      { text: "Knowledge base", included: true },
      { text: "SSO / team management", included: true },
    ],
    cta: "Contact Us",
    ctaHref: "mailto:malek@otoniqai.com",
    variant: "primary" as const,
    highlighted: true,
    badge: "Coming Soon",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocumenterPage() {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Container className="relative pt-32 pb-20 md:pt-40 md:pb-32">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-4xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div variants={staggerItem} className="mb-8">
                <Badge variant="primary" className="gap-2">
                  <Sparkles size={14} />
                  AI-Powered PLC Documentation
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={staggerItem}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              >
                Stop Writing PLC Documentation{" "}
                <span className="gradient-text">by Hand</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={staggerItem}
                className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Upload your Rockwell L5X file and get complete, AI-generated
                documentation in minutes. Automatic parsing, cross-references,
                and plain-English descriptions for every routine.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a href={`${DOCUMENTER_APP_URL}/signup`}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Get Started Free
                    <ArrowRight size={18} />
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleScrollTo("#how-it-works")}
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </motion.div>

              {/* Mockup Placeholder */}
              <motion.div
                variants={staggerItem}
                className="mt-16 md:mt-20 relative"
              >
                <div
                  className={cn(
                    "relative rounded-2xl overflow-hidden",
                    "border border-border",
                    "bg-background-elevated",
                    "shadow-2xl shadow-primary/10"
                  )}
                >
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background-alt/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-energy/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-primary/60" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-6 rounded-md bg-background/50 flex items-center px-3">
                        <span className="text-xs text-foreground-muted">
                          documenter.otoniqai.com
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Mockup Content */}
                  <div className="p-6 md:p-8 min-h-[280px] md:min-h-[360px] flex flex-col items-center justify-center">
                    <div className="w-full max-w-lg space-y-4">
                      {/* Fake sidebar + content layout */}
                      <div className="flex gap-4">
                        <div className="hidden sm:flex flex-col gap-2 w-1/4">
                          <div className="h-4 rounded bg-primary/20 w-full" />
                          <div className="h-4 rounded bg-primary/10 w-3/4" />
                          <div className="h-4 rounded bg-primary/10 w-5/6" />
                          <div className="h-4 rounded bg-accent/20 w-full" />
                          <div className="h-4 rounded bg-accent/10 w-2/3" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="h-5 rounded bg-foreground/10 w-3/4" />
                          <div className="h-3 rounded bg-foreground/5 w-full" />
                          <div className="h-3 rounded bg-foreground/5 w-5/6" />
                          <div className="h-3 rounded bg-foreground/5 w-4/6" />
                          <div className="mt-4 p-3 rounded-lg border border-border bg-background-alt/30">
                            <div className="h-3 rounded bg-accent/20 w-1/2 mb-2" />
                            <div className="h-2 rounded bg-foreground/5 w-full" />
                            <div className="h-2 rounded bg-foreground/5 w-5/6 mt-1" />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <div className="h-8 rounded-lg bg-primary/20 w-24" />
                            <div className="h-8 rounded-lg bg-border/50 w-20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Subtle shadow behind mockup */}
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <SectionDivider />

        {/* ━━━ PROBLEM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-background-alt" />
          </div>

          <Container>
            <SectionHeading
              title="The Problem with PLC Documentation"
              subtitle="Every controls engineer knows the pain. Documentation is critical, but the process is broken."
            />

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {painPoints.map((pain, index) => (
                <motion.div
                  key={pain.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    variant="glow"
                    padding="lg"
                    className="h-full group"
                  >
                    <div className="flex flex-col h-full">
                      <IconBox
                        variant={pain.color}
                        size="lg"
                        className="mb-6"
                      >
                        <pain.icon
                          aria-label={pain.iconLabel}
                          role="img"
                        />
                      </IconBox>
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">
                        {pain.title}
                      </h3>
                      <p className="text-foreground-muted leading-relaxed">
                        {pain.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="how-it-works"
          className="relative py-24 md:py-32 overflow-hidden"
        >

          <Container>
            <SectionHeading
              title="How It Works"
              subtitle="From L5X file to complete documentation in three simple steps."
            />

            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-16 left-0 right-0 h-px bg-border" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute top-16 left-0 right-0 h-px bg-primary/40 origin-left"
                />

                <div className="grid grid-cols-3 gap-8">
                  {howItWorksSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative"
                    >
                      {/* Icon Box */}
                      <div className="relative mb-8">
                        <div
                          className={cn(
                            "w-32 h-32 mx-auto rounded-2xl",
                            "bg-background-elevated border border-border",
                            "flex items-center justify-center",
                            "transition-all duration-300"
                          )}
                        >
                          <step.icon
                            className="w-12 h-12 text-primary"
                            aria-label={step.iconLabel}
                            role="img"
                          />
                        </div>
                        {/* Step number badge */}
                        <div
                          className={cn(
                            "absolute -top-3 -right-3 w-10 h-10 rounded-full",
                            "bg-primary",
                            "flex items-center justify-center",
                            "text-sm font-bold text-white",
                            "shadow-lg shadow-primary/25"
                          )}
                        >
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-foreground-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Timeline */}
            <div className="lg:hidden">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-6 w-px bg-border" />
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute top-0 bottom-0 left-6 w-px bg-primary/40 origin-top"
                />

                <div className="space-y-12">
                  {howItWorksSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative pl-16"
                    >
                      {/* Number Circle */}
                      <div
                        className={cn(
                          "absolute left-0 top-0 w-12 h-12 rounded-xl",
                          "bg-primary",
                          "flex items-center justify-center",
                          "text-sm font-bold text-white",
                          "shadow-lg shadow-primary/25"
                        )}
                      >
                        {step.number}
                      </div>

                      {/* Content */}
                      <div
                        className={cn(
                          "p-6 rounded-2xl",
                          "bg-background-elevated border border-border"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <step.icon
                            className="w-5 h-5 text-primary"
                            aria-hidden="true"
                          />
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-foreground-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ━━━ FEATURES GRID ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-background-alt" />
          </div>

          <Container>
            <SectionHeading
              title="Everything You Need"
              subtitle="A complete toolkit for generating, managing, and exporting PLC documentation."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card
                    variant="glow"
                    padding="lg"
                    className="h-full group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-6">
                        <IconBox
                          variant={feature.color}
                          size="lg"
                        >
                          <feature.icon
                            aria-label={feature.iconLabel}
                            role="img"
                          />
                        </IconBox>
                        {feature.comingSoon && (
                          <Badge variant="accent">Coming Soon</Badge>
                        )}
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-foreground-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ━━━ PRICING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative py-24 md:py-32 overflow-hidden">

          <Container>
            <SectionHeading
              title="Simple Pricing"
              subtitle="Start free. Upgrade when you need more."
            />

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {tier.highlighted && (
                    <div className="absolute -inset-px rounded-2xl bg-primary -z-10" />
                  )}
                  <Card
                    variant={tier.highlighted ? "default" : "glow"}
                    padding="xl"
                    hover={false}
                    className={cn(
                      "h-full",
                      tier.highlighted && "border-transparent"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      {/* Tier Header */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="font-heading text-2xl font-bold text-foreground">
                            {tier.name}
                          </h3>
                          {tier.badge && (
                            <Badge variant="accent">{tier.badge}</Badge>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                            {tier.price}
                          </span>
                          <span className="text-foreground-muted text-sm">
                            /{tier.period}
                          </span>
                        </div>
                        <p className="text-foreground-muted text-sm leading-relaxed">
                          {tier.description}
                        </p>
                      </div>

                      {/* Feature List */}
                      <ul className="space-y-4 mb-8 flex-1">
                        {tier.features.map((feature) => (
                          <li
                            key={feature.text}
                            className="flex items-center gap-3 text-sm"
                          >
                            {feature.included ? (
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                <Check size={12} />
                              </span>
                            ) : (
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-border/50 text-foreground-muted flex items-center justify-center">
                                <X size={12} />
                              </span>
                            )}
                            <span
                              className={cn(
                                feature.included
                                  ? "text-foreground"
                                  : "text-foreground-muted"
                              )}
                            >
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href={tier.ctaHref}
                        target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                        rel={tier.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <Button
                          variant={tier.variant}
                          size="lg"
                          className="w-full"
                        >
                          {tier.cta}
                          <ArrowRight size={18} />
                        </Button>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ━━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-background-alt" />
          </div>

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Automate Your{" "}
                <span className="gradient-text">PLC Documentation?</span>
              </h2>
              <p className="text-foreground-muted text-lg mb-10 leading-relaxed">
                Upload your first L5X file and see what AI-powered documentation
                looks like. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`${DOCUMENTER_APP_URL}/signup`}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Get Started Free
                    <ArrowRight size={18} />
                  </Button>
                </a>
                <a href="mailto:malek@otoniqai.com">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                  >
                    <Mail size={18} />
                    Contact Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
