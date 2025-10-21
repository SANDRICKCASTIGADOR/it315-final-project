"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  DollarSign,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";

interface MotorSpec {
  id: string;
  frontView: string | null;
  sideView: string | null;
  backView: string | null;
  description: string | null;
  monthlyPrice: string | null;
  fullyPaidPrice: string | null;
  createdAt: Date;
}

function FullscreenModal({
  imageUrl,
  onClose,
  description,
}: {
  imageUrl: string;
  onClose: () => void;
  description: string;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
      >
        <X size={24} />
      </button>
      <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <img
          src={imageUrl}
          alt={description}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
        <p className="text-white text-sm">Press ESC or click outside to close</p>
      </div>
    </div>
  );
}

function ImageSlider({ images, description }: { images: (string | null)[]; description: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Filter out null images
  const validImages = images.filter((img) => img !== null) as string[];

  if (validImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/20 to-orange-900/20">
        <Eye size={48} className="text-gray-600 opacity-50" />
      </div>
    );
  }

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (validImages[currentIndex]) {
      setFullscreenImage(validImages[currentIndex]);
    }
  };

  const viewLabels = ["Front View", "Side View", "Back View"];

  return (
    <>
      <div className="relative w-full h-full group/slider">
        {/* Main Image */}
        <div className="relative w-full h-full overflow-hidden cursor-zoom-in" onClick={openFullscreen}>
          <img
            src={validImages[currentIndex]}
            alt={`${description} - ${viewLabels[currentIndex]}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Zoom Icon Hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black/60 backdrop-blur-sm p-3 rounded-full">
              <ZoomIn size={32} className="text-white" />
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Only show if more than 1 image */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all backdrop-blur-sm z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all backdrop-blur-sm z-10"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToSlide(index, e)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-red-500 w-6" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* View Label */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full z-10">
          <span className="text-white text-xs font-medium">{viewLabels[currentIndex]}</span>
        </div>
      </div>

      {fullscreenImage && (
        <FullscreenModal
          imageUrl={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
          description={description}
        />
      )}
    </>
  );
}

function PaymentModal({
  bike,
  onClose,
  onComplete,
}: {
  bike: MotorSpec;
  onClose: () => void;
  onComplete: (payload: { id: string; method: "monthly" | "full"; receiptId: string }) => void;
}) {
  const [method, setMethod] = useState<"monthly" | "full">("monthly");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthly = bike.monthlyPrice ? Number(bike.monthlyPrice) : null;
  const full = bike.fullyPaidPrice ? Number(bike.fullyPaidPrice) : null;

  const priceToPay = method === "monthly" ? monthly : full;

  function fakeProcess() {
    if (!priceToPay) {
      setError("Price not available for the selected option.");
      return;
    }
    if (name.trim() === "") {
      setError("Please enter your name.");
      return;
    }
    setError(null);
    setProcessing(true);

    setTimeout(() => {
      const receiptId = `RCPT-${Date.now().toString().slice(-6)}`;
      setProcessing(false);
      onComplete({ id: bike.id, method, receiptId });
      onClose();
    }, 1700);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Complete Purchase</h2>
        <p className="text-gray-400 mb-4">{bike.description || "Motor purchase"}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="col-span-1">
            <label className="text-sm text-gray-300">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-300">Contact (phone or email)</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 text-white" />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className={`px-3 py-2 rounded-lg cursor-pointer border ${method === "monthly" ? "bg-red-700/20 border-red-600" : "bg-transparent border-gray-700"}`}>
            <input type="radio" name="pay" checked={method === "monthly"} onChange={() => setMethod("monthly")} className="mr-2" />
            Monthly {monthly ? `(₱${monthly}/mo)` : "(N/A)"}
          </label>
          <label className={`px-3 py-2 rounded-lg cursor-pointer border ${method === "full" ? "bg-green-700/20 border-green-600" : "bg-transparent border-gray-700"}`}>
            <input type="radio" name="pay" checked={method === "full"} onChange={() => setMethod("full")} className="mr-2" />
            Full Payment {full ? `(₱${full})` : "(N/A)"}
          </label>
        </div>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Amount</p>
            <p className="text-xl font-bold text-white">{priceToPay ? `₱${priceToPay}` : "N/A"}</p>
          </div>

          <div>
            <button
              onClick={fakeProcess}
              disabled={processing}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg font-semibold disabled:opacity-60"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <DollarSign size={16} /> Pay
                </span>
              )}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">This is a fake payment flow for demo/testing. No real charges occur.</p>
      </div>
    </div>
  );
}

export default function ItemsPage() {
  const [motorSpecs, setMotorSpecs] = useState<MotorSpec[]>([]);
  const [filteredMotorSpecs, setFilteredMotorSpecs] = useState<MotorSpec[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Local UI state for payments
  const [selectedBike, setSelectedBike] = useState<MotorSpec | null>(null);
  const [purchasedMap, setPurchasedMap] = useState<Record<string, { method: string; receiptId: string }>>({});

  useEffect(() => {
    async function fetchMotorSpecs() {
      try {
        const res = await fetch("/api/motor-specs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Coerce createdAt strings to Date (if necessary)
        const normalized = data.map((d: any) => ({ ...d, createdAt: d.createdAt ? new Date(d.createdAt) : new Date() }));
        setMotorSpecs(normalized);
        setFilteredMotorSpecs(normalized);
      } catch (error) {
        console.error("Error fetching motor specs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMotorSpecs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMotorSpecs(motorSpecs);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = motorSpecs.filter((bike) => bike.description?.toLowerCase().includes(term) || bike.id.toLowerCase().includes(term));
      setFilteredMotorSpecs(filtered);
    }
  }, [searchTerm, motorSpecs]);

  function handleCompletePayment(payload: { id: string; method: "monthly" | "full"; receiptId: string }) {
    setPurchasedMap((prev) => ({ ...prev, [payload.id]: { method: payload.method, receiptId: payload.receiptId } }));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-red-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading motor specs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Browse Motors</h1>
          <p className="text-gray-400 text-lg mb-8">Found {filteredMotorSpecs.length} motor{filteredMotorSpecs.length !== 1 ? "s" : ""}</p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by description or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all"
            />
          </div>
        </div>

        {filteredMotorSpecs.length === 0 ? (
          <div className="text-center py-16">
            <Eye size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">No motor specs found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMotorSpecs.map((bike) => (
              <div key={bike.id} className="group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-xl hover:border-red-600 transition-all overflow-hidden transform hover:-translate-y-2 h-full flex flex-col">

                  {/* Image Slider Section */}
                  <div className="relative h-72 bg-gradient-to-br from-red-900/20 to-orange-900/20 overflow-hidden">
                    <ImageSlider images={[bike.frontView, bike.sideView, bike.backView]} description={bike.description || "Motor Spec"} />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-white font-bold text-lg mb-2">Description</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{bike.description || 'Premium motor model with exceptional performance and reliability.'}</p>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-3 mt-auto">
                      {bike.monthlyPrice && (
                        <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300 font-medium">Monthly Payment</span>
                            <div className="flex items-center">
                              <span className="text-2xl font-bold text-red-400">₱{bike.monthlyPrice}</span>
                              <span className="text-gray-400 text-sm ml-1">/mo</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {bike.fullyPaidPrice && (
                        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300 font-medium">Full Cash Price</span>
                            <div className="flex items-center">
                              <span className="text-2xl font-bold text-green-400">₱{bike.fullyPaidPrice}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Buy Button / Status */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedBike(bike)}
                          className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Buy Now
                        </button>

                        {/* If purchased show receipt / method */}
                        {purchasedMap[bike.id] ? (
                          <div className="w-36 flex items-center justify-center px-3 py-2 rounded-lg bg-gray-800 border border-green-700">
                            <div>
                              <p className="text-xs text-gray-300">Purchased</p>
                              
                            </div>
                          </div>
                        ) : (
                          <div className="w-36 flex items-center justify-center px-3 py-2 rounded-lg bg-gray-800 border border-gray-700">
                            <p className="text-xs text-gray-300">Available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBike && (
        <PaymentModal
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onComplete={handleCompletePayment}
        />
      )}
    </div>
  );
}
