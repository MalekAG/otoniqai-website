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
          "bg-primary/8 text-primary",
          "group-hover:bg-primary/12",
        ],
        accent: [
          "bg-accent/10 text-accent-dark",
          "group-hover:bg-accent/15",
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
