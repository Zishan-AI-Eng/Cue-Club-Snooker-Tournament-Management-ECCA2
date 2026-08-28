"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", className)}>
        <Search
          size={18}
          className="pointer-events-none absolute left-3 text-text-muted"
        />
        <input
          ref={ref}
          value={value}
          className="h-11 w-full rounded-button border border-border bg-bg-secondary pl-10 pr-9 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-green focus:outline-none"
          {...props}
        />
        {!!value && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-3 text-text-muted hover:text-text-primary"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };