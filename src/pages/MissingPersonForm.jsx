import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../assets/connect";

const MissingPersonForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    city: "",
    missing_date: "",
    reported_by_name: "",
    reported_by_contact: "",
    status: "missing",
    photo: null,
  });
  const [phtPrev, setPhtPrev] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhtPrev(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const { data } = await axios.post(
        `${baseBackendUrl}/api/v1/missing/new`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/all-missing-report");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Error submitting report. Please try again.");
    }
  };

  return (
    <div className="h-full bg-gray-400 ">
      <div className="mx-auto ">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex mt-14">
            <div
              className="w-full h-full bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{ backgroundImage: `url(${phtPrev})` }}
            />
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-600 font-bold uppercase drop-shadow-md">
                Register missing person
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                <input required value={formData.name} onChange={handleChange} name="name" placeholder="Full Name" className="input" />
                <input required value={formData.age} onChange={handleChange} name="age" type="number" placeholder="Age" className="input" />
                <select required name="gender" value={formData.gender} onChange={handleChange} className="input">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input required value={formData.city} onChange={handleChange} name="city" placeholder="City" className="input" />
                <input required type="date" value={formData.missing_date} onChange={handleChange} name="missing_date" className="input" />
                <input required value={formData.reported_by_name} onChange={handleChange} name="reported_by_name" placeholder="Reported By" className="input" />
                <input required value={formData.reported_by_contact} onChange={handleChange} name="reported_by_contact" type="number" placeholder="Contact" className="input" />
                <input required onChange={handleFileChange} type="file" name="photo" className="input" />
                <select required name="status" value={formData.status} onChange={handleChange} className="input">
                  <option value="missing">Missing</option>
                  <option value="found">Found</option>
                  <option value="resolved">Resolved</option>
                </select>
                {phtPrev && <img src={phtPrev} alt="Preview" className="w-20 h-20 text-center mx-auto" />}
                <button className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded mt-4" type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPersonForm;
