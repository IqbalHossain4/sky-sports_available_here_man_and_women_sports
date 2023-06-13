import React from "react";

const Instuctorr = ({ instruc }) => {
  const { _id, name, instructor, picture, students, email } = instruc;
  return (
    <div className="w-full rounded-md border-2 hover:scale-[1.1] p-4 transition-transform duration-350 delay-75 shadow-lg shadow-purple-500/50  hover:bg-transparent  bg-[#FFFFFF]">
      <div className=" h-[250px]">
        <img className="w-full h-full rounded-md" src={picture} alt="" />
      </div>
      <div className="mt-4">
        <div>
          <h1 className="my-3">
            <span className="font-semibold text-md mr-4">Name:</span> {name}
          </h1>
          <h1>
            <span className="font-semibold text-md mr-4">Email:</span> {email}
          </h1>

          <h1 className="my-3">
            <span className="font-semibold  text-md mr-4">Intructor:</span>{" "}
            {instructor}
          </h1>

          <h1>
            <span className="font-semibold  text-md mr-4">Students:</span>{" "}
            {students}
          </h1>
        </div>
        <div className="w-full mt-8 text-center  py-2 rounded overflow-hidden bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]  text-white transition duration-300 ease-in-out">
          <button className="w-full cursor-pointer font-bold text-2xl hover:translate-x-10 transition duration-300 ease-in-out text-white">
            See Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instuctorr;
