'use client';
import { useState } from 'react';

export default function AIInsightsPanel({ publication }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!publication?.source_url) {
      setSummary("No URL available for this publication");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/aiSummary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_url: publication.source_url }),
      });
      const data = await res.json();
      setSummary(data.summary || "No summary available");
    } catch (err) {
      setSummary("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={generateSummary}
        disabled={loading}
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
      >
        {loading ? "Generating Summary..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
}
