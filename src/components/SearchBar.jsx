"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  // Optional: debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(term);
    }, 500); // 500ms delay
    return () => clearTimeout(timeout);
  }, [term]);

  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search publications..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => onSearch(term)}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
      <button
        onClick={() => {
          setTerm("");
          onSearch("");
        }}
        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Clear
      </button>
    </div>
  );
}
