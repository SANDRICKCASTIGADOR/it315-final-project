"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Receipt, Share2, ChevronLeft, ChevronRight, Download, CheckCircle, Clock } from "lucide-react";

interface MotorSpec {
  id: string;
  name: string;
  frontView: string | null;
  sideView: string | null;
  backView: string | null;
  description: string | null;
  monthlyPrice: string | null;
  fullyPaidPrice: string | null;
  createdAt: Date;
}

function ImageSlider({ images, name }: { images: (string | null)[]; name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const validImages = images.filter((img): img is string => img !== null);
  
  if (validImages.length === 0) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center rounded-xl">
        <Eye size={48} className="text-gray-600 opacity-50" />
      </div>
    );
  }

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % validImages.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);

  return (
    <div className="relative w-full h-64 group/slider rounded-xl overflow-hidden">
      <img
        src={validImages[currentIndex] ?? ""}
        alt={`${name} - View ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-white text-xs font-medium">
          {currentIndex === 0 ? 'Front' : currentIndex === 1 ? 'Side' : 'Back'} View
        </span>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [motorSpecs] = useState<MotorSpec[]>([
    {
      id: "MTR-001",
      name: "HONDA PCX 150",
      frontView: "data:image/jpeg;base64,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",
      sideView: null,
      backView: null,
      description: "The Honda PCX is a stylish, fuel-efficient scooter built for smooth and comfortable city rides.",
      monthlyPrice: "5,555",
      fullyPaidPrice: "135,020",
      createdAt: new Date("2025-10-15"),
    },
    {
      id: "MTR-002",
      name: "HONDA CL500",
      frontView: null,
      sideView: null,
      backView: null,
      description: "The Honda CL500 blends classic scrambler style with modern performance.",
      monthlyPrice: "11,939",
      fullyPaidPrice: "82,000",
      createdAt: new Date("2025-10-16"),
    },
  ]);

  const [purchasedMap] = useState<Record<string, { method: string; receiptId: string; date: string; buyerImage: string; status: string }>>({
    "MTR-001": {
      method: "Full Payment",
      receiptId: "RCPT-981234",
      date: "2025-10-18",
      buyerImage: "https://via.placeholder.com/100/4A90E2/ffffff?text=Buyer+1",
      status: "completed"
    },
    "MTR-002": {
      method: "Monthly Installment",
      receiptId: "RCPT-772345",
      date: "2025-10-20",
      buyerImage: "https://via.placeholder.com/100/E94E77/ffffff?text=Buyer+2",
      status: "ongoing"
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<MotorSpec[]>(motorSpecs);

  useEffect(() => {
    if (!searchTerm.trim()) return setFiltered(motorSpecs);
    const t = searchTerm.toLowerCase();
    setFiltered(
      motorSpecs.filter(
        (m) =>
          m.name.toLowerCase().includes(t) ||
          m.id.toLowerCase().includes(t) ||
          (m.description ?? "").toLowerCase().includes(t)
      )
    );
  }, [searchTerm, motorSpecs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-5xl font-bold text-shadow-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Payment Receipts
              </h1>
              <p className="text-gray-400 text-lg">
                Track your motorcycle purchases and payments
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                placeholder="Search motorcycles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all"
              />
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Total Motorcycles</p>
                  <p className="text-white text-2xl font-bold">{motorSpecs.length}</p>
                </div>
                <Eye size={32} className="text-blue-400 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Completed</p>
                  <p className="text-white text-2xl font-bold">1</p>
                </div>
                <CheckCircle size={32} className="text-green-400 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm font-medium">Ongoing</p>
                  <p className="text-white text-2xl font-bold">1</p>
                </div>
                <Clock size={32} className="text-orange-400 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Motorcycles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((m) => {
            const purchase = purchasedMap[m.id];

            return (
              <div
                key={m.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden hover:border-red-600 transition-all transform hover:-translate-y-1"
              >
                {/* Image Slider */}
                <ImageSlider images={[m.frontView, m.sideView, m.backView]} name={m.name} />

                {/* Content */}
                <div className="p-6 space-y-5">
                  {/* Title & ID */}
                  <div>
                    <h2 className="text-white font-bold text-2xl mb-1">{m.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="bg-gray-700/50 px-2 py-1 rounded">ID: {m.id}</span>
                      <span>Added: {m.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {m.description}
                  </p>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-700/50 p-4 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Monthly</p>
                      <p className="text-2xl font-bold text-red-400">₱{m.monthlyPrice}</p>
                      <p className="text-xs text-gray-500">/month</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Full Price</p>
                      <p className="text-2xl font-bold text-green-400">₱{m.fullyPaidPrice}</p>
                      <p className="text-xs text-gray-500">one-time</p>
                    </div>
                  </div>

                  {/* Receipt Section */}
                  {purchase ? (
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-700/50 rounded-xl p-5 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={purchase.buyerImage}
                            alt="Buyer"
                            className="w-12 h-12 rounded-full border-2 border-green-500"
                          />
                          <div>
                            <h3 className="text-white font-bold flex items-center gap-2">
                              Purchase Complete
                              {purchase.status === "completed" && (
                                <CheckCircle size={16} className="text-green-500" />
                              )}
                              {purchase.status === "ongoing" && (
                                <Clock size={16} className="text-orange-500" />
                              )}
                            </h3>
                            <p className="text-xs text-gray-400">{purchase.date}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          purchase.status === "completed" 
                            ? "bg-green-900/50 text-green-400 border border-green-700" 
                            : "bg-orange-900/50 text-orange-400 border border-orange-700"
                        }`}>
                          {purchase.status === "completed" ? "Paid" : "Paying"}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Receipt ID:</span>
                          <span className="text-white font-mono">{purchase.receiptId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment Method:</span>
                          <span className="text-white">{purchase.method}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-700 pt-2">
                          <span className="text-gray-400 font-medium">Amount:</span>
                          <span className="text-white font-bold">
                            {purchase.method === "Full Payment"
                              ? `₱${m.fullyPaidPrice}`
                              : `₱${m.monthlyPrice}/mo`}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all">
                          <Receipt size={16} /> View
                        </button>
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all">
                          <Download size={16} /> Download
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-all">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                          <Eye size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Available to Purchase</p>
                          <p className="text-xs text-gray-400">Contact dealer for more info</p>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg">
                        Buy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}