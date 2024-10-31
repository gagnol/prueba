import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import ContactModel from '@/lib/contact-model';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { DeleteButton } from "@/components/Admin-navigation/borrarmensaje";

export default async function MensajesScreen() {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/");
  }

  await dbConnect();
  const productsDocs = await ContactModel.find().sort({ _id: -1 });
  const mensajes = JSON.parse(JSON.stringify(productsDocs));

  return (
    <div className="p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Mensajes Recibidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Asunto</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell> {/* Add Actions column */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mensajes.map((mensaje: any) => (
                <TableRow key={mensaje._id}>
                  <TableCell>{mensaje.subject}</TableCell>
                  <TableCell>{mensaje.email}</TableCell>
                  <TableCell>{mensaje.description}</TableCell>
                  <TableCell>{new Date(mensaje.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DeleteButton id={mensaje._id} /> {/* Pass the id prop */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
