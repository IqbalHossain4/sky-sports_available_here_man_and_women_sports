import React from "react";

const Instructor = ({ allInstructor }) => {
  const { _id, instructor, name, students, picture } = allInstructor;
  return (
    <div className="w-full rounded-md transition-all hover:border-15 hover:border-white hover:scale-[1.1] p-4 transition-transform duration-350 delay-75 shadow-lg shadow-pink-500/50  hover:bg-transparent  bg-[#FFFFFF]">
      <div className=" h-[300px]">
        <img className="w-full h-full rounded-md" src={picture} alt="" />
      </div>
      <div className="mt-4">
        <h1 className="my-3">
          <span className="font-semibold text-md mr-4">Name:</span> {name}
        </h1>
        <h1>
          <span className="font-semibold text-md mr-4">Intructor:</span>{" "}
          {instructor}
        </h1>

        <h1 className="my-3">
          <span className="font-semibold my-4 text-md mr-4">Students:</span>{" "}
          {students}
        </h1>
      </div>
    </div>
  );
};

export default Instructor;
