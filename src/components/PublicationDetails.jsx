'use client';
import AIInsightsPanel from './AIInsightsPanel';

export default function PublicationDetails({ publication }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold mb-4">{publication.title || "Untitled Publication"}</h1>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        {publication.pmcid && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            PMCID: {publication.pmcid}
          </span>
        )}
        {publication.source_url && (
          <a
            href={publication.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition"
          >
            View Source
          </a>
        )}
      </div>

      {publication.abstract && (
        <div className="mb-6 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold mb-2">Abstract</h2>
          <p>{publication.abstract}</p>
        </div>
      )}

      {/* AI Insights Panel */}
      <AIInsightsPanel publication={publication} />
    </div>
  );
}
