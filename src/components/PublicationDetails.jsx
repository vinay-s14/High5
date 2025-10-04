'use client';
import AIInsightsPanel from './AIInsightsPanel';

export default function PublicationDetails({ publication }) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Main publication card */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-blue-900 rounded-2xl shadow-2xl shadow-blue-900/30 overflow-hidden">
        {/* Header section with accent */}
        <div className="relative bg-gradient-to-r from-blue-950 to-black p-6 border-b-2 border-blue-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
          
          <div className="relative z-10">
            <div className="text-cyan-400 text-xs font-mono mb-2 tracking-widest flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              RESEARCH DOCUMENT - DETAILED VIEW
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              {publication.title || "Untitled Publication"}
            </h1>

            {/* Metadata badges */}
            <div className="flex flex-wrap gap-3 text-sm">
              {publication.pmcid && (
                <div className="px-4 py-2 bg-blue-950 border border-blue-700 rounded-full text-blue-300 font-mono">
                  <span className="text-blue-500 font-bold">PMCID:</span> {publication.pmcid}
                </div>
              )}
              {publication.source_url && (
                <a
                  href={publication.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-blue-600 transition-all flex items-center gap-2 group"
                >
                  <span>View Source</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 md:p-8">
          {publication.abstract && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                <h2 className="text-xl font-bold text-blue-300 tracking-wider uppercase">Abstract</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-blue-500 to-transparent"></div>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed text-base">
                  {publication.abstract}
                </p>
              </div>
            </div>
          )}

          {/* AI Insights Panel */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <h2 className="text-xl font-bold text-cyan-300 tracking-wider uppercase">AI Analysis</h2>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-cyan-500 to-transparent"></div>
            </div>
            <AIInsightsPanel publication={publication} />
          </div>
        </div>

        {/* Footer decoration */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      </div>
    </div>
  );
}