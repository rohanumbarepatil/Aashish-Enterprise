import * as React from "react";
import { cn } from "@/lib/utils";
import { RequestStatus } from "@/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "outline"
    | "demo";
  status?: RequestStatus;
}

export function Badge({
  className,
  variant = "default",
  status,
  children,
  ...props
}: BadgeProps) {
  // If a status is passed, use the domain status styling
  if (status) {
    const statusConfig: Record<RequestStatus, { label: string; className: string }> = {
      RECEIVED: {
        label: "१. विनंती प्राप्त",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      },
      PENDING_CONTACT: {
        label: "२. संपर्क बाकी",
        className: "bg-amber-50 text-amber-800 border-amber-200",
      },
      CONTACTED: {
        label: "३. संपर्क साधला",
        className: "bg-sky-50 text-sky-800 border-sky-200",
      },
      INSPECTION: {
        label: "४. माल तपासणी",
        className: "bg-purple-50 text-purple-800 border-purple-200",
      },
      DEAL_FINALIZED: {
        label: "५. सौदा निश्चित",
        className: "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold",
      },
      PRODUCE_RECEIVED: {
        label: "६. माल प्राप्त",
        className: "bg-teal-50 text-teal-800 border-teal-200",
      },
      PAYMENT_PENDING: {
        label: "७. पेमेंट बाकी",
        className: "bg-orange-50 text-orange-800 border-orange-200",
      },
      COMPLETED: {
        label: "८. व्यवहार पूर्ण",
        className: "bg-green-100 text-green-900 border-green-300 font-bold",
      },
      REJECTED: {
        label: "रद्द",
        className: "bg-rose-50 text-rose-700 border-rose-200",
      },
    };

    const cfg = statusConfig[status] || {
      label: status,
      className: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          cfg.className,
          className
        )}
        {...props}
      >
        {children || cfg.label}
      </span>
    );
  }

  const variants = {
    default: "bg-emerald-50 text-[#14532D] border-[#86EFAC]",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    outline: "bg-transparent text-[#647067] border-[#E1E8E1]",
    demo: "bg-amber-100 text-amber-900 border-amber-300 font-mono tracking-wider",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
