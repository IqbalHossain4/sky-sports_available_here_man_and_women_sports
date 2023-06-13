import React from "react";

const DashHeader = ({ text }) => {
  return (
    <div>
      <h1 className="text-center pt-8 font-extrabold  text-3xl  font-serif text-blue-500 mt-16">
        {text}
      </h1>
      <hr className="w-full mt-2 mb-8 h-[5px] bg-black" />
    </div>
  );
};

export default DashHeader;
