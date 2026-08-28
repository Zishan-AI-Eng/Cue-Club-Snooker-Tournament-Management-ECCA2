import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:pointer-events-none active:scale-[0.95]",
  {
    variants: {
      variant: {
        ghost: "bg-transparent text-text-primary hover:bg-bg-elevated",
        surface: "bg-bg-secondary text-text-primary hover:bg-bg-elevated",
        accent: "bg-accent-green/15 text-accent-green hover:bg-accent-green/25",
      },
      size: {
        sm: "h-9 w-9",
        md: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Required for accessibility since only an icon is shown */
  "aria-label": string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(iconButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };