import React from "react";
import { Link } from "react-router-dom";
import { FaCity, FaLocationArrow, FaLocationPin } from "react-icons/fa6";

const CriminalCard = ({ data }) => {
  return (
    <>
      {data?.map((data, index) => {
        return (
          <Link
            to={`/edit-record/${data?._id}`}
            key={index}
            className="max-w-2xl w-full mx-4 sm:max-w-sm md:max-w-3xl lg:max-w-2xl xl:max-w-sm sm:ml-[20%] md:mx-auto lg:mx-auto xl:mx-auto mt-0 bg-white shadow-xl rounded-lg text-gray-900"
          >
            <div className="mx-auto w-32 h-32 relative shadow-xl -mt-10 border-4 border-white rounded-full overflow-hidden">
              <img
                className="object-cover object-center h-32 shadow-md"
                alt="Criminal"
                src="https://www.shutterstock.com/image-photo/criminal-wearing-black-balaclava-hoodie-600nw-1874960659.jpg"
              />
            </div>
            <div className="text-center mt-1">
              <p className="text-[#5D6D7E] font-bold">
                {data?.ComplainantAadharNo?.toString().substring(0, 4)}{" "}
                {data?.ComplainantAadharNo?.toString().substring(4, 8)}{" "}
                {data?.ComplainantAadharNo?.toString().substring(8)}
              </p>
            </div>
            <div className="py-1 px-2">
              <h5 className="block text-center text-[#22242c] capitalize px-1 rounded-md py-1 font-sans text-xl font-semibold">
                {data?.NameOfSuspect.toUpperCase()}
              </h5>

              <div className="flex flex-col justify-start items-start">
                <p className="text-[#343845] capitalize font-semibold text-md">
                  FIR No:{" "}
                  <span className="font-medium text-base text-[#5D6D7E]">
                    {data?.FIRno}
                  </span>
                </p>
                <p className="text-[#343845] capitalize font-semibold text-md">
                  Complainant Name:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.ComplainantName}
                  </span>
                </p>
                <p className="text-[#343845] capitalize font-semibold text-md">
                  Father/Husband Name:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.ComplainantFatherorHusbandName}
                  </span>
                </p>
                <p className="text-[#343845] capitalize font-semibold text-md">
                  DOB:{" "}
                  <span className="font-medium text-base text-[#5D6D7E]">
                    {new Date(data?.ComplainantDateOfBirth).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-[#343845] capitalize font-semibold text-md">
                  Occupation:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.ComplainantOccupation}
                  </span>
                </p>

                <p className="text-[#343845] capitalize font-semibold text-md">
                  Address:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.ComplainantAddress}
                  </span>
                </p>
                <p className="text-[#343845] capitalize font-semibold text-md">
                  Act:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.Act1}
                  </span>
                </p>
                <p className="text-[#343845] capitalize font-semibold text-md">
                  Section:{"        "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.Sections1}
                  </span>
                </p>
              </div>
            </div>

            <ul className="py-1 mt-0 text-gray-700 flex items-center justify-around">
              <li className="flex flex-col items-center justify-around text-black">
                <FaCity style={{ fontSize: "20px" }} />
                <div className="text-gray-500 font-bold capitalize">
                  {data?.District}
                </div>
              </li>
              <li className="flex flex-col items-center justify-between text-black">
                <FaLocationArrow style={{ fontSize: "20px" }} />
                <div className="text-gray-500 font-bold capitalize">
                  {data?.State}
                </div>
              </li>
              <li className="flex flex-col px-3 rounded-md items-center justify-around text-[#5D6D7E]">
                {data?.ComplainantNationality?.toLowerCase() === "indian" ? (
                  <img src="/india.png" height={30} width={30} alt="india" />
                ) : (
                  <FaLocationPin style={{ fontSize: "30px" }} />
                )}
                <div className="text-gray-500 font-bold capitalize">
                  {data?.ComplainantNationality}
                </div>
              </li>
            </ul>

            <div className="px-1 border-t mx-0 mt-0">
              <button className="w-full block mx-auto capitalize rounded-full bg-[#5d6d7eca] hover:shadow-lg font-semibold text-white px-6 py-2">
                {data?.OccurenceDay} |{" "}
                {new Date(data?.OccurenceDate).toLocaleDateString()} @ {data?.OccurenceTime}
              </button>
            </div>

            <div className="px-1 border-t mx-0 mt-1">
              <button className="w-full block mx-auto capitalize rounded-full bg-[#5D6D7E] hover:shadow-lg font-semibold text-white px-6 py-2">
                {data?.Sections1} - {data?.Act1?.substring(0, 20) + "..."}
              </button>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CriminalCard;
