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

interface IItemContentProps {
  itemId: string;
}

const ItemContent: FC<IItemContentProps> = ({ itemId }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState<IItem | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/item', {
      method: 'POST',
      body: JSON.stringify({ id: '653b2c4091c73e5cc7d2c8ef' })
    })
      .then(response => response.json())
      .then(data => setItemData(data))
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) return null;

  return (
    <div className="flex justify-center">
      <Card className="w-[450px] border-none shadow-none">
        <CardTitle className='mb-5'>{itemData?.title}</CardTitle>
        <CardHeader className='p-0'>
          <Image
            src={itemData?.image!}
            alt="Item Image"
            height={300}
            width={450}
          />
        </CardHeader>
        <CardContent className='mt-5 px-0'>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">${itemData?.price}</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-5 px-0 pb-0">
          {session ? <Button className="flex-1" variant="outline">Add to Cart</Button> : null}
          <Button className="flex-1">Buy</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ItemContent;
