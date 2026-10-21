"use client";

import * as React from "react";
import Link from "next/link";
import { Sprout, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DemoBanner } from "@/components/ui/demo-banner";
import { BUSINESS_CONFIG } from "@/config/business";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between">
      <DemoBanner messageMr="पासवर्ड रीसेट प्रात्यक्षिक: उत्पादन वातावरणात अधिकृत ईमेलद्वारे सिंगल-यूज रीसेट टोकन पाठवले जाईल." />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14532D] to-[#16A34A] flex items-center justify-center text-white mx-auto shadow-md">
              <Sprout className="w-8 h-8 text-amber-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#14532D]">
              पासवर्ड रीसेट (Password Recovery)
            </h1>
          </div>

          <Card className="shadow-lg border-[#E1E8E1] bg-white">
            <CardHeader className="border-b border-[#F1F5F1] pb-4">
              <CardTitle className="text-lg text-[#14532D]">
                आपला ईमेल प्रविष्ट करा
              </CardTitle>
              <CardDescription>
                नोंदणीकृत ईमेलवर पासवर्ड रीसेट करण्याची लिंक पाठवली जाईल.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {isSent ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto" />
                  <h3 className="text-base font-bold text-[#14532D]">
                    रीसेट लिंक पाठवली आहे!
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    <strong>{email}</strong> या पत्त्यावर पासवर्ड बदलण्याची प्रात्यक्षिक लिंक पाठवली आहे.
                  </p>
                  <Link href="/admin/login" className="block pt-2">
                    <Button variant="primary" size="sm" className="w-full">
                      लॉगिन स्क्रीनवर परत जा
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#17231B]">
                      ईमेल पत्ता <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@ashishenterprises.local"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    className="w-full font-bold"
                  >
                    रीसेट लिंक पाठवा (Send Link)
                  </Button>

                  <div className="text-center pt-2">
                    <Link
                      href="/admin/login"
                      className="text-xs text-[#16A34A] hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>लॉगिन पृष्ठावर परत जा</span>
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-[#647067] border-t border-[#E1E8E1]">
        © 2026 {BUSINESS_CONFIG.nameMr}. सर्व हक्क सुरक्षित.
      </div>
    </div>
  );
}
