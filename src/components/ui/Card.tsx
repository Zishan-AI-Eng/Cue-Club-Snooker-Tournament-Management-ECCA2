import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const cardVariants = cva("rounded-card border", {
  variants: {
    surface: {
      secondary: "bg-bg-secondary border-border",
      elevated: "bg-bg-elevated border-border",
      transparent: "bg-transparent border-transparent",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: {
    surface: "secondary",
    padding: "md",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ surface, padding, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };