import {
  Commodity,
  SaleRequest,
  RequestStatus,
  PublicTrackingResponse,
  TrackingTimelineStage,
  Transaction,
  Payment,
  Buyer,
  AuditLog,
  DashboardStats,
  Farmer,
} from "@/types";
import {
  MOCK_COMMODITIES,
  MOCK_REQUESTS,
  MOCK_TRANSACTIONS,
  MOCK_PAYMENTS,
  MOCK_BUYERS,
  MOCK_AUDIT_LOGS,
  MOCK_DASHBOARD_STATS,
} from "./mock-data";
import { FarmerSellingRequestInput } from "./validation";
import { maskName } from "./utils";

// In-memory state for realistic demo mutability during browser session
const requestsStore: SaleRequest[] = [...MOCK_REQUESTS];
const commoditiesStore: Commodity[] = [...MOCK_COMMODITIES];
const transactionsStore: Transaction[] = [...MOCK_TRANSACTIONS];
const paymentsStore: Payment[] = [...MOCK_PAYMENTS];
const buyersStore: Buyer[] = [...MOCK_BUYERS];
const auditLogsStore: AuditLog[] = [...MOCK_AUDIT_LOGS];

// Status display names in Marathi
export const STATUS_TITLES_MR: Record<RequestStatus, string> = {
  RECEIVED: "१. विनंती प्राप्त झाली",
  PENDING_CONTACT: "२. संपर्क बाकी",
  CONTACTED: "३. शेतकऱ्याशी संपर्क साधला",
  INSPECTION: "४. मालाची तपासणी / गुणवत्ता चर्चा",
  DEAL_FINALIZED: "५. व्यवहार निश्चित झाला",
  PRODUCE_RECEIVED: "६. शेतमाल केंद्रावर प्राप्त",
  PAYMENT_PENDING: "७. हिशोब व पेमेंट प्रक्रिया",
  COMPLETED: "८. व्यवहार यशस्वीरित्या पूर्ण",
  REJECTED: "विनंती रद्द / व्यवहार रद्द",
};

// 8 official stages in progression order
export const TRACKING_STAGES_ORDER: { key: RequestStatus; titleMr: string; descMr: string }[] = [
  {
    key: "RECEIVED",
    titleMr: "विनंती प्राप्त",
    descMr: "आपली शेतमाल विक्री विनंती सिस्टीममध्ये नोंदवली गेली आहे.",
  },
  {
    key: "PENDING_CONTACT",
    titleMr: "संपर्क बाकी",
    descMr: "आमच्या खरेदी प्रतिनिधीकडे विनंती वर्ग करण्यात आली आहे.",
  },
  {
    key: "CONTACTED",
    titleMr: "शेतकऱ्याशी संपर्क",
    descMr: "प्रतिनिधीकडून शेतकऱ्याशी फोनवर प्राथमिक चर्चा झाली आहे.",
  },
  {
    key: "INSPECTION",
    titleMr: "मालाची तपासणी / चर्चा",
    descMr: "शेतमालाचा नमुना (सॅम्पल), गुणवत्ता व बाजारभाव यावर चर्चा सुरू आहे.",
  },
  {
    key: "DEAL_FINALIZED",
    titleMr: "व्यवहार निश्चित",
    descMr: "शेतमालाचा दर व प्रमाण दोघांच्या संमतीने निश्चित झाले आहे.",
  },
  {
    key: "PRODUCE_RECEIVED",
    titleMr: "माल प्राप्त",
    descMr: "शेतमाल बाजार समिती/केंद्रावर आला असून वजन व पावती झाली आहे.",
  },
  {
    key: "PAYMENT_PENDING",
    titleMr: "पेमेंट प्रक्रिया",
    descMr: "हिशोब पूर्ण झाला असून रक्कम बँक खात्यावर वर्ग करण्याची प्रक्रिया सुरू आहे.",
  },
  {
    key: "COMPLETED",
    titleMr: "व्यवहार पूर्ण",
    descMr: "शेतकऱ्याला संपूर्ण रक्कम अदा केली असून व्यवहार पूर्ण झाला आहे.",
  },
];

