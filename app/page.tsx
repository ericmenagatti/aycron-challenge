'use client';
import { useEffect, useState } from "react";
import Item from "@/components/items/Item";
import { Card, CardTitle } from "@/components/ui/card"
import { IItem } from "@/models/Items";

interface FeaturedItem extends IItem {
  _id: string;
}

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);

  useEffect(() => {
    loadFeaturedItems()
  }, []);

  const loadFeaturedItems = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/items`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setFeaturedItems(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleAddToCartItem = (itemId: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart`, {
      method: 'PUT',
      body: JSON.stringify({
        id: itemId
      })
    }).finally(() => loadFeaturedItems());
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <Card className="w-[450px] mt-10 pb-5">
          <CardTitle className='px-6 pt-4 text-center'>Loading...</CardTitle>
        </Card>
      </div>
    )
  }

  if (featuredItems.length === 0) {
    return (
      <div className="flex justify-center">
        <Card className="flex flex-col justify-center align-middle w-[450px] mt-10">
          <CardTitle className='px-6 pt-4 pb-4 text-center'>There are no featured items</CardTitle>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mt-10 mb-4 text-2xl font-semibold">Featured</div>
      <div className="grid lg:grid-cols-4 gap-6 mb-10">
        {featuredItems?.map((item) => (
          <Item
            key={item._id}
            itemId={item._id}
            onAddToCart={handleAddToCartItem}
            {...item}
          />
        ))}
      </div>
    </>
  )
}

export default HomePage;