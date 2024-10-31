"use client"; // Include the 'use client' directive at the top
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCollapsibleStore } from '@/lib/usecollapse';
import { Button } from '@/components/ui/button';
import { GripHorizontal, LayoutDashboard, User, ShoppingBag, HelpCircle, User2, Users } from 'lucide-react';

const menuItems = [
  {
    list: [
      {
        title: "Dashboard",
        path: "/admin/main",
        icon: <LayoutDashboard />,
      },
      {
        title: "Periodistas",
        path: "/admin/periodistas",
        icon: <User2/>,
      },
      {
        title: "Comunicadores",
        path: "/admin/responsables",
        icon: <ShoppingBag />,
      },
      {
        title: "Usuarios",
        path: "/admin/usuarios",
        icon: <Users/>,
      },
      {
        title: "Ayuda",
        path: "/customer",
        icon: <HelpCircle />,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, onClose, onOpen } = useCollapsibleStore();

  return (
    <div
      className={cn(
        'bg-muted/40 hidden lg:block h-screen fixed z-[2] transition-[all] duration-500',
        isOpen ? 'border-r w-[280px] overflow-hidden left-0' : 'w-0 -left-full'
      )}
    >
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Button
            variant='outline'
            className='shrink-0 hidden lg:block mr-3.5'
            onClick={() => {
              if (isOpen) {
                onClose();
              } else onOpen();
            }}
          >
            <GripHorizontal className='h-5 w-5 text-[#5865F2]' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
          <Link href='/' className='flex items-center gap-2 font-semibold mx-2'>
            Volver al Inicio
          </Link>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <ul className="list-none">
              {/* Now correctly map over menuItems[0].list */}
              {menuItems[0].list.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className={`flex gap-1 text-body-medium ${
                      pathname === item.path ? 'bg-gray-200 font-semibold' : 'text-[#5865F2]'
                    }`}
                  >
                    <div className="flex my-2 hover:text-black">
                      <span className='text-[32px]'>{item.icon}</span>
                      <span className='text-gray-800 leading-6 ml-2'>{item.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
