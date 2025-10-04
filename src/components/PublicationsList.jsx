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

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <div className="text-blue-400 text-2xl font-bold tracking-wider">LOADING PUBLICATIONS</div>
          <div className="text-gray-500 text-sm mt-2 font-mono">Accessing NASA Database...</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starfield background effect */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute w-1 h-1 bg-white rounded-full top-[10%] left-[20%] animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-[30%] left-[60%] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-[60%] left-[80%] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-[80%] left-[30%] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full top-[20%] left-[40%] animate-pulse"></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full top-[50%] left-[70%] animate-pulse" style={{animationDelay: '0.7s'}}></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* NASA-style header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="text-6xl">🛸</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-center mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              SPACE BIOLOGY
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-300 tracking-widest mb-4">
            RESEARCH PUBLICATIONS
          </h2>
          <div className="text-center">
            <div className="inline-block px-6 py-2 border-2 border-blue-500 rounded-full">
              <span className="text-blue-400 font-mono text-lg font-bold">{publications.length}</span>
              <span className="text-gray-400 text-sm ml-2">DOCUMENTS AVAILABLE</span>
            </div>
          </div>
        </div>

        {/* Search interface */}
        <div className="mb-10">
          <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-blue-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchPublications(searchTerm)}
                  placeholder="SEARCH DATABASE..."
                  className="w-full px-6 py-4 rounded-xl border-2 border-blue-800 bg-black text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono uppercase text-sm tracking-wider"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-2xl">🔍</div>
              </div>
              <button
                onClick={() => fetchPublications(searchTerm)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all rounded-xl font-bold tracking-widest shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-800/50 border border-blue-500"
              >
                SEARCH
              </button>
              <button
                onClick={() => { setSearchTerm(''); fetchPublications(); }}
                className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all rounded-xl font-bold tracking-widest border border-gray-700"
              >
                RESET
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950 border-2 border-red-600 rounded-xl text-red-400 text-center font-mono">
            ⚠️ ERROR: {error}
          </div>
        )}

        {selectedPub ? (
          <div>
            <button
              onClick={() => setSelectedPub(null)}
              className="mb-6 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-xl transition-all font-bold border border-gray-700 flex items-center gap-2"
            >
              <span className="text-xl">←</span> BACK TO CATALOG
            </button>
            <PublicationDetails publication={selectedPub} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <div
                key={pub._additional?.id || index}
                className="group relative p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-blue-900 rounded-2xl shadow-xl cursor-pointer hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/50 overflow-hidden"
                onClick={() => setSelectedPub(pub)}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full"></div>
                
                {/* Document number badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-950 border border-blue-700 rounded-full text-blue-400 text-xs font-mono font-bold">
                  #{String(index + 1).padStart(3, '0')}
                </div>

                <div className="relative z-10">
                  <div className="text-cyan-400 text-xs font-mono mb-2 tracking-widest">RESEARCH DOCUMENT</div>
                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
                    {pub.title || "Untitled Publication"}
                  </h2>
                  
                  {pub.abstract && (
                    <p className="text-gray-400 line-clamp-4 text-sm leading-relaxed mb-4">
                      {pub.abstract}
                    </p>
                  )}
                  
                  <div className="pt-4 border-t border-gray-800">
                    <div className="text-gray-500 text-xs mb-1 font-mono tracking-wider">AUTHORS:</div>
                    <div className="text-blue-300 text-sm line-clamp-2 font-medium">
                      {pub.authors?.join(', ') || "Unknown authors"}
                    </div>
                  </div>
                </div>

                {/* Hover effect indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        )}

        {publications.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔭</div>
            <div className="text-gray-400 text-xl font-mono">NO PUBLICATIONS FOUND</div>
            <div className="text-gray-600 text-sm mt-2">Try adjusting your search parameters</div>
          </div>
        )}
      </div>
    </div>
  );
}