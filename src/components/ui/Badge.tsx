import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        live: "bg-error/15 text-error",
        success: "bg-accent-green/15 text-accent-green",
        neutral: "bg-bg-elevated text-text-secondary border border-border",
        gold: "bg-gold/15 text-gold",
        silver: "bg-silver/15 text-silver",
        bronze: "bg-bronze/15 text-bronze",
        warning: "bg-warning/15 text-warning",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };