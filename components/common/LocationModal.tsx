"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  X,
  Search,
  Check,
  Building2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Globe2,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from "lucide-react";
import {
  SERVICEABLE_DISTRICTS,
  getPincodeDetails,
} from "@/lib/serviceability";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: { city: string; state: string; isServiceable?: boolean } | null;
  onSelectLocation: (loc: { city: string; state: string; isServiceable?: boolean }) => void;
}

// Top Tier Serviceable States with direct field fleets
interface ServiceableStateConfig {
  state: string;
  badge: string;
  districts: { name: string; tag: string }[];
  description: string;
  iconText: string;
  popularPincodes: string;
}

const PRIMARY_STATES: ServiceableStateConfig[] = [
  {
    state: "West Bengal",
    badge: "Primary Hub • 2-4 Hr Doorstep",
    iconText: "WB",
    description: "Kolkata, Howrah, Hooghly, Barrackpore (319 PIN Codes)",
    popularPincodes: "700001, 700091, 711101, 712201",
    districts: [
      { name: "Kolkata", tag: "700xxx Belt • Free Doorstep in 2-4 hrs" },
      { name: "Howrah", tag: "Express Doorstep Fleet Active" },
      { name: "Hooghly", tag: "Doorstep Pickup Across District" },
      { name: "Barrackpore", tag: "Doorstep Pickup Active" },
    ],
  },
  {
    state: "Uttar Pradesh",
    badge: "Express Doorstep Hub",
    iconText: "UP",
    description: "Gorakhpur & Ballia Express Pickup Hubs",
    popularPincodes: "273001, 273015, 277001",
    districts: [
      { name: "Gorakhpur", tag: "Express Doorstep (16 PIN Codes)" },
      { name: "Ballia", tag: "Doorstep Pickup Hub" },
    ],
  },
  {
    state: "Bihar",
    badge: "Doorstep Service Active",
    iconText: "BR",
    description: "Patna Central & Surrounding Zones",
    popularPincodes: "800001, 800003",
    districts: [
      { name: "Patna", tag: "Express Doorstep Service" },
    ],
  },
  {
    state: "Jharkhand",
    badge: "Doorstep Service Active",
    iconText: "JH",
    description: "Ranchi City Express Pickup Hub",
    popularPincodes: "834001, 834002, 834003",
    districts: [
      { name: "Ranchi", tag: "Express Doorstep Service" },
    ],
  },
];

const ALL_INDIAN_STATES = [
  { name: "Delhi NCR", region: "North", majorCities: "New Delhi, Noida, Gurgaon" },
  { name: "Maharashtra", region: "West", majorCities: "Mumbai, Pune, Nagpur" },
  { name: "Karnataka", region: "South", majorCities: "Bengaluru, Mysuru, Mangalore" },
  { name: "Tamil Nadu", region: "South", majorCities: "Chennai, Coimbatore, Madurai" },
  { name: "Telangana", region: "South", majorCities: "Hyderabad, Warangal" },
  { name: "Gujarat", region: "West", majorCities: "Ahmedabad, Surat, Vadodara" },
  { name: "Rajasthan", region: "North", majorCities: "Jaipur, Jodhpur, Udaipur" },
  { name: "Punjab", region: "North", majorCities: "Ludhiana, Amritsar, Chandigarh" },
  { name: "Haryana", region: "North", majorCities: "Faridabad, Panipat, Ambala" },
  { name: "Madhya Pradesh", region: "Central", majorCities: "Bhopal, Indore, Gwalior" },
  { name: "Kerala", region: "South", majorCities: "Kochi, Thiruvananthapuram, Kozhikode" },
  { name: "Odisha", region: "East", majorCities: "Bhubaneswar, Cuttack, Rourkela" },
  { name: "Assam", region: "Northeast", majorCities: "Guwahati, Silchar, Dibrugarh" },
  { name: "Andhra Pradesh", region: "South", majorCities: "Visakhapatnam, Vijayawada" },
  { name: "Chhattisgarh", region: "Central", majorCities: "Raipur, Bilaspur, Bhilai" },
  { name: "Uttarakhand", region: "North", majorCities: "Dehradun, Haridwar, Haldwani" },
  { name: "Himachal Pradesh", region: "North", majorCities: "Shimla, Dharamshala, Solan" },
  { name: "Goa", region: "West", majorCities: "Panaji, Margao, Vasco" },
  { name: "Jammu & Kashmir", region: "North", majorCities: "Srinagar, Jammu" },
  { name: "Tripura", region: "Northeast", majorCities: "Agartala" },
  { name: "Meghalaya", region: "Northeast", majorCities: "Shillong" },
  { name: "Manipur", region: "Northeast", majorCities: "Imphal" },
  { name: "Nagaland", region: "Northeast", majorCities: "Kohima, Dimapur" },
  { name: "Puducherry", region: "South", majorCities: "Puducherry" },
  { name: "Chandigarh", region: "North", majorCities: "Chandigarh" },
  { name: "Other State / UT", region: "All India", majorCities: "Pan India Courier" },
];

