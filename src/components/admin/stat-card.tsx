import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  variant?: "emerald" | "amber" | "blue" | "purple";
}

export function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  variant = "emerald",
}: StatCardProps) {

  const iconStyles = {
    emerald: "bg-[#14532D] text-emerald-200",
    amber: "bg-[#D97706] text-amber-100",
    blue: "bg-blue-700 text-blue-100",
    purple: "bg-purple-700 text-purple-100",
  };

  return (
    <div className="p-5 rounded-2xl border border-[#E1E8E1] bg-white shadow-xs hover:shadow-md transition-shadow flex items-start justify-between">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-[#647067] uppercase tracking-wider block">
          {title}
        </span>
        <div className="text-2xl font-extrabold text-[#17231B] tracking-tight">
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-[#647067] font-medium pt-0.5">
            {subtext}
          </p>
        )}
      </div>

      <div className={cn("p-3 rounded-xl", iconStyles[variant])}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
