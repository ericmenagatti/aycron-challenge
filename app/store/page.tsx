'use client';
import { useEffect, useState } from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Search } from 'lucide-react';
import { IItem } from "@/models/Items";
import Item from "@/components/items/Item";
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface StoreItem extends IItem {
  _id: string;
}

const StorePage = () => {
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [storeItems, setStoreItems] = useState<StoreItem[] | null>(null);

  const formSchema = z.object({
    search: z.string().max(40, {
      message: "Search can not surpass 40 characters.",
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  useEffect(() => {
    loadStoreItems('')
  }, []);

  useEffect(() => {
    if (form.formState.errors.search?.message !== undefined) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [form.formState])

  const loadStoreItems = (query: string) => {
    setLoading(true);
    fetch('http://localhost:3000/api/items', {
      method: 'POST',
      body: JSON.stringify({
        query,
        status: 'active'
      })
    })
      .then(response => response.json())
      .then(data => {
        setStoreItems(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleAddToCartItem = (itemId: string) => {
    fetch('http://localhost:3000/api/cart', {
      method: 'PUT',
      body: JSON.stringify({
        id: itemId
      })
    }).finally(() => loadStoreItems(''));
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loadStoreItems(values.search);
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

  if (storeItems === null || storeItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="w-[600px] pt-10 pb-0">
          <div className="text-center mt-0 mb-4 text-2xl font-semibold">Store</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-center flex items-center justify-center"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="focus-visible:ring-transparent" placeholder="Input your search..." {...field} onFocus={() => null} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className={`${formError ? 'mb-[28px]' : ''}`} variant="outline" type="submit" size="icon">
                <Search className="rotate-0 scale-100 transition-all" />
              </Button>
            </form>
          </Form>
        </div>
        <Card className="flex flex-col justify-center align-middle w-[450px] mt-10">
          <CardTitle className='px-6 pt-4 pb-4 text-center'>There are no items in the Store</CardTitle>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[600px] pt-10 pb-0">
          <div className="text-center mt-0 mb-4 text-2xl font-semibold">Store</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-center flex items-center justify-center"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="focus-visible:ring-transparent" placeholder="Input your search..." {...field} onFocus={() => null} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className={`${formError ? 'mb-[28px]' : ''}`} variant="outline" type="submit" size="icon">
                <Search className="rotate-0 scale-100 transition-all" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 mb-10">
        {storeItems.map((item) => (
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

export default StorePage;