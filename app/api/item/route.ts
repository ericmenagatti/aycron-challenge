import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: 'Default item message.' }, { status: 200 });
};