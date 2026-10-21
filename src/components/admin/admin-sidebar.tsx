"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Sprout,
  Receipt,
  CreditCard,
  Building2,
  BarChart3,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { cn } from "@/lib/utils";

const ADMIN_NAV_ITEMS = [
  { href: "/admin/dashboard", labelMr: "डॅशबोर्ड (Overview)", icon: LayoutDashboard },
  { href: "/admin/requests", labelMr: "शेतमाल विनंत्या (Requests)", icon: ClipboardList },
  { href: "/admin/farmers", labelMr: "शेतकरी यादी (Farmers)", icon: Users },
  { href: "/admin/commodities", labelMr: "शेतमाल व्यवस्थापन (Commodities)", icon: Sprout },
  { href: "/admin/transactions", labelMr: "व्यवहार नोंदवही (Transactions)", icon: Receipt },
  { href: "/admin/payments", labelMr: "पेमेंट पावत्या (Payments)", icon: CreditCard },
  { href: "/admin/buyers", labelMr: "खरेदीदार व्यापारी (Buyers)", icon: Building2 },
  { href: "/admin/reports", labelMr: "अहवाल व आकडेवारी (Reports)", icon: BarChart3 },
  { href: "/admin/audit-logs", labelMr: "ऑडिट नोंदी (Audit Logs)", icon: ShieldAlert },
  { href: "/admin/settings", labelMr: "सिस्टम सेटिंग्ज (Settings)", icon: Settings },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0E3813] text-white border-r border-emerald-950 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
          // Mobile positioning
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="h-18 flex items-center justify-between px-4 border-b border-emerald-900/60 bg-[#09260c]">
          <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#D97706] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Sprout className="w-5 h-5 text-amber-200" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm text-white leading-tight truncate">
                  {BUSINESS_CONFIG.nameMr}
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">
                  Admin Dashboard
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-[#16A34A] text-white font-bold shadow-sm"
                    : "text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white",
                  isCollapsed && "justify-center px-2"
                )}
                title={item.labelMr}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-emerald-300 group-hover:text-amber-300")} />
                {!isCollapsed && <span className="truncate">{item.labelMr}</span>}
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-emerald-900/60 bg-[#09260c] space-y-1">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors",
              isCollapsed && "justify-center px-2"
            )}
            title="सार्वजनिक वेबसाइट उघडा"
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-emerald-400" />
            {!isCollapsed && <span>पब्लिक वेबसाइट</span>}
          </Link>

          <Link
            href="/admin/login"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors",
              isCollapsed && "justify-center px-2"
            )}
            title="लॉगआउट"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>लॉगआउट (Exit)</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
