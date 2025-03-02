import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CriminalCard from "../components/CriminalCard";
import { baseBackendUrl } from "../assets/connect";

const AllCriminalRecord = () => {
  const [records, setRecords] = useState([]); // Store FIR records
  const [searchName, setSearchName] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);

  // Function to fetch all FIR records
  const fetchAllCriminalData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseBackendUrl}/api/v1/fir/all`);
      if (data?.success) {
        setRecords(data?.allFir || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRecords([]);
    }
    setLoading(false);
  };

  // Function to fetch specific FIR records based on search
  const searchCriminalData = async () => {
    if (!searchName.trim()) {
      fetchAllCriminalData(); // If search is empty, fetch all records
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${baseBackendUrl}/api/v1/fir/search/fir?name=${searchName}`);
      
      if (data?.success) {
        setRecords(data?.fir || []);
      } else {
        setRecords([]); // Show no records found
      }
    } catch (error) {
      console.error("Error searching record:", error);
      setRecords([]);
    }
    setLoading(false);
  };

  // Fetch all records on initial load
  useEffect(() => {
    fetchAllCriminalData();
  }, []);

  // Fetch records dynamically when searchName changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchName.trim()) {
        searchCriminalData();
      } else {
        fetchAllCriminalData(); // Fetch all records when search is cleared
      }
    }, 500); // Debounce API calls to avoid excessive requests

    return () => clearTimeout(timer);
  }, [searchName]);

  return (
    <>
      {/* Search Input */}
      <div className="text-center mt-20 mb-7 py-3">
        <input
          type="text"
          name="search"
          placeholder="Search by Name..."
          className="p-2 text-md w-auto md:w-[25vw] shadow-md rounded-md border-none focus:ring-white active:ring-0 m-2"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* Data Display */}
      <div className="grid grid-cols-1 sm:ml-[20%] md:ml-[0%] md:grid-cols-3 gap-4 items-center justify-center">
        {loading ? (
          <h1 className="text-3xl font-bold text-gray-700 text-center">Loading...</h1>
        ) : records.length > 0 ? (
          <CriminalCard data={records} />
        ) : (
          <h1 className="text-3xl font-bold text-gray-700 text-center">No Record Found</h1>
        )}
      </div>
    </>
  );
};

export default AllCriminalRecord;
