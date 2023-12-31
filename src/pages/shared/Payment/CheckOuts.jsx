import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hook/useAxiosSecures";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";

const CheckOuts = ({ price, loadPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSercret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSercret(res.data.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError(" ");
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unkwown ",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      //Save payments info in the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        status: "pending",
        classId: loadPrice.classId,
        itemsId: loadPrice._id,
        itemName: loadPrice.sport_name
          ? loadPrice.sport_name
          : loadPrice.class_name,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment SuccesFul",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      
      fetch(`https://assignment-12-server-gamma.vercel.app/selectCourse/${loadPrice._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deleteCount > 0) {
            console.log(data);
          }
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-warning mt-8"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600">Transaction completed{transactionId}</p>
      )}
    </div>
  );
};

export default CheckOuts;
