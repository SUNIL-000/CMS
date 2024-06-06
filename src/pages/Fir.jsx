import React, { useState } from 'react';

const Fir = () => {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit form data to the server or handle it as needed
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
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
