"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import Link from 'next/link';

// Slider component for better mobile experience
const RatingSlider = ({ 
  name, 
  value, 
  onChange, 
  leftLabel = "Low", 
  middleLabel = "Neutral", 
  rightLabel = "High",
  required = false,
  showValidation = false
}: { 
  name: string; 
  value: number | null; 
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; 
  leftLabel?: string; 
  middleLabel?: string; 
  rightLabel?: string;
  required?: boolean;
  showValidation?: boolean;
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        <div className="flex-grow">
          <div className="flex justify-between text-sm text-gray-600">
            <div style={{width: '30%'}} className="text-left">{leftLabel}</div>
            <div style={{width: '30%'}} className="text-center">{middleLabel}</div>
            <div style={{width: '30%'}} className="text-right">{rightLabel}</div>
          </div>
        </div>
        <div className="flex-shrink-0 w-8 ml-3"></div>
      </div>
      
      <div className="flex items-center">
        <div className={`flex-grow relative ${required && showValidation && value === null ? 'border-2 border-red-300 rounded-lg' : ''}`}>
          <input 
            type="range" 
            min="1" 
            max="5" 
            name={name}
            value={value || "3"}
            onChange={onChange}
            step="1"
            className={`w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 range-lg ${required ? 'required' : ''}`}
          />
        </div>
        
        <div className="flex-shrink-0 ml-3">
          {value !== null ? (
            <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 font-bold text-base">
              {value}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center bg-gray-300 text-gray-600 rounded-full w-8 h-8 font-bold text-xs">
              Select
            </span>
          )}
        </div>
      </div>
      {required && showValidation && value === null && (
        <p className="text-red-500 text-sm mt-1">Please select a value</p>
      )}
    </div>
  );
};

// Define form data types
type FormData = {
  amenities_satisfaction?: number | null;
  amenities_improvements?: string;
  amenities_usage?: string[];
  security_satisfaction?: number | null;
  security_concerns?: string;
  security_improvements?: string;
  maintenance_satisfaction?: number | null;
  maintenance_issues?: string;
  maintenance_response_satisfaction?: number | null;
  maintenance_common_issues?: string[];
  maintenance_priority_areas?: string[];
  community_interest?: 'yes' | 'maybe' | 'no';
  community_suggestions?: string;
  community_importance?: number | null;
  financial_satisfaction?: number | null;
  financial_transparency?: number | null;
  financial_concerns?: string[];
  financial_priorities?: string;
  financial_reports_frequency?: 'monthly' | 'quarterly' | 'annually' | 'never';
  communication_satisfaction?: number | null;
  communication_preferred_method?: 'email' | 'app' | 'newsletter' | 'meetings' | 'other';
  communication_frequency?: 'monthly' | 'quarterly' | 'annually';
  communication_suggestions?: string;
  projects_awareness?: 'yes' | 'somewhat' | 'no';
  projects_satisfaction?: number | null;
  projects_concerns?: string[];
  projects_suggestions?: string;
  resident_duration?: 'less_than_1' | '1_to_3' | '3_to_5' | '5_to_10' | 'more_than_10';
  resident_status?: 'owner_occupant' | 'owner_nonresident' | 'tenant';
  top_priorities?: string;
  additional_comments?: string;
  contact_name?: string;
  contact_email?: string;
  contact_unit?: string;
};

