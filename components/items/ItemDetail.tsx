'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

const ItemDetail = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center">
      <Card className="w-[450px] mt-10">
        <CardTitle className='px-6 pt-4'>Example Title</CardTitle>
        <CardHeader>
          <Image
            src="https://lh3.googleusercontent.com/a/ACg8ocIJ5de0oM6H4XVMirF_FwkHSEUlpRr1WGUt3eLKZnBhKdc=s96-c"
            alt="Item Image"
            height={300}
            width={220}
          />
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Item</Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Price</Label>
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
