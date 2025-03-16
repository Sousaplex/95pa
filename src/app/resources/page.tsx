import React from 'react';
import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Resources for Owners</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Helpful Information for 95 Prince Arthur Owners</h2>
          <p className="text-lg text-gray-600 mb-6">
            Access these valuable resources to better understand your rights and responsibilities as a condo owner at 95 Prince Arthur. 
            Being informed helps you participate effectively in our community's governance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Meetings Guide */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
            <div className="flex-1">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Owners' Meeting Guide</h3>
              <p className="text-gray-600 mb-4">
                Learn about virtual owners' meetings, how they work, and what to expect. This comprehensive guide covers all aspects of condo owners' meetings.
              </p>
            </div>
            <a 
              href="https://www.condoauthorityontario.ca/resource/owners-meeting-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block text-center"
            >
              View Meeting Guide
            </a>
          </div>
          
          {/* Voting Rights */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
            <div className="flex-1">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Voting Rights Information</h3>
              <p className="text-gray-600 mb-4">
                Understand your voting rights as a condo owner, including who can vote, when voting takes place, and how votes are counted at owners' meetings.
              </p>
            </div>
            <a 
              href="https://www.condoauthorityontario.ca/condo-living/owners-meetings/voting-rights/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block text-center"
            >
              Learn About Voting Rights
            </a>
          </div>
          
          {/* Proxy Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
            <div className="flex-1">
              <div className="bg-purple-100 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Proxy Form</h3>
              <p className="text-gray-600 mb-4">
                Download the official proxy form if you cannot attend an owners' meeting in person and wish to appoint someone to vote on your behalf.
              </p>
            </div>
            <a 
              href="https://cao-prod.adobemsbasic.com/content/xfaforms/profiles/caoforms.html?contentRoot=crx:///content/dam/formsanddocuments/caoforms/en&template=Proxy_Form.xdp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block text-center"
            >
              Download Proxy Form
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Condo Authority of Ontario (CAO)</h2>
          <p className="text-lg text-gray-600 mb-4">
            The Condo Authority of Ontario (CAO) provides valuable resources, training, and dispute resolution services for condo communities across Ontario.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Their website offers comprehensive information on condo governance, owner rights, board responsibilities, and other important aspects of condo living.
          </p>
          <a 
            href="https://www.condoauthorityontario.ca/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Visit CAO Website
          </a>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold mb-2">Have questions about these resources?</h3>
          <p className="text-lg text-gray-600 mb-4">
            If you need help understanding any of these resources or have questions about condo governance at 95 Prince Arthur, please don't hesitate to reach out.
          </p>
          <Link 
            href="/survey" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 text-lg rounded-lg transition-colors"
          >
            Take the Survey
          </Link>
        </div>
      </div>
    </main>
  );
} 