"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Badge, Container } from "@/components/ui";
import { Magnetic } from "@/components/ui/magnetic";

const wordReveal = {
  initial: { clipPath: "inset(100% 0 0 0)", y: 20, opacity: 0 },
  animate: { clipPath: "inset(0 0 0 0)", y: 0, opacity: 1 },
};

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: decorative shapes move at different rates
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Parallax decorative shapes */}
      <motion.div
        className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-accent/[0.08] blur-3xl"
        style={{ y: y1, opacity }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[8%] w-56 h-56 rounded-full bg-primary/[0.06] blur-3xl"
        style={{ y: y2, opacity }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      {/* Geometric accent decorations with parallax */}
      <motion.div
        className="absolute top-[18%] left-[15%] w-20 h-20 border-2 border-accent/20 rounded-full"
        style={{ y: y3 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-2 h-2 rounded-full bg-accent/50"
        style={{ y: y1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      />
      <motion.div
        className="absolute bottom-[28%] right-[8%] w-16 h-16 border border-primary/10 rounded-lg rotate-12"
        style={{ y: y2 }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 12 }}
        transition={{ duration: 1, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[35%] left-[12%] w-3 h-3 rounded-full bg-primary/20"
        style={{ y: y3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      />

      <Container className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Badge variant="accent" className="gap-2">
              <Sparkles size={14} />
              AI-Powered Automation
            </Badge>
          </motion.div>

          {/* Main Heading — word-by-word clip reveal */}
          <div className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <motion.span
              variants={wordReveal}
              className="inline-block text-primary mr-3"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Automate.
            </motion.span>
            <motion.span
              variants={wordReveal}
              className="inline-block text-accent-dark mr-3"
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Elevate.
            </motion.span>
            <motion.span
              variants={wordReveal}
              className="inline-block text-primary"
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Dominate.
            </motion.span>
          </div>

          {/* Accent underline beneath heading */}
          <motion.div
            className="w-24 h-[3px] bg-accent rounded-full mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We build intelligent automation systems that transform how businesses
            operate. No buzzwords, just{" "}
            <span className="text-foreground font-medium">real solutions</span>{" "}
            that save time and drive growth.
          </motion.p>

          {/* CTAs — wrapped in Magnetic */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Magnetic strength={0.12}>
              <a
                href="https://calendly.com/malek-otoniqai/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Book a Discovery Call
                  <ArrowRight size={18} />
                </Button>
              </a>
            </Magnetic>
            <Magnetic strength={0.12}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleScrollTo("#process")}
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </Magnetic>
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
              className="w-6 h-10 rounded-full border-2 border-accent/40 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-accent"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
