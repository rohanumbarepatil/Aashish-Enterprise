import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "leaf" | "accent" | "outline" | "ghost" | "danger" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99]";

    const variants = {
      primary:
        "bg-[#14532D] text-white hover:bg-[#0f3d21] shadow-sm hover:shadow active:bg-[#0a2c17]",
      leaf:
        "bg-[#16A34A] text-white hover:bg-[#15803d] shadow-sm hover:shadow active:bg-[#166534]",
      accent:
        "bg-[#D97706] text-white hover:bg-[#b45309] shadow-sm hover:shadow active:bg-[#92400e]",
      secondary:
        "bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] active:bg-[#94A3B8]",
      outline:
        "border border-[#E1E8E1] bg-white text-[#14532D] hover:bg-[#F0FDF4] hover:border-[#86EFAC]",
      ghost:
        "text-[#17231B] hover:bg-[#F0FDF4] hover:text-[#14532D]",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2.5 gap-2 h-10",
      lg: "text-base px-6 py-3 gap-2.5 h-12 font-semibold",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
