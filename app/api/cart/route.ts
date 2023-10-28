import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/utils/db";
import ItemModel from "@/models/Items";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      await dbConnect();
      const itemsInCart = await ItemModel.find({
        inCart: {
          $elemMatch: {
            userEmail: session?.user?.email
          }
        }
      }).lean().exec();

      return NextResponse.json(itemsInCart, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User is not signed in.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const data = await req.json();

      await dbConnect();

      await ItemModel.findByIdAndUpdate({ _id: data.id }, {
        $push: {
          "inCart": {
            "userEmail": session?.user?.email
          }
        }
      });
      return NextResponse.json({ message: 'User cart updated successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User is not signed in.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const data = await req.json();

      await dbConnect();

      await ItemModel.findByIdAndUpdate({ _id: data.id }, {
        $pull: {
          "inCart": {
            "userEmail": session?.user?.email
          }
        }
      });
      return NextResponse.json({ message: 'User cart updated successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User is not signed in.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
