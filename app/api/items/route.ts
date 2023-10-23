import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: 'Default items message.' }, { status: 200 });
};