"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        query,
        sortBy,
        sortType,
      };

      const res = await axios.get("http://localhost:8000/api/v1/videos", { params });
      const data = res.data.data; // Assuming ApiResponse wraps it

      setVideos(data.docs); // aggregatePaginate returns { docs, totalPages, etc. }
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page, sortBy, sortType, query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Videos</h1>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search videos..."
        className="border p-2 rounded w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* 🔽 Sorting Controls */}
      <div className="flex gap-3 mb-4">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Newest</option>
          <option value="views">Most Viewed</option>
          <option value="title">Title</option>
        </select>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* 🌀 Loading */}
      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div key={v._id} className="border p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-sm text-gray-600">{v.description}</p>
              {v.owner && (
                <p className="text-xs mt-2">
                  👤 {v.owner.username} ({v.owner.email})
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
