import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../assets/connect";

const EditMissingReport = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    status: "missing",
  });

  const getSingleMissingPerson = async () => {
    try {
      const { data } = await axios.get(`${baseBackendUrl}/api/v1/missing/single/${id}`);
      if (data?.success) {
        setImage(data?.missingPersons?.photo_url);
        setFormData({
          name: data?.missingPersons?.name || "",
          age: data?.missingPersons?.age || "",
          status: data?.missingPersons?.status || "missing",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleMissingPerson();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${baseBackendUrl}/api/v1/missing/${id}`, formData);
      if (data?.success) {
        toast.success("Record updated successfully");
        navigate("/all-missing-report");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Error updating report. Please try again.");
    }
  };

  return (
    <div className="h-full bg-gray-400">
      <div className="flex justify-center px-6 py-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex mt-14">
          <div
            className="w-full h-full bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{ backgroundImage: `url(/images/${image})` }}
          />

          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="py-4 text-2xl text-center text-gray-600 font-bold uppercase">Manage Missing Person</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-600">Full Name</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 focus:outline-none"
                  type="text"
                  name="name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-600">Age</label>
                <input
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 focus:outline-none"
                  type="number"
                  name="age"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-600">Status</label>
                <select
                  className="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 focus:outline-none"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="missing">Missing</option>
                  <option value="found">Found</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="text-center flex gap-4">
                <button
                  className="w-2/4 px-4 py-2 bg-[#16A085] rounded-full hover:bg-[#16a0849c] text-white text-xl font-bold"
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMissingReport;
