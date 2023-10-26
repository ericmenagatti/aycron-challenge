"use client";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

const styleOptions = {
  style: {
    base: {
      fontSize: "20px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4"
      },

    },
    invalid: {
      color: "#9e2146"
    }
  }
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const response = await fetch("/api/stripe-payment", {
        method: "POST",
        body: JSON.stringify({ data: { amount: 89 } }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();

      const clientSecret = data;

      // const stripeResponse = await stripe?.confirmCardPayment(clientSecret, {
      //   payment_method: { card: cardElement },
      // });

      // const stripeResponse = await stripe?.createPaymentMethod({
      //   type: "card",
      //   card: cardElement
      // });

      const stripeResponse = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement
      });

      console.log(stripeResponse);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}
      className="
      grid
      max-w-md
      space-y-4
      border-solid
      border-2
      border-sky-500
      p-3
      mt-4
    "
    >
      <label className="font-bold">Card Details</label>
      <CardElement options={styleOptions} />
      <Button type="submit">Pay</Button>
    </form>
  );
}

export default PaymentForm;