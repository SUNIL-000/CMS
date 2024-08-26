// MissingPersonForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../assets/connect";

const EditMissingReport = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [mising, setMissing] = useState([]);
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
  });

  const getSingleMissingPerson = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/missing/single/${id}`
      );

      if (data?.success) {
        console.log(data);
        setImage(data?.missingPersons?.photo_url);
        setFormData({
          name: data?.missingPersons?.name || "",
          age: data?.missingPersons?.age || "",
          gender: data?.missingPersons?.gender || "male",
          city: data?.missingPersons?.city || "",
          missing_date:
            data?.missingPersons?.missing_date.substring(0, 10) || "",
          reported_by_name: data?.missingPersons?.reported_by_name || "",
          reported_by_contact: data?.missingPersons?.reported_by_contact || "",
          status: data?.missingPersons?.status || "missing",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleMissingPerson();
  }, []);

  const [phtPrev, setPhtPrev] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
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

    console.log(form);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/missing/${id}`,
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
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${baseBackendUrl}/api/v1/missing/${id}`
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
      console.log(error);
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
                backgroundImage: `url(/images/${image})`,
              }}
            />

            <div className="w-full lg:w-7/12 bg-white    p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-600 font-bold uppercase drop-shadow-md">
                Manage missing person
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white   rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0 w-1/3">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 "
                      htmlFor="firstName"
                    >
                      Full Name
                    </label>
                    <input
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
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
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
                <div className="mb-4 md:flex md:justify-around">
                  <div className="mb-4 md:mr-2 md:mb-0 w-auto">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="firstName"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="appearance-none block w-[105px] bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="city"
                      type="text"
                      placeholder="Enter City"
                    />
                  </div>
                  <div className="md:mr-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase "
                      htmlFor="lastName"
                    >
                      Missing Date
                    </label>
                    <input
                      name="missing_date"
                      value={formData.missing_date}
                      onChange={handleChange}
                      className="appearance-none block w-full  bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="missing_date"
                      type="date"
                    />
                  </div>{" "}
                  <div className="mb-4 md:mr-2 md:mb-0 w-full">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600 uppercase"
                      htmlFor="firstName"
                    >
                      Status
                    </label>
                    <select
                      className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
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
                      value={formData.reported_by_contact}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-600 uppercase border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="contact"
                      type="number"
                      placeholder="First Name"
                      name="reported_by_contact"
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
               

                <div className="mb-6 mt-4 text-center flex gap-4">
                  <button
                    className="w-2/4 px-4 py-2  bg-[#16A085] rounded-full hover:bg-[#16a0849c] text-white text-xl uppercase font-bold dark:bg-[#16A085]  dark:hover:bg-[#1b7966] focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="w-2/4 px-4 py-2  bg-[#B03A2E] rounded-full hover:bg-[#f17d70] text-white text-xl uppercase font-bold dark:bg-[#B03A2E]  dark:hover:bg-[#61150c] focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMissingReport;
