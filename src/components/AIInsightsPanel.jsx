'use client';
import { useState } from 'react';

export default function AIInsightsPanel({ publication }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAISummary = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/aiSummary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicationText: publication.abstract || publication.title }),
      });

      if (!response.ok) throw new Error('Failed to fetch AI summary');

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
      <button
        onClick={fetchAISummary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
      >
        Generate Summary
      </button>

      {loading && <p>Loading AI summary...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {summary && (
        <div className="mt-2 text-gray-700 whitespace-pre-line">{summary}</div>
      )}
    </div>
  );
}
