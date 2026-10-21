"use client";

import * as React from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { DemoBanner } from "@/components/ui/demo-banner";
import { cn } from "@/lib/utils";

interface AdminLayoutWrapperProps {
  title: string;
  subtitleMr?: string;
  children: React.ReactNode;
}

export function AdminLayoutWrapper({
  title,
  subtitleMr,
  children,
}: AdminLayoutWrapperProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <DemoBanner messageMr="ॲडमीन पोर्टल प्रात्यक्षिक (Demo Mode): हे पोर्टल केवळ व्हिज्युअल व फंक्शनल चाचणीसाठी आहे. येथे केलेले बदल तात्पुरते (in-memory) आहेत." />
        <AdminHeader
          title={title}
          subtitleMr={subtitleMr}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
