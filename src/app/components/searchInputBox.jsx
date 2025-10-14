"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchInputBox() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const handleEnter = async (e) => {
    if (e.key == "Enter") {
      try {
        setLoading(true);

        const params = {
          page,
          limit,
          query,
          sortBy,
          sortType,
        };

        const res = await axios.get("http://localhost:8000/api/v1/videos", {
          params,
        });
        const data = res.data.data; // Assuming ApiResponse wraps it
        console.log(data);
        setVideos(data.docs); // aggregatePaginate returns { docs, totalPages, etc. }
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        // setLoading(false);
      }
    }
  };
  return (
    <div>
      <input
        className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleEnter}
      />
      <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          ></path>
        </svg>
      </span>
    </div>
  );
}
