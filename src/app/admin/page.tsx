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
  contact_name?: string;
  contact_email?: string;
  contact_unit?: string;
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('created_at')}
                    >
                      Date {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('resident_status')}
                    >
                      Status {sortField === 'resident_status' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ratings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSortedData().map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {item.resident_status.replace(/_/g, ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="space-y-1">
                          <p>Amenities: {item.amenities_satisfaction}/5</p>
                          <p>Security: {item.security_satisfaction}/5</p>
                          <p>Maintenance: {item.maintenance_satisfaction}/5</p>
                          <p>Financial: {item.financial_satisfaction}/5</p>
                          <p>Communication: {item.communication_satisfaction}/5</p>
                          <p>Projects: {item.projects_satisfaction}/5</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.contact_name && (
                          <p><span className="font-medium">Name:</span> {item.contact_name}</p>
                        )}
                        {item.contact_unit && (
                          <p><span className="font-medium">Unit:</span> {item.contact_unit}</p>
                        )}
                        {item.contact_email && (
                          <p><span className="font-medium">Email:</span> {item.contact_email}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 