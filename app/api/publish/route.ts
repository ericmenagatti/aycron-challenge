import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/utils/db";
import UserModel from "@/models/Users";
import ItemModel from "@/models/Items";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    let response = 0;
    if (session) {
      const data = await req.json();
      await dbConnect();

      const userExist = await UserModel.findOne({ email: session?.user?.email }).lean().exec();

      if (userExist) {
        const itemObject = {
          title: data.title,
          image: data.image,
          price: data.price,
          createdDate: new Date(),
          lastUpdate: new Date(),
          status: 'active',
          featured: false,
          createdBy: session?.user?.email,
        }
        if (session?.user?.email === "ericmenagatti@gmail.com") {
          response = await ItemModel.create({
            ...itemObject,
            featured: true,
          });
        } else {
          response = await ItemModel.create(itemObject);
        }
        return NextResponse.json({ message: 'Item created successfully!', item: response }, { status: 200 });
      }
      return NextResponse.json({ message: "User doesn't exist in our database!" }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'User is not signed in.' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
