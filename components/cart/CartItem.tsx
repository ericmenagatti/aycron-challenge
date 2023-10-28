import Image from 'next/image';
import { CalendarDays, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FC } from "react";

interface ICartItemProps {
  itemId: string;
  title: string;
  price: string;
  image: string;
  createdDate: Date;
  onRemove: (itemId: string) => void;
}

const CartItem: FC<ICartItemProps> = ({
  itemId,
  title,
  price,
  image,
  createdDate,
  onRemove
}) => {
  const date = new Date(createdDate).toDateString();

  return (
    <div className="flex justify-between space-x-4 px-4 py-3">
      <div className='basis-2/6 overflow-hidden rounded-sm relative w-20'>
        <Image className='object-cover w-full h-auto' src={image} alt={title} width="0" height="0" sizes='100vw' />
      </div>
      <div className="basis-full space-y-1">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm w-full">
          ${price}
        </p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            {date}
          </span>
        </div>
      </div>
      <div className='ml-auto'>
        <Button variant="secondary" size="icon" onClick={() => onRemove(itemId)}>
          <Trash2 />
        </Button>
      </div>
    </div>
  )
}

export default CartItem;