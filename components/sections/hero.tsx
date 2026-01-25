"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Badge, Container, FloatingElements } from "@/components/ui";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function Hero() {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-alt" />

        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-accent/20 blur-[100px]"
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                             linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Floating elements */}
        <FloatingElements />
      </div>

      <Container className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Badge variant="gradient" className="gap-2">
              <Sparkles size={14} />
              AI-Powered Automation
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Automate.</span>{" "}
            <span className="text-foreground">Elevate.</span>{" "}
            <span className="gradient-text">Dominate.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We build intelligent automation systems that transform how businesses
            operate. No buzzwords, just real solutions that save time and drive
            growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="gradient"
              size="lg"
              onClick={() => handleScrollTo("#contact")}
              className="w-full sm:w-auto"
            >
              Book a Discovery Call
              <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollTo("#process")}
              className="w-full sm:w-auto"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-primary"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
