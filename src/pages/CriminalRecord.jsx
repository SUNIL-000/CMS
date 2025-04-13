import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseBackendUrl } from '../assets/connect';
import toast from 'react-hot-toast';

const Fir = () => {
  const initialState = {
    State: '',
    District: '',
    PoliceStation: '',
    FIRno: '',
    Date: '',
    Act1: '',
    Sections1: '',
    NameOfSuspect: '',
    OccurenceDay: '',
    OccurenceDate: '',
    OccurenceTime: '',
    DirectionAndDistncefromPS: '',
    Address: '',
    ComplainantName: '',
    ComplainantFatherorHusbandName: '',
    ComplainantDateOfBirth: '',
    ComplainantNationality: '',
    ComplainantOccupation: '',
    ComplainantAadharNo: '',
    ComplainantAddress: ''
  };

  const actSectionMap = {
    "Punishment for murder": "302",
    "Attempt to murder": "307",
    "Punishment for rape": "376",
    "Arrest without warrant": "41",
    "Power to issue orders in urgent cases of nuisance or apprehended danger": "144",
    "Interpretation clause (defines evidence)": "3",
    "Computer-related offences": "66",
    "Publishing or transmitting obscene material in electronic form": "67",
    "Court may presume existence of certain facts": "114",
  };

  const actOptions = Object.keys(actSectionMap);

  const stateOptions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const nationalityOptions = ["Indian"];

  const dayOptions = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const occupationOptions = [
    "Student", "Engineer", "Doctor", "Teacher", "Business", "Farmer", "Lawyer",
    "Government Employee", "Private Job", "Unemployed", "Other"
  ];

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Auto update Sections1 when Act1 changes
  useEffect(() => {
    if (formData.Act1 && actSectionMap[formData.Act1]) {
      setFormData((prev) => ({
        ...prev,
        Sections1: actSectionMap[formData.Act1]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        Sections1: ''
      }));
    }
  }, [formData.Act1]);

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });

    if (formData.ComplainantAadharNo && !/^\d{12}$/.test(formData.ComplainantAadharNo)) {
      newErrors.ComplainantAadharNo = 'Aadhar must be 12 digits';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axios.post(`${baseBackendUrl}/api/v1/fir`, formData);

      if (data.success === true) {
        toast.success(data.message);
        setFormData(initialState);
      } else {
        toast.error(data.message || "Failed to submit FIR");
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center pt-20 pb-10 px-4 min-h-screen z-1 relative">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 z-50">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-[#07074D]">
          FIR Registration Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => {
              const label = key.replace(/([A-Z])/g, ' $1').trim();
              let inputField = null;

              if (key === 'State') {
                inputField = (
                  <select id={key} name={key} value={formData[key]} onChange={handleChange} className="w-full rounded-md border py-2.5 px-4 text-sm outline-none">
                    <option value="">Select State</option>
                    {stateOptions.map((option, i) => <option key={i} value={option}>{option}</option>)}
                  </select>
                );
              } else if (key === 'Act1') {
                inputField = (
                  <select id={key} name={key} value={formData[key]} onChange={handleChange} className="w-full rounded-md border py-2.5 px-4 text-sm outline-none">
                    <option value="">Select Act</option>
                    {actOptions.map((option, i) => <option key={i} value={option}>{option}</option>)}
                  </select>
                );
              } else if (key === 'Sections1') {
                inputField = (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={formData[key]}
                    readOnly
                    className="w-full rounded-md border bg-gray-100 py-2.5 px-4 text-sm text-[#6B7280] outline-none"
                  />
                );
              } else if (key === 'ComplainantNationality') {
                inputField = (
                  <select id={key} name={key} value={formData[key]} onChange={handleChange} className="w-full rounded-md border py-2.5 px-4 text-sm outline-none">
                    <option value="">Select Nationality</option>
                    {nationalityOptions.map((option, i) => <option key={i} value={option}>{option}</option>)}
                  </select>
                );
              } else if (key === 'OccurenceDay') {
                inputField = (
                  <select id={key} name={key} value={formData[key]} onChange={handleChange} className="w-full rounded-md border py-2.5 px-4 text-sm outline-none">
                    <option value="">Select Day</option>
                    {dayOptions.map((option, i) => <option key={i} value={option}>{option}</option>)}
                  </select>
                );
              } else if (key === 'ComplainantOccupation') {
                inputField = (
                  <select id={key} name={key} value={formData[key]} onChange={handleChange} className="w-full rounded-md border py-2.5 px-4 text-sm outline-none">
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((option, i) => <option key={i} value={option}>{option}</option>)}
                  </select>
                );
              } else {
                const inputType = key.toLowerCase().includes('date')
                  ? 'date'
                  : key.toLowerCase().includes('time')
                  ? 'time'
                  : 'text';

                inputField = (
                  <input
                    type={inputType}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors[key] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-2.5 px-4 text-sm text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                  />
                );
              }

              return (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-[#07074D] mb-1">{label}</label>
                  {inputField}
                  {errors[key] && <span className="text-red-500 text-xs mt-1 block">{errors[key]}</span>}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-6 text-center text-sm sm:text-base font-semibold text-white"
            >
              Submit FIR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fir;
