"use client";

import { motion } from "framer-motion";
import { Cog, Bot, Lightbulb, Plug, Check } from "lucide-react";
import { Card, Container, IconBox } from "@/components/ui";
import { cn } from "@/lib/utils";

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
    color: "primary" as const,
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
    color: "secondary" as const,
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
    color: "accent" as const,
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
    color: "energy" as const,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-alt/50 to-background" />
      </div>

      <Container>
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What We Build
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Practical AI automation solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
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
                  {/* Icon */}
                  <IconBox
                    variant={service.color}
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
                          className={cn(
                            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                            service.color === "primary" && "bg-primary/20 text-primary",
                            service.color === "secondary" && "bg-secondary/20 text-secondary",
                            service.color === "accent" && "bg-accent/20 text-accent",
                            service.color === "energy" && "bg-energy/20 text-energy"
                          )}
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
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
