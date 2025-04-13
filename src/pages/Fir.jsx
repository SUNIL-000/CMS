import React, { useState } from 'react';

const Fir = () => {
  const initialState = {
    State: '',
    District: '',
    PoliceStation: '',
    FIRno: '',
    Date: '',
    Act1: '',
    Sections1: '',
    Act2: '',
    Sections2: '',
    NameOfSuspect: '',
    OccurenceDay: '',
    OccurenceDate: '',
    OccurenceTime: '',
    InformatioReceivedDate: '',
    InformatioReceivedTime: '',
    DiaryReferenceEntryNo: '',
    DiaryReferenceTime: '',
    Written: '',
    Oral: '',
    DirectionAndDistncefromPS: '',
    Address: '',
    ComplainantName: '',
    ComplainantFatherorHusbandName: '',
    ComplainantDateOfBirth: '',
    ComplainantNationality: '',
    ComplainantOccupation: '',
    ComplainantAadharNo: '',
    ComplainantAddress: '',
    DetailsOfSuspected: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });

    // Aadhar number specific validation
    if (
      formData.ComplainantAadharNo &&
      !/^\d{12}$/.test(formData.ComplainantAadharNo)
    ) {
      newErrors.ComplainantAadharNo = 'Aadhar must be 12 digits';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(formData);
    // ✅ Submit form data to server here
    alert('FIR Submitted Successfully');
    setFormData(initialState); // Reset form
  };

  return (
    <form className="space-y-4 p-4" onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="mb-2 font-bold text-gray-700" htmlFor={key}>
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className={`px-4 py-2 border ${
              errors[key] ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors[key] && (
            <span className="text-red-500 text-sm mt-1">{errors[key]}</span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Fir;
