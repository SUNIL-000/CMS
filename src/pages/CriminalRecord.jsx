import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Criminaldata, statesAndUTs } from "../components/section";
import { useNavigate } from "react-router-dom";

const CriminalRecord = () => {
  const navigate= useNavigate()
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/fir/new`,
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
        navigate("/show-record");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-full h-full border-1 rounded-md shadow-lg  px-4 max-w-lg mx-auto my-24 py-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap -mx-3 mb-1 ">
        <div className="w-full  px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold "
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
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
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
            htmlFor="grid-adhaar"
          >
            Adhaar
          </label>
          <input
            value={adhaar}
            onChange={(e) => setAdhaar(e.target.value)}
            minLength={12}
            required={true}
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
            required={true}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-adhaar"
            type="number"
            placeholder="Enter case no"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-1">
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
            required={true}
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

              {statesAndUTs?.map((state, index) => {
                return (
                  <option key={index} value={state?.name}>
                    {state?.name}
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
            htmlFor="grid-zip"
          >
            Age
          </label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required={true}
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
              required={true}
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
              required={true}
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

        <div className="flex flex-wrap mx-auto mb-2 mt-5">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
      {/* { JSON.stringify(name + state+panelcode+ adhaar + caseno + jailterm +nationality +city+ bailstatus +gender +offence +age)}  */}
    </form>
  );
};

export default CriminalRecord;
