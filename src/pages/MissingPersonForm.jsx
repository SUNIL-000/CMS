import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../assets/connect";

// Reusable Input Component with Error
const FormInput = ({ label, name, type = "text", value, onChange, required = false, error }) => (
  <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-2">
    <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor={name}>
      {label}
    </label>
    <input
      required={required}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`appearance-none block w-full bg-gray-200 text-gray-600 border ${error ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
      placeholder={`Enter ${label}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Reusable Select Component with Error
const FormSelect = ({ label, name, value, options, onChange, required = false, error }) => (
  <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-2">
    <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor={name}>
      {label}
    </label>
    <select
      required={required}
      name={name}
      value={value}
      onChange={onChange}
      className={`appearance-none block w-full bg-gray-200 text-gray-600 border ${error ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

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
    photo_url: null,
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState("");

  // Input Validation Function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || formData.age <= 0) newErrors.age = "Enter a valid age";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.missing_date) newErrors.missing_date = "Missing date is required";
    if (!formData.reported_by_name.trim()) newErrors.reported_by_name = "Reporter name is required";
    if (!formData.reported_by_contact.match(/^\d{10}$/)) newErrors.reported_by_contact = "Enter a valid 10-digit contact number";
    if (!formData.photo_url) newErrors.photo_url = "Photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // clear error on change
  };

  // Handles File Input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo_url: file }));
    setErrors((prev) => ({ ...prev, photo_url: '' }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return toast.error("Please fix validation errors");

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) form.append(key, formData[key]);
      });

      const { data } = await axios.post(`${baseBackendUrl}/api/v1/missing/new`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      data?.success ? toast.success(data.message) : toast.error(data.message);
      if (data?.success) navigate("/all-missing-report");

    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Error submitting report. Please try again.");
    }
  };

  return (
    <div className="h-full flex justify-center py-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex mt-14">
        {/* Photo Preview Section */}
        <div className="hidden lg:block w-5/12 bg-gray-200 rounded-l-lg bg-cover" style={{ backgroundImage: `url(${photoPreview})` }} />

        {/* Form Section */}
        <div className="w-full lg:w-7/12 bg-gray-100 p-6 rounded-lg lg:rounded-l-none">
          <h3 className="text-2xl text-center text-teal-600 font-bold uppercase">Missing Person Complaint</h3>

          <form className="mt-6 bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="flex flex-wrap -mx-2">
              <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
              <FormInput label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required error={errors.age} />
              <FormSelect label="Gender" name="gender" value={formData.gender} options={["male", "female", "other"]} onChange={handleChange} required />
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap -mx-2">
              <FormInput label="City" name="city" value={formData.city} onChange={handleChange} required error={errors.city} />
              <FormInput label="Missing Date" name="missing_date" type="date" value={formData.missing_date} onChange={handleChange} required error={errors.missing_date} />
              <FormInput label="Reported By" name="reported_by_name" value={formData.reported_by_name} onChange={handleChange} required error={errors.reported_by_name} />
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap -mx-2">
              <FormInput label="Contact" name="reported_by_contact" type="number" value={formData.reported_by_contact} onChange={handleChange} required error={errors.reported_by_contact} />

              <div className="w-full md:w-1/3 mb-4 md:mr-2">
                <label className="block mb-2 text-sm font-bold text-gray-600">Photo</label>
                <input
                  type="file"
                  name="photo_url"
                  onChange={handleFileChange}
                  className={`w-full p-2 border rounded bg-gray-200 text-gray-600 ${errors.photo_url ? "border-red-500" : "border-gray-200"}`}
                  required
                />
                {errors.photo_url && <p className="text-red-500 text-xs mt-1">{errors.photo_url}</p>}
              </div>

              <FormSelect label="Status" name="status" value={formData.status} options={["missing", "found", "pending"]} onChange={handleChange} required />
            </div>

            {/* Photo Preview */}
            {photoPreview && <img src={photoPreview} alt="Preview" className="w-20 h-20 mx-auto mt-4 rounded-full shadow" />}

            {/* Submit */}
            <div className="text-center mt-6">
              <button type="submit" className="w-1/4 px-4 py-2 text-xl uppercase font-bold text-white bg-teal-600 rounded-full hover:bg-teal-500">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MissingPersonForm;
