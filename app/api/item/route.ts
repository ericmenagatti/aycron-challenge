import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/utils/db";
import ItemModel from "@/models/Items";

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const data = await req.json();
    const currentItem = await ItemModel.findById(data.id).lean().exec();

    return NextResponse.json(currentItem, { status: 200 });
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

      const currentItem: any = await ItemModel.findById(data.id).lean().exec();

      if (currentItem?.createdBy === session?.user?.email) {
        await ItemModel.findByIdAndUpdate({ _id: data.id }, { status: data.status });
        return NextResponse.json({ message: 'Item updated successfully!' }, { status: 200 });
      }
      return NextResponse.json({ message: 'Unauthorized User.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Item does not exist.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
