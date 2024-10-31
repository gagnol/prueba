import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db-connect';
import UserModel from '@/lib/user-model';
import UserUpdate from '@/components/Admin-navigation/update-user';
import EditAvatar from '@/components/Admin-navigation/editavatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PeriodistaModel, { Periodista } from '@/lib/periodista-model';
import ComunicadorModel, { Comunicador } from '@/lib/slider-model';
import DeleteButton from '@/components/User-navigation/deleteregister';

// Type guards para distinguir tipos de usuarios
function isPeriodista(user: any): user is Periodista {
    return (user as Periodista)?.topics !== undefined;
}

function isComunicador(user: any): user is Comunicador {
    return (user as Comunicador)?.sector !== undefined;
}

export default async function SettingsScreen({ params }: { params: { _id: string } }) {
    const { _id } = params;

    await dbConnect();

    // Buscar usuario basado en _id de params
    const userDocs = await UserModel.findById(_id).lean();

    if (!userDocs || typeof userDocs !== 'object' || !('email' in userDocs) || !('name' in userDocs)) {
        redirect('/404'); // Redirigir si no se encuentra el usuario o falta algún campo
        return null; // Previene continuar con el renderizado
    }

    const { email, name } = userDocs;

    const comunicador = await ComunicadorModel.findOne({ email }).lean() as Comunicador | null;
    const periodista = await PeriodistaModel.findOne({ email }).lean() as Periodista | null;

    const noRegistrado = !comunicador && !periodista;
    const deleteId = isPeriodista(periodista) ? periodista._id : isComunicador(comunicador) ? comunicador._id : null;

    return (
        <div className="container max-w-screen-xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-1 p-0 shadow-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-bold">Tu cuenta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h2 className="text-lg font-semibold text-center">{name}</h2>
                        <p className="text-sm text-center text-gray-500">{email}</p>
                        <Separator className="my-4" />
                        <EditAvatar user={{ _id, name, email }} />
                    </CardContent>
                </Card>

                <div className="md:col-span-3">
                    <Card className="p-6 shadow-md">
                        <CardContent>
                        <UserUpdate _id={_id} name={name} email={email} />
                        </CardContent>
                    </Card>

                    <br />
                    <Card>
                        <CardContent>
                            {noRegistrado ? (
                                <div className="text-center p-6 text-indigo-500">
                                    <p>Usted no está todavía registrado en nuestras bases de búsqueda.</p>
                                </div>
                            ) : (
                                <div className="p-6 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[250px]">
                                        <h2 className="text-xl font-bold mb-4">Perfil del Usuario</h2>
                                        <p className="text-green-600 font-semibold mb-2">
                                            {isPeriodista(periodista) ? "Periodista Registrado" : "Comunicador Registrado"}
                                        </p>
                                        <p><strong>Nombre:</strong> {comunicador?.name ?? periodista?.name ?? "No disponible"}</p>
                                        <p><strong>Email:</strong> {email}</p>
                                        <p><strong>Ubicación:</strong> {comunicador?.location ?? periodista?.location ?? "No disponible"}</p>

                                        {isPeriodista(periodista) && (
                                            <>
                                                <p><strong>Temas:</strong> {periodista.topics.join(', ')}</p>
                                                <p><strong>Tipo de Medio:</strong> {periodista.mediaType}</p>
                                            </>
                                        )}

                                        {isComunicador(comunicador) && (
                                            <>
                                                <p><strong>Sector:</strong> {comunicador.sector}</p>
                                                <p><strong>Especialización:</strong> {comunicador.specialization}</p>
                                            </>
                                        )}

                                        <h3>Cancelar registro</h3>
                                        {deleteId && <DeleteButton _id={deleteId} />}
                                    </div>

                                    <div className="flex-1 min-w-[250px]">
                                        <h3 className="text-lg font-semibold mb-4">Biografía</h3>
                                        <p>{comunicador?.bio ?? periodista?.bio ?? "Biografía no disponible."}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
