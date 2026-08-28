import { HTMLAttributes, forwardRef } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-bg-elevated border border-border font-semibold text-text-secondary shrink-0",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-11 w-11 text-sm",
        lg: "h-16 w-16 text-lg",
        xl: "h-20 w-20 text-2xl",
      },
      ring: {
        none: "",
        gold: "ring-2 ring-gold ring-offset-2 ring-offset-bg-primary",
        silver: "ring-2 ring-silver ring-offset-2 ring-offset-bg-primary",
        bronze: "ring-2 ring-bronze ring-offset-2 ring-offset-bg-primary",
        green: "ring-2 ring-accent-green ring-offset-2 ring-offset-bg-primary",
      },
    },
    defaultVariants: {
      size: "md",
      ring: "none",
    },
  }
);

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  name: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("");
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, ring, src, name, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, ring, className }))}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };