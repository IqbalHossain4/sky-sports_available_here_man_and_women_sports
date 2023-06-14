import { loadStripe } from "@stripe/stripe-js";
import CheckOuts from "./CheckOuts";
import { Elements } from "@stripe/react-stripe-js";
import HeaderSection from "../../../Component/Header/HeaderSection";
import useCourse from "../../../Hook/useCourse";
// provide publish key
const stripePromise = loadStripe(import.meta.env.VITE_payment_gatway);
const Payment = () => {
  const [cart] = useCourse();
  return (
    <div className="font-serif bg-white">
      <HeaderSection text="Payment"></HeaderSection>
      <Elements stripe={stripePromise}>
        <CheckOuts></CheckOuts>
      </Elements>
    </div>
  );
};

export default Payment;
