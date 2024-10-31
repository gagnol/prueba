'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/User-navigation/sidebar';
import { useCollapsibleStore } from '@/lib/usecollapse';
import { useState } from 'react';
import {
  User,
  Wand,
  Loader2,
  Plus,
  GripVertical,
  LayoutDashboard,
  User2,
  ShoppingBag,  
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useCollapsibleStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="relative z-2">
      <Sidebar />
      <main
        className={cn(
          'flex flex-1 flex-col transition-[margin-left] duration-500 ease-in-out',
          isOpen ? 'lg:ml-[280px]' : 'lg:ml-0'
        )}
      >
        <header
          className="flex flex-wrap items-center justify-between gap-4 border-b bg-white p-4 lg:h-[60px] 
            lg:px-6 sticky top-0 z-[3]"
        >
          {/* Menu Toggle Button (Mobile) */}
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

          {/* Sidebar Toggle Button (Desktop) */}
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

          {/* Actions Section */}
          <div className="flex flex-wrap items-end gap-4 sm:gap-6">
            
            <Link href="/profile/crear" className="block">
              <Button onClick={handleClick}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> &nbsp; Loading...
                  </>
                ) : (
                  <>
                    <Plus /> &nbsp; Crear Comunicado
                  </>
                )}
              </Button>
            </Link>
          </div>
        </header>
        {children}
      </main>
    </section>
  );
}
