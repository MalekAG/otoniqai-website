"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 68, height: 68 },
  md: { width: 84, height: 84 },
  lg: { width: 100, height: 100 },
};

export function Logo({ className, size = "md" }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/OtoniqAILogo.svg"
        alt="Otoniq AI"
        width={width}
        height={height}
        className="flex-shrink-0"
        priority
      />
    </div>
  );
}
