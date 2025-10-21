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
                                <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90  shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform text-sm">
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
                                <Link href="/payment" className="text-gray-300 hover:text-red-500 font-medium transition-colors">
                                    Payments
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