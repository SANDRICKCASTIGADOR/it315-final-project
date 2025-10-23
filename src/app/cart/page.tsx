"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, CreditCard, CheckCircle } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function BuyPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "MTR-001",
      name: "HONDA PCX 150",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23fff'%3EHONDA PCX%3C/text%3E%3C/svg%3E",
      price: 135020,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const handleBuyNow = () => {
    alert("✅ Purchase successful! Thank you for buying your motor.");
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle className="text-red-500" size={32} />
          <h1 className="text-4xl font-bold text-white">Buy Motor</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <p className="text-gray-300 text-xl">You have successfully purchased your motor!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-gray-300 mb-4">
                You are about to buy the following item(s):
              </p>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6"
                >
                  <div className="flex gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">ID: {item.id}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-red-400 font-bold text-xl">
                            ₱{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-400 p-2"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 sticky top-4">
                <h2 className="text-white font-bold text-xl mb-6">
                  Payment Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (12%)</span>
                    <span>₱{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span className="text-red-400">
                      ₱{total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
