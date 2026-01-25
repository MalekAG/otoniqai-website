"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated Logo Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.svg
                width={64}
                height={64}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                {/* Outer hexagon */}
                <polygon
                  points="20,2 35,11 35,29 20,38 5,29 5,11"
                  stroke="url(#loaderGrad)"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* Inner hexagon */}
                <motion.polygon
                  points="20,9 29,14 29,26 20,31 11,26 11,14"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Center triangle */}
                <polygon points="20,14 27,24 13,24" fill="url(#loaderGrad)" />
              </motion.svg>
            </motion.div>

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-heading font-bold text-2xl"
            >
              <span className="gradient-text">Otoniq</span>
              <span className="text-foreground ml-1">AI</span>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
