"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementsProps {
  className?: string;
}

export function FloatingElements({ className }: FloatingElementsProps) {
  const elements = [
    {
      size: "w-3 h-3",
      position: "top-1/4 left-1/4",
      delay: 0,
      duration: 6,
      color: "bg-primary/30",
    },
    {
      size: "w-2 h-2",
      position: "top-1/3 right-1/4",
      delay: 1,
      duration: 8,
      color: "bg-secondary/30",
    },
    {
      size: "w-4 h-4",
      position: "bottom-1/3 left-1/3",
      delay: 2,
      duration: 7,
      color: "bg-accent/30",
    },
    {
      size: "w-2 h-2",
      position: "top-1/2 right-1/3",
      delay: 0.5,
      duration: 9,
      color: "bg-energy/30",
    },
    {
      size: "w-3 h-3",
      position: "bottom-1/4 right-1/4",
      delay: 1.5,
      duration: 6.5,
      color: "bg-primary/20",
    },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute rounded-full blur-sm",
            el.size,
            el.position,
            el.color
          )}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
