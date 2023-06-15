import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import DashHeader from "../Header/DashHeader";
import { NavLink } from "react-router-dom";

const Myclass = () => {
  const { user } = useContext(AuthContext);
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    fetch(
      `https://assignment-12-server-gamma.vercel.app/topclass/email?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyClasses(data));
  }, []);

  return (
    <div className="bg-white">
      <DashHeader text="My Class"></DashHeader>
      <table className="table mt-16 table-zebra w-full">
        {/* head */}
        <thead>
          <tr className="font-semibold text-white bg-black text-lg">
            <th>#</th>
            <th>Name</th>
            <th>Total Enrolled</th>
            <th>Feedback</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {myClasses.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.class_name ? user.class_name : user.sport_name}</td>
              <td>{0}</td>
              <td>{user.feedBack ? user.feedBack : "No Feedback"}</td>
              <td>{user?.status === "approved" ? "approved" : "pending"}</td>
              <td>
                <NavLink to={`/dashboard/updateClass/${user._id}`}>
                  <button className="btn bg-blue-500 text-white">Edit</button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Myclass;
