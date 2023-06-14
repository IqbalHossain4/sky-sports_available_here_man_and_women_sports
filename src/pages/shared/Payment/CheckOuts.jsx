import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hook/useAxiosSecures";
import { AuthContext } from "../../../Context/AuthProvider";

const CheckOuts = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSercret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSercret(res.data.clientSecret);
    });
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
        quantity: cart.length,
        itemsId: cart.map((item) => item._id),
        itemName: cart.map((item) =>
          item.sport_name ? item.sport_name : item.class_name
        ),
      };
      axiosSecure.post("/payments").then((res) => res.data);
      // const transaction = paymentIntent.id;
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
