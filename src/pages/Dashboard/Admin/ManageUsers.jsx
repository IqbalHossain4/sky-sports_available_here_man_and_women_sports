import DashHeader from "../Header/DashHeader";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const ManageUsers = () => {
  const userData = useLoaderData();

  const handleRoleAdmin = (id) => {
    fetch(`https://assignment-12-server-gamma.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: "admin" }),
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

  const handleRoleInstructor = (id) => {
    fetch(`https://assignment-12-server-gamma.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: "instructor" }),
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

  return (
    <div className="font-serif bg-white">
      <DashHeader text="Manage Users"></DashHeader>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-black text-white">
            <tr>
              <th>#</th>
              <th>Name:</th>
              <th>Email:</th>
              <th>Role:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={`btn font-serif  w-[120px] rounded-md ${
                      user.role === "admin"
                        ? "bg-green-400"
                        : "bg-black text-white"
                    } ${user.role === "instructor" && "bg-amber-400"}`}
                  >
                    {user.role ? user.role : "Student"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRoleAdmin(user._id)}
                    className="btn-info btn font-serif w-[120px] rounded-md mr-4"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => handleRoleInstructor(user._id)}
                    className=" btn-warning btn font-serif w-[120px] rounded-md"
                  >
                    Instructor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
