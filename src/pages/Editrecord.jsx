import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Criminaldata } from "../components/section";

const Editrecord = ({ params }) => {
  const { id } = useParams();
  const navigate =useNavigate();
  const [name, setName] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [panelcode, setPanelcode] = useState("");
  const [offence, setOffence] = useState("");
  const [caseno, setCaseno] = useState("");
  const [bailstatus, setBailstatus] = useState("");
  const [jailterm, setJailterm] = useState("");
  // toast.success("hii")
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/fir/${id}`,
        {
          name,
          adhaar,
          gender,
          age,
          panelcode,
          state,
          city,
          nationality,
          offence,
          caseno,
          bailstatus,
          jailterm,
        }
      );
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        navigate("/show-record")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/fir/${id}`
      );
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        navigate("/show-record")

      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleRecord = async () => {
    // e.preventDefaut();
    try {
      const { data } = await axios.get(
        `${baseBackendUrl}/api/v1/fir/${id}`
      );
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        setName(data?.singlefir?.name);
        setAdhaar(data?.singlefir?.adhaar);
        setGender(data?.singlefir?.gender);
        setAge(data?.singlefir?.age);
        setPanelcode(data?.singlefir?.panelcode);
        setState(data?.singlefir?.state);
        setCity(data?.singlefir?.city);
        setNationality(data?.singlefir?.nationality);
        setOffence(data?.singlefir?.offence);
        setCaseno(data?.singlefir?.caseno);
        setBailstatus(data?.singlefir?.bailstatus);
        setJailterm(data?.singlefir?.jailterm);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleRecord();
  }, []);
  return (
    <div className="w-full h-full border-1 rounded-md shadow-lg  px-4 max-w-lg mx-auto my-24 py-2">
      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full  px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-adhaar"
            type="text"
            placeholder="Enter your name"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-adhaar"
          >
            Adhaar
          </label>
          <input
            value={adhaar}
            onChange={(e) => setAdhaar(e.target.value)}
            //  onChange={(e)=>e.target.value}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-adhaar"
            type="number"
            placeholder="Enter your adhaar"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-adhaar"
          >
            Case No
          </label>
          <input
            value={caseno}
            onChange={(e) => setCaseno(e.target.value)}
            //  onChange={(e)=>e.target.value}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-adhaar"
            type="number"
            placeholder="Enter case no"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="City"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value={""} disabled>
                Select
              </option>

              <option value={"odisha"}>Odisha</option>
              <option value={"bihar"}>Bihar</option>
              <option value={"tamilnadu"}>Tamilnadu</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Age
          </label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="number"
            placeholder={"00"}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-gender"
          >
            Nationality
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-gender"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value={""} defaultValue={"indian"}>
                select
              </option>
              <option value={"indian"}>indian</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-gender"
          >
            Gender
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>select</option>
              <option>male</option>
              <option>female</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            panel code
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              required
              value={panelcode}
              onChange={(e) => setPanelcode(e.target.value)}
            >
              <option value={""} disabled>
                Select
              </option>

              {Criminaldata?.map((crime, index) => {
                return (
                  <option
                    key={index}
                    className="capitalize"
                    value={crime?.section}
                  >
                    {crime?.section}---{crime?.offence}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-gender"
          >
            Offence
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-gender"
              value={offence}
              onChange={(e) => setOffence(e.target.value)}
              required={true}
            >
              <option value={""} disabled>
                select
              </option>
              {Criminaldata?.map((crime, index) => {
                return (
                  <option key={index} value={crime?.offence}>
                    {crime?.offence}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-gender"
          >
            Jail Term
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-gender"
              value={jailterm}
              onChange={(e) => setJailterm(e.target.value)}
            >
              <option value={""} disabled>
                select
              </option>
              <option value={"1"}>1 Year</option>
              <option value={"2"}>2 Year</option>
              <option value={"3"}>3 Year</option>
              <option value={"4"}>4 Year</option>
              <option value={"5"}>5 Year</option>
              <option value={"6"}>6 Year</option>
              <option value={"7"}>7 Year</option>
              <option value={"8"}>8 Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-gender"
          >
            Bail Status
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-gender"
              required
              value={bailstatus}
              onChange={(e) => setBailstatus(e.target.value)}
            >
              <option value={""}>select</option>
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
      
        <div className="flex flex-wrap mx-auto mb-2 gap-4 mt-5">
          <button
            type="submit"
            onClick={handleUpdate}
            className="bg-[#1ABC9C] hover:bg-[#21826e] uppercase drop-shadow-md  text-white font-bold py-2 px-4 rounded-full"
          >
            Update
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className=" bg-[#C0392B] hover:bg-[#691f17] uppercase drop-shadow-md  text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
    </div>
  );
};

export default Editrecord;
