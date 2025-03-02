import React, { useEffect, useState } from "react";
import MissingCard from "../components/MissingCard";
import axios from "axios";
import { baseBackendUrl } from "../assets/connect";

const AllMissingRecord = () => {
  const [missing, setMissing] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch missing persons
  const fetchMissingPersons = async () => {
    setLoading(true);
    try {
      const url = searchName
        ? `${baseBackendUrl}/api/v1/missing/search?name=${searchName}`
        : `${baseBackendUrl}/api/v1/missing/all`; // Show all if no search

      const { data } = await axios.get(url);

      if (data?.success) {
        setMissing(data?.missingPersons);
      } else {
        setMissing([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMissing([]);
    }
    setLoading(false);
  };

  // Fetch data initially and whenever searchName changes
  useEffect(() => {
    const timer = setTimeout(fetchMissingPersons, 500); // Debounce API call
    return () => clearTimeout(timer);
  }, [searchName]);

  return (
    <div className="py-14 mt-20">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Name"
          className="p-2 border rounded-md w-96"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* Display Data */}
      <div className="grid grid-cols-1 sm:ml-[20%] md:ml-[0%] md:grid-cols-3 gap-4 items-center justify-center">
        {loading ? (
          <h1 className="text-3xl font-bold text-gray-700 text-center">Loading...</h1>
        ) : missing.length > 0 ? (
          <MissingCard data={missing} />
        ) : (
          <h1 className="text-3xl font-bold text-gray-700 text-center">No Record Found</h1>
        )}
      </div>
    </div>
  );
};

export default AllMissingRecord;
