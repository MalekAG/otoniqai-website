"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-2",
    "px-4 py-2 rounded-full",
    "text-sm font-medium",
    "border",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary/10 text-primary",
          "border-primary/20",
        ],
        secondary: [
          "bg-secondary/10 text-secondary",
          "border-secondary/20",
        ],
        accent: [
          "bg-accent/10 text-accent",
          "border-accent/20",
        ],
        energy: [
          "bg-energy/10 text-energy",
          "border-energy/20",
        ],
        gradient: [
          "bg-transparent",
          "border-transparent",
          "relative",
          "before:absolute before:inset-0 before:rounded-full before:p-[1px]",
          "before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent",
          "before:-z-10",
          "after:absolute after:inset-[1px] after:rounded-full",
          "after:bg-background-elevated",
          "after:-z-10",
          "text-foreground",
        ],
        outline: [
          "bg-transparent text-foreground-muted",
          "border-border",
          "hover:border-primary hover:text-primary",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends Omit<HTMLMotionProps<"span">, "ref">,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
