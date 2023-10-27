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
