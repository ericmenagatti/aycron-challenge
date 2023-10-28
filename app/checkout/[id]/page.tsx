import ItemCheckout from "@/components/items/ItemCheckout";

const CheckoutPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <ItemCheckout itemId={id} />
  )
}

export default CheckoutPage;