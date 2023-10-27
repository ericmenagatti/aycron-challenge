'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { IItem } from '@/models/Items';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

interface IItemDetailProps {
  itemId: string;
}

const ItemDetail: FC<IItemDetailProps> = ({ itemId }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState<IItem | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/item', {
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

  if (loading) return null;

  if (itemData === null) return null;

  return (
    <div className="flex justify-center">
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
        <CardFooter className="flex gap-5">
          {session ? <Button className="flex-1" variant="outline">Add to Cart</Button> : null}
          <Button className="flex-1">Buy</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ItemDetail;
