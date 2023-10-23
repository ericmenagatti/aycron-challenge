import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: 'Default publish message.' }, { status: 200 });
};