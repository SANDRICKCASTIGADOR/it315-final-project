import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-red-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-lg shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">MotoRide<span className="text-red-500">.pro</span></span>
                    </Link>

                    {/* Navigation Links and Auth Controls */}
                    <div className="flex items-center space-x-6">
                        <SignedOut>
                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Home
                                </Link>
                                <Link href="/about" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    About Us
                                </Link>
                                <Link href="/contact" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Contact
                                </Link>
                            </div>
                            
                            {/* Sign In Button */}
                            <SignInButton>
                                <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform text-sm">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            {/* Navigation Links for Signed In Users */}
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Home
                                </Link>
                                <Link href="/products" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Motorcycles
                                </Link>
                                <Link href="/parts" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Parts & Accessories
                                </Link>
                                <Link href="/cart" className="text-gray-300 hover:text-red-500 font-medium transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Cart
                                </Link>
                                <Link href="/orders" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Orders
                                </Link>
                                <UserButton/>
                            </div>
                        </SignedIn>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button className="text-gray-300 hover:text-red-500 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}