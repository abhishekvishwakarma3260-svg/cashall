"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { LocationModal } from "@/components/common/LocationModal";

const SERVICEABLE_STATES = [
  { state: "West Bengal", city: "Kolkata", tag: "2-4 Hr Doorstep" },
  { state: "Uttar Pradesh", city: "Gorakhpur", tag: "Doorstep Hub" },
  { state: "Bihar", city: "Patna", tag: "Doorstep Hub" },
];

export function HeroLocationBar() {
  const [selectedLoc, setSelectedLoc] = useState<{ city: string; state: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const updateLoc = () => {
      try {
        const stored = localStorage.getItem("cashall_location");
        if (stored) {
          setSelectedLoc(JSON.parse(stored));
        } else {
          setSelectedLoc(null);
        }
      } catch (e) {}
    };

    updateLoc();
    window.addEventListener("cashall_location_updated", updateLoc);
    return () => window.removeEventListener("cashall_location_updated", updateLoc);
  }, []);

  const handleSelectQuickState = (item: { state: string; city: string }) => {
    const loc = { state: item.state, city: item.city, isServiceable: true };
    localStorage.setItem("cashall_location", JSON.stringify(loc));
    setSelectedLoc(loc);
    window.dispatchEvent(new Event("cashall_location_updated"));
  };

  return (
    <>
      <div className="pt-3 max-w-3xl mx-auto">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-sm shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-xl bg-brand-yellow/15 flex items-center justify-center text-brand-yellow shrink-0 border border-brand-yellow/30">
              <MapPin className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Doorstep Resale Service Area
              </div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <span>{selectedLoc ? `${selectedLoc.state} (${selectedLoc.city})` : "Select Your State"}</span>
                {selectedLoc && (
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SERVICEABLE STATE PILLS */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
            {SERVICEABLE_STATES.map((item) => {
              const isSelected = selectedLoc?.state?.toLowerCase() === item.state.toLowerCase();
              return (
                <button
                  key={item.state}
                  type="button"
                  onClick={() => handleSelectQuickState(item)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? "bg-brand-yellow text-brand-black shadow-sm font-black"
                      : "bg-neutral-800 text-gray-300 hover:bg-neutral-750 hover:text-white border border-neutral-700/60"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-brand-black" />}
                  <span>{item.state}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-neutral-800 hover:bg-brand-yellow hover:text-brand-black text-brand-yellow border border-brand-yellow/40 transition-all flex items-center gap-1"
            >
              <span>{selectedLoc ? "Change" : "Select City"}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

      <LocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedLocation={selectedLoc}
        onSelectLocation={(loc) => {
          localStorage.setItem("cashall_location", JSON.stringify(loc));
          setSelectedLoc(loc);
          window.dispatchEvent(new Event("cashall_location_updated"));
        }}
      />
    </>
  );
}
