"use client";

import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        fetchSurveyData();
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  const fetchSurveyData = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/survey');
      const data = await response.json();
      
      if (data.submissions) {
        setSurveyData(data.submissions);
      }
    } catch (err) {
      console.error('Error fetching survey data:', err);
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes
  const demoData = [
    {
      building: "95 Prince Arthur Ave",
      category: "amenities",
      satisfaction: 4,
      comments: "Would love to see the gym updated with newer equipment.",
      timestamp: "2023-04-15T14:32:22Z"
    },
    {
      building: "95 Prince Arthur Ave",
      category: "security",
      satisfaction: 3,
      comments: "The main entrance door sometimes doesn't close properly.",
      timestamp: "2023-04-14T11:20:15Z"
    },
    {
      building: "95 Prince Arthur Ave",
      category: "maintenance",
      satisfaction: 5,
      comments: "Very happy with the recent hallway renovations!",
      timestamp: "2023-04-13T09:45:33Z"
    }
  ];

  // If no real data is available, use demo data
  useEffect(() => {
    if (isAuthenticated && surveyData.length === 0) {
      setSurveyData(demoData);
    }
  }, [isAuthenticated, surveyData.length]);

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-8 text-center">95 Prince Arthur<br />Admin Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            <p className="text-gray-600 mb-6">
              Please enter the admin password to view survey responses.
            </p>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-2">95 Prince Arthur Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">View all survey responses collected for the upcoming AGM</p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Survey Responses</h2>
            <button 
              onClick={fetchSurveyData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Refresh Data
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : surveyData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No survey responses yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satisfaction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {surveyData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.satisfaction}/5
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                        {item.comments}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Prepare for the AGM</h2>
          <p className="text-gray-600 mb-4">
            Use this dashboard to track feedback and prepare your campaign notes for the upcoming Annual General Meeting in May.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Export Data</h3>
              <p className="text-sm text-gray-500 mb-3">Download all responses as a CSV file</p>
              <button className="text-blue-600 text-sm font-medium">
                Download CSV
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Generate Report</h3>
              <p className="text-sm text-gray-500 mb-3">Create a summary report of all feedback</p>
              <button className="text-blue-600 text-sm font-medium">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">AGM Countdown</h3>
              <p className="text-sm text-gray-500 mb-3">Time remaining to prepare</p>
              <p className="text-lg font-bold text-blue-600">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 