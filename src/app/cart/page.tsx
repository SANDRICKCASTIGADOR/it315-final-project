export default function CartPage() {
  const cartItems = [
    { 
      id: 1, 
      name: "Yamaha YZF-R15", 
      price: 185000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1558981033-6f4d46d69148?w=400", 
      specs: "Engine: 155cc Liquid-cooled | Power: 18.6 HP | Torque: 14.1 Nm | Top Speed: 136 km/h | Fuel: 11L"
    },
    { 
      id: 2, 
      name: "Honda CBR150R", 
      price: 165000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400", 
      specs: "Engine: 149cc Liquid-cooled | Power: 17.1 HP | Torque: 14.4 Nm | Top Speed: 134 km/h | Fuel: 12L"
    },
    { 
      id: 3, 
      name: "Kawasaki Ninja 400", 
      price: 285000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1591633913126-29a0d4fab1d8?w=400", 
      specs: "Engine: 399cc Liquid-cooled | Power: 44.8 HP | Torque: 37 Nm | Top Speed: 170 km/h | Fuel: 14L"
    },
    { 
      id: 4, 
      name: "Suzuki GSX-R750", 
      price: 495000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400", 
      specs: "Engine: 750cc Liquid-cooled | Power: 148 HP | Torque: 86 Nm | Top Speed: 260 km/h | Fuel: 17L"
    },
    { 
      id: 5, 
      name: "Ducati Panigale V2", 
      price: 895000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400", 
      specs: "Engine: 955cc L-Twin | Power: 155 HP | Torque: 104 Nm | Top Speed: 270 km/h | Fuel: 17L"
    },
    { 
      id: 6, 
      name: "BMW S1000RR", 
      price: 1250000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400", 
      specs: "Engine: 999cc Inline-4 | Power: 205 HP | Torque: 113 Nm | Top Speed: 299 km/h | Fuel: 16.5L"
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
            🏍️ Your Cart
          </h1>
          <p className="text-gray-400">Review your selected motorcycles before checkout</p>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-red-600 transition-all"
            >
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full lg:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-40 h-40 object-cover rounded-lg border-2 border-gray-700"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white">{item.name}</h2>
                  <p className="text-red-500 font-bold text-xl mt-2">₱{item.price.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">{item.specs}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="text-gray-300">Quantity:</span>
                    <div className="flex items-center space-x-3 bg-gray-700 rounded-lg px-3 py-1">
                      <button className="text-white hover:text-red-500 transition">-</button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button className="text-white hover:text-red-500 transition">+</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 lg:mt-0 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border-2 border-red-600">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-300">
              <span className="text-lg">Subtotal:</span>
              <span className="text-xl font-semibold">₱{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span className="text-lg">Tax (12%):</span>
              <span className="text-xl font-semibold">₱{(total * 0.12).toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Total:</h2>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                ₱{(total * 1.12).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="mt-8 space-y-3">
            <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:opacity-90  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Proceed to Checkout 🏁
            </button>
            <button className="w-full bg-gray-700 text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition">
              Continue Shopping
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>1 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}