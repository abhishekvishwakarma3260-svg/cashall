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

// Top Tier Serviceable States with their districts
interface ServiceableStateConfig {
  state: string;
  badge: string;
  districts: { name: string; tag: string }[];
  description: string;
  iconText: string;
}

const PRIMARY_STATES: ServiceableStateConfig[] = [
  {
    state: "West Bengal",
    badge: "Primary Hub • Instant Doorstep",
    iconText: "WB",
    description: "Kolkata, Howrah, Hooghly, Barrackpore (319 PIN Codes)",
    districts: [
      { name: "Kolkata", tag: "700xxx Belt • Free Doorstep" },
      { name: "Howrah", tag: "Express Pickup Active" },
      { name: "Hooghly", tag: "Doorstep Pickup Active" },
      { name: "Barrackpore", tag: "Doorstep Pickup Active" },
    ],
  },
  {
    state: "Uttar Pradesh",
    badge: "Doorstep Pickup Active",
    iconText: "UP",
    description: "Gorakhpur & Ballia Express Pickup Hubs",
    districts: [
      { name: "Gorakhpur", tag: "Express Doorstep" },
      { name: "Ballia", tag: "Doorstep Service" },
    ],
  },
  {
    state: "Bihar",
    badge: "Doorstep Pickup Active",
    iconText: "BR",
    description: "Patna Central & Surrounding Districts",
    districts: [
      { name: "Patna", tag: "Express Doorstep" },
    ],
  },
  {
    state: "Jharkhand",
    badge: "Doorstep Pickup Active",
    iconText: "JH",
    description: "Ranchi City Express Pickup Hub",
    districts: [
      { name: "Ranchi", tag: "Express Doorstep" },
    ],
  },
];

const OTHER_INDIAN_STATES = [
  "Delhi NCR",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Rajasthan",
  "Gujarat",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Kerala",
  "Odisha",
  "Assam",
  "Andhra Pradesh",
  "Chhattisgarh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Goa",
  "Jammu & Kashmir",
  "Other State / UT",
];

