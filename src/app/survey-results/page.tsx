"use client";

import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

export default function SurveyResultsPage() {
  // State to control modal visibility (default to visible)
  const [showModal, setShowModal] = useState(true);
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  // State to store window width safely
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop

  // Effect to handle client-side initialization
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    
    // Optional: Add resize listener for responsive updates
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data - in a real implementation, this would come from your database or API
  const sampleData = {
    // Satisfaction ratings (1-5 scale)
    satisfactionScores: {
      amenities: 3.7,
      security: 4.2,
      maintenance: 2.8,
      maintenanceResponse: 3.1,
      financial: 2.9,
      financialTransparency: 2.6,
      communication: 3.0,
      projects: 2.5,
      communityImportance: 4.1
    },
    
    // Amenities usage (checkbox data)
    amenitiesUsage: [
      { name: 'Party Room', count: 23 },
      { name: 'Rooftop', count: 45 },
      { name: 'Outdoor Space', count: 38 }
    ],
    
    // Resident duration (select data)
    residentDuration: [
      { name: 'Less than 1 year', count: 12 },
      { name: '1-3 years', count: 24 },
      { name: '3-5 years', count: 18 },
      { name: '5-10 years', count: 15 },
      { name: 'More than 10 years', count: 9 }
    ],
    
    // Resident status (radio data)
    residentStatus: [
      { name: 'Owner living in building', count: 62 },
      { name: 'Owner not living in building', count: 8 },
      { name: 'Tenant (renting)', count: 8 }
    ],
    
    // Common maintenance issues (checkbox data)
    maintenanceIssues: [
      { name: 'Elevator Issues', count: 42 },
      { name: 'HVAC Issues', count: 28 },
      { name: 'Plumbing Issues', count: 19 },
      { name: 'Lighting/Electrical Issues', count: 15 },
      { name: 'Cleanliness Issues', count: 22 },
      { name: 'Door/Access Control Issues', count: 31 }
    ],
    
    // Project priorities (text question summarized into themes)
    projectThemes: [
      { name: 'Rooftop Renovation', count: 47 },
      { name: 'Security Improvements', count: 38 },
      { name: 'Elevator Upgrades', count: 35 },
      { name: 'Hallway Refresh', count: 29 },
      { name: 'Common Area Maintenance', count: 25 },
      { name: 'Building Exterior', count: 22 }
    ],
    
    // Financial concerns (checkbox data)
    financialConcerns: [
      { name: 'Rising Condo Fees', count: 53 },
      { name: 'Special Assessments', count: 41 },
      { name: 'Reserve Fund Health', count: 37 },
      { name: 'Budget Overruns', count: 29 },
      { name: 'Lack of Spending Transparency', count: 45 },
      { name: 'Contractor Selection Process', count: 31 }
    ],
    
    // Communication preferences (select data)
    communicationPreferences: [
      { name: 'Email', count: 48 },
      { name: 'Mobile App', count: 22 },
      { name: 'Newsletter', count: 10 },
      { name: 'In-person Meetings', count: 5 },
      { name: 'Other', count: 3 }
    ],
    
    // Project concerns (checkbox data)
    projectConcerns: [
      { name: 'Delayed Projects', count: 42 },
      { name: 'Cost Overruns', count: 39 },
      { name: 'Poor Quality of Work', count: 27 },
      { name: 'Inadequate Planning', count: 35 },
      { name: 'Resident Disruption', count: 18 },
      { name: 'Lack of Progress Updates', count: 41 }
    ],
    
    // Community interest (radio data)
    communityInterest: [
      { name: 'Yes, I\'d participate', count: 32 },
      { name: 'Maybe, depends on event', count: 36 },
      { name: 'No, not interested', count: 10 }
    ],
    
    // Common maintenance themes (text question summarized)
    maintenanceThemes: [
      { name: 'Elevator reliability', count: 35 },
      { name: 'Water pressure issues', count: 28 },
      { name: 'Heating/cooling performance', count: 22 },
      { name: 'Common area cleanliness', count: 18 },
      { name: 'Security systems', count: 15 }
    ]
  };

  // Prepare data for the satisfaction bar chart
  const satisfactionBarData = {
    labels: [
      'Amenities', 'Security', 'Maintenance', 'Maintenance Response', 
      'Financial Management', 'Financial Transparency', 'Communication', 
      'Projects Progress', 'Community Importance'
    ],
    datasets: [
      {
        label: 'Average Satisfaction Rating (1-5 scale)',
        data: [
          sampleData.satisfactionScores.amenities,
          sampleData.satisfactionScores.security,
          sampleData.satisfactionScores.maintenance,
          sampleData.satisfactionScores.maintenanceResponse,
          sampleData.satisfactionScores.financial,
          sampleData.satisfactionScores.financialTransparency,
          sampleData.satisfactionScores.communication,
          sampleData.satisfactionScores.projects,
          sampleData.satisfactionScores.communityImportance
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(201, 203, 207, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(153, 102, 255)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Options for the satisfaction bar chart
  const satisfactionBarOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        title: {
          display: true,
          text: 'Average Rating (1-5)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Satisfaction Levels by Category'
      }
    }
  };

  // Prepare data for the amenities usage pie chart
  const amenitiesUsageData = {
    labels: sampleData.amenitiesUsage.map(item => item.name),
    datasets: [
      {
        data: sampleData.amenitiesUsage.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for the financial concerns chart
  const financialConcernsData = {
    labels: sampleData.financialConcerns.map(item => item.name),
    datasets: [
      {
        label: 'Number of Residents',
        data: sampleData.financialConcerns.map(item => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  // Prepare data for the maintenance issues chart
  const maintenanceIssuesData = {
    labels: sampleData.maintenanceIssues.map(item => item.name),
    datasets: [
      {
        label: 'Number of Reports',
        data: sampleData.maintenanceIssues.map(item => item.count),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };

  // Prepare data for the resident duration doughnut chart
  const residentDurationData = {
    labels: sampleData.residentDuration.map(item => item.name),
    datasets: [
      {
        data: sampleData.residentDuration.map(item => item.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for the community interest pie chart
  const communityInterestData = {
    labels: sampleData.communityInterest.map(item => item.name),
    datasets: [
      {
        data: sampleData.communityInterest.map(item => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for the project themes radar chart
  const projectThemesData = {
    labels: sampleData.projectThemes.map(item => item.name),
    datasets: [
      {
        label: 'Mentions',
        data: sampleData.projectThemes.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6 lg:p-24 relative">
      {/* Blurred overlay and modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          {/* Blurred background overlay */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md"></div>
          
          {/* Modal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md p-6 md:p-8 bg-white rounded-lg shadow-2xl border border-blue-100">
            <div className="text-center">
              <div className="mb-4 inline-block p-3 rounded-full bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Results Coming Soon</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Survey results will be available in early May after all responses have been collected and analyzed.
              </p>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                Thank you for your interest! Check back soon to see the community feedback.
              </p>
              <p className="text-sm sm:text-base font-medium text-blue-700 mb-4 sm:mb-6">
                Click "Preview Sample" to see an example of how the results will be presented with fictional sample data.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/" className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-center">
                  Return Home
                </Link>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Preview Sample
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`max-w-6xl w-full transition-all duration-300 ${showModal ? 'blur-sm' : ''}`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-0">Survey Results</h1>
          {!showModal && (
            <button 
              onClick={() => setShowModal(true)}
              className="self-start md:self-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show Message
            </button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex items-start sm:items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm sm:text-base font-medium text-yellow-700">
                SAMPLE DATA: This page displays fictional data for demonstration purposes only. Actual survey results will be published in May.
              </p>
            </div>
          </div>
        
          <div className="md:hidden bg-blue-50 rounded-lg p-3 mb-6">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-blue-700">
                Tip: Rotate your device horizontally for a better view of the charts.
              </p>
            </div>
          </div>
        
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Overview</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Thank you to all 78 residents who took the time to complete our survey. Your input will 
            directly influence my priorities if elected to the condo board. Here's what we learned 
            about what matters most to our community.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium text-blue-800 mb-2">Top Priorities</h3>
              <ol className="list-decimal ml-5 text-base sm:text-lg">
                <li className="mb-1">Rooftop renovation project</li>
                <li className="mb-1">Increasing financial transparency</li>
                <li className="mb-1">Addressing elevator reliability</li>
                <li className="mb-1">Improving security measures</li>
                <li className="mb-1">Better communication about ongoing projects</li>
              </ol>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium text-green-800 mb-2">Commitment</h3>
              <p className="text-base sm:text-lg">
                Based on these results, I commit to addressing these key issues if elected. I will provide 
                regular updates on the rooftop project, improve financial transparency through quarterly reports, 
                and prioritize elevator maintenance.
              </p>
            </div>
          </div>
        </div>
        
        {/* Satisfaction Levels Section */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Satisfaction Levels</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-8">
            We asked residents to rate their satisfaction with various aspects of 95 Prince Arthur on a scale of 1-5.
            Here's what the data shows:
          </p>
          
          <div className="h-[60vh] sm:h-96 mb-6 sm:mb-8 overflow-x-auto">
            <Bar data={satisfactionBarData} options={{
              ...satisfactionBarOptions,
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 5,
                  title: {
                    display: true,
                    text: 'Average Score (1-5)'
                  }
                },
                x: {
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                      size: isMounted && windowWidth < 640 ? 11 : 12
                    }
                  }
                }
              }
            }} />
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 mb-4">
            <p className="text-sm sm:text-base text-yellow-800">
              <strong>Key finding:</strong> Financial transparency and project progress received the lowest scores, 
              while security received the highest satisfaction rating.
            </p>
          </div>
        </div>
        
        {/* Resident Demographics Section */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Resident Demographics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">How Long Have You Lived Here?</h3>
              <div className="h-[45vh] sm:h-64">
                <Doughnut data={residentDurationData} options={{ 
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        font: {
                          size: isMounted && windowWidth < 640 ? 10 : 12
                        }
                      }
                    }
                  }
                }} />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Resident Status</h3>
              <div className="h-[45vh] sm:h-64">
                <Pie 
                  data={{
                    labels: sampleData.residentStatus.map(item => item.name),
                    datasets: [{
                      data: sampleData.residentStatus.map(item => item.count),
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                      ],
                      borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)'
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          font: {
                            size: isMounted && windowWidth < 640 ? 10 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4">
            <p className="text-sm sm:text-base text-blue-700">
              <strong>Key finding:</strong> The majority of survey respondents (79%) are owners who live in the building, 
              with most having lived here for 1-5 years.
            </p>
          </div>
        </div>
        
        {/* Building Issues Section */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Building Issues & Concerns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Maintenance Issues</h3>
              <div className="h-[60vh] sm:h-96 overflow-x-auto">
                <Bar 
                  data={maintenanceIssuesData}
                  options={{
                    indexAxis: 'y' as const,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: { display: true, text: 'Common Maintenance Issues' }
                    }
                  }} 
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Financial Concerns</h3>
              <div className="h-[60vh] sm:h-96 overflow-x-auto">
                <Bar 
                  data={financialConcernsData}
                  options={{
                    indexAxis: 'y' as const,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: { 
                      legend: { display: false },
                      title: { display: true, text: 'Financial Concerns' }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Project Concerns</h3>
              <div className="h-[50vh] sm:h-80 overflow-x-auto">
                <Bar 
                  data={{
                    labels: sampleData.projectConcerns.map(item => item.name),
                    datasets: [{
                      label: 'Number of Residents',
                      data: sampleData.projectConcerns.map(item => item.count),
                      backgroundColor: 'rgba(255, 99, 132, 0.7)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    indexAxis: 'y' as const,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: { 
                      legend: { display: false },
                      title: { display: true, text: 'Project Concerns' }
                    }
                  }} 
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Amenities Usage</h3>
              <div className="h-[45vh] sm:h-80">
                <Pie 
                  data={amenitiesUsageData} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          font: {
                            size: isMounted && windowWidth < 640 ? 10 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Community & Projects Section */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Community & Future Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Interest in Community Events</h3>
              <div className="h-[45vh] sm:h-64">
                <Pie 
                  data={communityInterestData} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          font: {
                            size: isMounted && windowWidth < 640 ? 10 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-3 sm:mt-4 bg-green-50 p-2 sm:p-3 rounded-md">
                <p className="text-xs sm:text-sm text-green-800">
                  87% of residents are interested in or might participate in community events.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Project Priorities</h3>
              <div className="h-[45vh] sm:h-64">
                <Radar 
                  data={projectThemesData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                      r: {
                        beginAtZero: true,
                        ticks: {
                          backdropColor: 'transparent',
                          font: {
                            size: isMounted && windowWidth < 640 ? 8 : 10
                          }
                        },
                        pointLabels: {
                          font: {
                            size: isMounted && windowWidth < 640 ? 8 : 10
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Communication Preferences</h3>
            <div className="h-[50vh] sm:h-80 max-w-xl mx-auto">
              <Bar 
                data={{
                  labels: sampleData.communicationPreferences.map(item => item.name),
                  datasets: [{
                    label: 'Number of Residents',
                    data: sampleData.communicationPreferences.map(item => item.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                  }]
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            </div>
            <div className="mt-3 sm:mt-4 bg-blue-50 p-3 rounded-md text-center">
              <p className="text-xs sm:text-base text-blue-800">
                Email is the strongly preferred method of communication (55% of residents), 
                followed by a mobile app (25%).
              </p>
            </div>
          </div>
        </div>
        
        {/* Text Responses Section */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Open-ended Feedback Themes</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            We analyzed the text responses using AI to identify common themes.
            Here are the main topics mentioned in the open-ended questions:
          </p>
          
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-3">Maintenance Concerns</h3>
              <div className="h-[50vh] sm:h-80 max-w-xl mx-auto">
                <Bar 
                  data={{
                    labels: sampleData.maintenanceThemes.map(item => item.name),
                    datasets: [{
                      label: 'Mentions',
                      data: sampleData.maintenanceThemes.map(item => item.count),
                      backgroundColor: 'rgba(54, 162, 235, 0.7)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45,
                          font: {
                            size: isMounted && windowWidth < 640 ? 10 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium mb-3">Frequent Comments</h3>
              <div className="space-y-3 sm:space-y-4">
                <blockquote className="italic border-l-4 border-blue-300 pl-3 sm:pl-4 py-2 text-sm sm:text-base text-gray-600">
                  "The rooftop renovation needs to be completed as promised. It's been too long with no updates."
                </blockquote>
                <blockquote className="italic border-l-4 border-blue-300 pl-3 sm:pl-4 py-2 text-sm sm:text-base text-gray-600">
                  "We need more transparency about how our condo fees are being spent."
                </blockquote>
                <blockquote className="italic border-l-4 border-blue-300 pl-3 sm:pl-4 py-2 text-sm sm:text-base text-gray-600">
                  "The elevator breakdowns are becoming more frequent and repairs take too long."
                </blockquote>
                <blockquote className="italic border-l-4 border-blue-300 pl-3 sm:pl-4 py-2 text-sm sm:text-base text-gray-600">
                  "I would love to see more community events to get to know my neighbors better."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Steps Section */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-4">Next Steps</h2>
          <p className="text-base sm:text-lg mb-4 sm:mb-6">
            These survey results will inform my priorities if elected to the board. I'm committed to addressing 
            the key concerns identified and improving life at 95 Prince Arthur for all residents.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/about" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 text-base sm:text-lg rounded-lg transition-colors"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg text-center text-xs sm:text-sm text-gray-600">
          <p><strong>SAMPLE DATA:</strong> This visualization represents how actual survey data will be presented. The figures shown are fictional examples only and do not represent real resident feedback.</p>
        </div>
      </div>
    </main>
  );
} 