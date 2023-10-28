'use client';
import { useEffect, useState } from "react";
import ItemUser from "@/components/items/ItemUser";
import { Card, CardTitle } from "@/components/ui/card"
import { IItem } from "@/models/Items";
import { useSession } from "next-auth/react";

interface MyItem extends IItem {
  _id: string;
}

const UserPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState<MyItem[]>([]);
  const [ownedItems, setOwnedItems] = useState<MyItem[]>([]);
  const [publishedItems, setPublishedItems] = useState<MyItem[]>([]);
  const [pausedItems, setPausedItems] = useState<MyItem[]>([]);

  useEffect(() => {
    loadAllItems();
  }, []);

  useEffect(() => {
    const owned = allItems?.filter((item) => {
      if (item.boughtBy === session?.user?.email) return item;
    }) as MyItem[];
    const published = allItems?.filter((item) => {
      if (item.createdBy === session?.user?.email && item.status === 'active') return item;
    }) as MyItem[];
    const paused = allItems?.filter((item) => {
      if (item.createdBy === session?.user?.email && item.status === 'paused') return item;
    }) as MyItem[];

    setOwnedItems(owned);
    setPublishedItems(published);
    setPausedItems(paused);
  }, [allItems, session]);

  const loadAllItems = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/items`, {
      method: 'POST',
      body: JSON.stringify({
        query: '',
      }),
    })
      .then(response => response.json())
      .then(data => setAllItems(data))
      .finally(() => {
        setLoading(false);
      });
  }

  const handlePauseItem = (itemId: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/item`, {
      method: 'PUT',
      body: JSON.stringify({
        id: itemId,
        status: 'paused',
      })
    }).finally(() => loadAllItems());
  }

  const handleUnpauseItem = (itemId: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/item`, {
      method: 'PUT',
      body: JSON.stringify({
        id: itemId,
        status: 'active',
      })
    }).finally(() => loadAllItems());
  }

  const handleRemoveItem = (itemId: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/item`, {
      method: 'PUT',
      body: JSON.stringify({
        id: itemId,
        status: 'removed',
      })
    }).finally(() => loadAllItems());
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

  if (((ownedItems.length === 0) && (publishedItems.length === 0) && (pausedItems.length === 0))) {
    return (
      <div className="flex justify-center">
        <Card className="flex flex-col justify-center align-middle w-[450px] mt-10">
          <CardTitle className='px-6 pt-4 pb-4 text-center'>There are no Items in your Profile</CardTitle>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div>
        {ownedItems.length !== 0 ? (
          <>
            <div className="text-center mt-10 mb-4 text-2xl font-semibold">My Purchases</div>
            <div className="grid lg:grid-cols-4 gap-6 mb-10">
              {ownedItems.map((item) => (
                <ItemUser
                  key={item?._id}
                  itemId={item?._id}
                  onPauseItem={handlePauseItem}
                  onUnpauseItem={handleUnpauseItem}
                  onDeleteItem={handleRemoveItem}
                  {...item}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div>
        {publishedItems.length !== 0 ? (
          <>
            <div className="text-center mt-10 mb-4 text-2xl font-semibold">My Publications</div>
            <div className="grid lg:grid-cols-4 gap-6 mb-10">
              {publishedItems.map((item) => (
                <ItemUser
                  key={item?._id}
                  itemId={item?._id}
                  onPauseItem={handlePauseItem}
                  onUnpauseItem={handleUnpauseItem}
                  onDeleteItem={handleRemoveItem}
                  {...item}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div>
        {pausedItems.length !== 0 ? (
          <>
            <div className="text-center mt-10 mb-4 text-2xl font-semibold">Paused</div>
            <div className="grid lg:grid-cols-4 gap-6 mb-10">
              {pausedItems.map((item) => (
                <ItemUser
                  key={item?._id}
                  itemId={item?._id}
                  onPauseItem={handlePauseItem}
                  onUnpauseItem={handleUnpauseItem}
                  onDeleteItem={handleRemoveItem}
                  {...item}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default UserPage;