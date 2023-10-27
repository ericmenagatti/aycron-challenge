import ItemDetail from "@/components/items/ItemDetail";

const ItemPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <ItemDetail itemId={id} />
  )
}

export default ItemPage;