export function LocationModal({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
}: LocationModalProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"serviceable" | "other">("serviceable");
  const [expandedState, setExpandedState] = useState<string | null>("West Bengal");

  // Keep expanded state synced if user has a selection
  useEffect(() => {
    if (selectedLocation?.state) {
      const match = PRIMARY_STATES.find(
        (s) => s.state.toLowerCase() === selectedLocation.state.toLowerCase()
      );
      if (match) {
        setExpandedState(match.state);
        setActiveTab("serviceable");
      } else {
        setActiveTab("other");
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

  const filteredOther = OTHER_INDIAN_STATES.filter((st) => {
    if (!query) return true;
    return st.toLowerCase().includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#111111] border-2 border-brand-yellow/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-white">
        
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900/95 flex items-start justify-between relative">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 flex items-center justify-center border border-brand-yellow/40 text-brand-yellow shrink-0 shadow-sm">
              <MapPin className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  Select Your State & City
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-yellow text-brand-black px-2 py-0.5 rounded-full font-mono">
                  Doorstep Pickup
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Choose your location to check doorstep service & get accurate instant valuation
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

        {/* PIN CODE / LOCATION QUICK SEARCH BAR */}
        <div className="p-4 border-b border-neutral-800 bg-[#161616]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-yellow" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter 6-digit PIN code (e.g. 700001) or state / city..."
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold bg-neutral-900 border border-neutral-700 text-white rounded-xl focus:outline-none focus:border-brand-yellow transition-all placeholder:text-gray-500"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* PINCODE MATCH BANNER */}
        {isPinQuery && (
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
                  <div className="text-[11px] text-gray-400 mt-0.5">Free doorstep pickup available within 24 hours</div>
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
                  <span>Please choose from our active serviceable states below or select your state to check courier service.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TABS: SERVICEABLE STATES vs OTHER STATES */}
        <div className="flex items-center px-5 pt-3 border-b border-neutral-800 gap-2 bg-[#111111]">
          <button
            type="button"
            onClick={() => setActiveTab("serviceable")}
            className={`pb-3 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "serviceable"
                ? "border-brand-yellow text-brand-yellow"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Active Doorstep States ({PRIMARY_STATES.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("other")}
            className={`pb-3 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "other"
                ? "border-brand-yellow text-brand-yellow"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>All Other States</span>
          </button>
        </div>

        {/* CONTENT LIST */}
        <div className="p-4 sm:p-5 flex-grow overflow-y-auto space-y-3.5 custom-scrollbar">
          
          {activeTab === "serviceable" ? (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1 flex items-center justify-between">
                <span>Select Your State & City</span>
                <span className="text-brand-yellow text-[10px] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Free Doorstep Inspection
                </span>
              </div>

              {filteredPrimary.map((stConfig) => {
                const isStateSelected = selectedLocation?.state?.toLowerCase() === stConfig.state.toLowerCase();
                const isExpanded = expandedState === stConfig.state;

                return (
                  <div
                    key={stConfig.state}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isStateSelected
                        ? "bg-neutral-900/90 border-brand-yellow shadow-yellowGlow/20"
                        : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {/* STATE CARD HEADER */}
                    <div
                      onClick={() => setExpandedState(isExpanded ? null : stConfig.state)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border shrink-0 transition-colors ${
                            isStateSelected
                              ? "bg-brand-yellow text-brand-black border-brand-yellow shadow-sm"
                              : "bg-neutral-800 text-brand-yellow border-neutral-700"
                          }`}
                        >
                          {stConfig.iconText}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-white">{stConfig.state}</span>
                            <span className="text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 font-medium mt-0.5">
                            {stConfig.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Quick select primary city
                            handleSelect(stConfig.districts[0].name, stConfig.state, true);
                          }}
                          className="hidden sm:inline-flex px-3 py-1.5 bg-neutral-800 hover:bg-brand-yellow hover:text-brand-black text-xs font-bold text-gray-200 rounded-xl transition-all border border-neutral-700"
                        >
                          Select {stConfig.districts[0].name}
                        </button>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            isExpanded ? "rotate-90 text-brand-yellow" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* EXPANDABLE DISTRICT / CITY LIST */}
                    {isExpanded && (
                      <div className="p-3 bg-black/40 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn">
                        {stConfig.districts.map((dist) => {
                          const isDistSelected =
                            selectedLocation?.city?.toLowerCase() === dist.name.toLowerCase() &&
                            selectedLocation?.state?.toLowerCase() === stConfig.state.toLowerCase();

                          return (
                            <button
                              key={dist.name}
                              type="button"
                              onClick={() => handleSelect(dist.name, stConfig.state, true)}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                                isDistSelected
                                  ? "bg-brand-yellow text-brand-black border-brand-yellow font-black shadow-sm"
                                  : "bg-neutral-850 hover:bg-neutral-800 border-neutral-800 text-gray-200 hover:border-brand-yellow/50"
                              }`}
                            >
                              <div>
                                <div className={`text-xs font-extrabold ${isDistSelected ? "text-brand-black" : "text-white"}`}>
                                  {dist.name}
                                </div>
                                <div className={`text-[10px] ${isDistSelected ? "text-neutral-800" : "text-gray-400"}`}>
                                  {dist.tag}
                                </div>
                              </div>
                              {isDistSelected ? (
                                <Check className="w-4 h-4 text-brand-black shrink-0" />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* ALL OTHER STATES */
            <div className="space-y-3">
              <div className="p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-xs text-blue-300 flex items-start gap-2.5">
                <Globe2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Outside Primary Hubs</strong>
                  <span>You can still get instant valuations & prices! Doorstep pickup is expanding rapidly across India.</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredOther.map((st) => {
                  const isSelected = selectedLocation?.state?.toLowerCase() === st.toLowerCase();
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleSelect(st, st, false)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-brand-yellow text-brand-black border-brand-yellow font-black shadow-sm"
                          : "bg-neutral-900 border-neutral-800 text-gray-300 hover:bg-neutral-850 hover:border-neutral-700 hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-bold truncate">{st}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-brand-black shrink-0" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">Selected:</span>
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
