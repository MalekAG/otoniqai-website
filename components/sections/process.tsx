"use client";

import { motion } from "framer-motion";
import { Phone, PenTool, Code, Rocket } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Phone,
    iconLabel: "Discovery call phone icon",
    title: "Discovery Call",
    description:
      "We start with a conversation to understand your challenges, goals, and current tech stack. No pressure, just honest assessment.",
    useAccent: false,
  },
  {
    number: "02",
    icon: PenTool,
    iconLabel: "Solution design pen tool icon",
    title: "Solution Design",
    description:
      "Based on our discussion, we create a clear proposal with scope, timeline, and pricing. You know exactly what you're getting.",
    useAccent: true,
  },
  {
    number: "03",
    icon: Code,
    iconLabel: "Development code icon",
    title: "Development",
    description:
      "We build your solution with regular check-ins and progress updates. You're never left wondering what's happening.",
    useAccent: false,
  },
  {
    number: "04",
    icon: Rocket,
    iconLabel: "Launch rocket icon",
    title: "Launch & Support",
    description:
      "After thorough testing, we deploy and provide documentation. We're here for questions and optimizations as you scale.",
    useAccent: true,
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden bg-background-alt">
      <Container>
        <SectionHeading
          title="How We Work"
          subtitle="A straightforward process focused on understanding your needs and delivering results."
        />

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-16 left-0 right-0 h-px bg-border" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-16 left-0 right-0 h-px bg-accent/50 origin-left"
            />

            {/* Steps */}
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Number Circle */}
                  <div className="relative mb-8">
                    <div
                      className={cn(
                        "w-32 h-32 mx-auto rounded-2xl",
                        "bg-background-elevated border border-border",
                        "flex items-center justify-center",
                        "transition-all duration-300"
                      )}
                    >
                      <step.icon className={cn("w-12 h-12", step.useAccent ? "text-accent-dark" : "text-primary")} aria-label={step.iconLabel} role="img" />
                    </div>
                    {/* Step number badge */}
                    <div
                      className={cn(
                        "absolute -top-3 -right-3 w-10 h-10 rounded-full",
                        step.useAccent ? "bg-accent" : "bg-primary",
                        "flex items-center justify-center",
                        "text-sm font-bold text-white"
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

        {/* Mobile/Tablet Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-6 w-px bg-border" />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-0 bottom-0 left-6 w-px bg-accent/50 origin-top"
            />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
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
                      step.useAccent ? "bg-accent" : "bg-primary",
                      "flex items-center justify-center",
                      "text-sm font-bold text-white"
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
                      <step.icon className={cn("w-5 h-5", step.useAccent ? "text-accent-dark" : "text-primary")} aria-hidden="true" />
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
  );
}
