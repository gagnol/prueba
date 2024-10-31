// app/api/messages/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db-connect';
import ContactModel from '@/lib/contact-model';

export async function GET() {
  await dbConnect();

  try {
    const messages = await ContactModel.find();
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los mensajes' }, { status: 500 });
  }
}
