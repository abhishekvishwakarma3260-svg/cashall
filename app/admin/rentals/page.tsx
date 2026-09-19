"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Gamepad2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Search,
  RefreshCw,
  Video,
  FileText,
  ShieldCheck,
  Disc,
  UserCheck,
  Phone,
  IndianRupee,
  ExternalLink,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Return Inspection & Damage Claim Modal
  const [selectedRentalForReturn, setSelectedRentalForReturn] = useState<any | null>(null);
  const [returnVideoUrl, setReturnVideoUrl] = useState("");
  const [defectsFound, setDefectsFound] = useState(false);
  const [reportedDefects, setReportedDefects] = useState("");
  const [repairCost, setRepairCost] = useState(0);
  const [savingReturn, setSavingReturn] = useState(false);

  const fetchRentals = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/v1/rentals?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.rentals)) {
        setRentals(data.rentals);
      } else {
        setError(data.error || "Failed to load rentals");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading rentals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  // Counts & KPIs
  const kpis = useMemo(() => {
    let active = 0;
    let booked = 0;
    let returnDue = 0;
    let completed = 0;
    let totalRevenue = 0;

    const today = new Date().toISOString().split("T")[0];

    for (const r of rentals) {
      if (r.rentalStatus === "ACTIVE" || r.rentalStatus === "EXTENDED") active++;
      if (r.rentalStatus === "BOOKED" || r.rentalStatus === "AGENT_ASSIGNED") booked++;
      if (r.rentalStatus === "COMPLETED") completed++;
      if (r.endDate <= today && (r.rentalStatus === "ACTIVE" || r.rentalStatus === "EXTENDED")) {
        returnDue++;
      }
      totalRevenue += Number(r.totalAmount || 0);
    }

    return {
      total: rentals.length,
      active,
      booked,
      returnDue,
      completed,
      totalRevenue,
    };
  }, [rentals]);

  // Filtered List
  const filteredRentals = useMemo(() => {
    return rentals.filter((r) => {
      // 1. Status Filter
      if (statusFilter !== "ALL") {
        if (statusFilter === "ACTIVE" && !(r.rentalStatus === "ACTIVE" || r.rentalStatus === "EXTENDED")) {
          return false;
        } else if (statusFilter === "BOOKED" && !(r.rentalStatus === "BOOKED" || r.rentalStatus === "AGENT_ASSIGNED")) {
          return false;
        } else if (statusFilter !== "ACTIVE" && statusFilter !== "BOOKED" && r.rentalStatus !== statusFilter) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          r.rentalNumber.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.customerPhone.includes(q) ||
          r.pincode.includes(q) ||
          (r.assignedAgentName && r.assignedAgentName.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });
  }, [rentals, statusFilter, searchQuery]);

  const handleReturnInspectionSubmit = async () => {
    if (!selectedRentalForReturn) return;
    setSavingReturn(true);

    try {
      const res = await fetch(`/api/v1/rentals/${selectedRentalForReturn.rentalNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "return_inspection",
          returnVideoUrl,
          reportedDefects: defectsFound ? reportedDefects : "",
          repairCost: defectsFound ? Number(repairCost) : 0,
          rentalStatus: "COMPLETED",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedRentalForReturn(null);
        fetchRentals();
      } else {
        alert(data.error || "Failed to update return inspection.");
      }
    } catch (err: any) {
      alert(err.message || "Network error.");
    } finally {
      setSavingReturn(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-black">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-yellow/20 text-brand-black border border-brand-yellow/40">
                PlayStation 5 Operations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-black flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-brand-yellow" />
              PS5 Rental Management Console
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Live PlayStation 5 rentals, doorstep delivery handovers, video proof logs, and repair liability tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/rent/ps5"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-yellow text-black font-black text-xs hover:bg-yellow-400 shadow-yellowGlow transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Rental</span>
            </Link>

            <button
              onClick={fetchRentals}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-yellow" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-gray-500">Total Bookings</span>
            <div className="text-2xl font-black text-brand-black">{kpis.total}</div>
            <span className="text-[10px] text-gray-400">All-time PS5 rentals</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-blue-600">Active Rentals</span>
            <div className="text-2xl font-black text-blue-900">{kpis.active}</div>
            <span className="text-[10px] text-blue-500">Currently with customers</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-yellow-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-yellow-700">Pending Delivery</span>
            <div className="text-2xl font-black text-yellow-900">{kpis.booked}</div>
            <span className="text-[10px] text-yellow-600">Awaiting agent dispatch</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-orange-600">Returns Due</span>
            <div className="text-2xl font-black text-orange-900">{kpis.returnDue}</div>
            <span className="text-[10px] text-orange-500">Due today or overdue</span>
          </div>

          <div className="col-span-2 md:col-span-1 bg-white rounded-2xl p-5 border border-green-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-green-700">Total Rental Volume</span>
            <div className="text-2xl font-black text-green-900">₹{kpis.totalRevenue.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-green-600">₹500/day + CDs</span>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ALL", label: `All (${rentals.length})` },
              { id: "BOOKED", label: `Pending Delivery (${kpis.booked})` },
              { id: "ACTIVE", label: `Active (${kpis.active})` },
              { id: "COMPLETED", label: `Completed (${kpis.completed})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === tab.id
                    ? "bg-brand-black text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order #, customer, phone..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-yellow"
            />
          </div>
        </div>

        {/* RENTALS LIST */}
        {filteredRentals.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <Gamepad2 className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">No PS5 Rental Bookings Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {searchQuery ? "No bookings match your search query." : "New PS5 rental requests from the website will appear here in real-time."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRentals.map((rental) => {
              const totalDays = rental.totalDays + (rental.extendedDays || 0);
              return (
                <div
                  key={rental.id || rental.rentalNumber}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        #{rental.rentalNumber}
                      </span>
                      <span className="text-xs font-extrabold text-brand-black">
                        {rental.consoleModel}
                      </span>
                      {rental.extendedDays > 0 && (
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          +{rental.extendedDays} Days Extended
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          rental.rentalStatus === "ACTIVE" || rental.rentalStatus === "EXTENDED"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : rental.rentalStatus === "COMPLETED"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        }`}
                      >
                        {rental.rentalStatus}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          rental.paymentStatus === "PAID"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {rental.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[11px]">Customer:</span>
                      <strong className="text-brand-black text-sm block">{rental.customerName}</strong>
                      <span className="text-gray-600 font-mono">{rental.customerPhone}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Rental Window:</span>
                      <div className="font-bold text-gray-800">
                        {rental.startDate} → <strong className="text-blue-900">{rental.endDate}</strong>
                      </div>
                      <span className="text-gray-500 text-[11px]">{totalDays} Days Total</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Rented CDs ({rental.cdCount || 0}):</span>
                      {rental.selectedGames && rental.selectedGames.length > 0 ? (
                        <div className="truncate text-gray-700 font-medium">
                          {rental.selectedGames.join(", ")}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No CDs</span>
                      )}
                      <span className="text-gray-500 text-[11px] block">
                        Extra Controller: {rental.extraControllers ? "Yes (2 Controllers)" : "No (1 Controller)"}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Total Fee:</span>
                      <div className="text-lg font-black text-brand-black">
                        ₹{rental.totalAmount.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-gray-500">Pay on Handover</span>
                    </div>
                  </div>

                  {/* Address & Video Proof Bar */}
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-600 truncate">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{rental.deliveryAddress}, PIN: {rental.pincode}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {rental.preDeliveryVideoUrl ? (
                        <a
                          href={rental.preDeliveryVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Pre-Delivery Video Proof</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-gray-400 italic">No video recorded yet</span>
                      )}

                      <Link
                        href={`/rent/inspect/${rental.rentalNumber}`}
                        className="flex items-center gap-1 text-[11px] font-bold text-brand-black bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-brand-yellow" />
                        <span>Handover Form</span>
                      </Link>

                      <Link
                        href={`/rent/track/${rental.rentalNumber}`}
                        target="_blank"
                        className="flex items-center gap-1 text-[11px] font-bold text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Customer Link</span>
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedRentalForReturn(rental);
                          setReturnVideoUrl(rental.returnVideoUrl || "");
                          setDefectsFound(Boolean(rental.repairCost && rental.repairCost > 0));
                          setReportedDefects(rental.reportedDefects || "");
                          setRepairCost(rental.repairCost || 0);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-black text-white text-[11px] font-bold hover:bg-neutral-800 transition-colors"
                      >
                        Return Inspection
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* RETURN INSPECTION & DAMAGE CLAIM MODAL */}
      {selectedRentalForReturn && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-black text-brand-black">Return Inspection & Damage Claim</h3>
                <p className="text-xs text-gray-500 font-mono">#{selectedRentalForReturn.rentalNumber}</p>
              </div>
              <button
                onClick={() => setSelectedRentalForReturn(null)}
                className="text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Return Video Recording Proof URL:
                </label>
                <input
                  type="text"
                  value={returnVideoUrl}
                  onChange={(e) => setReturnVideoUrl(e.target.value)}
                  placeholder="https://drive.google.com/... or video link"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-yellow font-mono"
                />
              </div>

              {/* Defects Toggle */}
              <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={defectsFound}
                    onChange={(e) => setDefectsFound(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600"
                  />
                  <span className="font-bold text-red-900">
                    Defects / Damage / Missing Accessories Found
                  </span>
                </label>

                {defectsFound && (
                  <div className="space-y-3 pt-2 border-t border-gray-200">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Reported Defects Description:
                      </label>
                      <textarea
                        rows={2}
                        value={reportedDefects}
                        onChange={(e) => setReportedDefects(e.target.value)}
                        placeholder="e.g. Broken left analog stick, deep scratch on console shell"
                        className="w-full px-3 py-2 border border-red-300 rounded-xl text-xs focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Repair / Replacement Cost (₹):
                      </label>
                      <input
                        type="number"
                        value={repairCost}
                        onChange={(e) => setRepairCost(Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-red-300 rounded-xl text-xs focus:outline-none focus:border-red-500 font-bold"
                      />
                      <span className="text-[10px] text-gray-500 mt-0.5 block">
                        As per signed undertaking, customer is liable for 100% repair cost.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedRentalForReturn(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-black"
              >
                Cancel
              </button>

              <button
                onClick={handleReturnInspectionSubmit}
                disabled={savingReturn}
                className="px-5 py-2.5 rounded-xl bg-brand-yellow text-black font-black text-xs hover:bg-yellow-400 shadow-md disabled:opacity-50"
              >
                {savingReturn ? "Saving..." : "Complete Return Inspection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
