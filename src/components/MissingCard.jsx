import React from "react";
import { Link } from "react-router-dom";

const MissingCard = ({ data }) => {
  return (
    <>
      {data?.map((data, index) => {
        return (
          <Link to={`/single-missing-report/${data?._id}`} key={index}

            className="mx-0">

            {/* 

            

            {/* //new card   */}
            <div className={`max-w-md mx-auto ${data.status === "missing" ? "bg-[#d6eaf8]" : data.status === "found" ? "bg-[#f6c79878]" : "bg-[#a4f68f71]"} rounded-xl shadow-md overflow-hidden md:max-w-2xl`}>
              <div className="md:flex items-center ">
                <div className="md:shrink-0">
                  <img className="h-36  w-40 object-contain rounded-xl" src={`${data.photo_url}`} alt="User profile picture" />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-bold font-bold text-black">{data.name}</div>
                  <p className="mt-1 font-semibold text-[#5D6D7E]  capitalize"><span className="text-black capitalize text-sm font-bold ">Age:- </span>{data.age}</p>
                  <p className="mt-1 font-semibold text-[#5D6D7E]  capitalize"><span className="text-black capitalize text-sm font-bold ">Gender:-</span>{data.gender}</p>
                  <p className="mt-1 font-semibold text-[#5D6D7E]  capitalize"><span className="text-black capitalize text-sm font-bold ">City:-</span>{data.city}</p>
                  <p className="mt-1 font-semibold text-[#5D6D7E]  capitalize"><span className="text-black capitalize text-sm font-bold ">Missing Date:-</span>{new Date(data.missing_date).toLocaleDateString()}</p>
                  <p className="mt-1 font-semibold text-[#5D6D7E]  capitalize"><span className="text-black capitalize text-sm font-bold ">Reported By:-</span>{data.reported_by_name}</p>
                  <p className="mt-1 font-semibold text-[#5D6D7E]  capitalize"><span className="text-black capitalize text-sm font-bold ">To Be Contact:-</span>{data.reported_by_contact}</p>
                  <div className="mt-4">
                    <span className={`font-bold capitalize bg-white p-2 rounded-[10px] shadow-xl ${data.status === "missing" ? "text-red-600" : data.status === "found" ? "text-orange-500" : "text-green-600"}`}>#{data.status}</span>
                    {/* <span className="text-slate-600 text-sm ml-2">CEO, TechInnovate</span> */}
                  </div>
                </div>
              </div>
            </div>


          </Link >
        );
      })}
    </>
  );
};

export default MissingCard;
