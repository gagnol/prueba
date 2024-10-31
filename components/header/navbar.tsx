"use client";
import Image from "next/image";
import SigninTool from "./SigninTool";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="py-6 px-4 md:px-6 lg:px-8 flex justify-between items-center">
    <div className="text-2xl font-bold">
      	<Link href="/">
        <Image src='/logonuevo.jpg' alt='logo' width={170} height={100} priority/>
        </Link>
        </div>
        {pathname === "/" && (
       <nav className="hidden md:flex space-x-4">
         <a href="#features" className="text-muted-foreground hover:text-primary">Características</a>
         <a href="#testimonials" className="text-muted-foreground hover:text-primary">Testimonios</a>
         <a href="#pricing" className="text-muted-foreground hover:text-primary">Precios</a>
       </nav>
         )}
      <SigninTool/>
     </header>
  );
};

export default Navbar;
