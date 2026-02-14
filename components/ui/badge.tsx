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
          "bg-primary/8 text-primary",
          "border-primary/15",
        ],
        accent: [
          "bg-accent/10 text-accent-dark",
          "border-accent/20",
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
