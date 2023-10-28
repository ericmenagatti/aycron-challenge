'use client';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { IItem } from '@/models/Items';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import PaymentForm from '@/components/stripe/PaymentForm';

interface IItemCheckoutProps {
  itemId: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const ItemCheckout: FC<IItemCheckoutProps> = ({ itemId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState<IItem | null>(null);
  const [paymentToggle, setPaymentToggle] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/item`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setItemData(data)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  const handlePaymentToggle = () => setPaymentToggle((prev) => !prev);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Card className="w-[450px] mt-10 pb-5">
          <CardTitle className='px-6 pt-4'>Loading...</CardTitle>
        </Card>
      </div>
    )
  }

  if (itemData === null) {
    return (
      <div className="flex justify-center">
        <Card className="flex flex-col justify-center align-middle w-[450px] mt-10">
          <CardTitle className='px-6 pt-4 pb-2 text-center'>Item not found</CardTitle>
          <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-[450px] mt-10">
        <CardTitle className='px-6 pt-4'>{itemData?.title}</CardTitle>
        <CardHeader>
          <Image
            src={itemData?.image!}
            alt="Item Image"
            height={550}
            width={500}
          />
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">${itemData?.price}</Label>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="w-[450px] mt-1">
        {!paymentToggle ? (
          <div className="flex justify-end">
            <Button
              className=" bg-blue-500 dark:bg-green-500 w-full"
              variant="outline"
              onClick={handlePaymentToggle}
            >
              PURCHASE
            </Button>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <PaymentForm itemId={[itemId]} amount={+itemData.price} togglePayment={handlePaymentToggle} />
          </Elements>
        )}
      </Card>
    </div>
  )
}

export default ItemCheckout;
