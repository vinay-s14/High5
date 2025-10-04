'use client';

import { useState, useEffect } from 'react';
import PublicationDetails from './PublicationDetails';

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [selectedPub, setSelectedPub] = useState(null); // Track selected publication

  // Fetch publications from your API
  const fetchPublications = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      params.append('limit', '50'); // change limit as needed

      const response = await fetch(`/api/publications?${params}`);
      if (!response.ok) throw new Error('Failed to fetch publications');

      const data = await response.json();
      setPublications(data.publications || []);
      setError('');
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  // Handle search form
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPublications(searchTerm);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading publications...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Space Biology Publications ({publications.length})
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search publications by title..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              fetchPublications();
            }}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Publications List or Selected Publication */}
      {selectedPub ? (
        <>
          <button
            onClick={() => setSelectedPub(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Back to list
          </button>
          <PublicationDetails publication={selectedPub} />
        </>
      ) : (
        <div className="space-y-6">
          {publications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No publications found. {searchTerm && 'Try a different search term.'}
            </div>
          ) : (
            publications.map((pub, index) => (
              <div
                key={pub._additional?.id || index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPub(pub)}
              >
                <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
                {pub.abstract && (
                  <p className="text-gray-600 mb-2 line-clamp-3">{pub.abstract}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Results Count */}
      {publications.length > 0 && !selectedPub && (
        <div className="mt-6 text-sm text-gray-500">
          Showing {publications.length} publication{publications.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}
