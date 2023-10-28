import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/utils/db";
import ItemModel from "@/models/Items";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(data.amount),
      currency: "USD",
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}

export const PUT = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const data = await req.json();
      await dbConnect();

      if (data.id.length > 1) {
        await ItemModel.updateMany(
          { _id: { $in: data.id } },
          { status: data.status, boughtBy: session?.user?.email, lastUpdated: new Date(), inCart: [] }
        );
      } else {
        await ItemModel.findByIdAndUpdate(
          { _id: data.id[0] },
          { status: data.status, boughtBy: session?.user?.email, lastUpdated: new Date(), inCart: [] }
        );
      }
      return NextResponse.json({ message: 'Thanks for your Purchase!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Item does not exist.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
