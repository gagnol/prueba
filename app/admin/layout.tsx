'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Admin-navigation/sidebar';
import { useCollapsibleStore } from '@/lib/usecollapse';
import { Wand, GripVertical, LayoutDashboard, User2, ShoppingBag, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge'; 
import useContactCount from '@/components/Admin-navigation/contactcount'; 

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useCollapsibleStore();
  
  // Usar el hook para obtener la cantidad de contactos
  const { count: contactCount, error } = useContactCount();

  return (
    <section className="relative z-2">
      <Sidebar/>
      <main
        className={cn(
          'flex flex-1 flex-col transition-[margin-left] duration-500 delay-0 ease-in-out',
          isOpen ? 'lg:ml-[280px]' : 'lg:ml-0'
        )}
      >
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6 sticky top-0 z-[3]">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <GripVertical className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/profile/main"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname.includes('/profile/main') && 'text-primary bg-indigo-200'
                  )}
                >
                  <LayoutDashboard />
                  Dashboard
                </Link>
                <Link
                  href="/profile/periodistas"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname.includes('/profile/periodistas') && 'bg-indigo-200 text-primary'
                  )}
                >
                  <User2 />
                  Periodistas
                </Link>
                <Link
                  href="/profile/responsables"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname.includes('/profile/responsables') && 'bg-indigo-200 text-primary'
                  )}
                >
                  <ShoppingBag />
                  Comunicadores
                 
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Button
            variant="outline"
            className={cn(
              'shrink-0 hidden transition-[transform_display]',
              isOpen ? 'scale-0 hidden' : 'lg:scale-100 lg:flex delay-500'
            )}
            onClick={() => (isOpen ? onClose() : onOpen())}
          >
            <Wand className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          <div className="flex justify-between gap-4 sm:gap-8 md:gap-9 z-10">
            <h1 className="text-4xl font-semibold">Panel de Administrador</h1>
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Link href="/admin/mensajes">
                  <Bell className="h-6 w-6" />
                </Link>
                 {/* Agregar el Badge aquí */}
                 <Badge>{contactCount}</Badge>
              </Button>
            </div>
          </div>
        </header>
        {children}
      </main>
    </section>
  );
}
