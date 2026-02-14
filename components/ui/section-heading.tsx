"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16 md:mb-20"
    >
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 relative inline-block">
        {title}
        {/* Animated accent underline */}
        <motion.span
          className="absolute -bottom-2 left-1/4 right-1/4 h-[3px] bg-accent rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </h2>
      <p className="text-foreground-muted text-lg max-w-2xl mx-auto mt-6">
        {subtitle}
      </p>
    </motion.div>
  );
}
