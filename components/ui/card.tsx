"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "relative rounded-2xl",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background-elevated",
          "border border-border",
        ],
        glass: [
          "bg-background-elevated/60",
          "backdrop-blur-xl",
          "border border-border/50",
        ],
        glow: [
          "bg-background-elevated",
          "border border-border",
          "hover:border-primary/50",
          "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
        ],
        gradient: [
          "bg-gradient-to-br from-background-elevated to-background-alt",
          "border border-border",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: true,
    },
  }
);

export interface CardProps
  extends Omit<HTMLMotionProps<"div">, "ref">,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-xl font-semibold text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-foreground-muted text-sm leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, cardVariants };
