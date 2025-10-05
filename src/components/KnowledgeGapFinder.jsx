"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export default function KnowledgeGapFinder() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch("/api/knowledge-gaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setResults({ error: "Something went wrong." });
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔍 Knowledge Gap Finder
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste scientific text or describe a mission..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 outline-none"
        rows={5}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        {loading ? "Analyzing..." : "Find Knowledge Gaps"}
      </button>

      {results && (
        <div className="mt-6 p-4 border rounded-xl bg-gray-50">
          {results.error ? (
            <p className="text-red-500">{results.error}</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">Results</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {results.gaps?.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