export const mockService = {
  // --------------------------------------------------------------------------
  // Commodities
  // --------------------------------------------------------------------------
  async getCommodities(query?: string, category?: string): Promise<Commodity[]> {
    await new Promise((r) => setTimeout(r, 80));
    let result = [...commoditiesStore];

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.nameMr.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.descriptionMr.toLowerCase().includes(q)
      );
    }

    if (category && category !== "ALL") {
      result = result.filter((c) => c.category === category);
    }

    return result;
  },

  async getCommodityById(id: string): Promise<Commodity | null> {
    await new Promise((r) => setTimeout(r, 50));
    return commoditiesStore.find((c) => c.id === id) || null;
  },

  async addCommodity(data: Omit<Commodity, "id">): Promise<Commodity> {
    await new Promise((r) => setTimeout(r, 120));
    const newCommodity: Commodity = {
      ...data,
      id: `cmd-${Date.now()}`,
    };
    commoditiesStore.unshift(newCommodity);
    return newCommodity;
  },

  async toggleCommodityStatus(id: string): Promise<Commodity | null> {
    await new Promise((r) => setTimeout(r, 80));
    const item = commoditiesStore.find((c) => c.id === id);
    if (!item) return null;
    item.isActive = !item.isActive;
    return { ...item };
  },

  // --------------------------------------------------------------------------
  // Farmer Selling Requests (Public & Admin)
  // --------------------------------------------------------------------------
  async submitFarmerRequest(
    input: FarmerSellingRequestInput,
    imageUrls: string[] = []
  ): Promise<{ success: boolean; requestNumber: string; data: SaleRequest }> {
    await new Promise((r) => setTimeout(r, 350));

    // Generate unique DEMO request number: DEMO-AE-2026-000XXX
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const requestNumber = `DEMO-AE-2026-${randomSeq}`;

    const commodity = commoditiesStore.find((c) => c.id === input.commodityId);
    const commodityNameMr = commodity ? commodity.nameMr : "शेतमाल";

    const newRequest: SaleRequest = {
      id: `req-${Date.now()}`,
      requestNumber,
      farmerName: input.farmerName.trim(),
      farmerMobile: input.mobile.trim(),
      farmerVillage: input.village.trim(),
      farmerTaluka: input.taluka.trim(),
      farmerDistrict: input.district.trim(),
      commodityId: input.commodityId,
      commodityNameMr,
      commodityNameEn: commodity?.nameEn,
      estimatedQuantity: input.estimatedQuantity,
      unit: input.unit,
      qualityGrade: input.qualityGrade || "सामान्य / प्रतवारी बाकी",
      expectedSellingDate: input.expectedSellingDate,
      notes: input.notes,
      status: "RECEIVED",
      imageUrls,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      internalStaffNotes: "वेबसाइट फॉर्मद्वारे प्रात्यक्षिक विनंती प्राप्त.",
    };

    requestsStore.unshift(newRequest);

    // Also record an audit log
    auditLogsStore.unshift({
      id: `log-${Date.now()}`,
      userEmail: "system@public-portal",
      action: "REQUEST_SUBMITTED",
      actionMr: "शेतकऱ्याची नवीन विनंती दाखल",
      entity: "SaleRequest",
      entityId: requestNumber,
      timestamp: new Date().toLocaleString("en-GB"),
      ipAddress: "127.0.0.1",
      result: "SUCCESS",
    });

    return { success: true, requestNumber, data: newRequest };
  },

  // --------------------------------------------------------------------------
  // Public Request Tracking (with strict privacy barrier)
  // --------------------------------------------------------------------------
  async trackFarmerRequest(
    mobile: string,
    requestId: string
  ): Promise<{ success: boolean; request?: PublicTrackingResponse; error?: string }> {
    await new Promise((r) => setTimeout(r, 200));

    const cleanMobile = mobile.replace(/[^0-9]/g, "").slice(-10);
    const cleanId = requestId.trim().toUpperCase();

    const matched = requestsStore.find(
      (r) =>
        r.farmerMobile.replace(/[^0-9]/g, "").slice(-10) === cleanMobile &&
        r.requestNumber.toUpperCase() === cleanId
    );

    if (!matched) {
      return {
        success: false,
        error: "दिलेला मोबाईल नंबर आणि विनंती क्रमांक जुळत नाही. कृपया माहिती तपासा.",
      };
    }

    // Determine current stage index in standard 8 stages
    const currentStageIndex = TRACKING_STAGES_ORDER.findIndex((s) => s.key === matched.status);

    const timeline: TrackingTimelineStage[] = TRACKING_STAGES_ORDER.map((stage, idx) => {
      let isCompleted = false;
      let isCurrent = false;

      if (matched.status === "REJECTED") {
        isCompleted = false;
        isCurrent = false;
      } else if (currentStageIndex >= 0) {
        if (idx < currentStageIndex) isCompleted = true;
        if (idx === currentStageIndex) isCurrent = true;
      }

      return {
        stageNumber: idx + 1,
        statusKey: stage.key,
        titleMr: stage.titleMr,
        descMr: stage.descMr,
        isCompleted,
        isCurrent,
        dateCompleted: isCompleted || isCurrent ? matched.updatedAt : undefined,
      };
    });

    // Strip private internal notes, buyer details, prices, rates!
    const publicData: PublicTrackingResponse = {
      requestNumber: matched.requestNumber,
      farmerNameInitial: maskName(matched.farmerName),
      commodityNameMr: matched.commodityNameMr,
      estimatedQuantity: matched.estimatedQuantity,
      unit: matched.unit,
      village: matched.farmerVillage,
      taluka: matched.farmerTaluka,
      district: matched.farmerDistrict,
      status: matched.status,
      statusTitleMr: STATUS_TITLES_MR[matched.status] || matched.status,
      createdAt: matched.createdAt,
      timeline,
      isDemo: true,
    };

    return { success: true, request: publicData };
  },

  // --------------------------------------------------------------------------
  // Admin Operations
  // --------------------------------------------------------------------------
  async getAdminRequests(filters?: {
    status?: string;
    search?: string;
    commodityId?: string;
  }): Promise<SaleRequest[]> {
    await new Promise((r) => setTimeout(r, 100));
    let list = [...requestsStore];

    if (filters?.status && filters.status !== "ALL") {
      list = list.filter((r) => r.status === filters.status);
    }

    if (filters?.commodityId && filters.commodityId !== "ALL") {
      list = list.filter((r) => r.commodityId === filters.commodityId);
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.requestNumber.toLowerCase().includes(q) ||
          r.farmerName.toLowerCase().includes(q) ||
          r.farmerMobile.includes(q) ||
          r.farmerVillage.toLowerCase().includes(q) ||
          r.commodityNameMr.toLowerCase().includes(q)
      );
    }

    return list;
  },

  async getAdminRequestById(id: string): Promise<SaleRequest | null> {
    await new Promise((r) => setTimeout(r, 70));
    const req = requestsStore.find((r) => r.id === id || r.requestNumber === id);
    return req ? { ...req } : null;
  },

  async updateAdminRequestStatus(
    id: string,
    newStatus: RequestStatus,
    internalStaffNotes?: string
  ): Promise<SaleRequest | null> {
    await new Promise((r) => setTimeout(r, 150));
    const req = requestsStore.find((r) => r.id === id || r.requestNumber === id);
    if (!req) return null;

    req.status = newStatus;
    req.updatedAt = new Date().toISOString();
    if (internalStaffNotes !== undefined) {
      req.internalStaffNotes = internalStaffNotes;
    }

    auditLogsStore.unshift({
      id: `log-${Date.now()}`,
      userEmail: "admin@ashishenterprises.local",
      action: "STATUS_UPDATE",
      actionMr: `स्थिती बदलली: ${STATUS_TITLES_MR[newStatus]}`,
      entity: "SaleRequest",
      entityId: req.requestNumber,
      timestamp: new Date().toLocaleString("en-GB"),
      ipAddress: "192.168.1.15",
      result: "SUCCESS",
    });

    return { ...req };
  },

  async getAdminTransactions(): Promise<Transaction[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [...transactionsStore];
  },

  async getAdminPayments(): Promise<Payment[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [...paymentsStore];
  },

  async getAdminBuyers(): Promise<Buyer[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [...buyersStore];
  },

  async getAdminAuditLogs(): Promise<AuditLog[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [...auditLogsStore];
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((r) => setTimeout(r, 100));
    return {
      ...MOCK_DASHBOARD_STATS,
      totalRequests: requestsStore.length,
      pendingContactCount: requestsStore.filter(
        (r) => r.status === "RECEIVED" || r.status === "PENDING_CONTACT"
      ).length,
    };
  },

  async getAdminFarmers(): Promise<Farmer[]> {
    await new Promise((r) => setTimeout(r, 90));
    // Extract unique farmers from requestsStore
    const map = new Map<string, Farmer>();
    requestsStore.forEach((r) => {
      const mob = r.farmerMobile;
      if (!map.has(mob)) {
        map.set(mob, {
          id: `fmr-${mob}`,
          name: r.farmerName,
          mobile: r.farmerMobile,
          village: r.farmerVillage,
          taluka: r.farmerTaluka,
          district: r.farmerDistrict,
          state: "महाराष्ट्र",
          totalRequestsCount: 1,
          createdAt: r.createdAt,
        });
      } else {
        const existing = map.get(mob)!;
        existing.totalRequestsCount += 1;
      }
    });

    return Array.from(map.values());
  },
};
