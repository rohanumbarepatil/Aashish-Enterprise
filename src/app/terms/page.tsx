import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { BUSINESS_CONFIG } from "@/config/business";

export const metadata = {
  title: "नियम व अटी | आशिष एंटरप्राइजेस (Terms & Conditions)",
  description: "कृषी उत्पन्न बाजार समिती नियमांनुसार आशिष एंटरप्राइजेसचे व्यापार नियम व अटी.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 border-b border-[#E1E8E1] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              कायदेशीर नियम
            </span>
            <h1 className="text-3xl font-extrabold text-[#14532D]">
              नियम व अटी (Terms & Conditions)
            </h1>
            <p className="text-xs text-[#647067]">
              शेवटचे अद्यतन: २१ ऑक्टोबर २०२६ | {BUSINESS_CONFIG.nameMr}
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#374151] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                १. बाजारभाव आणि लिलाव नियम
              </h2>
              <p>
                शेतमालाचे दर हे कृषी उत्पन्न बाजार समितीच्या (APMC) दैनंदिन लिलावावर, बाजारातील एकूण आवक-जावक स्थितीवर आणि प्रत्यक्ष मालाच्या प्रतवारीवर (ओलावा, रंग, स्वच्छता, कचरा प्रमाण) ठरवले जातात. वेबसाईटवर दर्शविलेली किंवा फोनवर सांगितलेली माहिती ही अंदाजे मार्गदर्शक असून अंतिम दर प्रत्यक्ष तपासणीनंतरच निश्चित होतो.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                २. तोलाई आणि हमालीचे नियम
              </h2>
              <p>
                शेतमालाचे वजन बाजार समिती मान्यताप्राप्त अधिकृत वजन काट्यावर केले जाते. हमाली व तोलाई शुल्क हे संबंधित APMC बाजार समितीच्या शासकीय नियमानुसार आकारले जाते आणि त्याचा स्पष्ट उल्लेख अंतिम वजन पावतीवर असतो.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                ३. हिशोब आणि पेमेंट
              </h2>
              <p>
                मालाचा सौदा आणि वजन पूर्ण झाल्यानंतर शेतकऱ्याला ठरल्यानुसार रोख किंवा अधिकृत बँक ट्रान्सफरद्वारे (NEFT / RTGS / UPI) रक्कम अदा केली जाते. बँक खात्याचे तपशील योग्य देण्याची जबाबदारी शेतकऱ्याची असते.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                ४. हमीभावाची स्पष्टोक्ती
              </h2>
              <p>
                आशिष एंटरप्राइजेस कोणतीही अनधिकृत किंवा पूर्व-निश्चित नफ्याची खोटी हमी देत नाही. शेतमालाचा व्यापार हा पूर्णपणे पारदर्शक आणि बाजारपेठेतील वास्तविक परिस्थितीवर आधारित असतो.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
