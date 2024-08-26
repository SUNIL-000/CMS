import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { baseBackendUrl } from "../assets/connect";
const AdminCard = ({ data }) => {
  const [del, setDel] = useState(false);
  const handleAdmin = async (id) => {
    try {
      const { data } = await axios.put(
        `${baseBackendUrl}/api/v1/user/${id}`
      );

      if (data?.success) {
        console.log(data?.message);
        toast.success(data?.message);
        setDel(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAdmin = async (id) => {
    try {
      const { data } = await axios.delete(
        `${baseBackendUrl}/api/v1/user/${id}`
      );
      console.log(data);
      if (data?.success) {
        console.log(data?.message);
        toast.success(data?.message);
        setDel(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [del]);
  return (
    <>
      {/* <button
        // deleteAdmin(user?._id)
        onClick={() => toast.success("Already Admin")}
        className=" bg-white  rounded-full text-orange-500 text-2xl font-bold px-2 py-2 leading-none flex items-center"
      >
        <MdDelete onClick={() => toast.success("Already Admin")} />
      </button> */}
      {data?.map((user, index) => {
        return (
          <div
            key={index}
            className="p-0 flex flex-wrap mx-auto items-center justify-center cursor-pointer"
          >
            <div className="flex-shrink-0 m-2 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg group">
              <svg
                className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
                viewBox="0 0 375 283"
                fill="none"
                style={{ opacity: "0.1" }}
              >
                <rect
                  x="159.52"
                  y={175}
                  width={152}
                  height={152}
                  rx={8}
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width={152}
                  height={152}
                  rx={8}
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
                <img
                  className="relative w-40"
                  src={
                    user?.role == "admin" ? "/policeman.png" : "/police2.png"
                  }
                  alt="image"
                />
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <span className="block opacity-75 text-lg -mb-1 capitalize">
                  {user?.name}
                </span>
                <div className="flex justify-between">
                  <span className="block font-semibold text-sm">
                    {user?.userid}
                  </span>

                  {user?.role == "user" ? (
                    <button
                      onClick={() => handleAdmin(user?._id)}
                      className=" bg-white absolute right-1 rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <>
                      <div className="flex justify-between items-center absolute right-1 gap-1">
                        {" "}
                        <button
                          onClick={() => toast.error("Already Admin")}
                          className=" bg-white rounded-full  text-green-500 text-xl font-bold px-2 py-2 leading-none flex items-end"
                        >
                          <IoShieldCheckmark />
                        </button>
                        <button
                          // deleteAdmin(user?._id)
                          onClick={() => {
                            deleteAdmin(user?._id);
                          }}
                          className=" bg-white rounded-full text-orange-500 text-xl font-bold px-2 py-2 leading-none flex items-center"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AdminCard;
