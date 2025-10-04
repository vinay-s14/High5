"use client";

export default function PublicationCard({ pub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{pub.title}</h2>

      <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
        {pub.pmcid && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            PMCID: {pub.pmcid}
          </span>
        )}
      </div>

      {pub.abstract && (
        <p className="text-gray-600 mb-4 line-clamp-3">{pub.abstract}</p>
      )}

      {pub.source_url && (
        <a
          href={pub.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium"
        >
          View Publication
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
