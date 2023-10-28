'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { IItem } from "@/models/Items";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import CartItem from "@/components/cart/CartItem";
import PaymentForm from "@/components/stripe/PaymentForm";

interface CartItem extends IItem {
  _id: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [subTotal, setSubTotal] = useState(0);
  const [paymentToggle, setPaymentToggle] = useState(false);

  useEffect(() => {
    loadCartItems(session)
  }, [session]);

  const loadCartItems = (session: any) => {
    if (session) {
      setLoading(true);
      fetch('http://localhost:3000/api/cart')
        .then(response => response.json())
        .then(data => {
          setCartItems(data);
          const total = data.reduce((total: number, item: any) => total + item.price, 0);
          setSubTotal(total);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const handleRemoveCartItem = (itemId: string) => {
    fetch('http://localhost:3000/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({
        id: itemId
      })
    }).finally(() => loadCartItems(session));
  }

  const handlePaymentToggle = () => setPaymentToggle((prev) => !prev);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Card className="w-[450px] mt-10 pb-5">
          <CardTitle className='px-6 pt-4 text-center'>Loading...</CardTitle>
        </Card>
      </div>
    )
  }

  if (cartItems === null || cartItems.length === 0) {
    return (
      <div className="flex justify-center">
        <Card className="flex flex-col justify-center align-middle w-[450px] mt-10">
          <CardTitle className='px-6 pt-4 pb-4 text-center'>There are no items in your Cart</CardTitle>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mt-10 text-2xl font-semibold">My Cart</div>
      <Card className="w-[450px] mt-5">
        {cartItems.map((item) => (
          <CartItem key={item._id} itemId={item._id} onRemove={handleRemoveCartItem} {...item} />
        ))}
      </Card>
      {cartItems.length > 0 ? (
        <Card className="w-[450px] mt-1">
          <div className="flex my-2">
            <label className="basis-full text-1xl text-right mr-5">Subtotal: ${subTotal}</label>
          </div>
          <Separator className="mb-4" />
          {!paymentToggle ? (
            <div className="flex my-2 justify-end">
              <Button
                className="mb-1 mr-5 bg-blue-500 dark:bg-green-500"
                variant="outline"
                onClick={handlePaymentToggle}
              >
                PURCHASE
              </Button>
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm itemId={cartItems.map((item) => item._id)} amount={subTotal} togglePayment={handlePaymentToggle} />
            </Elements>
          )}
        </Card>
      ) : null}
    </div>
  )
}

export default CartPage;