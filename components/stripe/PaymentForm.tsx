"use client";
import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

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

interface IPaymentFormProps {
  itemId: string[];
  amount: number;
  togglePayment: () => void;
}

const PaymentForm: FC<IPaymentFormProps> = ({ itemId, amount, togglePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const response = await fetch("/api/stripe-payment", {
        method: "POST",
        body: JSON.stringify({ data: { amount: amount } }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();

      const clientSecret = data;

      const stripeResponse = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (stripeResponse?.paymentIntent?.status === 'succeeded') {
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe-payment`, {
          method: 'PUT',
          body: JSON.stringify({
            id: itemId,
            status: 'sold',
          })
        });
        route.push('/user');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-md space-y-4 p-3 mt-4">
      <div className="text-center flex items-center justify-between">
        <label className="font-bold">Card Details</label>
        <Button variant="outline" size="icon" onClick={togglePayment}>
          <X />
        </Button>
      </div>
      <CardElement options={styleOptions} />
      {!loading ? (
        <Button className="bg-blue-500 dark:bg-green-500" variant="outline" type="submit">PAY</Button>
      ) : (
        <Button className="bg-blue-500 dark:bg-green-500" variant="outline" type="submit" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          LOADING
        </Button>
      )}
    </form>
  );
}

export default PaymentForm;