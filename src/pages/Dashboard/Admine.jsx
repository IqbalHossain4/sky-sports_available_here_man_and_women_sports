import React, { useContext } from "react";
import DashHeader from "./Header/DashHeader";
import { AuthContext } from "../../Context/AuthProvider";

const Admine = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="font-serif bg-white">
      <DashHeader text="WelCome to Admin"></DashHeader>
      <div className="md:flex md:items-center md:justify-between w-full">
        <img
          src={
            "https://img.freepik.com/premium-vector/isometric-laptop-analysis-information-connect-with-server-futuristic-concept-illustration_35136-278.jpg"
          }
          alt=""
        />
        <div className="mx-auto text-center mt-8">
          <div>
            <img className="rounded-full mx-auto" src={user.photoURL} alt="" />
          </div>
          {/* text */}
          <div className="text-start font-serif mt-8">
            <h1 className="font-bold"> Name: {user.displayName}</h1>
            <h3 className="font-semibold">Email: {user.email}</h3>
          </div>
        </div>
      </div>
      <button className=" btn text-white w-full mt-8 hover:bg-black bg-blue-500 transition-all">
        View More
      </button>
    </div>
  );
};

export default Admine;
