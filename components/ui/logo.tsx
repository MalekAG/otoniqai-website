"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 32, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
};

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Hexagonal Icon */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
        {/* Outer hexagon */}
        <polygon
          points="20,2 35,11 35,29 20,38 5,29 5,11"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Inner hexagon */}
        <polygon
          points="20,9 29,14 29,26 20,31 11,26 11,14"
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        {/* Center triangle */}
        <polygon points="20,14 27,24 13,24" fill="url(#logoGradient)" />
      </svg>

      {/* Text */}
      {!iconOnly && (
        <span className={cn("font-heading font-bold", text)}>
          <span className="gradient-text">Otoniq</span>
          <span className="text-foreground ml-1">AI</span>
        </span>
      )}
    </div>
  );
}
