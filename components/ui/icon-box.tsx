"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const iconBoxVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-xl",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary/10 text-primary",
          "group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20",
        ],
        secondary: [
          "bg-secondary/10 text-secondary",
          "group-hover:bg-secondary/20 group-hover:shadow-lg group-hover:shadow-secondary/20",
        ],
        accent: [
          "bg-accent/10 text-accent",
          "group-hover:bg-accent/20 group-hover:shadow-lg group-hover:shadow-accent/20",
        ],
        energy: [
          "bg-energy/10 text-energy",
          "group-hover:bg-energy/20 group-hover:shadow-lg group-hover:shadow-energy/20",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/20 to-secondary/20",
          "text-primary",
          "group-hover:from-primary/30 group-hover:to-secondary/30",
          "group-hover:shadow-lg group-hover:shadow-primary/20",
        ],
        glow: [
          "bg-background-elevated text-primary",
          "border border-border",
          "group-hover:border-primary/50",
          "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        ],
      },
      size: {
        sm: "w-10 h-10 [&>svg]:w-5 [&>svg]:h-5",
        md: "w-12 h-12 [&>svg]:w-6 [&>svg]:h-6",
        lg: "w-16 h-16 [&>svg]:w-8 [&>svg]:h-8",
        xl: "w-20 h-20 [&>svg]:w-10 [&>svg]:h-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface IconBoxProps
  extends Omit<HTMLMotionProps<"div">, "ref">,
    VariantProps<typeof iconBoxVariants> {}

const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(iconBoxVariants({ variant, size, className }))}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

IconBox.displayName = "IconBox";

export { IconBox, iconBoxVariants };
