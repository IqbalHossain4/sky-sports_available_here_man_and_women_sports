import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import HeaderSection from "../Header/HeaderSection";
import Class from "./Class";

const Classes = () => {
  const [topClass, setTopClass] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/topclass")
      .then((res) => res.json())
      .then((data) => setTopClass(data));
  }, []);
  console.log(topClass);
  return (
    <div className="my-16 bg-[#FF78C4] font-serif  px-4 ">
      <HeaderSection text="Our Special Class"></HeaderSection>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 py-8  gap-8 ">
        {topClass.slice(0, 6).map((singlclass) => (
          <Class Topclasses={singlclass} key={singlclass._id} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
