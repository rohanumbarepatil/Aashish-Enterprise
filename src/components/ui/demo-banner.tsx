import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoBannerProps {
  className?: string;
  variant?: "top" | "inline";
  messageMr?: string;
}

export function DemoBanner({
  className,
  variant = "top",
  messageMr = "प्रात्यक्षिक (Demo Prototype): ही वेबसाइट सध्या फ्रंटएंड डेव्हलपमेंटच्या टप्प्यावर आहे. येथे सबमिट केलेली माहिती प्रत्यक्षात रेकॉर्ड होत नाही.",
}: DemoBannerProps) {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm",
          className
        )}
      >
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-800 mr-1.5">[DEMO / प्रात्यक्षिक]:</span>
          <span>{messageMr}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-amber-500/10 border-b border-amber-200 text-amber-950 px-4 py-2 text-xs md:text-sm text-center font-medium flex items-center justify-center gap-2",
        className
      )}
    >
      <span className="inline-block px-1.5 py-0.5 rounded bg-amber-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
        Demo Mode
      </span>
      <span>{messageMr}</span>
    </div>
  );
}
