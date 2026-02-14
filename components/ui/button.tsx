"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-medium tracking-wide",
    "rounded-xl",
    "transition-all duration-300 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-white",
          "shadow-md shadow-primary/15",
          "hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20",
          "active:bg-primary-dark",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-border",
          "text-foreground",
          "hover:border-primary hover:text-primary",
          "hover:shadow-md hover:shadow-primary/10",
        ],
        ghost: [
          "bg-transparent",
          "text-foreground-muted",
          "hover:text-foreground hover:bg-background-alt",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
