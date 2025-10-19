'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  Filter,
  Plus,
} from 'lucide-react';

interface Motorcycle {
  id: string;
  frontView: string | null;
  description: string | null;
  monthlyPrice: string | null;
  fullyPaidPrice: string | null;
  createdAt: Date;
  apiKeyName: string | null;
  source: 'local' | 'api';
}

const ITEMS_PER_PAGE = 12;

export default function ItemsPage() {
  const searchParams = useSearchParams();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [sortBy, setSortBy] = useState<'price' | 'newest' | 'name'>(
    (searchParams.get('sort') as any) || 'newest'
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );

  // Fetch motorcycles
  useEffect(() => {
    async function fetchMotorcycles() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/motorcycles?search=${encodeURIComponent(searchTerm)}&sort=${sortBy}`
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMotorcycles(data);
        setCurrentPage(1); // Reset to first page on search
      } catch (error) {
        console.error('Error fetching motorcycles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMotorcycles();
  }, [searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(motorcycles.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = motorcycles.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Browse Our Collection
          </h1>
          <p className="text-gray-400 text-lg">
            Discover premium motorcycles from our inventory
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 mb-8 shadow-xl">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search motorcycles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 outline-none transition-all"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-3 text-gray-500" size={20} />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'price' | 'newest' | 'name')
                }
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Add New Button */}
            <Link href="/items/new">
              <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Plus size={20} />
                Add Motorcycle
              </button>
            </Link>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          <p>
            Showing {paginatedItems.length} of {motorcycles.length} motorcycles
          </p>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-400 text-lg">Loading motorcycles...</p>
          </div>
        ) : paginatedItems.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-12 text-center">
            <Filter size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg mb-6">
              No motorcycles found matching your search
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((moto) => (
              <Link key={moto.id} href={`/items/${moto.id}`}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-red-600 transition-all hover:shadow-2xl cursor-pointer group">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-700 overflow-hidden">
                    {moto.frontView ? (
                      <Image
                        src={moto.frontView}
                        alt="Motorcycle"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-semibold">
                        {moto.source === 'api' ? '🌐 API' : '📦 Local'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 truncate">
                      Premium Motorcycle
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {moto.description || 'No description available'}
                    </p>

                    {/* Pricing */}
                    <div className="space-y-2 mb-4">
                      {moto.monthlyPrice && (
                        <p className="text-red-400 font-semibold">
                          ${moto.monthlyPrice}
                          <span className="text-sm text-gray-400">/month</span>
                        </p>
                      )}
                      {moto.fullyPaidPrice && (
                        <p className="text-green-400 font-semibold">
                          ${moto.fullyPaidPrice}
                          <span className="text-sm text-gray-400">
                            {' '}
                            one-time
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <span className="text-xs text-gray-500">
                        {new Date(moto.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-red-500 font-bold group-hover:translate-x-1 transition-transform">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === i + 1
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}