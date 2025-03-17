"use client";

import React from 'react';
import Link from 'next/link';

export default function SurveyAboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">About the Survey</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why We're Conducting This Survey</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              As fellow residents, we want to hear your thoughts about our building. We're collecting feedback from our community to better understand what matters to all of us as we prepare for the upcoming Annual General Meeting (AGM).
            </p>
            <p>
              While the AGM date hasn't been announced yet, we want to be ready with our community's input when it happens. By sharing your views through this survey, you're helping ensure that all residents' voices are heard when important decisions are made.
            </p>
            <p>
              Together, we can work towards making our building a better place to live. Your input matters to all of us in the community.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Building Concerns</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Stalled Initiatives</h3>
              <p className="text-gray-700">
                The rooftop project and other improvements promised at the last AGM have shown no visible progress, frustrating residents who expected action.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Financial Responsibility</h3>
              <p className="text-gray-700">
                We need to ensure condo fees and special assessments are spent wisely to maintain and enhance our property values.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Lack of Transparency</h3>
              <p className="text-gray-700">
                All unitholders deserve clear, regular updates about building projects, finances, and board decisions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Project Management</h3>
              <p className="text-gray-700">
                Building improvements need competent oversight to ensure they're completed on time, on budget, and to high standards.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Survey Collection (March-April)</h3>
                <p className="text-gray-600">Gathering resident feedback to understand priorities and concerns.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Data Analysis</h3>
                <p className="text-gray-600">Reviewing survey responses and preparing presentation materials.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">AGM (Date TBD)</h3>
                <p className="text-gray-600">Presenting findings and discussing solutions with residents once the AGM is scheduled.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/survey" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Take the Survey
          </Link>
        </div>
      </div>
    </main>
  );
} 