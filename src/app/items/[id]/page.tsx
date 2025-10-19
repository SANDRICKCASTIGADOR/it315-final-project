"use client";

import { Bike, ArrowLeft, ChevronLeft, ChevronRight, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

type ImageCarouselProps = {
  images: { url: string; label: string }[];
};

function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div className="relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700">
      <div className="relative aspect-video">
        <img
          src={currentImage.url}
          alt={currentImage.label}
          className="w-full h-full object-contain"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-2 rounded-full">
          <span className="text-white font-medium">{currentImage.label}</span>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-4 bg-gray-900/50">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-orange-500'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type MotorData = {
  id: string;
  apiKeyId?: string;
  description: string;
  monthlyPrice: string;
  fullyPaidPrice: string;
  frontView: string;
  sideView: string;
  backView: string;
  createdAt: string;
  dataSource: 'website-a' | 'website-b';
};

export default function MotorDisplayPage({ params }: { params: { id: string } }) {
  const [motorData, setMotorData] = useState<MotorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitError, setRateLimitError] = useState(false);

  const motorId = params.id;

  useEffect(() => {
    if (!motorId) {
      setError('No motor ID provided in URL');
      setLoading(false);
      return;
    }

    const fetchMotorData = async () => {
      try {
        setLoading(true);
        setRateLimitError(false);
        
        // First, try to fetch from Website B's own database
        const responseB = await fetch(`/api/motors/${motorId}`);
        
        if (responseB.ok) {
          const data = await responseB.json();
          setMotorData({
            ...data,
            dataSource: 'website-b'
          });
          setError(null);
          return;
        }

        // If not found in Website B, try fetching from Website A's API
        const responseA = await fetch(`/api/motors/external/${motorId}`);
        
        if (responseA.status === 429) {
          setRateLimitError(true);
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        if (!responseA.ok) {
          const errorData = await responseA.json();
          throw new Error(errorData.error || 'Motor not found');
        }

        const dataA = await responseA.json();
        setMotorData({
          ...dataA,
          dataSource: 'website-a'
        });
        setError(null);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching motor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorData();
  }, [motorId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-orange-500 animate-spin mx-auto" />
          <p className="text-gray-300 text-lg">Loading motor details...</p>
        </div>
      </main>
    );
  }

  if (error || !motorData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {rateLimitError ? 'Rate Limit Exceeded' : 'Error Loading Motor'}
          </h2>
          <p className="text-gray-400">{error || 'Motor not found'}</p>
          
          {rateLimitError && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-sm text-yellow-200">
              <p className="font-semibold mb-2">What does this mean?</p>
              <p>The API has rate limits to ensure fair usage. Please wait a moment and try again.</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/items">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-all font-medium">
                Browse All Motors
              </button>
            </a>
            <a href="/help">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all font-medium">
                Get Help
              </button>
            </a>
          </div>
        </div>
      </main>
    );
  }

  const images = [
    { url: motorData.frontView, label: 'Front View' },
    { url: motorData.sideView, label: 'Side View' },
    { url: motorData.backView, label: 'Back View' }
  ].filter(img => img.url);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-700/15 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-10 p-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h1 className="flex items-center gap-3 text-4xl font-bold bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
              <div className="p-3 bg-gradient-to-br from-orange-600/40 to-orange-700/40 rounded-xl backdrop-blur-sm border border-orange-500/40">
                <Bike className="h-8 w-8 text-orange-400" />
              </div>
              Motor Details
            </h1>
            <p className="text-gray-300 text-lg ml-1">
              View motorcycle specifications and images
            </p>
          </div>
          <a href="/items">
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all">
              <ArrowLeft className="h-5 w-5" />
              Back to Browse
            </button>
          </a>
        </div>

        {/* Data Source Badge */}
        <div className="flex items-center gap-3">
          {motorData.dataSource === 'website-a' ? (
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
              <ExternalLink className="h-4 w-4" />
              Data from Website A API
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg text-sm font-medium">
              <Bike className="h-4 w-4" />
              Data from Website B Database
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Bike className="h-6 w-6 text-orange-500" />
              Motor Images
            </h2>
            {images.length > 0 ? (
              <ImageCarousel images={images} />
            ) : (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                <Bike className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No images available</p>
              </div>
            )}
          </div>

          {/* Motor Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700">
                <h2 className="text-3xl text-white font-bold">
                  Motor Specification
                </h2>
                <p className="text-sm text-gray-400 mt-1">ID: {motorData.id}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Description */}
                {motorData.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Description</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {motorData.description}
                    </p>
                  </div>
                )}

                {/* Pricing */}
                {(motorData.monthlyPrice || motorData.fullyPaidPrice) && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Payment Options</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {motorData.monthlyPrice && (
                        <div className="bg-gradient-to-br from-orange-600/10 to-orange-700/10 border border-orange-500/30 rounded-xl p-4">
                          <p className="text-sm text-orange-400 font-medium mb-1">Monthly Payment</p>
                          <p className="text-3xl font-bold text-white">
                            ₱{motorData.monthlyPrice}
                            <span className="text-sm text-gray-400 font-normal">/month</span>
                          </p>
                        </div>
                      )}

                      {motorData.fullyPaidPrice && (
                        <div className="bg-gradient-to-br from-green-600/10 to-green-700/10 border border-green-500/30 rounded-xl p-4">
                          <p className="text-sm text-green-400 font-medium mb-1">Fully Paid</p>
                          <p className="text-3xl font-bold text-white">
                            ₱{motorData.fullyPaidPrice}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-orange-600/50 transition-all duration-300 font-semibold">
                    Inquire Now
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all font-semibold">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">Data Source</p>
                  <p className="text-gray-200 font-medium">
                    {motorData.dataSource === 'website-a' ? 'Website A API' : 'Website B DB'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Created At</p>
                  <p className="text-gray-200 font-medium">{new Date(motorData.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Motor ID</p>
                  <p className="text-gray-200 font-medium text-xs break-all">{motorData.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Images</p>
                  <p className="text-gray-200 font-medium">{images.length} views</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-xl rounded-lg border border-gray-700">
          <div className="text-gray-300 text-lg leading-relaxed">
            <span className="font-semibold text-orange-400">Note:</span> This page displays motorcycle data from both Website B's database and Website A's API. For more information or to schedule a test ride, please contact us directly.
          </div>
        </div>
      </div>
    </main>
  );
}