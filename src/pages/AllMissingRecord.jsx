import React, { useEffect, useState } from "react";
import MissingCard from "../components/MissingCard";
import axios from "axios";

const AllMissingRecord = () => {
  const [missing, setMissing] = useState([]);
  const fetchMissingPerson = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/missing/all"
      );

      if (data?.success) {
        console.log(data);
        setMissing(data?.missingPersons);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMissingPerson();
  }, []);
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 py-14
    mt-20 gap-4 items-center justify-center"
    >
      {missing.length > 0 ? (
        <MissingCard data={missing} />
      ) : (
        <h1 className="text-3xl font-bold text-gray-700 text-center">No Record Found</h1>
      )}
    </div>
  );
};

export default AllMissingRecord;
