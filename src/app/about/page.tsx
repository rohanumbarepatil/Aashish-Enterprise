import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { BUSINESS_CONFIG } from "@/config/business";
import { Scale, ShieldCheck, MapPin, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "आमच्याबद्दल | आशिष एंटरप्राइजेस (About Ashish Enterprises)",
  description:
    "आशिष एंटरप्राइजेस - हिंगोली व मराठवाड्यातील कृषी उत्पन्न बाजार समिती परवानाधारक आडत व शेतमाल व्यापार व्यवसाय.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        {/* Page Banner */}
        <section className="bg-gradient-to-b from-[#ECFDF5] to-white py-12 md:py-16 border-b border-[#E1E8E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
              आमची ओळख व कार्यपद्धती
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D]">
              आशिष एंटरप्राइजेस विषयी (About Us)
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {BUSINESS_CONFIG.taglineMr}. कृषी उत्पन्न बाजार समिती परवानाधारक आडत व शेतमाल व्यापार सेवा.
            </p>
          </div>
        </section>

        {/* Business Overview & Journey */}
        <section className="py-14 md:py-18">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#14532D]">
                  शेतकरी आणि बाजारपेठेतील मजबूत दुवा
                </h2>
                <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
                  आशिष एंटरप्राइजेसची स्थापना हिंगोली (मराठवाडा) येथे झाली. हिंगोली जिल्हा हा हळदीचे भारतातील एक अग्रगण्य केंद्र मानला जातो. या भागात उत्पादित होणारी उच्च कुरकुमीन हळद, दर्जेदार सोयाबीन, कापूस आणि रब्बी कडधान्ये यांना योग्य बाजारपेठ मिळवून देणे हे आमचे उद्दिष्ट आहे.
                </p>
                <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
                  आम्ही केवळ माल खरेदी करत नाही, तर बाजार समितीच्या अधिकृत यार्डात पारदर्शक लिलाव, इलेक्ट्रॉनिक धर्मकाट्यावर वजन, आणि तात्काळ हिशोब या तीन तत्त्वांवर शेतकरी बांधवांशी नाते जोडतो.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E1E8E1] bg-[#F8FAF8] p-6 md:p-8 space-y-5 shadow-xs">
                <h3 className="text-lg font-bold text-[#14532D] border-b border-[#E1E8E1] pb-3">
                  आमची प्रमुख व्यावसायिक वैशिष्ट्ये
                </h3>
                <ul className="space-y-3.5 text-sm text-[#374151]">
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span><strong>इलेक्ट्रॉनिक काटा:</strong> अधिकृत प्रमाणित काट्यावर अचूक वजन.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span><strong>APMC नियमांचे पालन:</strong> सर्व व्यवहार शासकीय बाजार समितीच्या नियमावलीनुसार.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span><strong>प्रमाणिक हिशोब:</strong> कमिशन, हमाली आणि तोलाईच्या दरांची पारदर्शक पट्टी.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span><strong>स्थानिक नेटवर्क:</strong> हिंगोली, वसमत, नांदेड, परभणी आणि लातूर बाजारपेठेत कार्यरत.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Operating Mandis */}
            <div className="p-8 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-4">
              <h3 className="text-xl font-bold text-[#14532D]">
                आमचे कार्यक्षेत्र (APMC Mandis)
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                आम्ही प्रामुख्याने खालील कृषी उत्पन्न बाजार समित्यांमध्ये शेतमाल खरेदी व आडतीचे व्यवहार सांभाळतो:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {BUSINESS_CONFIG.apmcOperatingMarkets.map((mandi) => (
                  <div
                    key={mandi}
                    className="p-3 bg-white rounded-xl border border-[#A7F3D0] text-xs font-semibold text-[#14532D] shadow-2xs"
                  >
                    • {mandi}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center space-y-4 pt-6 border-t border-[#E1E8E1]">
              <h3 className="text-xl md:text-2xl font-bold text-[#14532D]">
                आमच्याशी थेट संपर्क साधा
              </h3>
              <p className="text-sm text-[#4B5563]">
                तुमच्या शेतमालाच्या विक्रीविषयी किंवा बाजारभावाबाबत माहिती हवी असल्यास थेट विनंती पाठवा.
              </p>
              <Link href="/sell-produce">
                <Button variant="primary" size="lg" className="gap-2">
                  <span>शेतमाल विक्री विनंती फॉर्म</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
