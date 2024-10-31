"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="a_page" style={{ position: 'relative', width: '100%', height: '100%' }}>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="w-[350px] h-fit flex-col rounded-[5px]
      my-5 opacity-75 border border-[#666] 
     px-[26px] py-[20px] bg-slate-100 backdrop-blur-lg shadow-xl">
         <h1 className="text-2xl text-black" >Creá una Cuenta</h1>
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-500  p-2 mb-2">{error}</div>}
            <h3 className="bold text-black" style={{ margin: "5px" }} >Tu Nombre</h3>
            <Input
              style={{ marginBottom: "10px" }}
              autoComplete='off'
              type="text"
              placeholder="Tu nombre"
              className="a_input"
              name="name"
            />
            <h3 className="bold text-black" style={{ margin: "5px" }} >Email</h3>
            <Input
              style={{ marginBottom: "10px" }}
              autoComplete='off'
              type="email"
              placeholder="Email"
              name="email"
            />
            <h3 className="bold text-black" style={{ margin: "5px" }} >Contraseña</h3>
            <Input
              style={{ marginBottom: "10px" }}
              autoComplete='off'
              type="password"
              placeholder="Ingesa una contraseña mayor a 6 dígitos"
              name="password"
            />

            <Button type='submit' style={{ width: "100%", marginTop:"10px" }}>
              Registrate
            </Button>
          </form>
          <br />

        
          <h5 className="bold text-black">Ya tenés una cuenta?&nbsp;</h5>
          <Button  asChild >
            <Link href="/signin" >
               Iniciá sesión
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
