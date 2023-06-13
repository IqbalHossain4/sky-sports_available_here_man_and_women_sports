import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import HeaderSection from "../../Component/Header/HeaderSection";
import Instuctorr from "./Instuctorr";

const Instructorss = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/instructors")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);
  return (
    <div>
      <div className="my-16 font-serif px-4 ">
        <HeaderSection text="Instuctors"></HeaderSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 py-8  gap-8 ">
          {instructors.map((instructor) => (
            <Instuctorr instruc={instructor} key={instructor._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructorss;
