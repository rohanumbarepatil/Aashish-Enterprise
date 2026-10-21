"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DemoBanner } from "@/components/ui/demo-banner";
import { BUSINESS_CONFIG } from "@/config/business";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@ashishenterprises.local");
  const [password, setPassword] = React.useState("demo123456");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("कृपया वैध ईमेल पत्ता प्रविष्ट करा.");
      return;
    }
    if (!password || password.length < 6) {
      setError("पासवर्ड किमान ६ अक्षरांचा असावा.");
      return;
    }

    setIsLoading(true);
    // Simulate brief authentication check
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between">
      <DemoBanner messageMr="ॲडमीन लॉगिन प्रात्यक्षिक (Demo Preview): उत्पादन सुरक्षेसाठी प्रत्यक्ष बॅकएंड ऑथेंटिकेशन पुढील टप्प्यात जोडले जाईल." />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full space-y-6">
          {/* Logo & Brand Heading */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14532D] to-[#16A34A] flex items-center justify-center text-white mx-auto shadow-md">
              <Sprout className="w-8 h-8 text-amber-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#14532D]">
              {BUSINESS_CONFIG.nameMr}
            </h1>
            <p className="text-xs font-semibold text-[#647067] uppercase tracking-wider">
              कर्मचारी व व्यवस्थापक पोर्टल (Staff Login)
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg border-[#E1E8E1] bg-white">
            <CardHeader className="border-b border-[#F1F5F1] pb-4">
              <CardTitle className="text-lg text-[#14532D]">
                खात्यात प्रवेश करा (Sign In)
              </CardTitle>
              <CardDescription>
                अधिकृत कामकाज सांभाळण्यासाठी आपली माहिती प्रविष्ट करा.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#17231B]">
                    ईमेल आयडी (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@ashishenterprises.local"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#17231B]">
                      पासवर्ड (Password)
                    </label>
                    <Link
                      href="/admin/forgot-password"
                      className="text-xs text-[#16A34A] hover:underline"
                    >
                      पासवर्ड विसरलात?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#647067] hover:text-[#17231B]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full font-bold gap-2 mt-2"
                >
                  <span>पोर्टलमध्ये प्रवेश करा (Sign In)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Demo Helper Hint */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-[#14532D] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                    <span>डेमो क्रेडेंशियल्स (Pre-filled):</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#4B5563]">
                    User: admin@ashishenterprises.local / Pass: demo123456
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-[#647067]">
            <Link href="/" className="hover:text-[#14532D] hover:underline">
              ← मुख्य सार्वजनिक वेबसाईटवर परत जा
            </Link>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-[#647067] border-t border-[#E1E8E1]">
        © 2026 {BUSINESS_CONFIG.nameMr}. सर्व हक्क सुरक्षित.
      </div>
    </div>
  );
}
