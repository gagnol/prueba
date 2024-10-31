"use client"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, FileText, Send, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { selectPlan } from "@/store/nextSlice";


const plans = [
  {
    name: "Básico",
    price: 119000,
    description: "Para pequeñas empresas",
    features: ["Directorio de contactos", "2 comunicados al mes", "Distribución segmentada", "Soporte"],
  },
  {
    name: "Profesional",
    price: 249000,
    description: "Para empresas en crecimiento",
    features: ["Directorio de contactos", "5 comunicados al mes", "Distribución segmentada", "Análisis de impacto", "Soporte"],
  },
  {
    name: "Full",
    price: 559000,
    description: "Para grandes corporaciones",
    features: ["Directorio de contactos", "Comunicados ilimitados", "Distribución segmentada", "Análisis de impacto", "Soporte prioritario", "API access"],
  },
];





export default function LandingPage() {
  const dispatch = useDispatch
  ();
  const router = useRouter
  ();

  const handleSelectPlan = (plan:any) => {
    dispatch(selectPlan(plan));
    router.push("/paypal");
  };
  return (
    <div className="min-h-screen bg-background">
     <main>
        <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Distribuye tus comunicados de prensa con eficacia
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conecta con periodistas, gestiona tus comunicados y analiza el impacto de tus noticias en una sola plataforma.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg">
              <Link href="/demo">
              <span className="flex"> Ver demo
                 <ArrowRight className="ml-2 h-4 w-4 mt-[2px]" />
                 </span>   
              </Link>
              </Button>
            <Button size="lg" variant="outline">
            <Link href="/register" >
              Registrarse gratis
              </Link>
              </Button>
          </motion.div>
        </section>

        <section id="features" className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
          <h2 className="text-3xl font-bold text-center mb-12">
            Características principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Directorio de contactos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Accede a una amplia base de datos de periodistas y medios de comunicación.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Creación de comunicados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Crea y edita comunicados de prensa con nuestro intuitivo editor.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Send className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Distribución segmentada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Envía tus comunicados a audiencias específicas y relevantes.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart2 className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Análisis de impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Mide y analiza el alcance e impacto de tus comunicados de prensa.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
        <section id="testimonials" className="py-20 px-4 md:px-6 lg:px-8">
  <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        empresa: "Entidad Pública",
        texto: "Gracias a Nexus,hemos optimizado la distribución de nuestros comunicados.Ahora llegamos directamente a los periodistas adecuados,sin dependerde intermediarios.Es simple,rápido y confiable.¡Una herramienta indispensable para nuestras comunicaciones oficiales!.",
        nombre: "",
        funcion: "",
      },
      {
        empresa: "ONG",
        texto: "Desde que usamos Nexus, nuestra capacidad de llegar a los medios ha mejorado enormemente.Podemos segmentar nuestros comunicados según el interés de los periodistas y medios,lo que nos ha ayudado a tener una cobertura más precisa y efectiva.",
        nombre: "",
        funcion: "",
      }, {
        empresa: "Periodista",
        texto: "Nexus ha cambiado mi forma de trabajar.Ahora recibo solo los comunicados que realmente me interesan,de manera organizada y puntual.Es una fuente confiable para estar al tanto de lo que sucede en los sectores que cubro.",
        nombre: "",
        funcion: "",
      },
    ].map(({ empresa, texto}) => (
      <Card key={empresa}>
        <CardHeader>
          <CardTitle>Empresa: {empresa}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="border-l-4 border-gray-300 pl-4
           italic text-base text-muted-foreground mb-4">
           {texto}
          </p>
         
        </CardContent>
      </Card>
    ))}
  </div>
</section>
<section id="pricing" className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
      <h2 className="text-3xl font-bold text-center mb-12">Planes y precios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={plan.name} className={`flex flex-col justify-between h-full ${index === 1 ? "border-primary" : ""}`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">
                ${plan.price.toLocaleString("es-AR")}<span className="text-sm font-normal">/mes</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="mt-auto">
              <Button className="w-full" variant={index === 1 ? "default" : "outline"} onClick={() => handleSelectPlan(plan)}>
                Elegir plan
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>

        <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya están mejorando su estrategia de comunicación con Nexus.
          </p>
          
          <Button size="lg">
            <Link href="/signin">
            <span className="flex">
            Comenzar ahora 
            <ArrowRight className="ml-2 h-4 w-4 mt-1" />
            </span>
            </Link>
          </Button>
          
        </section>
      </main>

      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Nexus</h3>
            <p className="text-sm text-muted-foreground">Transformando la distribución de comunicados de prensa desde 2023.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary">
                <Link href="#features">
                Características
                </Link>
              </li>
              <li className="text-muted-foreground hover:text-primary">
                <Link href="/customer">
                  FAQ
                </Link>
                  </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary">
              <Link href="/about">
                Sobre nosotros
              </Link>
              </li>
              <li className="text-muted-foreground hover:text-primary" >
                <Link href="/customer">
                Contacto
                </Link>
                </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">
              Legal
              </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary">
              <Link href="/terminos">
                Términos de servicio
              </Link>
              </li>
              <li className="text-muted-foreground hover:text-primary">
              <Link href="/aviso">
                Política de privacidad
                </Link>
                </li>
                <li className="text-muted-foreground hover:text-primary">
              <Link href="/cookies">
                Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          © 2023 Nexus. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}