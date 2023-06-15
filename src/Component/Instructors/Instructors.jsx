import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import HeaderSection from "../Header/HeaderSection";
import Instructor from "./Instructor";

const Instructors = () => {
  const [instructor, setInstructor] = useState([]);
  useEffect(() => {
    fetch("https://assignment-12-server-gamma.vercel.app/instructors")
      .then((res) => res.json())
      .then((data) => setInstructor(data));
  }, []);
  return (
    <div className="my-16  font-serif  px-4 ">
      <HeaderSection text="Popular Instructor"></HeaderSection>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 py-8  gap-8 ">
        {instructor.slice(0, 6).map((singlInstructor) => (
          <Instructor
            allInstructor={singlInstructor}
            key={singlInstructor._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
