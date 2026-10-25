// ==============================================================================
// Ashish Enterprises (आशिष एंटरप्राइजेस) - Centralized Business Configuration
// All business details, contact information, APMC markets, and disclaimers are
// managed here to ensure consistency and prevent fabricated data.
// ==============================================================================

export interface BusinessConfig {
  nameEn: string;
  nameMr: string;
  taglineMr: string;
  taglineEn: string;
  businessTypeMr: string;
  businessTypeEn: string;
  businessModelMr: string;
  businessModelEn: string;
  aboutTextMr: string;
  aboutTextEn: string;
  marketTypeMr: string;
  primaryLocationMr: string;
  primaryLocationEn: string;
  mapsUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  apmcOperatingMarkets: string[];
  registeredAddressMr: string;
  registeredAddressEn: string;
  contact: {
    primaryPhone: string;
    displayPhone: string;
    whatsAppNumber: string;
    displayWhatsApp: string;
    email: string;
    workingHoursMr: string;
    workingHoursEn: string;
  };
  disclaimers: {
    pricingNoticeMr: string;
    pricingNoticeEn: string;
    licensingNoticeMr: string;
    licensingNoticeEn: string;
    demoNoticeMr: string;
    demoNoticeEn: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  nameEn: "Ashish Enterprises",
  nameMr: "आशिष एंटरप्राइजेस",
  taglineMr: "विश्वासार्ह कृषी माल व्यापार",
  taglineEn: "Trusted Agricultural Commodity Trading",
  businessTypeMr: "कृषी माल व्यापार व आडत व्यवसाय (APMC)",
  businessTypeEn: "Agricultural Commodity Trading / Adat Business",
  businessModelMr:
    "आम्ही शेतकऱ्यांकडून दर्जेदार कृषी माल खरेदी करून विश्वासार्ह मोठ्या व्यापाऱ्यांपर्यंत पोहोचवतो.",
  businessModelEn:
    "We source quality agricultural commodities from farmers and connect them with reliable large buyers through a transparent and efficient trading process.",
  aboutTextMr:
    "आशिष एंटरप्राइजेस हा कृषी मालाच्या व्यापाराशी संबंधित व्यवसाय आहे. आम्ही शेतकऱ्यांकडून गहू, ज्वारी, हळद, टाळक्या आणि कापूस यांसारखा कृषी माल घेऊन मोठ्या व्यापाऱ्यांपर्यंत पोहोचवतो. विश्वासार्ह व्यावसायिक संबंध, सोपा संपर्क आणि कार्यक्षम व्यापार प्रक्रिया यावर आमचा भर आहे.",
  aboutTextEn:
    "Ashish Enterprises is an agricultural commodity trading business that works with farmers and large merchants. We deal in commodities such as wheat, jowar, turmeric, टाळक्या and cotton. Our focus is on building reliable business relationships, making communication easier, and creating an efficient connection between agricultural producers and buyers.",
  marketTypeMr: "कृषी उत्पन्न बाजार समिती (APMC) परवानाधारक आडत व खरेदी-विक्री",
  primaryLocationMr: "हिंगोली, महाराष्ट्र",
  primaryLocationEn: "Hingoli, Maharashtra, India",
  mapsUrl: "https://maps.app.goo.gl/i6LAYe14zpZYp9j68?g_st=ic",
  instagramUrl: "https://www.instagram.com/shridharbawge",
  instagramHandle: "@shridharbawge",
  apmcOperatingMarkets: [
    "हिंगोली मुख्य बाजार समिती (Hingoli APMC)",
    "वसमत कृषी बाजार (Basmath APMC)",
    "नांदेड हळद व धान्य मार्केट (Nanded Market)",
    "लातूर सोयाबीन व कडधान्य मंडी (Latur Mandi)",
    "परभणी कापूस व धान्य केंद्र (Parbhani APMC)",
  ],
  registeredAddressMr:
    "गाळा क्र. २८, मुख्य कृषी उत्पन्न बाजार समिती (APMC) यार्ड, हिंगोली, महाराष्ट्र - ४३१५१३",
  registeredAddressEn:
    "Shop No. 28, Main APMC Market Yard, Hingoli, Maharashtra - 431513",
  contact: {
    primaryPhone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+919922652111",
    displayPhone: "9922652111",
    whatsAppNumber: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "919922652111",
    displayWhatsApp: "9922652111",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "aashishpawde13@gmail.com",
    workingHoursMr: "सोमवार ते शनिवार: सकाळी ९:०० ते संध्याकाळी ७:०० (बाजार समिती कामाच्या दिवशी)",
    workingHoursEn: "Monday to Saturday: 9:00 AM to 7:00 PM (On APMC Trading Days)",
  },
  disclaimers: {
    pricingNoticeMr:
      "शेतमालाचे दर हे बाजार समितीतील दैनंदिन लिलाव, आवक, आणि मालाची गुणवत्ता (ओलावा, प्रतवारी, स्वच्छता) यावर अवलंबून असतात. कोणतीही पूर्व-निश्चित किंवा हमीभावाची खोटी हमी दिली जात नाही.",
    pricingNoticeEn:
      "Commodity prices depend on daily APMC auction rates, market arrivals, and produce quality (moisture, grading, cleanliness). No misleading guarantees are made.",
    licensingNoticeMr:
      "आशिष एंटरप्राइजेस हे कृषी उत्पन्न बाजार समितीच्या नियमांनुसार व स्थानिक बाजार नियमावलीनुसार शेतमाल खरेदी-विक्री व आडत व्यवहार करते.",
    licensingNoticeEn:
      "Ashish Enterprises operates agricultural commodity trading and adat services in compliance with APMC regulations.",
    demoNoticeMr:
      "ही वेबसाइट सध्या प्रात्यक्षिक (Demo Frontend) स्वरूपात आहे. यावर सबमिट केलेली माहिती थेट प्रत्यक्ष व्यवहारासाठी ग्राह्य धरली जात नाही.",
    demoNoticeEn:
      "This is a frontend demonstration prototype. Data submitted in this demo mode is not saved to a production database.",
  },
};

