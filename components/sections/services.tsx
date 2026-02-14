"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cog, Bot, Lightbulb, Plug, Check } from "lucide-react";
import { Card, Container, IconBox, SectionHeading } from "@/components/ui";

const services = [
  {
    icon: Cog,
    iconLabel: "Workflow automation gear icon",
    title: "Workflow Automation",
    description:
      "Connect your tools and automate repetitive tasks. From data entry to report generation, we streamline operations.",
    features: [
      "API integrations & data syncing",
      "Automated reporting & alerts",
      "Custom workflow builders",
    ],
    accentHighlight: true,
  },
  {
    icon: Bot,
    iconLabel: "AI robot icon",
    title: "AI-Powered Tools",
    description:
      "Custom AI assistants and tools built for your specific use cases. Chatbots, content tools, and decision support systems.",
    features: [
      "Custom chatbots & assistants",
      "Document processing & analysis",
      "AI-enhanced decision tools",
    ],
    accentHighlight: false,
  },
  {
    icon: Lightbulb,
    iconLabel: "Process consulting lightbulb icon",
    title: "Process Consulting",
    description:
      "We analyze your workflows to identify automation opportunities. Get a clear roadmap before investing in development.",
    features: [
      "Workflow analysis & mapping",
      "Automation opportunity audit",
      "ROI-focused recommendations",
    ],
    accentHighlight: false,
  },
  {
    icon: Plug,
    iconLabel: "Integration services plug icon",
    title: "Integration Services",
    description:
      "Seamlessly connect your existing software stack. Make your tools work together intelligently.",
    features: [
      "CRM & database integrations",
      "Third-party API connections",
      "Data migration & sync",
    ],
    accentHighlight: true,
  },
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-background-alt">
      <Container>
        <SectionHeading
          title="What We Build"
          subtitle="Practical AI automation solutions tailored to your business needs."
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <TiltCard key={service.title} index={index}>
              <Card
                variant="glow"
                padding="lg"
                className="h-full group relative overflow-hidden"
                hover={false}
              >
                {/* Accent top border that reveals on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${service.accentHighlight ? "bg-accent" : "bg-primary"}`} />

                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <IconBox
                    variant={service.accentHighlight ? "accent" : "primary"}
                    size="lg"
                    className="mb-6"
                  >
                    <service.icon aria-label={service.iconLabel} role="img" />
                  </IconBox>

                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-auto space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${service.accentHighlight ? "bg-accent/10 text-accent-dark" : "bg-primary/10 text-primary"}`}
                          aria-hidden="true"
                        >
                          <Check size={12} aria-hidden="true" />
                        </span>
                        <span className="text-foreground-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
