"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DemoBanner } from "@/components/ui/demo-banner";
import { mockService } from "@/lib/mock-service";
import { FarmerSellingRequestInput, farmerSellingRequestSchema } from "@/lib/validation";
import { Commodity, SaleRequest } from "@/types";
import {
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

// Common talukas and districts in Maharashtra for quick selection / helper
const MAHARASHTRA_DISTRICTS = [
  "हिंगोली (Hingoli)",
  "नांदेड (Nanded)",
  "परभणी (Parbhani)",
  "वाशीम (Washim)",
  "लातूर (Latur)",
  "जालना (Jalna)",
  "यवतमाळ (Yavatmal)",
  "बीड (Beed)",
  "इतर जिल्हा",
];

export default function SellProducePage() {
  const [commodities, setCommodities] = React.useState<Commodity[]>([]);
  const [selectedCommodityId, setSelectedCommodityId] = React.useState<string>("");
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState<SaleRequest | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Load commodities for dropdown
  React.useEffect(() => {
    mockService.getCommodities().then((data) => {
      setCommodities(data);
      if (data.length > 0) {
        // Check URL params for preselected commodity
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const cid = params.get("commodity");
          if (cid && data.some((c) => c.id === cid)) {
            setSelectedCommodityId(cid);
          }
        }
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FarmerSellingRequestInput>({
    defaultValues: {
      farmerName: "",
      mobile: "",
      village: "",
      taluka: "",
      district: "हिंगोली (Hingoli)",
      commodityId: "",
      estimatedQuantity: undefined,
      unit: "QUINTAL",
      qualityGrade: "मध्यम / सामान्य",
      expectedSellingDate: "",
      notes: "",
    },
  });

  // Sync selected commodity to form
  React.useEffect(() => {
    if (selectedCommodityId) {
      setValue("commodityId", selectedCommodityId, { shouldValidate: true });
    }
  }, [selectedCommodityId, setValue]);

  // Handle local mock image selection & preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedImages.length + files.length > 4) {
      setFileError("जास्तीत जास्त ४ फोटो जोडता येतील.");
      return;
    }

    const newPreviews: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setFileError("फक्त फोटो (JPG, PNG, WebP) फाइल्स जोडा.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("फोटोचा आकार ५ MB पेक्षा लहान असावा.");
        return;
      }
      // Create object URL for local preview
      const previewUrl = URL.createObjectURL(file);
      newPreviews.push(previewUrl);
    }

    setUploadedImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const onSubmit = async (data: FarmerSellingRequestInput) => {
    setServerError(null);

    // Validate using Zod
    const validationResult = farmerSellingRequestSchema.safeParse(data);
    if (!validationResult.success) {
      setServerError(
        validationResult.error.issues[0]?.message ||
          "कृपया फॉर्ममधील माहिती पुन्हा तपासा."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await mockService.submitFarmerRequest(data, uploadedImages);
      if (res.success) {
        setSubmittedData(res.data);
      } else {
        setServerError("विनंती नोंदवताना अडचण आली. कृपया पुन्हा प्रयत्न करा.");
      }
    } catch {
      setServerError("अपेक्षित त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    reset();
    setUploadedImages([]);
    setSubmittedData(null);
    setServerError(null);
    setSelectedCommodityId("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#F8FAF8] py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title */}
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
              थेट शेतमाल विक्री नोंदणी
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14532D]">
              शेतमाल विक्री विनंती फॉर्म (Sell Produce)
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              तुमच्या शेतमालाचा तपशील खालील फॉर्ममध्ये भरा. आमचे खरेदी प्रतिनिधी तुमच्याशी थेट फोन किंवा WhatsApp वर संपर्क साधून पुढील व्यवस्था करतील.
            </p>
          </div>

          {/* Success Confirmation State */}
          {submittedData ? (
            <Card className="border-2 border-emerald-500 bg-white p-6 md:p-10 text-center shadow-lg animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold inline-block mb-3 border border-emerald-300">
                प्रात्यक्षिक नोंदणी यशस्वी (Demo Success)
              </span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#14532D] mb-2">
                आपली विनंती यशस्वीरित्या नोंदवली गेली आहे!
              </h2>

              <div className="p-4 my-6 bg-emerald-50 rounded-2xl border border-emerald-200 inline-block text-left w-full max-w-md">
                <div className="text-xs text-[#647067] font-semibold uppercase tracking-wider mb-1">
                  तुमचा युनिक विनंती क्रमांक (Demo Request ID):
                </div>
                <div className="text-xl md:text-2xl font-mono font-extrabold text-[#14532D] tracking-wide">
                  {submittedData.requestNumber}
                </div>
                <div className="pt-3 mt-3 border-t border-emerald-200/80 text-xs text-[#374151] space-y-1">
                  <div><strong>शेतकरी:</strong> {submittedData.farmerName}</div>
                  <div><strong>शेतमाल:</strong> {submittedData.commodityNameMr} ({submittedData.estimatedQuantity} {submittedData.unit})</div>
                  <div><strong>गाव व जिल्हा:</strong> {submittedData.farmerVillage}, {submittedData.farmerDistrict}</div>
                </div>
              </div>

              {/* Strict Demo Disclosure */}
              <div className="max-w-xl mx-auto mb-8">
                <DemoBanner
                  variant="inline"
                  messageMr="हा एक फ्रंटएंड डेमो आहे. ही विनंती आशिष एंटरप्राइजेसकडे इंटरनेटद्वारे थेट पाठवली गेलेली नाही, परंतु सिस्टीमच्या स्थानिक मेमरीमध्ये नोंदवली गेली आहे. खालील ट्रॅकिंग बटणावर क्लिक करून आपण स्टेटस पाहू शकता."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/track-request?requestId=${encodeURIComponent(submittedData.requestNumber)}&mobile=${encodeURIComponent(submittedData.farmerMobile)}`}
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <span>विनंती ट्रॅक करा (Track Request)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={buildWhatsAppLink({
                    farmerName: submittedData.farmerName,
                    village: submittedData.farmerVillage,
                    commodityName: submittedData.commodityNameMr,
                    quantity: submittedData.estimatedQuantity,
                    unit: submittedData.unit,
                    requestId: submittedData.requestNumber,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="leaf"
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp वर सांगा</span>
                  </Button>
                </a>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>दुसरी विनंती करा</span>
                </Button>
              </div>
            </Card>
          ) : (
            /* Form Component */
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="shadow-md">
                <CardHeader className="border-b border-[#F1F5F1] bg-white rounded-t-xl">
                  <CardTitle className="text-xl text-[#14532D]">
                    शेतमाल व शेतकऱ्याचा तपशील
                  </CardTitle>
                  <CardDescription>
                    सर्व आवश्यक (*) माहिती काळजीपूर्वक भरा, जेणेकरून खरेदी प्रतिनिधी योग्य भावाची माहिती देऊ शकतील.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 pt-6">
                  {/* Server error alert if any */}
                  {serverError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Section 1: Farmer Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#14532D] border-b border-[#E1E8E1] pb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#14532D] text-white flex items-center justify-center text-xs font-mono">
                        १
                      </span>
                      <span>शेतकऱ्याची माहिती (Farmer Information)</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Farmer Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          शेतकऱ्याचे संपूर्ण नाव <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("farmerName", { required: true })}
                          placeholder="उदा. तुकाराम संभाजी कदम"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                        />
                        {errors.farmerName && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.farmerName.message}
                          </p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          मोबाईल नंबर (१० अंकी) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#647067] font-semibold">
                            +९१
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            {...register("mobile", { required: true })}
                            placeholder="९८XXXXXXXX"
                            className="w-full pl-13 pr-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.mobile.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location: Village, Taluka, District */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          गाव <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("village", { required: true })}
                          placeholder="उदा. हट्टा / डिग्रस"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        />
                        {errors.village && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.village.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          तालुका <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("taluka", { required: true })}
                          placeholder="उदा. वसमत / सेनगाव"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        />
                        {errors.taluka && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.taluka.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          जिल्हा <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("district", { required: true })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        >
                          {MAHARASHTRA_DISTRICTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        {errors.district && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.district.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Commodity & Quantity */}
                  <div className="space-y-4 pt-4 border-t border-[#E1E8E1]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#14532D] border-b border-[#E1E8E1] pb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#14532D] text-white flex items-center justify-center text-xs font-mono">
                        २
                      </span>
                      <span>शेतमालाची माहिती (Produce Details)</span>
                    </h3>

                    {/* Commodity Selection Dropdown */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#17231B]">
                        शेतमालाचा प्रकार निवडा <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedCommodityId}
                        onChange={(e) => {
                          setSelectedCommodityId(e.target.value);
                          setValue("commodityId", e.target.value, { shouldValidate: true });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      >
                        <option value="">-- शेतमाल निवडा --</option>
                        {commodities.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nameMr} ({c.nameEn}) - {c.categoryNameMr}
                          </option>
                        ))}
                      </select>
                      {errors.commodityId && (
                        <p className="text-xs text-red-600 mt-1 font-medium">
                          {errors.commodityId.message}
                        </p>
                      )}
                    </div>

                    {/* Quantity and Unit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          अंदाजे प्रमाण (Quantity) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="1"
                          {...register("estimatedQuantity", {
                            valueAsNumber: true,
                            required: true,
                          })}
                          placeholder="उदा. २५"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        />
                        {errors.estimatedQuantity && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.estimatedQuantity.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          एकक (Unit) <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("unit")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        >
                          <option value="QUINTAL">क्विंटल (Quintal - १०० किलो)</option>
                          <option value="TONNE">टन (Tonne)</option>
                          <option value="KG">किलो (Kilogram)</option>
                        </select>
                        {errors.unit && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {errors.unit.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quality and Expected Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          मालाची गुणवत्ता / प्रतवारी (उदा. उत्तम, मध्यम, बारीक)
                        </label>
                        <input
                          type="text"
                          {...register("qualityGrade")}
                          placeholder="उदा. पॉलिश केलेली काडी, ओलावा १०%"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#17231B]">
                          विक्रीसाठी अपेक्षित तारीख (ऐच्छिक)
                        </label>
                        <input
                          type="date"
                          {...register("expectedSellingDate")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-1.5 pt-2">
                      <label className="block text-xs font-bold text-[#17231B]">
                        अतिरिक्त माहिती किंवा विशेष टीप (ऐच्छिक)
                      </label>
                      <textarea
                        rows={3}
                        {...register("notes")}
                        placeholder="मालाविषयी काही विशेष सांगायचे असल्यास येथे लिहा (उदा. पोत्यांची संख्या, वाहतुकीची सोय आहे की नाही)..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                    </div>
                  </div>

                  {/* Section 3: Produce Images Upload */}
                  <div className="space-y-4 pt-4 border-t border-[#E1E8E1]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#14532D] border-b border-[#E1E8E1] pb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#14532D] text-white flex items-center justify-center text-xs font-mono">
                        ३
                      </span>
                      <span>शेतमालाचे फोटो (Produce Photos - ऐच्छिक)</span>
                    </h3>

                    <p className="text-xs text-[#647067]">
                      मालाचे स्पष्ट फोटो जोडल्यास खरेदी प्रतिनिधींना योग्य प्रतवारी व अंदाज बांधणे अधिक सोपे जाते. (कमाल ४ फोटो, प्रति फोटो कमाल ५ MB).
                    </p>

                    {/* File upload box */}
                    <div className="border-2 border-dashed border-[#E1E8E1] hover:border-[#16A34A] rounded-2xl p-6 text-center bg-[#F8FAF8] transition-colors relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploadedImages.length >= 4}
                      />
                      <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                        <Upload className="w-8 h-8 text-[#16A34A]" />
                        <div className="text-xs md:text-sm font-semibold text-[#14532D]">
                          फोटो निवडण्यासाठी येथे क्लिक करा किंवा ड्रॅग करा
                        </div>
                        <div className="text-[11px] text-[#647067]">
                          JPG, PNG किंवा WebP स्वरूप
                        </div>
                      </div>
                    </div>

                    {fileError && (
                      <p className="text-xs text-red-600 font-semibold">{fileError}</p>
                    )}

                    {/* Image Previews */}
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {uploadedImages.map((src, idx) => (
                          <div
                            key={idx}
                            className="relative rounded-xl border border-[#E1E8E1] overflow-hidden aspect-square group bg-white"
                          >
                            <img
                              src={src}
                              alt={`Upload preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white shadow-xs hover:bg-red-700 transition-colors"
                              title="फोटो काढा"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button & Disclaimers */}
                  <div className="pt-6 border-t border-[#E1E8E1] space-y-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full text-base font-bold shadow-md"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "विनंती पाठवत आहे..." : "शेतमाल विक्री विनंती पाठवा"}
                    </Button>

                    <p className="text-[11px] text-[#647067] text-center leading-relaxed">
                      * ही माहिती पाठवून आपण आशिष एंटरप्राइजेसला आपल्याशी फोन अथवा WhatsApp वर संपर्क साधण्याची परवानगी देत आहात. अंतिम भाव बाजार समिती लिलावावर अवलंबून असेल.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
