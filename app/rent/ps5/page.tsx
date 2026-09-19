"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Gamepad2,
  Disc,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Video,
  FileText,
  AlertTriangle,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Info,
  Tv,
  Check,
  X,
  Lock,
} from "lucide-react";

interface GameCD {
  id: string;
  title: string;
  genre: string;
  rating: string;
  imageUrl: string;
}

const AVAILABLE_GAMES: GameCD[] = [
  {
    id: "gta5",
    title: "Grand Theft Auto V",
    genre: "Action / Open World",
    rating: "18+",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "spiderman2",
    title: "Marvel's Spider-Man 2",
    genre: "Action / Superhero",
    rating: "16+",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "fc24",
    title: "EA Sports FC 24",
    genre: "Sports / Football",
    rating: "3+",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "gow_ragnarok",
    title: "God of War Ragnarök",
    genre: "Action / Adventure",
    rating: "18+",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "cricket24",
    title: "Cricket 24: Official Game",
    genre: "Sports / Cricket",
    rating: "3+",
    imageUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "mortal_kombat1",
    title: "Mortal Kombat 1",
    genre: "Fighting / Multiplayer",
    rating: "18+",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60",
  },
];

export default function Ps5RentalPage() {
  const router = useRouter();

  // Console Selection
  const [consoleModel, setConsoleModel] = useState<"PS5 Disc Edition" | "PS5 Digital Edition">("PS5 Disc Edition");
  const [extraControllers, setExtraControllers] = useState(false);

  // Rental Duration: Minimum 1 day, up to N days
  const [days, setDays] = useState<number>(2);

  // Game CDs Selection: ₹100 per day per CD
  const [selectedGames, setSelectedGames] = useState<string[]>(["gta5", "fc24"]);

  // Customer & Delivery Info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 01:00 PM");
  const [govtIdType, setGovtIdType] = useState("Aadhaar Card");
  const [govtIdNumber, setGovtIdNumber] = useState("");

  // Terms & Liability Modal
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Calculation:
  // Console: ₹500/day
  // CDs: ₹100/day per CD
  const consoleDailyRate = 500;
  const cdDailyRate = 100;
  const consoleTotal = days * consoleDailyRate;
  const cdTotal = days * (selectedGames.length * cdDailyRate);
  const totalAmount = consoleTotal + cdTotal;

  const toggleGame = (gameId: string) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter((id) => id !== gameId));
    } else {
      setSelectedGames([...selectedGames, gameId]);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsModalOpen(true);
      return;
    }

    if (!customerName || !customerPhone || !deliveryAddress || !pincode) {
      setError("Please complete all required customer & delivery fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/v1/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          deliveryAddress,
          pincode,
          govtIdType,
          govtIdNumber,
          consoleModel,
          startDate: deliveryDate,
          totalDays: days,
          cdCount: selectedGames.length,
          selectedGames: selectedGames.map((id) => AVAILABLE_GAMES.find((g) => g.id === id)?.title || id),
          extraControllers,
        }),
      });

      const data = await res.json();
      if (data.success && data.rental) {
        router.push(`/rent/track/${data.rental.rentalNumber}`);
      } else {
        setError(data.error || "Failed to create rental booking. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white selection:bg-brand-yellow selection:text-black">
      {/* GLOW DECORATIONS */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 left-10 w-80 h-80 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BREADCRUMB */}
      <div className="border-b border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-xs font-semibold">
              CashALL
            </Link>
            <span className="text-gray-600 text-xs">/</span>
            <span className="text-brand-yellow text-xs font-bold flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" />
              PS5 Rental Service
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Pay & Use on Delivery
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30">
              ₹500 / Day
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* HERO BANNER */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden bg-gradient-to-r from-blue-950/50 via-neutral-900 to-neutral-950 border border-blue-900/40 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Official PlayStation 5 Doorstep Rental
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Rent Sony PlayStation 5 <br />
              <span className="text-brand-yellow">Just ₹500/Day. Pay on Handover.</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Experience ultra-high-speed 4K HDR gaming at home. Book for as little as 1 day or extend anytime. Complete with DualSense wireless controller, ultra-high-speed HDMI 2.1 cable, and optional top-rated game CDs at only ₹100/day.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-gray-300">
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Free Doorstep Setup
              </span>
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Pre-Delivery Video Proof
              </span>
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Extend Online Anytime
              </span>
              <span className="flex items-center gap-1.5 text-brand-yellow">
                <Lock className="w-4 h-4 text-brand-yellow" /> Pay & Use upon Handover
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: CUSTOMIZATION & DETAILS */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. SELECT CONSOLE MODEL */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Tv className="w-5 h-5 text-brand-yellow" />
                    1. Choose Your PS5 Edition
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Both options include DualSense controller, power cable, and HDMI 2.1 cable.
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                  ₹500 / day
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setConsoleModel("PS5 Disc Edition")}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    consoleModel === "PS5 Disc Edition"
                      ? "border-brand-yellow bg-brand-yellow/10 ring-2 ring-brand-yellow/30"
                      : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-white">PS5 Disc Edition</span>
                    <Disc className={`w-5 h-5 ${consoleModel === "PS5 Disc Edition" ? "text-brand-yellow" : "text-gray-500"}`} />
                  </div>
                  <p className="text-xs text-gray-400">
                    Supports 4K Blu-ray Game Discs and digital downloads. Recommended if renting game CDs!
                  </p>
                  <div className="mt-4 text-xs font-bold text-brand-yellow">₹500 / day</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsoleModel("PS5 Digital Edition")}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    consoleModel === "PS5 Digital Edition"
                      ? "border-brand-yellow bg-brand-yellow/10 ring-2 ring-brand-yellow/30"
                      : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-white">PS5 Digital Edition</span>
                    <Gamepad2 className={`w-5 h-5 ${consoleModel === "PS5 Digital Edition" ? "text-brand-yellow" : "text-gray-500"}`} />
                  </div>
                  <p className="text-xs text-gray-400">
                    Sleek disc-free design for digital library games and PlayStation Plus accounts.
                  </p>
                  <div className="mt-4 text-xs font-bold text-brand-yellow">₹500 / day</div>
                </button>
              </div>

              {/* Extra Controller Toggle */}
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">DualSense Controller 2 (For Multiplayer)</div>
                  <div className="text-[11px] text-gray-400">Add a 2nd controller for 2-player co-op / competitive games</div>
                </div>
                <button
                  type="button"
                  onClick={() => setExtraControllers(!extraControllers)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    extraControllers
                      ? "bg-brand-yellow text-black font-black"
                      : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                  }`}
                >
                  {extraControllers ? "✓ 2nd Controller Added" : "+ Add 2nd Controller"}
                </button>
              </div>
            </div>

            {/* 2. RENTAL DURATION SELECTOR */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-yellow" />
                    2. Select Rental Duration
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Minimum 1 day. You can easily extend your plan online anytime!
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Total Days: </span>
                  <span className="text-base font-black text-brand-yellow">{days} Days</span>
                </div>
              </div>

              {/* Interactive Day Counter */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-300">How many days do you want the PS5?</div>
                  <div className="text-[11px] text-gray-500">Starts from delivery date, return pickup scheduled after {days} days</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={days <= 1}
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="w-16 text-center">
                    <span className="text-2xl font-black text-white">{days}</span>
                    <span className="block text-[10px] text-gray-400">DAY{days > 1 ? "S" : ""}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDays(days + 1)}
                    className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Select Preset Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs font-semibold text-gray-400 self-center mr-1">Quick Select:</span>
                {[
                  { label: "1 Day (Trial)", count: 1 },
                  { label: "2 Days (Weekend)", count: 2 },
                  { label: "3 Days (Long Weekend)", count: 3 },
                  { label: "5 Days (Workweek)", count: 5 },
                  { label: "7 Days (1 Week)", count: 7 },
                  { label: "14 Days (2 Weeks)", count: 14 },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setDays(preset.count)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      days === preset.count
                        ? "bg-brand-yellow text-black shadow-yellowGlow"
                        : "bg-neutral-950 border border-neutral-800 text-gray-300 hover:border-neutral-700"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. OPTIONAL GAME CDS ADD-ON */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Disc className="w-5 h-5 text-brand-yellow" />
                    3. Add Game Discs (Optional)
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select popular PS5 titles to play. Each CD costs only <span className="text-brand-yellow font-bold">₹100/day</span>.
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-yellow bg-brand-yellow/10 px-2.5 py-1 rounded-full">
                  {selectedGames.length} CD{selectedGames.length !== 1 ? "s" : ""} Selected (₹{selectedGames.length * cdDailyRate * days})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {AVAILABLE_GAMES.map((game) => {
                  const isSelected = selectedGames.includes(game.id);
                  return (
                    <div
                      key={game.id}
                      onClick={() => toggleGame(game.id)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? "border-brand-yellow bg-brand-yellow/10 ring-1 ring-brand-yellow/40 shadow-md"
                          : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 hover:bg-neutral-950"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-black text-white leading-tight">{game.title}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{game.genre}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs ${
                            isSelected ? "bg-brand-yellow text-black font-bold" : "border border-neutral-700 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[11px] pt-2 border-t border-neutral-800/60">
                        <span className="text-gray-400">Rating: {game.rating}</span>
                        <span className="font-bold text-brand-yellow">+₹100/day</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-gray-400 bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Game discs are verified scratch-free prior to delivery. You will inspect each CD along with the delivery agent.
                </span>
              </div>
            </div>

            {/* 4. DOORSTEP DELIVERY & CUSTOMER DETAILS */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-yellow" />
                  4. Doorstep Delivery & Customer Details
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Our logistics executive will deliver, setup, and test the console directly at your doorstep.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Email Address (For Invoices & Handover Receipt)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="rahul.sharma@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    PIN Code <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 110001"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Complete Delivery Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Flat / House No., Building Name, Street, Landmark, City"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Delivery Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Preferred Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  >
                    <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                    <option value="07:00 PM - 09:30 PM">Night (07:00 PM - 09:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Govt ID Verification Type</label>
                  <select
                    value={govtIdType}
                    onChange={(e) => setGovtIdType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Govt ID Number (Last 4 digits or Full)</label>
                  <input
                    type="text"
                    value={govtIdNumber}
                    onChange={(e) => setGovtIdNumber(e.target.value)}
                    placeholder="e.g. XXXX-XXXX-1234"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRICING BREAKDOWN & UNDERTAKING */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 sticky top-20 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-yellow" /> Rental Summary
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                  Pay & Use
                </span>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-gray-300">
                  <span>
                    {consoleModel} ({days} Day{days > 1 ? "s" : ""} × ₹500)
                  </span>
                  <span className="font-bold text-white">₹{consoleTotal.toLocaleString("en-IN")}</span>
                </div>

                {selectedGames.length > 0 && (
                  <div className="flex items-center justify-between text-gray-300">
                    <span>
                      Game Discs ({selectedGames.length} CD{selectedGames.length > 1 ? "s" : ""} × {days}d × ₹100)
                    </span>
                    <span className="font-bold text-white">₹{cdTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {extraControllers && (
                  <div className="flex items-center justify-between text-gray-300">
                    <span>DualSense Controller 2</span>
                    <span className="font-bold text-green-400">FREE INCLUDED</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-gray-300">
                  <span>Doorstep Delivery & Setup</span>
                  <span className="font-bold text-green-400">FREE</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-white block">Total Payable on Handover</span>
                    <span className="text-[10px] text-gray-400">Pay directly to delivery agent (Cash / UPI)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-yellow">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Video Inspection & Repair Undertaking Checkbox */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="rounded-2xl bg-neutral-950 p-3.5 border border-neutral-800 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-brand-yellow focus:ring-brand-yellow bg-neutral-900 border-neutral-700 cursor-pointer"
                    />
                    <label htmlFor="termsCheckbox" className="text-[11px] text-gray-300 leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setTermsModalOpen(true)}
                        className="text-brand-yellow underline font-bold hover:text-white"
                      >
                        PS5 Video Inspection & Repair Liability Undertaking
                      </button>
                      . I understand our delivery agent will record a working setup video and I am liable for any physical/liquid damage during my rental.
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTermsModalOpen(true)}
                  className="w-full text-center text-[11px] text-blue-400 hover:text-blue-300 underline font-semibold flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> View Official Form & Undertaking Clauses
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl font-black text-sm transition-all duration-200 shadow-yellowGlow bg-brand-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Creating Your Booking...</span>
                ) : (
                  <>
                    <span>CONFIRM PS5 RENTAL BOOKING</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-gray-500 text-center space-y-1">
                <div>✓ No upfront online payment required</div>
                <div>✓ Pay via UPI/Cash when our agent brings the PS5</div>
                <div>✓ Extend your rental days online from your order page</div>
              </div>
            </div>
          </div>
        </form>
      </main>

      {/* TERMS & LIABILITY UNDERTAKING MODAL */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* MODAL HEADER */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">PS5 Equipment Condition & Repair Liability</h3>
                  <p className="text-xs text-gray-400">Official Undertaking (CashALL / Aarna Enterprises)</p>
                </div>
              </div>
              <button
                onClick={() => setTermsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-blue-200">
                <span className="font-bold">Summary: </span>
                Our delivery executive will set up and test the PlayStation 5 in your presence. A brief video recording of the working console, ports, and controllers will be taken and saved with your digital receipt.
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">1. Pre-Delivery Video Proof & Recording</h4>
                  <p>
                    I, the Customer, acknowledge and agree that the delivery agent will record a detailed live video showing the physical condition, ports, body warranty seal, serial numbers, and working status of the PS5 Console and DualSense Controller(s) prior to handover.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">2. Return Verification & Physical Matching</h4>
                  <p>
                    At the time of return, the PS5 Console and Controller(s) will be inspected again. The returned equipment <strong className="text-white">MUST MATCH EXACTLY</strong> with the pre-delivery video recording in terms of physical condition, working status, body seal, and serial numbers.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">3. Damage & Repair Expense Liability</h4>
                  <p className="mb-2">
                    If any physical damage, body cracks, deep scratches, liquid spills, broken/sticky buttons, stick drift due to impact, port damage, or internal hardware/seal tampering is found upon return that does not match the original video recording:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                    <li>
                      <strong className="text-brand-yellow">100% Repair Cost:</strong> I undertake to pay ALL EXPENSES incurred for official inspection, spare parts replacement, and repair of the Console/Controller.
                    </li>
                    <li>
                      <strong className="text-brand-yellow">Full Replacement Value:</strong> If the equipment is rendered unrepairable or if the hardware/serial numbers do not match the original video recording, I agree to pay the full market replacement value of the damaged equipment.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">4. Pay & Use Handover</h4>
                  <p>
                    The agreed rental fee must be paid in full to the delivery agent upon handover. The customer will sign the digital handover form alongside the agent on the spot.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">5. Plan Extension</h4>
                  <p>
                    Customers can extend their rental period directly from the CashALL tracking link at ₹500/day + game CD charges. Extension requests must be placed before the scheduled return pickup time.
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setTermsAccepted(true);
                  setTermsModalOpen(false);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-brand-yellow text-black hover:bg-yellow-400 shadow-yellowGlow flex items-center gap-1.5"
              >
                <span>Accept Terms & Undertaking</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
