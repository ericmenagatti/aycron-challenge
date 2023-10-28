'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
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

interface IItemProps {
  itemId: string;
  title: string;
  price: string;
  image: string;
  onAddToCart: (itemId: string) => void;
}

const Item: FC<IItemProps> = ({
  itemId,
  title,
  price,
  image,
  onAddToCart,
}) => {
  const { data: session } = useSession();

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
          {session ? (
            <Button className="flex-1" variant="outline" onClick={() => onAddToCart(itemId)}>Add to Cart</Button>
          ) : null}
          <Link href={`/checkout/${itemId}`} legacyBehavior passHref>
            <Button className="flex-1">Buy</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Item;