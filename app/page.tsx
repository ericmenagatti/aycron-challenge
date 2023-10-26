'use client';
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/stripe/PaymentForm";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

const HomePage = () => {
  return (
    <>
      {/* <Elements stripe={stripePromise}>
        <PaymentForm />
        <Link key="1" href={`/item/test`}>Main Page</Link>
      </Elements> */}
      <Link key="1" href={`/item/test`}>Main Page</Link>
    </>
  )
}
export default HomePage;