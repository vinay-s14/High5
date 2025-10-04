'use client';
import { useState, useEffect } from 'react';
import PublicationDetails from './PublicationDetails';

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [selectedPub, setSelectedPub] = useState(null);

  const fetchPublications = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      params.append('limit', '50');

      const response = await fetch(`/api/publications?${params}`);
      if (!response.ok) throw new Error('Failed to fetch publications');

      const data = await response.json();
      setPublications(data.publications || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPublications(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPublications(searchTerm);
  };

  if (loading) return <div className="text-center py-8">Loading publications...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Space Biology Publications ({publications.length})</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
        <button
          type="button"
          onClick={() => { setSearchTerm(''); fetchPublications(); }}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Clear
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {selectedPub ? (
        <>
          <button onClick={() => setSelectedPub(null)} className="mb-4 px-4 py-2 bg-gray-200 rounded">
            ← Back to list
          </button>
          <PublicationDetails publication={selectedPub} />
        </>
      ) : (
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <div
              key={pub._additional?.id || index}
              className="p-4 bg-white border rounded shadow cursor-pointer hover:shadow-md"
              onClick={() => setSelectedPub(pub)}
            >
              <h2 className="font-semibold">{pub.title || "Untitled Publication"}</h2>
              {pub.abstract && <p className="text-gray-600 line-clamp-3">{pub.abstract}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
