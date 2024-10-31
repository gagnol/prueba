'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { addUser, removeUser } from "@/store/nextSlice";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Avatar } from '@radix-ui/themes';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

function SigninTool() {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (session) {
            dispatch(addUser({ ...session }));
        } else {
            dispatch(removeUser()); // Clear user when session becomes null
        }
    }, [dispatch, session]);

    const handleSignOutClick: React.MouseEventHandler<HTMLLIElement> = async (event) => {
        try {
            setIsPopoverOpen(false); // Close popover first
            await signOut({ redirect: false }); // Sign out without immediate redirect
            dispatch(removeUser()); // Remove user from Redux store
            router.push('/'); // Push to the homepage
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleButtonClick = () => {
        setIsPopoverOpen(false); // Close popover on button click
    };

    return (
        <>
            {session?.user ? (
                <div className='min-w-[200px]'>
                    <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <Popover.Trigger asChild>
                            <Avatar
                                size="4"
                                src={session?.user?.image || undefined}
                                fallback="A"
                                color='gray'
                                onClick={() => setIsPopoverOpen(true)}
                            />
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content className='z-1 bg-white border-2 rounded-md'>
                                <div className='w-[360px] h-[320px] 
                                rounded-lg border-[2px]'>
                                    <div className="flex p-3 bg-[#EAEDED] 
                                    max-w-[100%] h-[69px] overflow-x-hidden">
                                <div className="text-xs flex flex-col pl-5 pt-2">
  <p className="font-bold text-[18px] mb-2">
    {session.user.name}
  </p>
  <p className="mt-1">{session?.user?.email}</p>
</div>    </div>
                                    <div className='flex bg-white'>
                                        <div className='flex-1 flex flex-row max-w-[40%] 
                                        min-w-[40%] mx-4'>
                                            <ul className='m-0 p-0'>
                                                <h4 className='text-[16px] font-bold py-2'></h4>
                                                <Link href="/admin/main">
                                                    {session?.user?.email === "admin@example.com" && (
                                                        <li className="nav_text font-bold" onClick={handleButtonClick}>
                                                            Dashboard
                                                        </li>
                                                    )}
                                                </Link>
                                            </ul>
                                        </div>
                                        <div className='flex-1 flex flex-row max-w-[60%]
                                         min-w-[60%] mx-4'>
                                            <ul>
                                                <h4 className='text-[16px] font-bold py-2'>
                                                    Tu Cuenta
                                                    </h4>
                                                <li className="my-1">
                                                    <button className='border-2 p-2 rounded-lg' onClick={handleButtonClick}>
                                                        <Link href="/profile/main">Panel de control</Link>
                                                    </button>
                                                </li>
                                                <li className="my-1">
                                                    <button className='border-2 p-2 rounded-lg' onClick={handleButtonClick}>
                                                        <Link href="/customer">Servicio al Cliente</Link>
                                                    </button>
                                                </li>
                                                <li onClick={handleSignOutClick}>
                                                    <button className='border-2 p-2 rounded-lg'>
                                                        Cerrar Sesión
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Popover.Close className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 outline-none">
                                    <X />
                                </Popover.Close>
                                <Popover.Arrow />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>
            ) : (
                <div className='min-w-[200px]'>
                    <Button>
                        <Link href="/signin">Iniciar sesión</Link>
                    </Button>
                </div>
            )}
        </>
    );
}

export default SigninTool;
