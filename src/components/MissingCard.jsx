import React from "react";
import { Link } from "react-router-dom";

const MissingCard = ({ data }) => {
  return (
    <>
      {data?.map((data, index) => {
        return (
          <Link to={`/single-missing-report/${data?._id}`} key={index} className="relative col-span-1 mx-auto  flex w-80 ml-1 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md max-w-2xl md:mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto  lg:mx-auto xl:mx-auto mt-0">
            <div className="relative w-1/2  mx-auto -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white  ">
              <img src={`/images/${data?.photo_url}`} alt="" />
            </div>
            <div className="py-3 px-6">
              <h5 className="mb-2 block text-center bg-gray-200 px-2 rounded-md py-2 capitalize  font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {data?.name}
              </h5>
              <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                Age:   <span className="font-medium text-base text-[#5D6D7E] capitalize">{data?.age}</span>
              </p>
              <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                Gender:{"  "}
                <span className="font-medium text-base text-[#5D6D7E] capitalize">{data?.gender}</span>
              </p>
              <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                REported by:{"  "}
                <span className="font-medium text-base text-[#5D6D7E] capitalize">
                  {data?.reported_by_name}
                </span>
              </p>{" "}
              <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                Contact:{"   "}
                <span className="font-medium text-base text-[#5D6D7E] capitalize">
                  {data?.reported_by_contact}
                </span>
              </p>
              <p className="block text-[#34495E] font-sans uppercase font-semibold text-md leading-relaxed text-inherit antialiased">
                Missing date:{" "}
                <span className="font-medium text-base text-[#5D6D7E] capitalize">
                  {data?.missing_date.substring(0,10)}
                </span>
              </p>
              <p className=" flex text-[#34495E] justify-start items-center font-sans uppercase font-semibold text-base   leading-relaxed text-inherit antialiased">
                Location: {" "}
                <span className="font-medium text-base text-[#5D6D7E] uppercase">{data?.city}</span>
              </p>
            </div>
            <div className="p-6 pt-0 mx-auto">
              <button
                data-ripple-light="true"
                type="button"
                className={`select-none rounded-lg ${data?.status ==="missing"? "bg-red-500": data?.status ==="found" ?"bg-green-500":"bg-black"} py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              >
                {data?.status}
              </button>
            </div>
          </Link >
        );
      })}
    </>
  );
};

export default MissingCard;
