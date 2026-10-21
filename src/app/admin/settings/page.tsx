"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BUSINESS_CONFIG } from "@/config/business";
import { Save, CheckCircle2, Building, Phone, Percent, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const [businessNameMr, setBusinessNameMr] = React.useState(BUSINESS_CONFIG.nameMr);
  const [phone, setPhone] = React.useState(BUSINESS_CONFIG.contact.displayPhone);
  const [whatsApp, setWhatsApp] = React.useState(BUSINESS_CONFIG.contact.displayWhatsApp);
  const [email, setEmail] = React.useState(BUSINESS_CONFIG.contact.email);
  const [addressMr, setAddressMr] = React.useState(BUSINESS_CONFIG.registeredAddressMr);

  // Commission & Mandi deduction settings
  const [commissionPercent, setCommissionPercent] = React.useState("1.5");
  const [mandiCessPercent, setMandiCessPercent] = React.useState("1.0");
  const [hamaliPerQuintal, setHamaliPerQuintal] = React.useState("20");
  const [tolaiPerQuintal, setTolaiPerQuintal] = React.useState("5");

  // Notification toggles
  const [smsAlerts, setSmsAlerts] = React.useState(true);
  const [whatsAppAlerts, setWhatsAppAlerts] = React.useState(true);

  const [isSaved, setIsSaved] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 400);
  };

  return (
    <AdminLayoutWrapper
      title="व्यवसाय व सिस्टीम सेटिंग्ज (Business Settings)"
      subtitleMr="आडत कमिशन दर, बाजार समिती नियम, संपर्क माहिती आणि सूचना प्राधान्ये"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Save confirmation toast */}
        {isSaved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-[#14532D] text-xs md:text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            <span>सर्व सेटिंग्ज तात्पुरत्या इन-मेमरी सेव्ह झाल्या आहेत (Demo Prototype)!</span>
          </div>
        )}

        {/* Section 1: Business Profile & Office */}
        <Card className="shadow-xs">
          <CardHeader className="border-b border-[#F1F5F1] pb-3">
            <CardTitle className="text-base text-[#14532D] flex items-center gap-2">
              <Building className="w-4 h-4 text-[#16A34A]" />
              <span>व्यवसाय ओळख व नोंदणीकृत कार्यालय</span>
            </CardTitle>
            <CardDescription>
              बाजार समिती परवाना व दुकानाचे अधिकृत नाव व पत्ता
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  मराठी नाव
                </label>
                <input
                  type="text"
                  value={businessNameMr}
                  onChange={(e) => setBusinessNameMr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  नोंदणीकृत ईमेल
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#17231B]">
                नोंदणीकृत कार्यालय पत्ता (APMC Yard)
              </label>
              <textarea
                rows={2}
                value={addressMr}
                onChange={(e) => setAddressMr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Contact Numbers */}
        <Card className="shadow-xs">
          <CardHeader className="border-b border-[#F1F5F1] pb-3">
            <CardTitle className="text-base text-[#14532D] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#16A34A]" />
              <span>अधिकृत संपर्क क्रमांक (Phone & WhatsApp)</span>
            </CardTitle>
            <CardDescription>
              शेतकऱ्यांना वेबसाइटवर दिसणारे व कॉल/मेसेजसाठी वापरले जाणारे आकडे
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  कॉल संपर्क नंबर
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  WhatsApp बिझनेस नंबर
                </label>
                <input
                  type="text"
                  value={whatsApp}
                  onChange={(e) => setWhatsApp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Commission & APMC Rate Settings */}
        <Card className="shadow-xs">
          <CardHeader className="border-b border-[#F1F5F1] pb-3">
            <CardTitle className="text-base text-[#14532D] flex items-center gap-2">
              <Percent className="w-4 h-4 text-[#16A34A]" />
              <span>कमिशन व बाजार समिती कपात दर (Commission & Deductions)</span>
            </CardTitle>
            <CardDescription>
              व्यवहार नोंदवहीत हिशोब करण्यासाठी डीफॉल्ट सूत्र व दर
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  आडत कमिशन (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  मंडी उपकर (Cess %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={mandiCessPercent}
                  onChange={(e) => setMandiCessPercent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  हमाली (₹ / क्विंटल)
                </label>
                <input
                  type="number"
                  value={hamaliPerQuintal}
                  onChange={(e) => setHamaliPerQuintal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  तोलाई (₹ / क्विंटल)
                </label>
                <input
                  type="number"
                  value={tolaiPerQuintal}
                  onChange={(e) => setTolaiPerQuintal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs font-bold"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Notification Toggles */}
        <Card className="shadow-xs">
          <CardHeader className="border-b border-[#F1F5F1] pb-3">
            <CardTitle className="text-base text-[#14532D] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#16A34A]" />
              <span>सूचना प्राधान्ये (Notification Preferences)</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A]"
              />
              <span className="font-semibold text-[#17231B]">
                नवीन शेतमाल विनंती दाखल झाल्यावर कर्मचाऱ्यांना SMS / WhatsApp अलर्ट पाठवा
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={whatsAppAlerts}
                onChange={(e) => setWhatsAppAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A]"
              />
              <span className="font-semibold text-[#17231B]">
                सौदा निश्चिती व पेमेंट झाल्यावर शेतकऱ्याला स्वयंचलित SMS पावती पाठवा
              </span>
            </label>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            className="gap-2 px-8"
          >
            <Save className="w-4 h-4" />
            <span>सेटिंग्ज जतन करा (Save Settings)</span>
          </Button>
        </div>
      </form>
    </AdminLayoutWrapper>
  );
}
