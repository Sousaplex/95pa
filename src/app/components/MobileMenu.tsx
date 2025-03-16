"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="sm:hidden flex items-center">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed top-16 left-0 right-0 z-50" id="mobile-menu">
          <div className="space-y-3 py-4 px-6 bg-white border-t shadow-xl max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="block px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Me
            </Link>
            <Link
              href="/survey-results"
              className="block px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Results
            </Link>
            <div className="py-2">
              <Link
                href="/survey"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-400 shadow-lg transition-all text-lg font-medium mb-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Survey</span>
              </Link>
            </div>
            <div className="py-2">
              <Link
                href="/resources"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 shadow-md transition-colors text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Resources</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 