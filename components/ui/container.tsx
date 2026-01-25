import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const containerSizes = {
  sm: "max-w-3xl",      // 768px
  md: "max-w-5xl",      // 1024px
  lg: "max-w-6xl",      // 1152px
  xl: "max-w-7xl",      // 1280px
  full: "max-w-full",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
  as?: "div" | "section" | "main" | "article";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", as: Component = "div", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          containerSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export { Container, containerSizes };
