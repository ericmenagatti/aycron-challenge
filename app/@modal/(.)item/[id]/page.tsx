'use client';
import { Modal } from "@/components/modal/Modal";
import ItemContent from "@/components/items/ItemContent";

const ItemModal = ({ params: { id } }: { params: { id: string } }) => {

  console.log(`ItemModal => id:`, id);
  return (
    <Modal>
      <ItemContent />
    </Modal>
  )
}
export default ItemModal;