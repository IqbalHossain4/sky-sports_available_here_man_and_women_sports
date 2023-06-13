import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCourse from "../../Hook/useCourse";
import { useState } from "react";

const AllClass = ({ allclass }) => {
  const {
    _id,
    class_name,
    sport_name,
    student_number,
    picture,
    instructor_name,
    available_seats,
    price,
  } = allclass;
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCourse();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelecct = (item) => {
    if (user) {
      const classItem = {
        classId: _id,
        class_name,
        sport_name,
        picture,
        price: parseFloat(price),
        email: user.email,
      };
      fetch("http://localhost:5000/selectCourse", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You Select a Sports",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }

    if (!user) {
      Swal.fire({
        title: "Please Login First",
        text: "After Select The Course",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="w-full rounded-md border-2 hover:scale-[1.1] p-4 transition-transform duration-350 delay-75 shadow-lg shadow-purple-500/50  hover:bg-transparent border-15 border-white  bg-[#FFFFFF]">
      <div className=" h-[250px] w-full">
        <img className="w-full h-full rounded-md" src={picture} alt="" />
      </div>
      <div className="mt-4">
        <div>
          <h1 className="my-3">
            <span className="font-semibold text-md ">Name:</span>{" "}
            {class_name ? class_name : sport_name}
          </h1>
          <h1>
            <span className="font-semibold text-md ">Price: $</span>{" "}
            {price ? price : 20}
          </h1>

          <h1 className="my-3">
            <span className="font-semibold  text-md">Intructor:</span>{" "}
            {instructor_name ? instructor_name : "Jhon Due"}
          </h1>

          <h1>
            <span className="font-semibold  text-md">Available Seats:</span>{" "}
            {available_seats ? available_seats : 0}
          </h1>
        </div>
        <div
          className={
            available_seats !== 0
              ? "w-full mt-8 text-center  py-2 rounded overflow-hidden bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]  text-white transition duration-300 ease-in-out"
              : "w-full mt-8 text-center  py-2 rounded overflow-hidden bg-red-600"
          }
        >
          <button
            onClick={() => handleSelecct()}
            className="w-full cursor-pointer font-bold text-2xl hover:translate-x-10 transition duration-300 ease-in-out text-white transition duration-300 ease-in-out"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllClass;
