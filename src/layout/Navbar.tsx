import React from 'react';
import {
    UserGroupIcon,
    AcademicCapIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin');
    };

    return (
        <div>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-[95%] mx-auto px-2 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 hover:cursor-pointer" onClick={()=>navigate('/')}>
                            <img src="/logo.png" alt="EduPortal" className="h-8 w-auto" />
                            <span className="text-xl font-bold text-gray-900">Edu Portal</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
                            <button 
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </button>
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <nav className="md:hidden mt-4 pb-4">
                            <div className="flex flex-col space-y-4">
                                <a href="#features" className="text-gray-600 hover:text-gray-900 px-2 py-1">Features</a>
                                <a href="#about" className="text-gray-600 hover:text-gray-900 px-2 py-1">About</a>
                                <a href="#contact" className="text-gray-600 hover:text-gray-900 px-2 py-1">Contact</a>
                                <button 
                                    className="bg-gray-900 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-gray-800 transition-colors"
                                    onClick={handleSignInClick}
                                >
                                    Sign In
                                </button>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Navbar;