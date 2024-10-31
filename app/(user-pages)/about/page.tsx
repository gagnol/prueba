"use client";
import Link from "next/link";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>

      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 leading-7">
            Nexus nació con el propósito de conectar empresas, periodistas 
            y comunicadores en un espacio eficiente para la gestión de prensa y la 
            distribución de comunicados. Nuestra misión es simplificar la interacción 
            entre los medios y las organizaciones, asegurando una comunicación clara, 
            precisa y oportuna.
          </p>
        </div>

        <div>
          
        </div>
      </section>

      <section className="mt-16 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-7">
            Nuestra misión es ofrecer a las empresas y periodistas una plataforma 
            integral para la gestión de prensa, facilitando el envío de comunicados, 
            la cobertura mediática y el acceso a contactos relevantes en la industria.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
          <ul className="list-disc list-inside space-y-3">
            <li>Transparencia: Creemos en una comunicación clara y honesta.</li>
            <li>Innovación: Nos esforzamos por ofrecer soluciones modernas.</li>
            <li>Colaboración: Fomentamos alianzas entre medios y empresas.</li>
            <li>Compromiso: Nos dedicamos a ofrecer un servicio de calidad.</li>
          </ul>
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
        
          <h3 className="font-semibold text-lg mt-4">Innovación</h3>
          <p className="text-center text-gray-600 mt-2">
            Nos mantenemos a la vanguardia tecnológica para ofrecer las mejores herramientas.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mt-4">Colaboración</h3>
          <p className="text-center text-gray-600 mt-2">
            Fomentamos un entorno de trabajo colaborativo con nuestros socios y usuarios.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mt-4">Servicio de Calidad</h3>
          <p className="text-center text-gray-600 mt-2">
            Nuestro equipo está comprometido en brindar la mejor atención posible.
          </p>
        </div>
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© 2024 Nexus. Todos los derechos reservados.</p>
        <p>
          <Link href="/customer"  className="text-blue-500 underline">
            Contáctanos
          </Link>{" "}
          para más información.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
