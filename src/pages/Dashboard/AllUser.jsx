import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useCourse from "../../Hook/useCourse";
import { Link } from "react-router-dom";
import DashHeader from "./Header/DashHeader";

const AllUser = () => {
  const [cart, refetch] = useCourse();
  const [carts, setCarts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/selectCourse?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setCarts(data));
  }, [cart]);

  let total = cart.reduce((sum, item) => item?.price + sum, 0);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/selectCourse/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full bg-white  font-serif">
      <DashHeader text="Adedd Class"></DashHeader>
      <h3 className="text-3xl mt-16 font-semibold my-4">
        Total Course: {cart.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-black text-white">
            <tr>
              <th>#</th>
              <th>Name:</th>
              <th>Email:</th>
              <th>Pay:</th>
              <th></th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.class_name ? user.class_name : user.sport_name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn hover:bg-blue-500 bg-black text-white">
                    ${user.price ? user.price : 20}
                  </button>
                </td>
                <td></td>

                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cart.length !== 0 && (
          <div className="mt-16">
            <hr />
            <div className="flex item-center justify-evenly  py-4">
              <div className="text-2xl font-bold">
                <h3>Total Price: ${total}</h3>
              </div>
              <div>
                <Link to="/dashboard/payment">
                  <button className="btn bg-blue-500 hover:bg-black hover:text-white">
                    PayMent
                  </button>
                </Link>
              </div>
            </div>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
