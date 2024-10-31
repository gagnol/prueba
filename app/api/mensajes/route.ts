import { NextResponse } from "next/server";
import ContactModel from '@/lib/contact-model'
import dbConnect from "@/lib/db-connect";

export async function GET(request: Request) {
  
    await dbConnect();
    const mensajes = await ContactModel.find()
  
    return NextResponse.json({ mensajes});
  
}