"use client";

import React, { useState, useEffect } from 'react';

interface SurveySubmission {
  id: number;
  amenities_satisfaction: number;
  security_satisfaction: number;
  maintenance_satisfaction: number;
  financial_satisfaction: number;
  communication_satisfaction: number;
  projects_satisfaction: number;
  community_importance: number;
  resident_status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [surveyData, setSurveyData] = useState<SurveySubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<keyof SurveySubmission>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

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

  const handleSort = (field: keyof SurveySubmission) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    const filtered = filterStatus === 'all' 
      ? surveyData 
      : surveyData.filter(item => item.resident_status === filterStatus);

    return [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (!aValue || !bValue) return 0;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const calculateAverages = () => {
    if (surveyData.length === 0) return null;

    return {
      amenities: Math.round(surveyData.reduce((acc, curr) => acc + curr.amenities_satisfaction, 0) / surveyData.length * 10) / 10,
      security: Math.round(surveyData.reduce((acc, curr) => acc + curr.security_satisfaction, 0) / surveyData.length * 10) / 10,
      maintenance: Math.round(surveyData.reduce((acc, curr) => acc + curr.maintenance_satisfaction, 0) / surveyData.length * 10) / 10,
      financial: Math.round(surveyData.reduce((acc, curr) => acc + curr.financial_satisfaction, 0) / surveyData.length * 10) / 10,
      communication: Math.round(surveyData.reduce((acc, curr) => acc + curr.communication_satisfaction, 0) / surveyData.length * 10) / 10,
      projects: Math.round(surveyData.reduce((acc, curr) => acc + curr.projects_satisfaction, 0) / surveyData.length * 10) / 10,
    };
  };

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Resident Status',
      'Amenities Rating',
      'Security Rating',
      'Maintenance Rating',
      'Financial Rating',
      'Communication Rating',
      'Projects Rating',
      'Community Importance',
      'Unit',
      'Name',
      'Email'
    ];

    const csvData = getSortedData().map(item => [
      new Date(item.created_at).toLocaleDateString(),
      item.resident_status,
      item.amenities_satisfaction,
      item.security_satisfaction,
      item.maintenance_satisfaction,
      item.financial_satisfaction,
      item.communication_satisfaction,
      item.projects_satisfaction,
      item.community_importance,
      item.contact_unit || '',
      item.contact_name || '',
      item.contact_email || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `survey-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const averages = calculateAverages();

  const renderTable = () => {
    const filteredData = surveyData.filter(submission => {
      if (filterStatus === 'all') return true;
      return submission.resident_status === filterStatus;
    });

    const sortedData = [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Amenities</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Security</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Maintenance</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Financial</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Communication</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Projects</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Community</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.id}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.amenities_satisfaction}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.security_satisfaction}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.maintenance_satisfaction}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.financial_satisfaction}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.communication_satisfaction}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.projects_satisfaction}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.community_importance}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">{submission.resident_status}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-900">
                  {new Date(submission.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl font-bold mb-2">95 Prince Arthur Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">View and analyze survey responses collected for the upcoming AGM</p>
        
        {averages && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Amenities</h3>
              <p className="text-2xl font-bold text-blue-600">{averages.amenities}/5</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Security</h3>
              <p className="text-2xl font-bold text-blue-600">{averages.security}/5</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Maintenance</h3>
              <p className="text-2xl font-bold text-blue-600">{averages.maintenance}/5</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Financial</h3>
              <p className="text-2xl font-bold text-blue-600">{averages.financial}/5</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Communication</h3>
              <p className="text-2xl font-bold text-blue-600">{averages.communication}/5</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Projects</h3>
              <p className="text-2xl font-bold text-blue-600">{averages.projects}/5</p>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-semibold">Survey Responses</h2>
              <p className="text-sm text-gray-500">Total responses: {surveyData.length}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Residents</option>
                <option value="owner_resident">Owner Resident</option>
                <option value="owner_nonresident">Owner Non-Resident</option>
                <option value="tenant">Tenant</option>
              </select>
              <button 
                onClick={fetchSurveyData}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
              >
                Refresh Data
              </button>
              <button 
                onClick={exportToCSV}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
              >
                Export to CSV
              </button>
            </div>
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
            renderTable()
          )}
        </div>
      </div>
    </main>
  );
} 