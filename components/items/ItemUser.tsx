'use client';
import Image from 'next/image';
import { FC } from 'react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link';

interface IItemUserProps {
  itemId: string;
  title: string;
  price: string;
  image: string;
  status: string;
  onDeleteItem: (itemId: string) => void;
  onPauseItem: (itemId: string) => void;
  onUnpauseItem: (itemId: string) => void;
}

const ItemUser: FC<IItemUserProps> = ({
  itemId,
  title,
  price,
  image,
  status,
  onDeleteItem,
  onPauseItem,
  onUnpauseItem
}) => {
  return (
    <div className="flex justify-center">
      <Card className="w-[450px] mt-10">
        <CardTitle className='px-6 pt-4'>{title}</CardTitle>
        <CardHeader>
          <Link key="1" href={`/item/${itemId}`}>
            <Image
              src={image}
              alt="Item Image"
              height={550}
              width={500}
            />
          </Link>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">${price}</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-5">
          {status === 'active' ? (
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => onPauseItem(itemId)}>
              Pause Item
            </Button>
          ) : null}
          {status === 'paused' ? (
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => onUnpauseItem(itemId)}>
              Unpause Item
            </Button>
          ) : null}
          <Link href={`/item/${itemId}`} legacyBehavior passHref>
            <Button className="flex-1">Details</Button>
          </Link>
          {status !== 'sold' ? (
            <Button className="flex-1" variant="outline" onClick={() => onDeleteItem(itemId)}>Delete Item</Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}

export default ItemUser;