export default function SurveyPage() {
  const [formData, setFormData] = useState<FormData>({});
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      /* Custom slider styling for better mobile experience */
      input[type="range"] {
        -webkit-appearance: none;
        height: 8px;
        border-radius: 8px;
        background: #e5e7eb;
        outline: none;
        padding: 0;
        margin: 8px 0;
      }
      
      /* Custom styling for the slider thumb */
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #2563eb;
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.15s ease;
      }
      
      input[type="range"]::-moz-range-thumb {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #2563eb;
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.15s ease;
      }
      
      /* Significantly increase thumb size on active/focus for better touch feedback */
      input[type="range"]::-webkit-slider-thumb:active,
      input[type="range"]:focus::-webkit-slider-thumb {
        width: 40px;
        height: 40px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        background: #1d4ed8;
      }
      
      input[type="range"]::-moz-range-thumb:active,
      input[type="range"]:focus::-moz-range-thumb {
        width: 40px;
        height: 40px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        background: #1d4ed8;
      }
      
      /* Mobile-specific styles for even larger touch targets */
      @media (max-width: 768px) {
        /* Default thumb size slightly larger on mobile */
        input[type="range"]::-webkit-slider-thumb {
          width: 36px;
          height: 36px;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 36px;
          height: 36px;
        }
        
        /* Subtle size increase when active on mobile */
        input[type="range"]::-webkit-slider-thumb:active,
        input[type="range"]:focus::-webkit-slider-thumb {
          width: 42px;
          height: 42px;
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
          background: #1d4ed8;
          border: 2px solid white;
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:active,
        input[type="range"]:focus::-moz-range-thumb {
          width: 42px;
          height: 42px;
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
          background: #1d4ed8;
          border: 2px solid white;
          transition: all 0.2s ease;
        }
      }
      
      /* Small mobile devices - slightly larger touch target */
      @media (max-width: 480px) {
        /* Increased size when active on small devices */
        input[type="range"]::-webkit-slider-thumb:active,
        input[type="range"]:focus::-webkit-slider-thumb {
          width: 46px;
          height: 46px;
          transform: translateY(-3px);
        }
        
        input[type="range"]::-moz-range-thumb:active,
        input[type="range"]:focus::-moz-range-thumb {
          width: 46px;
          height: 46px;
          transform: translateY(-3px);
        }
      }
      
      /* Enhanced pulsing glow effect animation */
      @keyframes pulse-glow {
        0% {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 0 0 0 rgba(37, 99, 235, 0.8);
        }
        100% {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 0 50px rgba(37, 99, 235, 0);
        }
      }
      
      /* Extreme pulse for small devices */
      @keyframes extreme-pulse {
        0% {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 0 0 rgba(37, 99, 235, 0.9);
          border: 4px solid white;
        }
        100% {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 70px 10px rgba(59, 130, 246, 0.5);
          border: 8px solid white;
        }
      }
      
      /* Color shifting animation */
      @keyframes color-shift {
        0% { background: #1e40af; }
        25% { background: #2563eb; }
        50% { background: #3b82f6; }
        75% { background: #60a5fa; }
        100% { background: #1e40af; }
      }
      
      /* Wobble animation */
      @keyframes wobble {
        0%, 100% { transform: translateY(-24px) scale(1.3) rotate(0deg); }
        25% { transform: translateY(-24px) scale(1.3) rotate(8deg); }
        75% { transform: translateY(-24px) scale(1.3) rotate(-8deg); }
      }
      
      /* Style for select elements to show dropdown arrow */
      select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1.5em;
        padding-right: 2.5rem;
      }
      
      /* Fix for Firefox showing native arrow */
      select::-ms-expand {
        display: none;
      }
      
      /* Custom styles for questions and answers */
      .question-label {
        font-weight: 600;
        color: #1e40af;
        margin-bottom: 0.5rem;
      }
      
      .answer-container {
        margin-bottom: 1.5rem;
      }
      
      .input-field {
        background-color: white;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current) {
        const formElement = formRef.current;
        const windowHeight = window.innerHeight;
        const formHeight = formElement.getBoundingClientRect().height;
        const scrollTop = window.scrollY;
        const documentHeight = formHeight;
        
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollProgress(Math.min(Math.max(scrollPercentage, 0), 100));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    
    const requiredSliders = [
      { name: 'amenities_satisfaction', label: 'Building Amenities satisfaction' },
      { name: 'security_satisfaction', label: 'Building Safety rating' },
      { name: 'maintenance_satisfaction', label: 'Building Maintenance rating' },
      { name: 'maintenance_response_satisfaction', label: 'Maintenance Response satisfaction' },
      { name: 'financial_satisfaction', label: 'Financial Management satisfaction' },
      { name: 'financial_transparency', label: 'Financial Transparency rating' },
      { name: 'communication_satisfaction', label: 'Board Communication satisfaction' },
      { name: 'projects_satisfaction', label: 'Building Projects satisfaction' },
      { name: 'community_importance', label: 'Community Building importance' }
    ];
    
    const requiredSelects = [
      { name: 'resident_status', label: 'Resident status' }
    ];
    
    const errors: string[] = [];
    const missingFields: string[] = [];
    
    requiredSliders.forEach(field => {
      if (formData[field.name as keyof FormData] === null || formData[field.name as keyof FormData] === undefined) {
        errors.push(`Please provide a rating for ${field.label}`);
        missingFields.push(field.name);
      }
    });
    
    requiredSelects.forEach(field => {
      if (!formData[field.name as keyof FormData]) {
        errors.push(`Please select a value for ${field.label}`);
        missingFields.push(field.name);
      }
    });
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      
      // Scroll to the topmost missing field
      setTimeout(() => {
        if (missingFields.length > 0) {
          // Find all missing field elements
          const missingFieldElements: { element: Element, top: number }[] = [];
          
          missingFields.forEach(fieldName => {
            const element = document.querySelector(`[name="${fieldName}"]`);
            if (element) {
              // Get the actual position in the document
              const rect = element.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const absoluteTop = rect.top + scrollTop;
              
              missingFieldElements.push({
                element,
                top: absoluteTop
              });
            }
          });
          
          // Sort by position (top to bottom)
          missingFieldElements.sort((a, b) => a.top - b.top);
          
          // Scroll to the topmost missing field
          if (missingFieldElements.length > 0) {
            const topElement = missingFieldElements[0].element;
            // Find the closest section or label parent for better positioning
            const closestSection = topElement.closest('.space-y-6') || topElement.closest('.mb-6');
            const elementToScroll = closestSection || topElement;
            
            elementToScroll.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          } else if (formRef.current) {
            // Fallback to scrolling to the form if no elements were found
            formRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (formRef.current) {
          // Fallback to scrolling to the form if no specific missing fields were identified
          formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small timeout to ensure DOM is updated with validation messages
      
      return;
    }
    
    setValidationErrors([]);
    if (isMounted) {
      window.scrollTo(0, 0);
    }
    setSubmitted(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTouchedFields(prev => {
      const updated = new Set(prev);
      updated.add(name);
      return updated;
    });
    
    if (e.target.type === 'range') {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...(formData[name as keyof FormData] as string[] || []), value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: (formData[name as keyof FormData] as string[] || []).filter(item => item !== value)
      });
    };
  };

  const shouldShowError = (fieldName: string) => {
    if (!attemptedSubmit) {
      return false;
    }
    
    if (fieldName.includes('satisfaction') || fieldName.includes('importance')) {
      return formData[fieldName as keyof FormData] === null || formData[fieldName as keyof FormData] === undefined;
    }
    
    if (fieldName === 'resident_status') {
      return !formData[fieldName as keyof FormData];
    }
    
    return false;
  };

  const getQuestionClass = (fieldName: string) => {
    return shouldShowError(fieldName) ? 'border-2 border-red-300 rounded-lg' : '';
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">95 Prince Arthur Survey</h1>
        
        {submitted ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-semibold text-green-700 mb-2">Thank You!</h2>
            <p className="text-xl text-gray-700 mb-4">
              Your feedback has been submitted successfully. Your input helps me understand what matters most to our community.
            </p>
            <p className="text-xl text-gray-700">
              I truly appreciate you taking the time to share your thoughts about 95 Prince Arthur.
            </p>
            <Link 
              href="/survey-results" 
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-3 px-6 rounded-lg transition-colors text-center"
            >
              View Survey Results
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-8">
              <h2 className="text-3xl font-semibold mb-4">Help Shape Our Building's Future</h2>
              <p className="text-lg text-gray-600 mb-4">
                Thanks for taking the time to share your thoughts. At the next AGM I want to make sure your voice is heard.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-base text-blue-700">
                  All responses are anonymous. Your honest feedback will help guide my priorities if elected.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8" ref={formRef}>
              {validationErrors.length > 0 && attemptedSubmit && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-base text-red-700 font-medium mb-2">
                    Please correct the following before submitting:
                  </p>
                  <ul className="list-disc pl-5">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="text-red-600">{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="sticky top-4 z-10 bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Survey Progress</span>
                    <span className="text-sm font-medium text-blue-600">{Math.round(scrollProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">About You</h3>
                  
                  <div>
                    <label className="block text-lg question-label">
                      How long have you lived at 95 Prince Arthur?
                    </label>
                    <div className={`answer-container ${getQuestionClass('resident_duration')}`}>
                      <select
                        name="resident_duration"
                        value={formData.resident_duration || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                      >
                        <option value="">Please select</option>
                        <option value="less_than_1">Less than 1 year</option>
                        <option value="1_to_3">1-3 years</option>
                        <option value="3_to_5">3-5 years</option>
                        <option value="5_to_10">5-10 years</option>
                        <option value="more_than_10">More than 10 years</option>
                      </select>
                      {shouldShowError('resident_duration') && (
                        <p className="text-red-500 text-sm mt-1">Please select an option</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg question-label">
                      What best describes your status at 95 Prince Arthur? <span className="text-red-500">*</span>
                    </label>
                    <div className={`answer-container ${getQuestionClass('resident_status')}`}>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="owner_occupant" 
                            name="resident_status" 
                            value="owner_occupant"
                            checked={formData.resident_status === 'owner_occupant'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="owner_occupant" className="text-lg">Owner living in the building</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="owner_nonresident" 
                            name="resident_status" 
                            value="owner_nonresident"
                            checked={formData.resident_status === 'owner_nonresident'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="owner_nonresident" className="text-lg">Owner not living in the building</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="tenant" 
                            name="resident_status" 
                            value="tenant"
                            checked={formData.resident_status === 'tenant'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="tenant" className="text-lg">Tenant (renting)</label>
                        </div>
                      </div>
                      {shouldShowError('resident_status') && !formData.resident_status && (
                        <p className="text-red-500 text-sm mt-1">Please select an option</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Building Amenities</h3>
                  
                  <div>
                    <label className="block text-lg question-label">
                      How satisfied are you with our current building amenities? <span className="text-red-500">*</span>
                    </label>
                    <div className={`answer-container ${getQuestionClass('amenities_satisfaction')}`}>
                      <RatingSlider 
                        name="amenities_satisfaction" 
                        value={formData.amenities_satisfaction === undefined ? null : formData.amenities_satisfaction} 
                        onChange={handleInputChange}
                        leftLabel="Very Dissatisfied"
                        middleLabel="Neutral"
                        rightLabel="Very Satisfied"
                        required={true}
                        showValidation={attemptedSubmit}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      Which amenities do you use regularly? (Select all that apply)
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="party_room" 
                            name="amenities_usage" 
                            value="party_room"
                            checked={(formData.amenities_usage || []).includes('party_room')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="party_room" className="text-lg">Party Room</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rooftop" 
                            name="amenities_usage" 
                            value="rooftop"
                            checked={(formData.amenities_usage || []).includes('rooftop')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="rooftop" className="text-lg">Rooftop</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="outdoor_space" 
                            name="amenities_usage" 
                            value="outdoor_space"
                            checked={(formData.amenities_usage || []).includes('outdoor_space')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="outdoor_space" className="text-lg">Outdoor Space</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      Which amenities would you like to see improved or added?
                    </label>
                    <div className="answer-container">
                      <textarea 
                        className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        name="amenities_improvements"
                        value={formData.amenities_improvements || ''}
                        onChange={handleInputChange}
                        placeholder="Please share your suggestions..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Security & Safety</h3>
                  
                  <div>
                    <label className="block text-lg question-label">
                      How safe do you feel in our building? <span className="text-red-500">*</span>
                    </label>
                    <div className={`answer-container ${getQuestionClass('security_satisfaction')}`}>
                      <RatingSlider 
                        name="security_satisfaction" 
                        value={formData.security_satisfaction === undefined ? null : formData.security_satisfaction} 
                        onChange={handleInputChange}
                        leftLabel="Not Safe"
                        middleLabel="Somewhat Safe"
                        rightLabel="Very Safe"
                        required={true}
                        showValidation={attemptedSubmit}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      What security concerns or improvement suggestions do you have?
                    </label>
                    <div className="answer-container">
                      <textarea 
                        className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        name="security_concerns"
                        value={formData.security_concerns || ''}
                        onChange={handleInputChange}
                        placeholder="Please describe any security concerns and improvement suggestions..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Maintenance & Repairs</h3>
                  
                  <div>
                    <label className="block text-lg question-label">
                      How would you rate the overall maintenance of our building? <span className="text-red-500">*</span>
                    </label>
                    <div className={`answer-container ${getQuestionClass('maintenance_satisfaction')}`}>
                      <RatingSlider 
                        name="maintenance_satisfaction" 
                        value={formData.maintenance_satisfaction === undefined ? null : formData.maintenance_satisfaction} 
                        onChange={handleInputChange}
                        leftLabel="Poor"
                        middleLabel="Adequate"
                        rightLabel="Excellent"
                        required={true}
                        showValidation={attemptedSubmit}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      How satisfied are you with response times to maintenance requests? <span className="text-red-500">*</span>
                    </label>
                    <RatingSlider 
                      name="maintenance_response_satisfaction" 
                      value={formData.maintenance_response_satisfaction === undefined ? null : formData.maintenance_response_satisfaction} 
                      onChange={handleInputChange} 
                      leftLabel="Very Slow"
                      middleLabel="Acceptable"
                      rightLabel="Very Fast"
                      required={true}
                      showValidation={attemptedSubmit}
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      Which common maintenance issues have you noticed? (Select all that apply)
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="elevators" 
                            name="maintenance_common_issues" 
                            value="elevators"
                            checked={(formData.maintenance_common_issues || []).includes('elevators')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="elevators" className="text-lg">Elevator Issues</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="hvac" 
                            name="maintenance_common_issues" 
                            value="hvac"
                            checked={(formData.maintenance_common_issues || []).includes('hvac')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="hvac" className="text-lg">Heating/Cooling System Issues</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="plumbing" 
                            name="maintenance_common_issues" 
                            value="plumbing"
                            checked={(formData.maintenance_common_issues || []).includes('plumbing')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="plumbing" className="text-lg">Plumbing Issues</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="lighting" 
                            name="maintenance_common_issues" 
                            value="lighting"
                            checked={(formData.maintenance_common_issues || []).includes('lighting')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="lighting" className="text-lg">Lighting/Electrical Issues</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cleanliness" 
                            name="maintenance_common_issues" 
                            value="cleanliness"
                            checked={(formData.maintenance_common_issues || []).includes('cleanliness')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="cleanliness" className="text-lg">Cleanliness Issues</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="door_access" 
                            name="maintenance_common_issues" 
                            value="door_access"
                            checked={(formData.maintenance_common_issues || []).includes('door_access')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="door_access" className="text-lg">Door/Access Control Issues</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      Which areas need maintenance priority? (Select all that apply)
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="hallways" 
                            name="maintenance_priority_areas" 
                            value="hallways"
                            checked={(formData.maintenance_priority_areas || []).includes('hallways')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="hallways" className="text-lg">Hallways/Common Areas</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="lobby_area" 
                            name="maintenance_priority_areas" 
                            value="lobby_area"
                            checked={(formData.maintenance_priority_areas || []).includes('lobby_area')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="lobby_area" className="text-lg">Lobby</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="exterior" 
                            name="maintenance_priority_areas" 
                            value="exterior"
                            checked={(formData.maintenance_priority_areas || []).includes('exterior')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="exterior" className="text-lg">Building Exterior</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="parking" 
                            name="maintenance_priority_areas" 
                            value="parking"
                            checked={(formData.maintenance_priority_areas || []).includes('parking')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="parking" className="text-lg">Parking Areas</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="roof" 
                            name="maintenance_priority_areas" 
                            value="roof"
                            checked={(formData.maintenance_priority_areas || []).includes('roof')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="roof" className="text-lg">Rooftop Areas</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="amenity_spaces" 
                            name="maintenance_priority_areas" 
                            value="amenity_spaces"
                            checked={(formData.maintenance_priority_areas || []).includes('amenity_spaces')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="amenity_spaces" className="text-lg">Party Room/Amenity Spaces</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      What maintenance issues need to be addressed?
                    </label>
                    <div className="answer-container">
                      <textarea 
                        className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        name="maintenance_issues"
                        value={formData.maintenance_issues || ''}
                        onChange={handleInputChange}
                        placeholder="Please share any maintenance concerns..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Financial Management</h3>
                  
                  <div>
                    <label className="block text-lg question-label">
                      How satisfied are you with how condo fees are being managed? <span className="text-red-500">*</span>
                    </label>
                    <div className={`answer-container ${getQuestionClass('financial_satisfaction')}`}>
                      <RatingSlider 
                        name="financial_satisfaction" 
                        value={formData.financial_satisfaction === undefined ? null : formData.financial_satisfaction} 
                        onChange={handleInputChange}
                        leftLabel="Very Dissatisfied"
                        middleLabel="Neutral"
                        rightLabel="Very Satisfied"
                        required={true}
                        showValidation={attemptedSubmit}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      How would you rate the financial transparency from the board? <span className="text-red-500">*</span>
                    </label>
                    <RatingSlider 
                      name="financial_transparency" 
                      value={formData.financial_transparency === undefined ? null : formData.financial_transparency} 
                      onChange={handleInputChange}
                      leftLabel="Not Transparent"
                      middleLabel="Somewhat"
                      rightLabel="Very Transparent"
                      required={true}
                      showValidation={attemptedSubmit}
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg question-label">
                      What are your financial concerns? (Select all that apply)
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="condo_fees" 
                            name="financial_concerns" 
                            value="condo_fees"
                            checked={(formData.financial_concerns || []).includes('condo_fees')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="condo_fees" className="text-lg">Rising Condo Fees</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="special_assessments" 
                            name="financial_concerns" 
                            value="special_assessments"
                            checked={(formData.financial_concerns || []).includes('special_assessments')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="special_assessments" className="text-lg">Special Assessments</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="reserve_fund" 
                            name="financial_concerns" 
                            value="reserve_fund"
                            checked={(formData.financial_concerns || []).includes('reserve_fund')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="reserve_fund" className="text-lg">Reserve Fund Health</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="budget_overruns" 
                            name="financial_concerns" 
                            value="budget_overruns"
                            checked={(formData.financial_concerns || []).includes('budget_overruns')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="budget_overruns" className="text-lg">Budget Overruns</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="spending_transparency" 
                            name="financial_concerns" 
                            value="spending_transparency"
                            checked={(formData.financial_concerns || []).includes('spending_transparency')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="spending_transparency" className="text-lg">Lack of Spending Transparency</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="contractor_selection" 
                            name="financial_concerns" 
                            value="contractor_selection"
                            checked={(formData.financial_concerns || []).includes('contractor_selection')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="contractor_selection" className="text-lg">Contractor Selection Process</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg text-gray-700 font-medium mb-2">
                      What would you like to see prioritized in our building's budget?
                    </label>
                    <textarea 
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      name="financial_priorities"
                      value={formData.financial_priorities || ''}
                      onChange={handleInputChange}
                      placeholder="Please share your budget priorities..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Board Communication</h3>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      How satisfied are you with the current level of communication from the board? <span className="text-red-500">*</span>
                    </label>
                    <div className={`answer-container ${getQuestionClass('communication_satisfaction')}`}>
                      <RatingSlider 
                        name="communication_satisfaction" 
                        value={formData.communication_satisfaction === undefined ? null : formData.communication_satisfaction} 
                        onChange={handleInputChange}
                        leftLabel="Very Dissatisfied"
                        middleLabel="Neutral"
                        rightLabel="Very Satisfied"
                        required={true}
                        showValidation={attemptedSubmit}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      How often would you like to receive updates from the board?
                    </label>
                    <select
                      name="communication_frequency"
                      value={formData.communication_frequency || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Please select</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      What is your preferred method of communication?
                    </label>
                    <select
                      name="communication_preferred_method"
                      value={formData.communication_preferred_method || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Please select</option>
                      <option value="email">Email</option>
                      <option value="app">Mobile App</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="meetings">In-person Meetings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      How would you like to see board communication improved?
                    </label>
                    <textarea 
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      name="communication_suggestions"
                      value={formData.communication_suggestions || ''}
                      onChange={handleInputChange}
                      placeholder="Please share your suggestions..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Building Projects & Improvements</h3>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      How aware are you of ongoing and planned building projects?
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="projects-yes" 
                            name="projects_awareness" 
                            value="yes"
                            checked={formData.projects_awareness === 'yes'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="projects-yes" className="text-lg">Very aware</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="projects-somewhat" 
                            name="projects_awareness" 
                            value="somewhat"
                            checked={formData.projects_awareness === 'somewhat'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="projects-somewhat" className="text-lg">Somewhat aware</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="projects-no" 
                            name="projects_awareness" 
                            value="no"
                            checked={formData.projects_awareness === 'no'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="projects-no" className="text-lg">Not aware at all</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      How satisfied are you with the progress of current building projects? <span className="text-red-500">*</span>
                    </label>
                    <RatingSlider 
                      name="projects_satisfaction" 
                      value={formData.projects_satisfaction === undefined ? null : formData.projects_satisfaction} 
                      onChange={handleInputChange}
                      leftLabel="Very Dissatisfied"
                      middleLabel="Neutral"
                      rightLabel="Very Satisfied"
                      required={true}
                      showValidation={attemptedSubmit}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      What concerns do you have about building projects? (Select all that apply)
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="delayed_projects" 
                            name="projects_concerns" 
                            value="delayed_projects"
                            checked={(formData.projects_concerns || []).includes('delayed_projects')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="delayed_projects" className="text-lg">Delayed Projects</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cost_overruns" 
                            name="projects_concerns" 
                            value="cost_overruns"
                            checked={(formData.projects_concerns || []).includes('cost_overruns')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="cost_overruns" className="text-lg">Cost Overruns</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="poor_quality" 
                            name="projects_concerns" 
                            value="poor_quality"
                            checked={(formData.projects_concerns || []).includes('poor_quality')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="poor_quality" className="text-lg">Poor Quality of Work</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="inadequate_planning" 
                            name="projects_concerns" 
                            value="inadequate_planning"
                            checked={(formData.projects_concerns || []).includes('inadequate_planning')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="inadequate_planning" className="text-lg">Inadequate Planning</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="resident_disruption" 
                            name="projects_concerns" 
                            value="resident_disruption"
                            checked={(formData.projects_concerns || []).includes('resident_disruption')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="resident_disruption" className="text-lg">Resident Disruption</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="lack_of_updates" 
                            name="projects_concerns" 
                            value="lack_of_updates"
                            checked={(formData.projects_concerns || []).includes('lack_of_updates')}
                            onChange={handleCheckboxChange}
                            className="h-6 w-6 mr-3 accent-blue-500" 
                          />
                          <label htmlFor="lack_of_updates" className="text-lg">Lack of Progress Updates</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      What building improvement projects would you like to see initiated?
                    </label>
                    <textarea 
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      name="projects_suggestions"
                      value={formData.projects_suggestions || ''}
                      onChange={handleInputChange}
                      placeholder="Please share your suggestions..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Community & Events</h3>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      How important is community building at 95 Prince Arthur to you? <span className="text-red-500">*</span>
                    </label>
                    <RatingSlider 
                      name="community_importance" 
                      value={formData.community_importance === undefined ? null : formData.community_importance} 
                      onChange={handleInputChange}
                      leftLabel="Not Important"
                      middleLabel="Somewhat"
                      rightLabel="Very Important"
                      required={true}
                      showValidation={attemptedSubmit}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      Would you be interested in community events at 95 Prince Arthur?
                    </label>
                    <div className="answer-container">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="events-yes" 
                            name="community_interest" 
                            value="yes"
                            checked={formData.community_interest === 'yes'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="events-yes" className="text-lg">Yes, I'd participate</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="events-maybe" 
                            name="community_interest" 
                            value="maybe"
                            checked={formData.community_interest === 'maybe'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="events-maybe" className="text-lg">Maybe, depends on the event</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="events-no" 
                            name="community_interest" 
                            value="no"
                            checked={formData.community_interest === 'no'}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5" 
                          />
                          <label htmlFor="events-no" className="text-lg">No, not interested</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      What type of community events would you like to see?
                    </label>
                    <textarea 
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      name="community_suggestions"
                      value={formData.community_suggestions || ''}
                      onChange={handleInputChange}
                      placeholder="Please share your suggestions..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Additional Feedback</h3>
                  
                  <div className="mb-6">
                    <label className="block text-lg question-label">
                      What are your top priorities and any other feedback for the board?
                    </label>
                    <textarea 
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={6}
                      name="top_priorities"
                      value={formData.top_priorities || ''}
                      onChange={handleInputChange}
                      placeholder="Please share your top priorities and any other suggestions or comments you may have..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b">Optional Contact Information</h3>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-base text-blue-700">
                      <strong>Note:</strong> This information is completely optional and will not be included in the published survey results. 
                      It will only be used if Michael needs to follow up with you specifically about your feedback.
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block text-lg text-gray-700 font-medium mb-2">
                        Your Name (Optional)
                      </label>
                      <input 
                        type="text"
                        className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="contact_name"
                        value={formData.contact_name || ''}
                        onChange={handleInputChange}
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="md:w-1/3">
                      <label className="block text-lg text-gray-700 font-medium mb-2">
                        Unit Number (Optional)
                      </label>
                      <input 
                        type="text"
                        className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="contact_unit"
                        value={formData.contact_unit || ''}
                        onChange={handleInputChange}
                        placeholder="Unit #"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-lg text-gray-700 font-medium mb-2">
                      Email Address (Optional)
                    </label>
                    <input 
                      type="email"
                      className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="contact_email"
                      value={formData.contact_email || ''}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-4"><span className="text-red-500">*</span> Indicates required fields</p>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium py-4 px-6 rounded-lg transition-colors"
                  >
                    Submit Feedback
                  </button>
                  <p className="text-base text-gray-500 mt-2 text-center">
                    Thank you for helping improve 95 Prince Arthur!
                  </p>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 