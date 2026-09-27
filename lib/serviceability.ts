export interface ServiceableDistrict {
  id: string;
  name: string;
  state: string;
  count: number;
  pincodes: string[];
}

// ==============================================================================
// CashALL VERIFIED MASTER SERVICEABLE PIN CODES
// Source: CashALL_VERIFIED_PIN_MASTER_Kolkata_Howrah_Hooghly_Barrackpore.xlsx
// Total Verified Coverage: 217 Unique West Bengal PIN Codes across 4 Regions
// ==============================================================================

// 1. Kolkata + Neighbouring 700xxx Belt (151 PIN codes)
export const KOLKATA_PINCODES: string[] = [
  "700001", "700002", "700003", "700004", "700005", "700006", "700007", "700008",
  "700009", "700010", "700011", "700012", "700013", "700014", "700015", "700016",
  "700017", "700019", "700020", "700021", "700022", "700024", "700025", "700026",
  "700027", "700028", "700029", "700030", "700031", "700032", "700033", "700034",
  "700035", "700036", "700037", "700038", "700039", "700040", "700041", "700042",
  "700045", "700046", "700047", "700048", "700049", "700050", "700051", "700052",
  "700053", "700054", "700055", "700056", "700057", "700058", "700059", "700060",
  "700061", "700062", "700063", "700064", "700065", "700067", "700068", "700069",
  "700070", "700071", "700072", "700073", "700074", "700075", "700076", "700077",
  "700078", "700079", "700080", "700081", "700082", "700083", "700084", "700085",
  "700086", "700087", "700088", "700089", "700090", "700091", "700092", "700093",
  "700094", "700095", "700096", "700097", "700098", "700099", "700100", "700101",
  "700102", "700105", "700106", "700107", "700108", "700111", "700112", "700113",
  "700114", "700115", "700116", "700117", "700118", "700119", "700120", "700121",
  "700122", "700123", "700124", "700125", "700126", "700127", "700128", "700129",
  "700130", "700131", "700132", "700133", "700134", "700135", "700136", "700137",
  "700138", "700139", "700140", "700141", "700142", "700143", "700144", "700145",
  "700146", "700147", "700148", "700149", "700150", "700151", "700152", "700153",
  "700154", "700155", "700156", "700157", "700158", "700159", "700160"
];

// 2. Howrah District (19 PIN codes)
export const HOWRAH_PINCODES: string[] = [
  "711101", "711102", "711103", "711104", "711105", "711106", "711107", "711108",
  "711109", "711110", "711111", "711112", "711113", "711201", "711202", "711203",
  "711204", "711206", "711227"
];

// 3. Hooghly District (26 PIN codes)
export const HOOGHLY_PINCODES: string[] = [
  "712101", "712102", "712103", "712104", "712105", "712123", "712124", "712125",
  "712136", "712137", "712138", "712139", "712201", "712202", "712203", "712204",
  "712221", "712222", "712232", "712233", "712234", "712235", "712246", "712248",
  "712249", "712258"
];

// 4. Barrackpore Subdivision (47 PIN codes)
export const BARRACKPORE_PINCODES: string[] = [
  "700035", "700049", "700051", "700056", "700057", "700058", "700065", "700076",
  "700077", "700083", "700090", "700108", "700111", "700112", "700113", "700114",
  "700115", "700116", "700117", "700118", "700119", "700120", "700121", "700122",
  "700123", "700131", "743122", "743123", "743124", "743125", "743126", "743127",
  "743128", "743129", "743130", "743133", "743134", "743135", "743136", "743144",
  "743145", "743165", "743166", "743178", "743193", "743194", "743195"
];

// 5. Gorakhpur, Uttar Pradesh (16 PIN codes)
export const GORAKHPUR_PINCODES: string[] = [
  "273001", "273002", "273003", "273004", "273005", "273006", "273007", "273008",
  "273009", "273010", "273012", "273013", "273014", "273015", "273016", "273017"
];

