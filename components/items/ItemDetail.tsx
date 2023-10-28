'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
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
import Link from 'next/link';

interface IItemDetailProps {
  itemId: string;
}

const ItemDetail: FC<IItemDetailProps> = ({ itemId }) => {
  const router = useRouter();
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

  const handleAddToCartItem = () => {
    fetch('http://localhost:3000/api/cart', {
      method: 'PUT',
      body: JSON.stringify({
        id: itemId
      })
    });
  }

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
          {session ? (
            <Button className="flex-1" variant="outline" onClick={handleAddToCartItem}>Add to Cart</Button>
          ) : null}
          <Link href={`/checkout/${itemId}`} legacyBehavior passHref>
            <Button className="flex-1">Buy</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ItemDetail;
