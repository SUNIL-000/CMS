import React from "react";
import { Link } from "react-router-dom";
import { FaCity, FaLocationArrow, FaLocationPin } from "react-icons/fa6";
// act: 100;
// adhaar: 5222;
// age: 11;
// bailstatus: "yes";
// caseno: "201";
// city: "cuttack";
// gender: "male";
// jailterm: 2;
// name: "sunil kumar";
// nationality: "indian";
// offence: "murder";
// state: "odisha";
const CriminalCard = ({ data }) => {
  return (
    <>
      {data?.map((value, index) => {
        return (
          <Link
            to={`/edit-record/${value?._id}`}
            key={index}
            className="max-w-xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-0 bg-white shadow-xl rounded-lg text-gray-900"
          >
            <div className="rounded-t-lg h-28 overflow-hidden">
              <img
                className="object-cover object-top w-full"
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Mountain"
              />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-20 border-4 border-white rounded-full overflow-hidden">
              <img
                className="object-cover object-center h-32"
                src="https://img.freepik.com/free-vector/law-legal-justice-graphic_24877-52555.jpg?t=st=1714641225~exp=1714644825~hmac=8c4afc21c56eddc40a4f36b06ef71715a62011d02e2f5018e0e316277628ee00&w=740"
                alt="Woman looking front"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="font-bold text-xl rounded-full py-1 mx-2 capitalize bg-[#F2F4F4] text-gray-600">
                {value?.name}
              </h2>
              <p className="text-purple-600   font-bold ">
                {value?.adhaar?.toString().substring(0, 4)}{" "}
                {value?.adhaar?.toString().substring(4, 8)}{" "}
                {value?.adhaar?.toString().substring(8)}
              </p>

              <div className="flex justify-center items-start gap-4 px-24 ">
                <p className="text-purple-600 shadow-sm px-2 rounded-md font-bold">
                  <span className="text-md font-bold text-black uppercase">
                    Act{" "}
                  </span>
                  <span className="text-[10px]">{value?.panelcode}</span>
                </p>{" "}
                <p className="text-purple-600 shadow-sm px-2 rounded-md font-bold">
                  <span className="text-md font-bold text-black uppercase">
                    age{" "}
                  </span>
                  {value?.age}
                </p>{" "}
                <p className="text-purple-600  shadow-sm px-2 rounded-md font-bold  ">
                  <span className="text-md font-bold text-black uppercase">
                    caseno{" "}
                  </span>
                  {value?.caseno}
                </p>{" "}
                <p className="text-purple-600 shadow-sm px-2 rounded-md font-bold">
                  <span className="text-md font-bold text-black uppercase">
                    jailterm{" "}
                  </span>
                  {value?.jailterm} Years
                </p>
              </div>
            </div>
            <ul className="py-4 mt-4 text-gray-700 flex items-center justify-around">
              <li className="flex flex-col  items-center  justify-around text-purple-600">
                <FaCity style={{ fontSize: "20px" }} />
                <div className="text-gray-500 font-bold capitalize">
                  {value?.city}
                </div>
              </li>
              <li className="flex flex-col   items-center justify-between text-purple-600">
                <FaLocationArrow style={{ fontSize: "20px" }} />
                <div className="text-gray-500 font-bold capitalize">
                  {value?.state}
                </div>
              </li>
              <li className="flex flex-col  px-3 rounded-md items-center justify-around text-purple-600">
                {value?.nationality == "indian" ? (
                  <img src="/india.png" height={30} width={30} alt="images" />
                ) : (
                  <FaLocationPin style={{ fontSize: "30px" }} />
                )}
                <div className="text-gray-500 font-bold capitalize">
                  {value?.nationality}
                </div>
              </li>
            </ul>
            <div className="p-4 border-t mx-8 mt-2">
              <button className="w-auto block mx-auto capitalize rounded-full bg-purple-600 hover:shadow-lg font-semibold text-white px-6 py-2">
                #{value?.offence.substring(0,20)}...
              </button>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CriminalCard;
