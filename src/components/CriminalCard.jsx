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
            className="max-w-2xl w-80 mx-4 sm:max-w-sm md:max-w-3xl lg:max-w-2xl xl:max-w-sm sm:ml-[20%] md:mx-auto lg:mx-auto xl:mx-auto mt-0 bg-white shadow-xl rounded-lg text-gray-900"
          >
          
            <div className="mx-auto w-32 h-32 relative shadow-xl -mt-10 border-4 border-white rounded-full overflow-hidden">
              <img
                className="object-cover object-center h-32 shadow-md"
                src="https://img.freepik.com/free-vector/law-legal-justice-graphic_24877-52555.jpg?t=st=1714641225~exp=1714644825~hmac=8c4afc21c56eddc40a4f36b06ef71715a62011d02e2f5018e0e316277628ee00&w=740"
                alt="Woman looking front"
              />
            </div>
            <div className="text-center mt-2">
            
              <p className="text-[#5D6D7E]   font-bold ">
                {data?.adhaar?.toString().substring(0, 4)}{" "}
                {data?.adhaar?.toString().substring(4, 8)}{" "}
                {data?.adhaar?.toString().substring(8)}
              </p>

              <div className="py-3 px-6 ">
                <h5 className="mb-2 block text-center bg-gray-200 px-2 rounded-md py-2 capitalize  font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {data?.name}
                </h5>
                <div className="flex flex-col justify-start items-start">

                <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                  panelcode:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.panelcode}
                  </span>
                </p>
                <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                  age:{"  "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.age}
                  </span>
                </p>
                <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                gender:{"  "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.gender}
                  </span>
                </p>{" "}
                <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                caseno:{"   "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.caseno}
                  </span>
                </p>
                <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                jailterm:{" "}
                  <span className="font-medium text-base text-[#5D6D7E] capitalize">
                    {data?.jailterm} Year
                  </span>
                </p>
                </div>
                
               
              </div>
            </div>
            <ul className="py-1 mt-0 text-gray-700 flex items-center justify-around">
              <li className="flex flex-col  items-center  justify-around text-black">
                <FaCity style={{ fontSize: "20px" }} />
                <div className="text-gray-500 font-bold capitalize">
                  {data?.city}
                </div>
              </li>
              <li className="flex flex-col   items-center justify-between text-black">
                <FaLocationArrow style={{ fontSize: "20px" }} />
                <div className="text-gray-500 font-bold capitalize">
                  {data?.state}
                </div>
              </li>
              <li className="flex flex-col  px-3 rounded-md items-center justify-around text-[#5D6D7E]">
                {data?.nationality == "indian" ? (
                  <img src="/india.png" height={30} width={30} alt="images" />
                ) : (
                  <FaLocationPin style={{ fontSize: "30px" }} />
                )}
                <div className="text-gray-500 font-bold capitalize">
                  {data?.nationality}
                </div>
              </li>
            </ul>
            <div className="p-4 border-t mx-0 mt-2">
              <button className="w-full block mx-auto capitalize rounded-full bg-[#5D6D7E] hover:shadow-lg font-semibold text-white px-6 py-2">
                #{data?.offence.substring(0, 20)}...
              </button>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CriminalCard;
