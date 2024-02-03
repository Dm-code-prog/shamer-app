import {NextRequest, NextResponse} from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log("Received body:", body);
  return NextResponse.json({message: "Hello, World!"});
}