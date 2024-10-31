'use client'; // Ensure this is present

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Signin() {
    const { data: session, status } = useSession();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session && status === 'authenticated') {
            router.push('/profile/main');
        }
    }, [session, status, router]);

    const submitHandler = async ({ email, password }: any) => {
        setLoading(true);
        try {
            const result = await signIn('credentials', { redirect: false, email, password });

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Iniciaste sesión exitosamente!");
                router.push('/profile/main');
            }
        } catch (err: any) {
            toast.error(err.message || 'Ocurrió un error. Inténtalo nuevamente.', { duration: 4000, position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="a_page" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="w-[350px] h-fit flex-col rounded-[5px] my-5 opacity-75 border border-[#666] px-[26px] py-[20px] bg-white/10 backdrop-blur-lg shadow-xl">
                    <div className='py-2'>
                        <h1 className="text-2xl text-black bold">Inicia Sesión</h1>
                    </div>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <h2 className="font-bold text-black" style={{ margin: "5px" }}>Email</h2>
                        <Input
                            style={{ marginBottom: "10px" }}
                            autoComplete='on'
                            id="email"
                            type="text"
                            {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === 'required' && <p className='text-red-600'>Ingresá tu correo electrónico</p>}
                        {errors.email?.type === 'pattern' && <p className='text-red-600'> El formato de correo electrónico no es válido</p>}

                        <div className='flex justify-between items-center'>
                            <h2 className="font-bold text-black" style={{ margin: "5px" }}>Contraseña</h2>

                            {/* Trigger para abrir el Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className='text-indigo-700 leading-8 text-[16px]'>
                                        ¿Olvidaste tu contraseña?
                                    </Button>
                                </DialogTrigger>

                                {/* Contenido del Dialog */}
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Recuperar contraseña</DialogTitle>
                                        <DialogDescription>
                                            Por favor, contacte a <strong>hola@nexuscomunicados.com</strong>.  
                                            No olvide su nombre completo y la dirección de email con la cual se registró.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Input
                            autoComplete='off'
                            id="password"
                            type="password"
                            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === 'required' && <p className='text-red-600'>Ingresá tu contraseña.</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-600'>La contraseña debe tener al menos 6 dígitos.</p>}
                        {errors.password?.type === 'maxLength' && <p className='text-red-600'>La contraseña debe tener un máximo de 20 caracteres.</p>}

                        <br />
                        <Separator />

                        <Button type="submit" style={{ width: "100%" }} disabled={loading}>
                            {loading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                'Continuar'
                            )}
                        </Button>
                    </form>

                    <br />
                    <Separator />

                    <div className='flex justify-between my-5'>
                        <h4 style={{ margin: "5px" }}>¿Nuevo cliente?</h4>
                        <Button size="sm" asChild style={{ margin: "5px" }}>
                            <Link href="/register">Crea tu cuenta</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
