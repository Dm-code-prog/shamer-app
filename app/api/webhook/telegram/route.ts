import {NextRequest, NextResponse} from "next/server";

export const GET = async (req: NextRequest) => {
  const {body} = req;
  console.log(body);
  return NextResponse.json({message: "Hello, World!"});
}