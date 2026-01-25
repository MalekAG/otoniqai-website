"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            id={inputId}
            className={cn(
              "w-full px-4 py-3 rounded-xl",
              "bg-background-alt",
              "border-2 border-border",
              "text-foreground placeholder:text-foreground-muted",
              "transition-all duration-200",
              "focus:outline-none focus:border-primary focus:ring-0",
              "hover:border-border-light",
              error && "border-energy focus:border-energy",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={false}
            animate={{
              boxShadow: isFocused
                ? "0 0 0 4px rgba(59, 130, 246, 0.1)"
                : "0 0 0 0px rgba(59, 130, 246, 0)",
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-energy"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
