import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import ItemModel from "@/models/Items";

export const GET = async () => {
  try {
    await dbConnect();
    const featuredItems = await ItemModel.find({ featured: true, status: 'active' }).lean().exec();

    return NextResponse.json(featuredItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    await dbConnect();
    let queriedItems = [];
    if (data.status) {
      queriedItems = await ItemModel.find({ "title": { $regex: data.query, $options: 'i' }, status: data.status });
    } else {
      queriedItems = await ItemModel.find({ "title": { $regex: data.query, $options: 'i' } });
    }

    return NextResponse.json(queriedItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
