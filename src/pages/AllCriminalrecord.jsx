import axios from "axios";
import React, { useEffect, useState } from "react";
import CriminalCard from "../components/CriminalCard";
import { baseBackendUrl } from "../assets/connect";

const AllCriminalRecord = () => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllCriminalData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseBackendUrl}/api/v1/firs`);
      if (data?.success) {
        setRecords(data?.firs || []);
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
      setRecords([]);
    }
    setLoading(false);
  };

  const searchCriminalData = async () => {
    if (!searchInput.trim()) {
      fetchAllCriminalData();
      return;
    }

    const isNumber = /^\d+$/.test(searchInput.trim());

    const searchQuery = isNumber
      ? `FIRno=${searchInput.trim()}`
      : `ComplainantName=${searchInput.trim()}`;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseBackendUrl}/api/v1/fir/search/fir?${searchQuery}`
      );
      if (data?.success) {
        setRecords(data?.firs || []);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Error searching record:", error);
      setRecords([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCriminalData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchCriminalData();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <>
      <div className="text-center mt-20 mb-7 py-3">
        <input
          type="text"
          name="search"
          placeholder="Search by FIR Number or Complainant Name..."
          className="p-2 text-md w-auto md:w-[25vw] shadow-md rounded-md border-none focus:ring-white active:ring-0 m-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

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
