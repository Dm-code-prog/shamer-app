import {NextRequest, NextResponse} from "next/server";

export const POST = async (req: NextRequest) => {
  const {body} = req;
  console.log(body);
  return NextResponse.json({message: "Hello, World!"});
}