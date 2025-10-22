"use client";

import { useState } from "react";
import Image from "next/image";

interface MotorcycleSpec {
  id: string;
  imageUrl: string | null;
  brandname: string | null;
  processor: string | null;
  graphic: string | null;
  display: string | null;
  ram: string | null;
  storage: string | null;
  createdAt: string;
}

interface ApiResponse {
  items?: MotorcycleSpec[];
  results?: MotorcycleSpec[];
}

export default function ProductSpecsPage() {
  const [searchName, setSearchName] = useState("");
  const [product, setProduct] = useState<MotorcycleSpec | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const WEBSITE_A_URL = "/api/external-fetch";

  async function searchProduct() {
    if (!searchName.trim()) {
      setError("Please enter a motorcycle brand or model");
      return;
    }

    setLoading(true);
    setError("");
    setDebugInfo("Starting fetch...");

    try {
      console.log("Fetching from:", WEBSITE_A_URL);
      setDebugInfo("Sending request to external API...");

      const response = await fetch(WEBSITE_A_URL, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors'
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log("Response headers:", response.headers);

      setDebugInfo(`Response received: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: MotorcycleSpec[] | ApiResponse = await response.json();
      console.log("Full API response:", data);
      console.log("Response type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      
      if (data && typeof data === 'object') {
        console.log("Keys in response:", Object.keys(data));
      }

      setDebugInfo(`Data received. Type: ${typeof data}, IsArray: ${Array.isArray(data)}`);

      let items: MotorcycleSpec[] = [];
      
      if (Array.isArray(data)) {
        items = data;
        setDebugInfo(`Found array with ${data.length} items`);
      } else if ('items' in data && Array.isArray(data.items)) {
        items = data.items;
        setDebugInfo(`Found items array with ${data.items.length} items`);
      } else if ('results' in data && Array.isArray(data.results)) {
        items = data.results;
        setDebugInfo(`Found results array with ${data.results.length} items`);
      } else {
        console.log("Unexpected response format:", data);
        setDebugInfo(`Unexpected response format: ${JSON.stringify(data).substring(0, 100)}...`);
        throw new Error("Invalid response format - expected array of items");
      }

      console.log("Items to search through:", items);
      console.log("Number of items:", items.length);
      
      if (items.length === 0) {
        throw new Error("No data available in the external API");
      }

      if (items[0]) {
        console.log("First item structure:", Object.keys(items[0]));
        console.log("First item:", items[0]);
      }

      const searchTerm = searchName.toLowerCase();
      const matchedHardware = items.find((item) => {
        const brandMatch = item.brandname?.toLowerCase().includes(searchTerm) ?? false;
        const nameMatch = (item as unknown as { name?: string }).name?.toLowerCase().includes(searchTerm) ?? false;
        const processorMatch = item.processor?.toLowerCase().includes(searchTerm) ?? false;
        
        console.log(`Checking item ${item.id}:`, {
          brandname: item.brandname,
          name: (item as unknown as { name?: string }).name,
          processor: item.processor,
          brandMatch,
          nameMatch,
          processorMatch
        });
        
        return brandMatch || nameMatch || processorMatch;
      });

      console.log("Matched hardware:", matchedHardware);

      if (!matchedHardware) {
        const availableBrands = items
          .map((item) => item.brandname ?? (item as unknown as { name?: string }).name ?? "")
          .filter(Boolean)
          .join(", ");
        
        setDebugInfo(`No match found. Available items: ${availableBrands}`);
        throw new Error(`Motorcycle "${searchName}" not found. Available: ${availableBrands.substring(0, 100)}...`);
      }

      setProduct({
        id: matchedHardware.id,
        imageUrl: matchedHardware.imageUrl ?? null,
        brandname: matchedHardware.brandname ?? (matchedHardware as unknown as { name?: string }).name ?? null,
        processor: matchedHardware.processor ?? null,
        graphic: matchedHardware.graphic ?? null,
        display: matchedHardware.display ?? null,
        ram: matchedHardware.ram ?? null,
        storage: matchedHardware.storage ?? null,
        createdAt: matchedHardware.createdAt ?? new Date().toISOString(),
      });

      setDebugInfo("Motorcycle found and displayed successfully!");

    } catch (err) {
      console.error("Full error:", err);
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError("Network error - unable to reach external API. Check CORS settings.");
        setDebugInfo("Network/CORS error occurred");
      } else {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setDebugInfo(`Error: ${errorMessage}`);
      }
      
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  const resetSearch = () => {
    setSearchName("");
    setProduct(null);
    setError("");
    setDebugInfo("");
  };

  const getSpecsList = (product: MotorcycleSpec) => {
    const specs: string[] = [];
    if (product.processor) specs.push(`Engine: ${product.processor}`);
    if (product.graphic) specs.push(`Power: ${product.graphic}`);
    if (product.display) specs.push(`Type: ${product.display}`);
    if (product.ram) specs.push(`Torque: ${product.ram}`);
    if (product.storage) specs.push(`Fuel Capacity: ${product.storage}`);
    return specs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-3">
            🔍 Motorcycle Finder
          </h1>
          <p className="text-gray-300 text-lg">Search our extensive database of motorcycles</p>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl mb-8 p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Search Motorcycle Database
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Brand / Model / Engine Type
              </label>
              <input
                id="productName"
                type="text"
                placeholder="e.g., Yamaha, Honda CBR, Kawasaki Ninja, 150cc..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && void searchProduct()}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => void searchProduct()}
                disabled={loading || !searchName.trim()}
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  "🏍️ Search Motorcycle"
                )}
              </button>
              
              <button
                onClick={resetSearch}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition shadow-lg"
              >
                Reset
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-600 text-red-200 rounded-lg">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <strong className="font-semibold">Error:</strong> {error}
                  </div>
                </div>
              </div>
            )}

            {debugInfo && (
              <div className="p-4 bg-blue-900/30 border border-blue-600 text-blue-200 rounded-lg text-sm">
                <strong className="font-semibold">Debug:</strong> {debugInfo}
              </div>
            )}
          </div>
        </div>

        {/* Product Display */}
        {product && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-red-600 hover:border-orange-600 transition-all p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Section */}
              <div>
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.brandname ?? "Motorcycle"}
                    width={800}
                    height={600}
                    className="rounded-xl w-full h-80 object-cover border-2 border-gray-700"
                    onError={(e) => {
                      console.log("Image failed to load:", product.imageUrl);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="rounded-xl w-full h-80 bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
                    {product.brandname ?? "Unknown Model"}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Technical Specifications
                  </h3>
                  {getSpecsList(product).length > 0 ? (
                    <ul className="text-gray-300 space-y-3">
                      {getSpecsList(product).map((spec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="leading-relaxed">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No detailed specifications available</p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-400 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p><strong>Product ID:</strong> {product.id}</p>
                      <p><strong>Source:</strong> External Motorcycle Database</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Info */}
        <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400">
          <div className="flex items-center space-x-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-white">API Information</span>
          </div>
          <div className="space-y-1 ml-7">
            <p><strong>External API:</strong> {WEBSITE_A_URL}</p>
            <p><strong>Search Method:</strong> Fetch all data, then filter locally</p>
            <p><strong>CORS:</strong> Cross-origin requests enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}