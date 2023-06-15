import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import DashHeader from "../Header/DashHeader";

const PaymentHistory = () => {
  const [paymentHistry, setPaymentHistry] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(
      `https://assignment-12-server-gamma.vercel.app/allpayment?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setPaymentHistry(data));
  }, []);
  return (
    <div className="w-full bg-white  font-serif">
      <DashHeader text="Payment History"></DashHeader>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-black text-white">
            <tr>
              <th>#</th>
              <th>Name:</th>
              <th>Email:</th>
              <th>Price</th>
              <th>Status</th>
              <th>Transaction Id</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistry.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.itemName}</td>
                <td>{user.email}</td>
                <td>${user.price}</td>
                <td>{user.status}</td>
                <td>{user.transactionId}</td>
                <td>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
