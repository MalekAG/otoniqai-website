"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconBox } from "@/components/ui/icon-box";

type LandingHeroProps = {
  onStart: () => void;
};

const benefits = [
  { icon: Clock, text: "Takes only 2 minutes" },
  { icon: Zap, text: "Personalized AI suggestions" },
  { icon: DollarSign, text: "See your estimated ROI" },
];

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="min-h-screen flex items-center py-16 sm:py-24">
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-accent-dark bg-accent/10 px-4 py-1.5 rounded-full mb-6 border border-accent/20">
              Free AI Assessment
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover Which AI Automations Could{" "}
            <span className="text-primary">Save You the Most</span>
          </motion.h1>

          <motion.p
            className="text-lg text-foreground-muted leading-relaxed mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Answer a few questions about your business and get personalized AI
            automation recommendations with estimated time and cost savings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" onClick={onStart} className="cursor-pointer">
              Start the Quiz <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <IconBox variant="primary" size="sm">
                  <b.icon />
                </IconBox>
                <span className="text-sm text-foreground-muted font-medium">
                  {b.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
