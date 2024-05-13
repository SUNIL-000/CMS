// MissingPersonForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MissingPersonForm = () => {
  const navigate=useNavigate()
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
  const [phtPrev, setPhtPrev] = useState("");
  //   const reader = new FileReader();
  //   if (formData?.photo_url) {
  //     reader.readAsDataURL(formData?.photo_url),
  //       (reader.onloadend = () => {
  //         if (typeof reader.result === "string") setPhtPrev(reader?.result);
  //       });
  //   }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo_url: e.target.files[0] });
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setPhtPrev(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      age,
      gender,
      city,
      missing_date,
      reported_by_name,
      reported_by_contact,
      status,
      photo_url,
    } = formData;

    let form = new FormData();
    form.append("name", name);
    form.append("age", age);
    form.append("gender", gender);
    form.append("city", city);
    form.append("missing_date", missing_date);
    form.append("reported_by_name", reported_by_name);
    form.append("reported_by_contact", reported_by_contact);
    form.append("status", status);
    photo_url && form.append("photo_url", photo_url);

    console.log(form);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/missing/new",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.success) {
        console.log(data);
        toast.success(data?.message)
        navigate('/all-missing-report')

      }
      else{
        toast.error(data?.message)

      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report. Please try again.");
    }
  };

  return (
    <div className="h-full bg-gray-400 ">
      <div className="mx-auto ">
        <div className="flex justify-center px-6 py-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex mt-14">
            {/* Col */}
            <div
              className="w-full h-full bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                // backgroundSize: " cona",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "full",
                backgroundImage: `url(${phtPrev})`,
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white    p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-600 font-bold uppercase drop-shadow-md">
                Register missing person
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white   rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0 w-1/3">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 "
                      htmlFor="firstName"
                    >
                      Full Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      name="name"
                    />
                  </div>
                  <div className="md:ml-2 w-1/3">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="lastName"
                    >
                      Age
                    </label>
                    <input
                      required
                      value={formData.age}
                      onChange={handleChange}
                      name="age"
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="age"
                      type="number"
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="md:ml-2 w-1/3">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="lastName"
                    >
                      Gender
                    </label>
                    <select
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      
                    >
                      <option value="male" className="w-full">
                        Male
                      </option>
                      <option value="female" className="w-full">
                        Female
                      </option>
                      <option value="other" className="w-full">
                        Other
                      </option>
                    </select>
                  </div>
                </div>
                {/* ///////city,reported by, missing date///// */}
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="firstName"
                    >
                      City
                    </label>
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="city"
                      type="text"
                      placeholder="Enter City"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="lastName"
                    >
                      Missing Date
                    </label>
                    <input
                      required
                      name="missing_date"
                      value={formData.missing_date}
                      onChange={handleChange}
                      className="appearance-none block w-full  bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="missing_date"
                      type="date"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="lastName"
                    >
                      Reported By
                    </label>
                    <input
                      required
                      name="reported_by_name"
                      value={formData.reported_by_name}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="reported_by"
                      type="text"
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                {/* ///////status,photo_url///// */}
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="firstName"
                    >
                      Contact
                    </label>
                    <input
                      required
                      value={formData.reported_by_contact}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="contact"
                      type="number"
                      placeholder="First Name"
                      name="reported_by_contact"
                    />
                  </div>

                  <div className="md:ml-2 md:mr-2 p-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="lastName"
                    >
                      Photo
                    </label>
                    <input
                      required
                      onChange={handleFileChange}
                      name="photo_url"
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="reported_by"
                      type="file"
                      placeholder="Enter photo_url"
                    />
                  </div>

                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase"
                      htmlFor="firstName"
                    >
                      Status
                    </label>
                    <select
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      
                    >
                      <option value="missing" className="w-full">
                        Missing
                      </option>
                      <option value="found" className="w-full">
                        Found
                      </option>
                      <option value="resolved" className="w-full">
                        Resolved
                      </option>
                    </select>
                  </div>
                </div>
                {phtPrev && (
                  <img
                    src={phtPrev}
                    alt="newaimge"
                    className="w-20 h-20 text-center mx-auto"
                  />
                )}

                <div className="mb-6 mt-4 text-center">
                  <button
                    className="w-1/4 px-4 py-2 font- bg-[#16A085] rounded-full hover:bg-[#16a0849c] text-white text-xl uppercase font-bold dark:bg-[#16A085]  dark:hover:bg-[#51c2ac] focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                {/* {JSON.stringify(
                  formData.name +
                    formData.age +
                    formData.gender +
                    formData.city +
                    formData.missing_date +
                    formData.reported_by_name +
                    formData.reported_by_contact +
                    formData.status +
                    formData.photo_url
                )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPersonForm;
