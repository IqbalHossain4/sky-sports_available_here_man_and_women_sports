import React from "react";

const Class = ({ Topclasses }) => {
  const { _id, class_name, student_number, picture } = Topclasses;
  return (
    <div className="w-full rounded-md border-25 border-white hover:scale-[1.1] p-4 transition-transform duration-350 delay-75 shadow-lg shadow-indigo-500/50  hover:bg-transparent  bg-[#FFFFFF]">
      <div className=" h-[300px]">
        <img className="w-full h-full rounded-md" src={picture} alt="" />
      </div>
      <div className="mt-4">
        <h1 className="my-3">
          <span className="font-semibold text-md mr-4">ClassName:</span>
          {class_name}
        </h1>
        <h1>
          <span className="font-semibold my-4 text-md mr-4">Students:</span>
          {student_number}
        </h1>
      </div>
    </div>
  );
};

export default Class;
