import dbConnect from "@/lib/db-connect"
import User from "@/lib/user-model";
import { NextResponse } from "next/server";
import ramdomstring from 'randomstring'


export async function POST(request: Request) {
  const { email } = await request.json()
  await dbConnect();
  
  const userData = await User.findOne({ email: email })
 console.log(userData)
}
