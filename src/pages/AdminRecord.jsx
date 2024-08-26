import React, { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
import axios from "axios";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../assets/connect";

const AdminRecord = () => {
  const [user, setUser] = useState([]);
  const getAdminrecord = async () => {
    try {
      const { data } = await axios.get(`${baseBackendUrl}/api/v1/user/all`);

      console.log(data?.allUser);
      if (data?.success) {
        toast.success(data?.message);
        setUser(data?.allUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminrecord();
  }, []);
  return (
    <div className="grid grid-cols-2 sm:ml-[20%] md:ml-[0%] mt-8 py-16 md:grid-cols-4 gap-4 md:gap-2  items-center justify-center">
      {user?.length > 0 ? (
        <AdminCard data={user} />
      ) : (
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          No Record Found
        </h1>
      )}
    </div>
  );
};

export default AdminRecord;
