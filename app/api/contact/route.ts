// /app/api/contact/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db-connect';
import Contact from '@/lib/contact-model';

// Método HTTP POST
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { subject, email, description } = await req.json();

    const newContact = new Contact({
      subject,
      email,
      description,
      date: new Date(),
    });

    await newContact.save();
    return NextResponse.json({ message: 'Contacto guardado exitosamente' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar el contacto.' }, { status: 500 });
  }
}
