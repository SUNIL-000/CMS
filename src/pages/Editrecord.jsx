import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { baseBackendUrl } from '../assets/connect';

const EditFIR = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const occupationOptions = [
    'Student',
    'Business',
    'Govt. Employee',
    'Private Employee',
    'Unemployed',
  ];

  const [formData, setFormData] = useState({
    Act1: '',
    Sections1: '',
    NameOfSuspect: '',
    Address: '',
    ComplainantName: '',
    ComplainantFatherorHusbandName: '',
    ComplainantOccupation: '',
    ComplainantAadharNo: '',
    ComplainantAddress: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFIR = async () => {
      try {
        const { data } = await axios.get(`${baseBackendUrl}/api/v1/fir/${id}`);
        console.log(data)
        setFormData({
          Act1: data.fir.Act1 || '',
          Sections1: data.fir.Sections1 || '',
          NameOfSuspect: data.fir.NameOfSuspect || '',
          Address: data.fir.Address || '',
          ComplainantName: data.fir.ComplainantName || '',
          ComplainantFatherorHusbandName: data.fir.ComplainantFatherorHusbandName || '',
          ComplainantOccupation: data.fir.ComplainantOccupation || '',
          ComplainantAadharNo: data.fir.ComplainantAadharNo || '',
          ComplainantAddress:data.fir.ComplainantAddress || '',
        });
      } catch (error) {
        console.error('Failed to fetch FIR:', error);
      }
    };
    fetchFIR();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Act1') {
      setFormData({
        ...formData,
        Act1: value,
        Sections1: actSectionMap[value] || '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    // Aadhaar validation
    const aadhaarRegex = /^\d{12}$/;
    const newErrors = {};
  
    if (!aadhaarRegex.test(formData.ComplainantAadharNo)) {
      newErrors.ComplainantAadharNo = 'Aadhaar number must be exactly 12 digits.';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the validation errors.');
      return;
    }
  
    try {
      const { data } = await axios.put(`${baseBackendUrl}/api/v1/fir/${id}`, formData);
      toast.success(data?.message);
      navigate('/show-record');
    } catch (error) {
      toast.error('Failed to update FIR.');
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data }= await axios.delete(`${baseBackendUrl}/api/v1/fir/${id}`);
      toast.success(data?.message)
      navigate('/show-record');
    } catch (error) {
      toast.error('Failed to update FIR.');
    }
  };

  return (
    <div className="flex justify-center pt-20 pb-10 px-4 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#07074D]">Edit FIR</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Act dropdown */}
          <div>
            <label htmlFor="Act1" className="block text-sm font-medium text-[#07074D] mb-1">Act</label>
            <select
              id="Act1"
              name="Act1"
              value={formData.Act1}
              onChange={handleChange}
              className="w-full rounded-md border py-2.5 px-4 text-sm outline-none"
            >
              <option value="">Select Act</option>
              {Object.keys(actSectionMap).map((act, i) => (
                <option key={i} value={act}>{act}</option>
              ))}
            </select>
          </div>

          {/* Sections1 read-only */}
          <div>
            <label htmlFor="Sections1" className="block text-sm font-medium text-[#07074D] mb-1">Sections</label>
            <input
              type="text"
              id="Sections1"
              name="Sections1"
              value={formData.Sections1}
              readOnly
              className="w-full rounded-md border bg-gray-100 py-2.5 px-4 text-sm text-[#6B7280] outline-none"
            />
          </div>
          {[
            'NameOfSuspect',
            'Address',
            'ComplainantName',
            'ComplainantFatherorHusbandName',
            'ComplainantAadharNo',
            'ComplainantAddress',
          ].map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-[#07074D] mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={`w-full rounded-md border ${errors[key] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-2.5 px-4 text-sm text-[#6B7280] outline-none`}
              />
            </div>
          ))}

          {/* Occupation dropdown */}
          <div>
            <label htmlFor="ComplainantOccupation" className="block text-sm font-medium text-[#07074D] mb-1">Complainant Occupation</label>
            <select
              id="ComplainantOccupation"
              name="ComplainantOccupation"
              value={formData.ComplainantOccupation}
              onChange={handleChange}
              className="w-full rounded-md border py-2.5 px-4 text-sm outline-none"
            >
              <option value="">Select Occupation</option>
              {occupationOptions.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <div className="flex gap-1">
            <button
            onClick={handleUpdate}
              className="hover:shadow-form w-full rounded-md bg-[#196de3] py-2 px-3 text-sm font-semibold text-white"
            >
              Update FIR
            </button>
            <button
              onClick={handleDelete}
              className="hover:shadow-form w-full rounded-md bg-[#e45353] py-2 px-3 text-sm font-semibold text-white"
            >
              Delete FIR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditFIR;
