import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CriminalCard from "../components/CriminalCard";
import { baseBackendUrl } from "../assets/connect";

const AllCriminalrecord = () => {
  const [record, serRecord] = useState([]);
  const [adhaar, setSearch] = useState([]);
  const fetchCiminalData = async () => {
    try {
      const { data } = await axios.get(`${baseBackendUrl}/api/v1/fir/all`);
      console.log(data?.allFir);

      if (data?.success) {
        toast.success(data?.message);
        serRecord(data?.allFir);
      }
    } catch (error) {}
  };
  const searchCiminalData = async () => {
    try {
      const { data } = await axios.get(
        `${baseBackendUrl}/api/v1/fir/search/fir?adhaar=${adhaar}`
      );
      console.log(data?.fir);

      if (data?.success) {
        // toast.success(data?.message);
        serRecord(data?.fir);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchCiminalData();
  }, []);
  return (
    <>
      <div className="text-center mt-20 mb-7 py-3">
        <input
          type="number"
          name="search"
          placeholder="Search Record..."
          className="p-2 text-md w-auto md:w-[25vw] shadow-md rounded-md border-none focus:ring-white active:ring-0 m-2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <span
          onClick={searchCiminalData}
          className="bg-purple-600  cursor-pointer px-2 py-2  rounded-md shadow-2xl text-white capitalize font-semibold"
        >
          search
        </span>
      </div>
      <div className="grid grid-cols-1 sm:ml-[20%] md:ml-[0%] md:grid-cols-3  gap-4 items-center justify-center">
        <CriminalCard data={record} />
      </div>
    </>
  );
};

export default AllCriminalrecord;
