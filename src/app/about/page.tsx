export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            About MotoRide
          </h1>
          <p className="text-xl leading-relaxed mb-4 text-gray-300 max-w-3xl mx-auto">
            Your ultimate destination for premium motorcycles and riding gear. 
            We're passionate riders serving riders, bringing you the finest selection 
            of bikes and accessories to fuel your passion for the open road.
          </p>
          <div className="flex justify-center items-center space-x-2 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-lg font-semibold">Ride With Passion Since 2020</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
            <div className="text-gray-400">Motorcycles Sold</div>
          </div>
          <div className="text-center p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
            <div className="text-gray-400">Bike Models</div>
          </div>
          <div className="text-center p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="text-4xl font-bold text-red-500 mb-2">1000+</div>
            <div className="text-gray-400">Happy Riders</div>
          </div>
          <div className="text-center p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl rounded-2xl hover:border-red-600 transition-all transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-red-500">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To provide riders with top-quality motorcycles and gear, ensuring every 
              journey is safe, thrilling, and unforgettable. We're committed to building 
              a community of passionate riders.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl rounded-2xl hover:border-orange-600 transition-all transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-orange-500">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To become the most trusted motorcycle dealer in the region, known for 
              exceptional service, premium selection, and a genuine love for the riding 
              lifestyle.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl rounded-2xl hover:border-red-600 transition-all transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-red-500">Our Values</h2>
            <p className="text-gray-300 leading-relaxed">
              Quality, passion, and trust drive everything we do. We believe in honest 
              service, expert guidance, and creating lifelong relationships with our 
              riding community.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Why Choose MotoRide?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-4xl mb-3">🏍️</div>
              <h3 className="font-semibold text-lg mb-2">Premium Selection</h3>
              <p className="text-red-100">Curated collection of top motorcycle brands and models</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="font-semibold text-lg mb-2">Expert Service</h3>
              <p className="text-red-100">Professional maintenance and repair by certified technicians</p>
            </div>
            <div>
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-semibold text-lg mb-2">Guaranteed Quality</h3>
              <p className="text-red-100">All bikes thoroughly inspected with warranty coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}