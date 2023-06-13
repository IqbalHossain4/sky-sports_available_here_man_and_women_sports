import React from "react";

const HeaderSection = ({ text }) => {
  return (
    <div>
      <h1 className="text-center pt-8 font-extrabold  text-3xl text-white">
        {text}
      </h1>
      <hr className="w-full mt-2 mb-8 h-[5px] bg-black" />
    </div>
  );
};

export default HeaderSection;
