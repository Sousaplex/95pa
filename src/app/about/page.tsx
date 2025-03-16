import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">About Me</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Why I'm Running for the Board</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="sm:w-1/3 flex justify-center items-start">
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="/michael-sousa.jpg"
                      alt="Michael Sousa"
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      priority
                    />
                  </div>
                </div>
                <div className="sm:w-2/3">
                  <p className="text-lg text-gray-600 mb-4">
                    I'm Michael Sousa, and my connection to 95 Prince Arthur Ave runs deep. My parents bought their unit here in 1986, and when I was born in 1988, it's the first place I ever lived. Moving back in here as an adult has been a special experience.
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    Professionally, I've been fortunate to build and sell several businesses in various industries, giving me insight into property management, fiscal responsibility, and good governance.
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                I'm disappointed that since the last AGM, there has been no visible progress on the rooftop project and other initiatives, with minimal transparency provided to unitholders. I created this website to demonstrate my commitment to communication and accountability—values I'll bring to the board if elected in May.
              </p>
              
              <div className="mt-6 flex items-center">
                <a 
                  href="https://www.linkedin.com/in/michael-p-sousa/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="text-lg font-medium">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="md:w-1/4 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2 text-lg">My Platform</h3>
              <ul className="text-base space-y-3 text-blue-700">
                <li>✓ Responsible financial management</li>
                <li>✓ Protecting our property values</li>
                <li>✓ Competent project oversight</li>
                <li>✓ Complete transparency</li>
                <li>✓ Improved building maintenance</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">My Background</h3>
            <ul className="space-y-4">
              <li className="border-l-2 border-blue-500 pl-4 pb-2">
                <div className="font-semibold text-blue-600 text-lg">Personal Connection</div>
                <p className="mt-1 text-gray-600 text-base">
                  My parents purchased their unit at 95 Prince Arthur in 1986, and I was born in 1988. I have a lifelong connection and special fondness for this building.
                </p>
              </li>
              <li className="border-l-2 border-blue-300 pl-4 pb-2">
                <div className="font-semibold text-blue-600 text-lg">Professional Experience</div>
                <p className="mt-1 text-gray-600 text-base">
                  Co-founder of SingleKey, a proptech company that helps landlords and tenants navigate rental relationships with transparency and fairness. Over the years, I've been fortunate to build and sell several businesses, applying what I've learned about effective management and fiscal responsibility along the way.
                </p>
              </li>
              <li className="border-l-2 border-blue-300 pl-4">
                <div className="font-semibold text-blue-600 text-lg">Governance Experience</div>
                <p className="mt-1 text-gray-600 text-base">
                  Experience sitting on multiple boards, with a track record of responsible financial oversight and successful project management.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 text-orange-700">My Concerns</h3>
            <div className="space-y-4 border-l-4 border-orange-200 pl-4">
              <div>
                <h4 className="font-medium text-orange-600 text-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Stalled Initiatives
                </h4>
                <p className="mt-1 text-gray-700 text-base">
                  The rooftop project and other improvements promised at the last AGM have shown no visible progress, frustrating residents who expected action.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-orange-600 text-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Financial Responsibility
                </h4>
                <p className="mt-1 text-gray-700 text-base">
                  We need to ensure condo fees and special assessments are spent wisely to maintain and enhance our property values.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-orange-600 text-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lack of Transparency
                </h4>
                <p className="mt-1 text-gray-700 text-base">
                  All unitholders deserve clear, regular updates about building projects, finances, and board decisions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-orange-600 text-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Project Management
                </h4>
                <p className="mt-1 text-gray-700 text-base">
                  Building improvements need competent oversight to ensure they're completed on time, on budget, and to high standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">AGM Timeline</h3>
          <ul className="space-y-4">
            <li className="border-l-2 border-blue-500 pl-4 pb-2">
              <div className="font-semibold text-blue-600 text-lg">Collecting Feedback</div>
              <div className="text-base text-gray-500">Now - End of April</div>
              <p className="mt-1 text-gray-600 text-base">
                Gathering your input through this survey to understand what matters most to our community.
              </p>
            </li>
            <li className="border-l-2 border-blue-300 pl-4 pb-2">
              <div className="font-semibold text-blue-600 text-lg">Publishing Results & Platform</div>
              <div className="text-base text-gray-500">Early May</div>
              <p className="mt-1 text-gray-600 text-base">
                I'll share the survey results and my detailed platform based on your feedback.
              </p>
            </li>
            <li className="border-l-2 border-blue-300 pl-4">
              <div className="font-semibold text-blue-600 text-lg">Annual General Meeting</div>
              <div className="text-base text-gray-500">May 2025</div>
              <p className="mt-1 text-gray-600 text-base">
                Your opportunity to vote for accountable leadership and positive change at 95 Prince Arthur.
              </p>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold mb-2">Ready to share your thoughts?</h3>
          <p className="text-lg text-gray-600 mb-4">
            Your input will help me focus on what matters most to our community if elected.
          </p>
          <Link 
            href="/survey" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 text-lg rounded-lg transition-colors"
          >
            Take the Survey Now
          </Link>
        </div>
      </div>
    </main>
  );
} 