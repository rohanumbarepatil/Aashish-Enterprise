"use client";

import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        {/* Banner */}
        <section className="bg-gradient-to-b from-[#ECFDF5] to-white py-12 md:py-16 border-b border-[#E1E8E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
              थेट संवाद
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D]">
              आमच्याशी संपर्क साधा (Contact Us)
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              शेतमाल विक्री, आवक, तोलाई किंवा APMC बाजार समितीतील कामकाजाविषयी माहितीसाठी कधीही संपर्क करा.
            </p>
          </div>
        </section>

        {/* Contact Body */}
        <section className="py-14 md:py-18">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Direct Action Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-[#14532D]">
                    कार्यालय व थेट संपर्क पर्याय
                  </h2>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    शेतकऱ्यांच्या सोयीसाठी आम्ही फोन आणि WhatsApp द्वारे जलद प्रतिसाद देतो.
                  </p>
                </div>

                {/* Call Card */}
                <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center">
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#647067]">
                        थेट फोन कॉल
                      </div>
                      <div className="text-base font-bold text-[#14532D]">
                        {BUSINESS_CONFIG.contact.displayPhone}
                      </div>
                    </div>
                  </div>
                  <a href={buildCallLink()} className="block">
                    <Button variant="primary" size="sm" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      <span>आता कॉल करा</span>
                    </Button>
                  </a>
                </div>

                {/* WhatsApp Card */}
                <div className="p-5 rounded-2xl border border-emerald-200 bg-[#ECFDF5] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#647067]">
                        WhatsApp वर संदेश पाठवा
                      </div>
                      <div className="text-base font-bold text-[#14532D]">
                        {BUSINESS_CONFIG.contact.displayWhatsApp}
                      </div>
                    </div>
                  </div>
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="leaf"
                      size="sm"
                      className="w-full gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp चॅट सुरू करा</span>
                    </Button>
                  </a>
                </div>

                {/* Office Info Card */}
                <div className="p-5 rounded-2xl border border-[#E1E8E1] bg-[#F8FAF8] space-y-3 text-xs md:text-sm text-[#374151]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong>नोंदणीकृत पत्ता:</strong>
                      <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                        {BUSINESS_CONFIG.registeredAddressMr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-[#E1E8E1]">
                    <Clock className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong>कामकाजाची वेळ:</strong>
                      <p className="text-xs text-[#4B5563] mt-1">
                        {BUSINESS_CONFIG.contact.workingHoursMr}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <Card className="shadow-md">
                  <CardHeader className="border-b border-[#F1F5F1]">
                    <CardTitle className="text-xl text-[#14532D]">
                      आम्हाला संदेश पाठवा (Send a Message)
                    </CardTitle>
                    <CardDescription>
                      आपला प्रश्न किंवा अभिप्राय खालील फॉर्मद्वारे नोंदवा.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    {isSubmitted ? (
                      <div className="text-center py-10 space-y-4">
                        <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto" />
                        <h3 className="text-lg font-bold text-[#14532D]">
                          आपला संदेश प्राप्त झाला आहे!
                        </h3>
                        <p className="text-xs md:text-sm text-[#4B5563] max-w-md mx-auto">
                          आमचे प्रतिनिधी लवकरच आपल्या मोबाईल नंबरवर संपर्क साधतील.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsSubmitted(false)}
                        >
                          दुसरा संदेश पाठवा
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-[#17231B]">
                              आपले नाव <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="उदा. मारोती कदम"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-[#17231B]">
                              मोबाईल नंबर <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              maxLength={10}
                              required
                              placeholder="९८XXXXXXXX"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#17231B]">
                            विषय <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="उदा. हळद आवक आणि भाव चौकशी"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#17231B]">
                            आपला संदेश <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            rows={4}
                            required
                            placeholder="आपल्याला काय विचारायचे आहे ते येथे सविस्तर लिहा..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          isLoading={isSubmitting}
                          className="w-full gap-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>संदेश पाठवा</span>
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
