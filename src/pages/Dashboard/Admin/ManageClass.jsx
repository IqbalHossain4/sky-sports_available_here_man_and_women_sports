import React, { useState } from "react";
import DashHeader from "../Header/DashHeader";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ManageClass = () => {
  const classData = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const [storeStatus, setStoreStatus] = useState(null);
  const [denie, setDenie] = useState(false);
  const [text, setText] = useState("");
  const handleModal = (id, status) => {
    setShowModal(true);
    setStoreId(id);
    setStoreStatus(status);
  };

  const handleChangeStatus = (id) => {
    fetch(`https://assignment-12-server-gamma.vercel.app/topclass/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleStatusDanie = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, denied it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-12-server-gamma.vercel.app/topclass/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ status: "denied", feedBack: text }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Denaid!", "Your file has been denaied.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="font-serif bg-white">
      <DashHeader text="Manage Class"></DashHeader>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-black text-white">
            <tr>
              <th>#</th>
              <th>Image:</th>
              <th>Class name:</th>
              <th>Instructor name:</th>
              <th>Instructor Email:</th>
              <th>Available seats</th>
              <th>Price:</th>
              <th>Status:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {classData.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <th className="w-[100px] h-[90px]">
                  <img
                    className="rounded-full w-full h-full"
                    src={user.picture}
                    alt="Logo"
                  />
                </th>
                <td>{user.class_name ? user.class_name : user.sport_name}</td>
                <td>
                  {user.instructor_name
                    ? user.instructor_name
                    : "Not Available"}
                </td>
                <td>{user.email ? user.email : "Not Available"}</td>
                <td>
                  {user.available_seats
                    ? user.available_seats
                    : "Seat not Available"}
                </td>
                <td>
                  <button className="btn hover:bg-blue-500 w-[60px] bg-black text-white">
                    ${user.price ? user.price : "Free"}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn text-white w-[120px]  ${
                      user.status == "approved"
                        ? "btn btn-success"
                        : "btn-ghost bg-blue-500 w-[120px]"
                    }  ${user.status == "denied" ? "bg-red-500" : ""}`}
                  >
                    {user.status ? user.status : "Under review"}
                  </button>
                </td>
                <td>
                  <div className="flex items-center justify-center bg-white ">
                    <button
                      className="btn btn-ghost bg-yellow-500 w-[120px] text-white"
                      type="button"
                      onClick={() => handleModal(user._id, user.status)}
                    >
                      Change
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-md shadow-lg">
                <DashHeader text="Change Class Status"></DashHeader>
                <div className="flex items-center justify-evenly my-16">
                  <button
                    onClick={() => handleChangeStatus(storeId)}
                    className={`${
                      storeStatus == "approved"
                        ? "disabled py-[16px] w-[100px] text-white rounded-md bg-zinc-400"
                        : "block btn   btn-info"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setDenie(true);
                    }}
                    className={`${
                      storeStatus == "denied"
                        ? "disabled py-[16px] w-[100px] text-white rounded-md bg-zinc-400"
                        : "block btn   btn-info"
                    }`}
                  >
                    Denied
                  </button>
                </div>
                {denie && (
                  <div className="text-center w-full flex flex-col justify-center items-center">
                    <textarea
                      onChange={(e) => setText(e.target.value)}
                      placeholder="write Your Complain"
                      className="border  text-center rounded-md  h-[200px] w-[400px] "
                    ></textarea>
                    <button
                      onClick={() => handleStatusDanie(storeId)}
                      className="text-center hover:bg-blue-500 w-full btn bg-black text-white mt-4"
                    >
                      Submit
                    </button>
                  </div>
                )}

                <div className="mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ManageClass;