// 6. Ballia, Uttar Pradesh (2 PIN codes)
export const BALLIA_PINCODES: string[] = [
  "277001", "277506"
];

// 7. Ranchi, Jharkhand (3 PIN codes)
export const RANCHI_PINCODES: string[] = [
  "834001", "834002", "834003"
];

// 8. Patna, Bihar (1 PIN code)
export const PATNA_PINCODES: string[] = [
  "800003"
];

export const SERVICEABLE_DISTRICTS: ServiceableDistrict[] = [
  {
    id: "dist-kolkata",
    name: "Kolkata",
    state: "West Bengal",
    count: KOLKATA_PINCODES.length,
    pincodes: KOLKATA_PINCODES,
  },
  {
    id: "dist-howrah",
    name: "Howrah",
    state: "West Bengal",
    count: HOWRAH_PINCODES.length,
    pincodes: HOWRAH_PINCODES,
  },
  {
    id: "dist-hooghly",
    name: "Hooghly",
    state: "West Bengal",
    count: HOOGHLY_PINCODES.length,
    pincodes: HOOGHLY_PINCODES,
  },
  {
    id: "dist-barrackpore",
    name: "Barrackpore",
    state: "West Bengal",
    count: BARRACKPORE_PINCODES.length,
    pincodes: BARRACKPORE_PINCODES,
  },
  {
    id: "dist-gorakhpur",
    name: "Gorakhpur",
    state: "Uttar Pradesh",
    count: GORAKHPUR_PINCODES.length,
    pincodes: GORAKHPUR_PINCODES,
  },
  {
    id: "dist-ballia",
    name: "Ballia",
    state: "Uttar Pradesh",
    count: BALLIA_PINCODES.length,
    pincodes: BALLIA_PINCODES,
  },
  {
    id: "dist-ranchi",
    name: "Ranchi",
    state: "Jharkhand",
    count: RANCHI_PINCODES.length,
    pincodes: RANCHI_PINCODES,
  },
  {
    id: "dist-patna",
    name: "Patna",
    state: "Bihar",
    count: PATNA_PINCODES.length,
    pincodes: PATNA_PINCODES,
  },
];

// Specific locality metadata for corridor stations / hubs
export const NAMED_LOCALITIES: Record<string, string> = {
  "711201": "Bally",
  "711202": "Belur",
  "711203": "Bhattanagar",
  "711204": "Liluah",
  "712101": "Chinsurah",
  "712102": "Chinsurah",
  "712103": "Chinsurah",
  "712123": "Bandel",
  "712124": "Bhadreswar",
  "712136": "Chandannagar",
  "712139": "Mankundu",
  "712201": "Serampore",
  "712222": "Baidyabati",
  "712233": "Hindmotor",
  "712235": "Konnagar",
  "712248": "Rishra",
  "712258": "Uttarpara",
};

// Fast lookup map for all serviceable pincodes (O(1) lookups)
export interface PincodeDetails {
  city: string;
  state: string;
  district: string;
  locality?: string;
}

const PINCODE_MAP: Record<string, PincodeDetails> = {};

// Populate district records
SERVICEABLE_DISTRICTS.forEach((dist) => {
  dist.pincodes.forEach((pin) => {
    if (!PINCODE_MAP[pin]) {
      PINCODE_MAP[pin] = {
        city: dist.name,
        state: dist.state,
        district: dist.name,
        locality: NAMED_LOCALITIES[pin] || undefined,
      };
    }
  });
});

export function isPincodeServiced(pincode: string): boolean {
  if (!pincode) return false;
  const cleanPin = pincode.trim();
  return Boolean(PINCODE_MAP[cleanPin]);
}

export function getPincodeDetails(pincode: string): PincodeDetails | null {
  if (!pincode) return null;
  const cleanPin = pincode.trim();
  return PINCODE_MAP[cleanPin] || null;
}

export function getAllServiceablePincodes(): string[] {
  return Object.keys(PINCODE_MAP);
}
