"use client";

import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Mail,
  Navigation,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const isEn = language === "en";

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    commodity: "Wheat — गहू",
    quantity: "",
    message: "",
  });

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

  const handleWhatsAppSend = () => {
    const waText = isEn
      ? `Hello Ashish Enterprises,\nName: ${formData.name || "N/A"}\nPhone: ${formData.phone || "N/A"}\nCommodity: ${formData.commodity}\nQuantity: ${formData.quantity || "N/A"}\nMessage: ${formData.message || "Enquiry regarding agricultural commodity."}`
      : `नमस्कार आशिष एंटरप्राइजेस,\nनाव: ${formData.name || "N/A"}\nफोन: ${formData.phone || "N/A"}\nशेतमाल: ${formData.commodity}\nप्रमाण: ${formData.quantity || "N/A"}\nसंदेश: ${formData.message || "शेतमाल खरेदी-विक्री बाबत चौकशी."}`;

    window.open(
      `https://wa.me/${BUSINESS_CONFIG.contact.whatsAppNumber}?text=${encodeURIComponent(waText)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        {/* Banner */}
        <section className="bg-gradient-to-b from-[#ECFDF5] to-white py-12 md:py-16 border-b border-[#E1E8E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
              {t("थेट संवाद व संपर्क", "Direct Communication & Contact")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D]">
              {t("आमच्याशी संपर्क साधा (Contact Us)", "Contact Ashish Enterprises")}
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t(
                "शेतमाल खरेदी-विक्री, चालू बाजारभाव, तोलाई किंवा APMC बाजार समितीतील कामकाजाविषयी माहितीसाठी कधीही संपर्क करा.",
                "Reach out directly for agricultural commodity buying, selling, current APMC rates, or business partnerships."
              )}
            </p>
          </div>
        </section>

        {/* Contact Body */}
        <section className="py-14 md:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Direct Action Cards (Section 7 requirements) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold text-[#14532D]">
                    {t("कार्यालय व थेट संपर्क पर्याय", "Contact Information & CTAs")}
                  </h2>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {t(
                      "शेतकरी बांधव आणि व्यापाऱ्यांच्या सोयीसाठी फोन, WhatsApp, ईमेल आणि दुकानाचे थेट लोकेशन खालीलप्रमाणे उपलब्ध आहे.",
                      "Connect with us directly via phone, WhatsApp, email, Instagram, or visit our shop on Google Maps."
                    )}
                  </p>
                </div>

                {/* 1. Phone Card */}
                <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center shadow-xs">
                        <Phone className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#647067]">
                          {t("फोन नंबर (Phone)", "Phone Number")}
                        </div>
                        <div className="text-lg font-bold text-[#14532D]">
                          {BUSINESS_CONFIG.contact.displayPhone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href={buildCallLink()} className="block">
                    <Button variant="primary" size="sm" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{t("आत्ताच कॉल करा", "Call Now")}</span>
                    </Button>
                  </a>
                </div>

                {/* 2. WhatsApp Card */}
                <div className="p-5 rounded-2xl border border-emerald-200 bg-[#ECFDF5] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#647067]">
                          {t("WhatsApp नंबर", "WhatsApp")}
                        </div>
                        <div className="text-lg font-bold text-[#14532D]">
                          {BUSINESS_CONFIG.contact.displayWhatsApp}
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={buildWhatsAppLink({ lang: language })}
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
                      <span>{t("WhatsApp वर संपर्क करा", "Chat on WhatsApp")}</span>
                    </Button>
                  </a>
                </div>

                {/* 3. Shop Location / Google Maps Card */}
                <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <MapPin className="w-5 h-5 text-amber-200" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#647067]">
                        {t("दुकानाचे ठिकाण (Shop Location)", "Shop Location")}
                      </div>
                      <div className="text-sm font-bold text-blue-950">
                        {t("Visit Our Shop (Google Maps)", "Visit Our Shop")}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#4B5563]">
                    {t(BUSINESS_CONFIG.registeredAddressMr, BUSINESS_CONFIG.registeredAddressEn)}
                  </p>
                  <a
                    href={BUSINESS_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 border-blue-300 text-blue-800 hover:bg-blue-100"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{t("दुकानाचा मार्ग पहा (Get Directions)", "Get Directions")}</span>
                    </Button>
                  </a>
                </div>

                {/* 4. Email & Instagram Quick Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email */}
                  <div className="p-4 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-xs font-bold text-[#14532D]">
                        {t("ई-मेल (Email)", "Email")}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5563] truncate">
                      {BUSINESS_CONFIG.contact.email}
                    </p>
                    <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="block pt-1">
                      <Button variant="outline" size="sm" className="w-full text-xs py-1 h-8">
                        <span>{t("ई-मेल करा", "Email Us")}</span>
                      </Button>
                    </a>
                  </div>

                  {/* Instagram */}
                  <div className="p-4 rounded-xl border border-pink-200 bg-pink-50/40 space-y-2">
                    <div className="flex items-center gap-2">
                      <InstagramIcon className="w-4 h-4 text-pink-600" />
                      <span className="text-xs font-bold text-pink-900">Instagram</span>
                    </div>
                    <p className="text-xs text-[#4B5563] truncate">
                      {BUSINESS_CONFIG.instagramHandle}
                    </p>
                    <a
                      href={BUSINESS_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block pt-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs py-1 h-8 border-pink-300 text-pink-800 hover:bg-pink-100"
                      >
                        <span>{t("Follow करा", "Follow on Instagram")}</span>
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Working hours */}
                <div className="p-4 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] flex items-center gap-3 text-xs text-[#4B5563]">
                  <Clock className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>
                    <strong>{t("कामकाजाची वेळ:", "Trading Hours:")}</strong>{" "}
                    {t(BUSINESS_CONFIG.contact.workingHoursMr, BUSINESS_CONFIG.contact.workingHoursEn)}
                  </span>
                </div>
              </div>

              {/* Right Column: Contact & Enquiry Form (Section 23 requirements) */}
              <div className="lg:col-span-7">
                <Card className="shadow-md border-[#E1E8E1]">
                  <CardHeader className="border-b border-[#F1F5F1] bg-[#F8FAF8]/50">
                    <CardTitle className="text-xl text-[#14532D]">
                      {t("चौकशी संदेश पाठवा (Send Enquiry)", "Send Business Enquiry")}
                    </CardTitle>
                    <CardDescription>
                      {t(
                        "शेतमाल खरेदी किंवा विक्रीबाबत आपली माहिती खालील फॉर्ममध्ये भरा.",
                        "Fill out your details below to enquire about commodity buying or selling."
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    {isSubmitted ? (
                      <div className="text-center py-10 space-y-4">
                        <CheckCircle2 className="w-14 h-14 text-[#16A34A] mx-auto" />
                        <h3 className="text-xl font-bold text-[#14532D]">
                          {t("आपला संदेश प्राप्त झाला आहे!", "Enquiry Received Successfully!")}
                        </h3>
                        <p className="text-xs md:text-sm text-[#4B5563] max-w-md mx-auto">
                          {t(
                            "आशिष एंटरप्राइजेसचे प्रतिनिधी लवकरच आपल्या फोन नंबरवर संपर्क साधतील.",
                            "Our representative will contact you shortly regarding your enquiry."
                          )}
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleWhatsAppSend}
                            className="gap-2 bg-[#25D366] hover:bg-[#1EBE5D]"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{t("WhatsApp वरही पाठवा", "Also Send on WhatsApp")}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsSubmitted(false)}
                          >
                            {t("नवीन संदेश पाठवा", "Send Another Enquiry")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-[#17231B]">
                              {t("आपले नाव (Name)", "Your Name")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              placeholder={t("उदा. राहुल कदम", "e.g. Rahul Kadam")}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>

                          {/* Phone Number */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-[#17231B]">
                              {t("मोबाईल नंबर (Phone Number)", "Phone Number")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              pattern="[0-9]{10}"
                              maxLength={10}
                              required
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              placeholder="9922XXXXXX"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>
                        </div>

                        {/* Commodity Dropdown (5 requested commodities + other) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-[#17231B]">
                              {t("शेतमाल निवडा (Commodity)", "Select Commodity")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={formData.commodity}
                              onChange={(e) =>
                                setFormData({ ...formData, commodity: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                            >
                              <option value="Wheat — गहू">Wheat — गहू</option>
                              <option value="Jowar / Sorghum — ज्वारी">
                                Jowar / Sorghum — ज्वारी
                              </option>
                              <option value="Turmeric — हळद">Turmeric — हळद</option>
                              <option value="टाळक्या">टाळक्या (Talakya)</option>
                              <option value="Cotton — कापूस">Cotton — कापूस</option>
                              <option value="Soybean — सोयाबीन">Soybean — सोयाबीन</option>
                              <option value="Gram / Chana — हरभरा">Gram / Chana — हरभरा</option>
                              <option value="Other — इतर शेतमाल">Other — इतर शेतमाल</option>
                            </select>
                          </div>

                          {/* Quantity (optional) */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-[#17231B]">
                              {t("अंदाजे प्रमाण (Quantity - Optional)", "Quantity (Optional)")}
                            </label>
                            <input
                              type="text"
                              value={formData.quantity}
                              onChange={(e) =>
                                setFormData({ ...formData, quantity: e.target.value })
                              }
                              placeholder={t("उदा. ५० क्विंटल / पोते", "e.g. 50 Quintals / Bags")}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>
                        </div>

                        {/* Requirement / Message */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#17231B]">
                            {t("आपला संदेश / मागणी (Requirement / Message)", "Requirement / Message")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder={t(
                              "आपल्याला माल विकायचा आहे की खरेदी करायचा आहे, आणि इतर तपशील येथे लिहा...",
                              "Please specify whether you are buying or selling, and any specific requirements..."
                            )}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                          />
                        </div>

                        {/* Submit Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            isLoading={isSubmitting}
                            className="flex-1 gap-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>{t("चौकशी पाठवा (Send Enquiry)", "Send Enquiry")}</span>
                          </Button>

                          <Button
                            type="button"
                            variant="leaf"
                            size="md"
                            onClick={handleWhatsAppSend}
                            className="gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{t("WhatsApp वर पाठवा", "Send via WhatsApp")}</span>
                          </Button>
                        </div>
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
