"use client";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PublicationCard from "./PublicationCard";
import Pagination from "./Pagination";

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchPublications = async (search = "", pageNum = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("limit", limit);
      params.append("offset", (pageNum - 1) * limit);

      const response = await fetch(`/api/publications?${params}`);
      if (!response.ok) throw new Error("Failed to fetch publications");

      const data = await response.json();
      setPublications(data.publications);
      setError("");
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications("", page);
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Space Biology Publications</h1>

      <SearchBar onSearch={(term) => fetchPublications(term, 1)} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading publications...</div>
        </div>
      ) : publications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No publications found.</div>
      ) : (
        <div className="space-y-6">
          {publications.map((pub) => (
            <PublicationCard key={pub._additional.id} pub={pub} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={Math.ceil(608 / limit)}
        onPageChange={setPage}
      />
    </div>
  );
}
