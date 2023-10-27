'use client';
import Image from "next/image";
import { useState } from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Image as ImageIco } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

const ItemForm = () => {
  const [currentImage, setCurrentImage] = useState("");

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 6 characters.",
    }).max(40, {
      message: "Title can not surpass 40 characters.",
    }),
    image: z.string().url({
      message: "Please input a correct URL.",
    }),
    price: z.coerce.number().min(1, {
      message: "Price must be higher than $1.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: "",
      price: 1,
    },
  })

  // random url for unsplash images : https://source.unsplash.com/random
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    fetch('http://localhost:3000/api/publish', {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        image: values.image,
        price: +values.price,
      }),
    });
  }

  const getImage = (e: React.MouseEvent) => {
    e.preventDefault();
    fetch(`https://source.unsplash.com/500x500`).then((response) => {
      form.setValue('image', response.url);
      setCurrentImage(response.url);
    });
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[600px] border border-red-400 border-solid p-10">
        {currentImage ? (
          <Image src={currentImage} alt="Item Image" width={550} height={500} />
        ) : null}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Input your title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input placeholder="From Unsplash" disabled {...field} />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={getImage} variant="outline" size="icon">
                              <ImageIco className="rotate-0 scale-100 transition-all" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate Image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please generate the url for your image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="1" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" size="lg">PUBLISH</Button>
          </form>
        </Form>
      </div>
    </div>
  )

}
export default ItemForm;