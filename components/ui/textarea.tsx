"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            id={textareaId}
            className={cn(
              "w-full px-4 py-3 rounded-xl",
              "bg-background-alt",
              "border-2 border-border",
              "text-foreground placeholder:text-foreground-muted",
              "transition-all duration-200",
              "focus:outline-none focus:border-primary focus:ring-0",
              "hover:border-border-light",
              "min-h-[120px] resize-y",
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

Textarea.displayName = "Textarea";

export { Textarea };
