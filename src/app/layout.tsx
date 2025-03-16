import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileMenu from "@/app/components/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Michael Sousa for 95 Prince Arthur",
  description: "Michael Sousa's candidacy for the 95 Prince Arthur Condo Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-base md:text-lg bg-gray-50`}>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-blue-600 font-bold text-2xl">95 Prince Arthur</span>
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-6 items-center">
                <Link
                  href="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  About Me
                </Link>
                <Link
                  href="/survey-results"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Results
                </Link>
                <Link
                  href="/survey"
                  className="inline-flex items-center space-x-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md transition-all text-lg font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Survey</span>
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-blue-500 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 transition-colors text-lg font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Resources</span>
                </Link>
              </nav>
              
              {/* Mobile menu component */}
              <MobileMenu />
            </div>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">About This Survey</h3>
                <p className="text-gray-300 text-base">
                  I'm Michael Sousa, a resident at 95 Prince Arthur Ave.
                  I'm collecting feedback to help improve our building if elected to the board in May.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-3 text-gray-300 text-base">
                  <li><Link href="/" className="hover:text-white">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white">About Me</Link></li>
                  <li><Link href="/survey" className="hover:text-white">Survey</Link></li>
                  <li><Link href="/survey-results" className="hover:text-white">Results</Link></li>
                  <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Building Address</h3>
                <p className="text-gray-300 text-base">
                  95 Prince Arthur Ave<br />
                  Toronto, ON<br />
                  Email: <a href="mailto:mike.psousa+95pa@gmail.com" className="hover:text-white underline">mike.psousa+95pa@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-base text-gray-400">
              <p>&copy; {new Date().getFullYear()} Michael Sousa. Created for 95 Prince Arthur Ave residents.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
