// app/page.tsx
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { desc } from "drizzle-orm";
import Image from "next/image";
import { DollarSign, Eye } from "lucide-react";
import { hardwareSpecs } from "~/server/db/schema";
import { db } from "~/server/db";

// Fetch featured listings (top 3 most recent)
async function getFeaturedListings() {
  try {
    const listings = await db
      .select()
      .from(hardwareSpecs)
      .orderBy(desc(hardwareSpecs.createdAt))
      .limit(3);
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <SignedOut>
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-16">
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Find Your Perfect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Motorcycle Today
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Premium selection of sport bikes, cruisers, and adventure
                motorcycles. Expert financing, trade-ins accepted, and lifetime
                support. MotoRide - Your trusted motorcycle dealer since 2015.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <SignInButton>
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 shadow-xl transform hover:-translate-y-1 transition-all">
                    Shop Now 🏍️
                  </button>
                </SignInButton>
                <Link href="/items">
                  <button className="bg-gray-700 text-white border border-gray-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-600 shadow-lg transition-all">
                    View Inventory
                  </button>
                </Link>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                ✓ Financing Available | ✓ Trade-Ins Welcome | ✓ Free Service
                Checks
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl w-80 h-80 flex items-center justify-center shadow-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-64 h-64 flex flex-col items-center justify-center border border-white/20">
                    <div className="bg-white rounded-full p-4 mb-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      MotoRide
                    </h3>
                    <p className="text-white/90 text-center text-sm font-medium">
                      Premium Motorcycle Dealer
                    </p>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-28 h-28 flex items-center justify-center shadow-xl animate-pulse">
                  <span className="text-white font-bold text-sm text-center leading-tight">
                    Best
                    <br />
                    Deals
                    <br />
                    2025
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Listings Section */}
          {featuredListings.length > 0 && (
            <div className="py-16">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    Featured Models
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Check out our latest additions
                  </p>
                </div>
                <Link href="/products">
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg">
                    View All Models →
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredListings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/products/${listing.id}`}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-xl hover:border-red-600 transition-all overflow-hidden transform hover:-translate-y-2">
                      {/* Image Section */}
                      <div className="relative h-56 bg-gradient-to-br from-red-900/20 to-orange-900/20 overflow-hidden">
                        {listing.frontView ? (
                          <Image
                            src={listing.frontView}
                            alt={listing.description || "Motorcycle"}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Eye
                              size={48}
                              className="text-gray-600 opacity-50"
                            />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          NEW
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                          {listing.description || "Premium motorcycle model"}
                        </p>

                        {/* Pricing */}
                        <div className="space-y-2 mb-4">
                          {listing.monthlyPrice && (
                            <div className="flex items-center justify-between bg-red-900/20 border border-red-800/30 px-3 py-2 rounded-lg">
                              <span className="text-xs text-gray-400 font-medium">
                                Monthly
                              </span>
                              <span className="font-bold text-red-500 flex items-center text-sm">
                                <DollarSign size={14} />
                                {listing.monthlyPrice}/mo
                              </span>
                            </div>
                          )}
                          {listing.fullyPaidPrice && (
                            <div className="flex items-center justify-between bg-green-900/20 border border-green-800/30 px-3 py-2 rounded-lg">
                              <span className="text-xs text-gray-400 font-medium">
                                Full Price
                              </span>
                              <span className="font-bold text-green-500 flex items-center text-sm">
                                <DollarSign size={14} />
                                {listing.fullyPaidPrice}
                              </span>
                            </div>
                          )}
                        </div>

                        <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-semibold group-hover:from-red-700 group-hover:to-orange-700 transition-all shadow-lg">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Motorcycle Categories Section */}
          <div className="py-16">
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              Browse Our Inventory
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Curated selection of quality motorcycles for every rider
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Sport Bikes */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl hover:border-red-600 transition-all group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-3">
                  Sport Bikes
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  High-performance racing machines built for speed and
                  precision.
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• 600cc - 1000cc models</li>
                  <li>• Track-certified performance</li>
                  <li>• Latest technology</li>
                  <li>• Starting at $8,999</li>
                </ul>
              </div>

              {/* Cruisers */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl hover:border-orange-600 transition-all group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-500 mb-3">
                  Cruisers
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Iconic comfort cruisers perfect for long-distance riding.
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Classic & modern styles</li>
                  <li>• Premium leather seats</li>
                  <li>• Low seat height models</li>
                  <li>• From $7,499</li>
                </ul>
              </div>

              {/* Adventure Bikes */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl hover:border-red-600 transition-all group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-3">
                  Adventure Bikes
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Versatile machines for on-road and off-road adventures.
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Dual sport capability</li>
                  <li>• Enhanced suspension</li>
                  <li>• Rugged design</li>
                  <li>• Starting at $6,999</li>
                </ul>
              </div>

              {/* Parts & Gear */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl hover:border-orange-600 transition-all group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-500 mb-3">
                  Parts & Gear
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  OEM parts and premium accessories to upgrade your ride.
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Safety gear & helmets</li>
                  <li>• Performance upgrades</li>
                  <li>• OEM replacement parts</li>
                  <li>• Expert installation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose MotoRide */}
          <div className="py-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Why Buy From MotoRide?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl hover:border-red-600 transition-all text-center group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-500 mb-3">
                  100% Certified
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Every bike inspected and certified. Full manufacturer warranty
                  plus extended coverage options available.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl hover:border-orange-600 transition-all text-center group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-orange-500 mb-3">
                  Best Pricing
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Competitive rates, flexible financing with 0% APR options, and
                  generous trade-in valuations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl hover:border-red-600 transition-all text-center group transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-500 mb-3">
                  Lifetime Support
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Free lifetime maintenance consultation, 24/7 roadside support,
                  and expert technician advice.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Ride?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse our complete inventory or contact our sales team for a test
              ride today.
            </p>
            <SignInButton>
              <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-5 rounded-lg font-bold text-xl hover:opacity-90 shadow-xl transform hover:-translate-y-1 transition-all">
                View Available Motorcycles 🏍️
              </button>
            </SignInButton>
          </div>

          {/* Footer */}
          <p className="text-gray-400 text-center mt-16 pb-8">
            &copy; {new Date().getFullYear()} MotoRide.pro. Premium Motorcycles
            | Expert Service | Competitive Financing
          </p>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
            <div className="max-w-2xl text-center">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  MotoRide
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Explore our premium selection of motorcycles. Find the perfect
                ride with flexible financing and expert support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/items">
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 shadow-xl transform hover:-translate-y-1 transition-all">
                    Browse Motorcycles 🏍️
                  </button>
                </Link>
                <Link href="/products">
                  <button className="bg-gray-700 text-white border border-gray-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-600 shadow-lg transition-all">
                    View All Models
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}