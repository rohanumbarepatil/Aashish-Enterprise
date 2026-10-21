"use client";

import * as React from "react";
import { Menu, Bell } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitleMr?: string;
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({
  title,
  subtitleMr,
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E1E8E1] px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[#17231B] hover:bg-[#F1F5F1] transition-colors"
          aria-label="मेनू उघडा"
        >
          <Menu className="w-5 h-5 text-[#14532D]" />
        </button>

        <div className="space-y-0.5">
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#14532D] leading-tight">
            {title}
          </h1>
          {subtitleMr && (
            <p className="text-xs text-[#647067] hidden sm:block">
              {subtitleMr}
            </p>
          )}
        </div>
      </div>

      {/* Right Tools & User Info */}
      <div className="flex items-center gap-3">
        {/* Prototype Demo Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Demo Frontend</span>
        </div>

        {/* Notifications Icon with count */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-[#647067] hover:text-[#14532D] hover:bg-[#F1F5F1] transition-colors"
          title="सूचना"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16A34A]" />
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E1E8E1]">
          <div className="w-8 h-8 rounded-full bg-[#14532D] text-white flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-[#17231B] leading-tight">
              आशिष ॲडमीन
            </span>
            <span className="text-[10px] text-[#647067] font-mono">
              Staff / Owner
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
