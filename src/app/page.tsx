import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          95 Prince Arthur Survey
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Help Shape Our Condo's Future</h2>
          <p className="text-lg text-gray-600 mb-6">
          As the 2025 AGM is approaching in a few months, your feedback about what matters most will directly shape priorities for new board members. Like any good condo board, bringing together responsible spending, best practices in project management, and increasing transparency to residents should be top priorities. A well-run condo benefits everyone—enhancing property values, improving quality of life, and ensuring smooth operations. Your voice counts!
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-base text-blue-700">
              All responses are anonymous. Share your honest thoughts about what needs to change.
            </p>
          </div>
          
          <Link 
            href="/survey" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Take the Survey
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-3">Why A Survey?</h3>
            <p className="text-lg text-gray-600 mb-4">
            While the AGM date hasn't been announced yet, we want to be ready with our community's input when it happens. By sharing your views through this survey, you're helping ensure that all residents' voices are heard when important decisions are made.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-3">My Concerns</h3>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                Since the last AGM, I've been disappointed by the lack of progress on key initiatives like the rooftop project. Many promised improvements seem stalled with no updates provided to residents.
              </p>
              <div className="bg-yellow-50 p-3 rounded-md mt-2">
                <p className="text-base text-yellow-800">
                  Survey results will be shared with all residents in May sometime before the AGM.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* New Resources Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Condo Owner Resources</h3>
              <p className="text-lg text-gray-600 mb-3">
                I've compiled essential resources from the Condo Authority of Ontario to help you understand your rights as an owner, including meeting guides and voting procedures.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View Resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/survey-results" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-lg"
            >
              View Survey Results
            </Link>
            <Link 
              href="/resources" 
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Condo Resources
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
