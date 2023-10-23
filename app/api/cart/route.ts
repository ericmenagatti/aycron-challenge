import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: 'Default cart message.' }, { status: 200 });
};