export function LocationModal({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
}: LocationModalProps) {
  const [search, setSearch] = useState("");
  const [selectedStateForDistricts, setSelectedStateForDistricts] = useState<ServiceableStateConfig | null>(null);

  // Sync state if already selected
  useEffect(() => {
    if (selectedLocation?.state) {
      const match = PRIMARY_STATES.find(
        (s) => s.state.toLowerCase() === selectedLocation.state.toLowerCase()
      );
      if (match && !selectedLocation.city) {
        setSelectedStateForDistricts(match);
      }
    }
  }, [selectedLocation]);

  if (!isOpen) return null;

  const query = search.trim().toLowerCase();
  const isPinQuery = /^\d{6}$/.test(query);
  const pinMatch = isPinQuery ? getPincodeDetails(query) : null;

  const handleSelect = (city: string, state: string, isServiceable: boolean = true) => {
    onSelectLocation({ city, state, isServiceable });
    onClose();
  };

  // Filter based on search query
  const filteredPrimary = PRIMARY_STATES.filter((s) => {
    if (!query) return true;
    if (s.state.toLowerCase().includes(query)) return true;
    if (s.districts.some((d) => d.name.toLowerCase().includes(query))) return true;
    return false;
  });

  const filteredAllStates = ALL_INDIAN_STATES.filter((st) => {
    if (!query) return true;
    return (
      st.name.toLowerCase().includes(query) ||
      st.majorCities.toLowerCase().includes(query) ||
      st.region.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#111111] border-2 border-brand-yellow/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-white">
        
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900/95 flex items-start justify-between relative">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 flex items-center justify-center border border-brand-yellow/40 text-brand-yellow shrink-0 shadow-sm">
              <MapPin className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {selectedStateForDistricts
                    ? `Select Your City in ${selectedStateForDistricts.state}`
                    : "Select Your State / अपना राज्य चुनें"}
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-yellow text-brand-black px-2.5 py-0.5 rounded-full font-mono">
                  Instant Cash Doorstep
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                {selectedStateForDistricts
                  ? `Choose your city for free 2-4 hour doorstep pickup & instant payment.`
                  : "Please choose your state to view live cash valuations & free doorstep pickup in your area."}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BACK BUTTON IF IN DISTRICT SELECTION */}
        {selectedStateForDistricts && (
          <div className="px-5 py-2.5 bg-neutral-900/60 border-b border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => setSelectedStateForDistricts(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-yellow hover:text-brand-yellowHover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> &larr; Back to All States
            </button>
            <button
              onClick={() => handleSelect(selectedStateForDistricts.districts[0].name, selectedStateForDistricts.state, true)}
              className="text-xs font-bold text-gray-300 hover:text-white underline"
            >
              Continue with {selectedStateForDistricts.state}
            </button>
          </div>
        )}

        {/* SEARCH BAR (PIN CODE OR STATE / CITY) */}
        {!selectedStateForDistricts && (
          <div className="p-4 border-b border-neutral-800 bg-[#161616]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-yellow" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search State, City or enter 6-digit PIN code (e.g. 700001, 273001, 834001, 110001)..."
                className="w-full pl-10 pr-16 py-3 text-xs sm:text-sm font-semibold bg-neutral-900 border border-neutral-700 text-white rounded-xl focus:outline-none focus:border-brand-yellow transition-all placeholder:text-gray-500"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold px-2 py-1 bg-neutral-800 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* PINCODE MATCH BANNER */}
        {isPinQuery && !selectedStateForDistricts && (
          <div className="px-5 pt-3">
            {pinMatch ? (
              <div className="bg-emerald-500/10 border-2 border-emerald-500/50 rounded-2xl p-4 flex items-center justify-between animate-fadeIn">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wide">
                    <Check className="w-4 h-4" /> PIN Code {query} Serviceable!
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    {pinMatch.city}{pinMatch.locality ? ` (${pinMatch.locality})` : ""}, {pinMatch.state}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Free doorstep pickup available within 2-4 hours</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelect(pinMatch.city, pinMatch.state, true)}
                  className="px-4 py-2 bg-brand-yellow text-brand-black text-xs font-black rounded-xl hover:bg-brand-yellowHover transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  Select & Proceed <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-300 flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">PIN Code {query} is outside our direct pickup hubs</strong>
                  <span>You can still get an instant online price and schedule insured courier pickup across India. Please select your State below.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENT LIST */}
        <div className="p-4 sm:p-5 flex-grow overflow-y-auto space-y-4 custom-scrollbar">

          {/* IF STATE SELECTED: DISTRICT DRILL-DOWN */}
          {selectedStateForDistricts ? (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 flex items-center justify-between">
                <span>Select Your District / City in {selectedStateForDistricts.state}</span>
                <span className="text-brand-yellow text-[11px] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Doorstep Inspection
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedStateForDistricts.districts.map((dist) => {
                  const isDistSelected =
                    selectedLocation?.city?.toLowerCase() === dist.name.toLowerCase() &&
                    selectedLocation?.state?.toLowerCase() === selectedStateForDistricts.state.toLowerCase();

                  return (
                    <button
                      key={dist.name}
                      type="button"
                      onClick={() => handleSelect(dist.name, selectedStateForDistricts.state, true)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isDistSelected
                          ? "bg-brand-yellow text-brand-black border-brand-yellow font-black shadow-lg"
                          : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-gray-200 hover:border-brand-yellow/60"
                      }`}
                    >
                      <div>
                        <div className={`text-sm font-extrabold ${isDistSelected ? "text-brand-black" : "text-white"}`}>
                          {dist.name}
                        </div>
                        <div className={`text-xs mt-0.5 ${isDistSelected ? "text-neutral-800" : "text-gray-400"}`}>
                          {dist.tag}
                        </div>
                      </div>
                      {isDistSelected ? (
                        <Check className="w-5 h-5 text-brand-black shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 text-brand-yellow">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* OPTION TO SELECT WHOLE STATE */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSelect(selectedStateForDistricts.districts[0].name, selectedStateForDistricts.state, true)}
                  className="w-full py-3 px-4 rounded-xl border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-brand-yellow" />
                  Select &quot;{selectedStateForDistricts.state} (General)&quot;
                </button>
              </div>
            </div>
          ) : (
            /* STATE SELECTION FLOW */
            <>
              {/* SECTION 1: PRIMARY DOORSTEP PICKUP STATES */}
              <div className="space-y-2.5">
                <div className="text-xs font-black text-brand-yellow uppercase tracking-wider px-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" /> Top Doorstep Pickup States (Instant 2-4 Hr Fleets)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Live Fleets Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredPrimary.map((stConfig) => {
                    const isStateSelected = selectedLocation?.state?.toLowerCase() === stConfig.state.toLowerCase();

                    return (
                      <div
                        key={stConfig.state}
                        onClick={() => setSelectedStateForDistricts(stConfig)}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isStateSelected
                            ? "bg-brand-yellow/10 border-brand-yellow shadow-yellowGlow/20"
                            : "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 hover:border-brand-yellow/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border shrink-0 ${
                              isStateSelected
                                ? "bg-brand-yellow text-brand-black border-brand-yellow"
                                : "bg-neutral-800 text-brand-yellow border-neutral-700"
                            }`}
                          >
                            {stConfig.iconText}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-white">{stConfig.state}</span>
                              <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                                Active
                              </span>
                            </div>
                            <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                              {stConfig.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-brand-yellow shrink-0">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: ALL OTHER INDIAN STATES */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-blue-400" /> All Other Indian States & UTs (Pan-India Valuation)
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Instant Online Price Guaranteed
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredAllStates.map((st) => {
                    const isSelected = selectedLocation?.state?.toLowerCase() === st.name.toLowerCase();

                    return (
                      <button
                        key={st.name}
                        type="button"
                        onClick={() => handleSelect(st.majorCities.split(",")[0].trim(), st.name, false)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-yellow text-brand-black border-brand-yellow font-black shadow-sm"
                            : "bg-neutral-900 border-neutral-800 text-gray-300 hover:bg-neutral-850 hover:border-neutral-700 hover:text-white"
                        }`}
                      >
                        <div className="truncate pr-1">
                          <div className="text-xs font-bold truncate">{st.name}</div>
                          <div className={`text-[10px] truncate ${isSelected ? "text-neutral-800" : "text-gray-500"}`}>
                            {st.majorCities.split(",")[0]}
                          </div>
                        </div>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-brand-black shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/95 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">Current Location:</span>
            <strong className="text-brand-yellow">
              {selectedLocation
                ? `${selectedLocation.city}, ${selectedLocation.state}`
                : "None Selected"}
            </strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-gray-400 hover:text-white underline underline-offset-2"
          >
            Browse without selecting &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
