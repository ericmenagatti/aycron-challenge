import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { IItem } from '@/models/Items';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation';

interface IItemContentProps {
  itemId: string;
}

const ItemContent: FC<IItemContentProps> = ({ itemId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState<IItem | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/item`, {
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

  if (loading) {
    return (
      <div className="flex justify-center">
        <Card className="w-[450px] border-none shadow-none">
          <CardTitle className='px-6 pt-4'>Loading...</CardTitle>
        </Card>
      </div>
    )
  }

  if (itemData === null) {
    return (
      <div className="flex justify-center">
        <Card className="w-[450px] border-none shadow-none">
          <CardTitle className='mb-5'>Item not found</CardTitle>
          <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <Card className="w-[750px] border-none shadow-none">
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
      </Card>
    </div>
  )
}

export default ItemContent;
