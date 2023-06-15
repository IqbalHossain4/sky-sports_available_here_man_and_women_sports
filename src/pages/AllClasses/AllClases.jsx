import React, { useEffect, useState } from "react";
import { useContext } from "react";
import HeaderSection from "../../Component/Header/HeaderSection";
import { AuthContext } from "../../Context/AuthProvider";
import AllClass from "./AllClass";

const AllClases = () => {
  const [allclass, setAllclass] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("https://assignment-12-server-gamma.vercel.app/topclass")
      .then((res) => res.json())
      .then((data) => setAllclass(data));
  }, []);

  return (
    <div>
      <div className="my-16 px-4 font-serif bg-[#3FFECEC]">
        <HeaderSection text="Our Sports Course"></HeaderSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 py-8  gap-8 ">
          {allclass.map((allclass) => (
            <AllClass allclass={allclass} key={allclass._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClases;
