import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/utils/db";
import UserModel from "@/models/Users";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      await dbConnect();
      const currentUser = await UserModel.find({ email: session?.user?.email });

      return NextResponse.json(currentUser, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User is not signed in.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const POST = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      await dbConnect();
      const userExist = await UserModel.find({ email: session?.user?.email });

      if (!userExist[0]) {
        await UserModel.create(session.user);
        return NextResponse.json({ message: 'User created successfully!' }, { status: 200 });
      }

      return NextResponse.json({ message: 'User already exist!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User does not exist' }, { status: 200 });
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

      await UserModel.updateOne({ email: session?.user?.email }, {
        name: data.name,
        image: data.image,
        theme: data.theme,
      });

      return NextResponse.json({ message: 'User updated successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User is not signed in.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
