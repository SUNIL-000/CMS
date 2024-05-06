import React, { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
import axios from "axios";
import toast from "react-hot-toast";

const AdminRecord = () => {
  const [user, setUser] = useState([]);
  const getAdminrecord = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/user/all");

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
    <div className="grid grid-cols-2 mt-8 py-16 md:grid-cols-4 gap-4 md:gap-2  items-center justify-center">
      <AdminCard data={user} />
    </div>
  );
};

export default AdminRecord;
