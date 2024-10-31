"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Términos y Condiciones del Servicio de Nexus
      </h1>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Última actualización: 15 de octubre de 2024
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Introducción</h2>
          <p className="text-gray-700">
            Bienvenido a <strong>Nexus</strong>, una plataforma que conecta 
            empresas, periodistas y comunicadores para la gestión y distribución de comunicados.
            Al utilizar nuestros servicios, aceptas estos términos y condiciones.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Planes y Precios</h2>
          <ul className="space-y-4">
            <li className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium">Plan Básico - $50/mes</h3>
              <ul className="list-disc list-inside">
                <li>Envío de hasta 10 comunicados mensuales.</li>
                <li>Acceso limitado a periodistas.</li>
                <li>Reporte básico de aperturas.</li>
                <li>Soporte por correo en 24-48 horas.</li>
              </ul>
            </li>

            <li className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium">Plan Profesional - $100/mes</h3>
              <ul className="list-disc list-inside">
                <li>Envío de hasta 50 comunicados mensuales.</li>
                <li>Acceso a sectores especializados.</li>
                <li>Reportes detallados de impacto.</li>
                <li>Soporte prioritario en 12-24 horas.</li>
              </ul>
            </li>

            <li className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium">Plan Empresarial - $150/mes</h3>
              <ul className="list-disc list-inside">
                <li>Envío ilimitado de comunicados.</li>
                <li>Acceso completo a periodistas internacionales.</li>
                <li>Reportes avanzados con métricas personalizadas.</li>
                <li>Asistencia personalizada y soporte premium.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Registro y Cuenta de Usuario
          </h2>
          <p className="text-gray-700">
            Los usuarios deben proporcionar información precisa al registrarse y
            son responsables de la seguridad de su cuenta.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Pago y Facturación</h2>
          <p className="text-gray-700">
            Las suscripciones se renuevan automáticamente cada mes. Los cambios
            de precios serán notificados con al menos 30 días de anticipación.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cancelación</h2>
          <p className="text-gray-700">
            Los usuarios pueden cancelar su suscripción en cualquier momento.
            El servicio seguirá activo hasta el final del ciclo de facturación.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Uso Aceptable</h2>
          <p className="text-gray-700">
            Está prohibido el uso de la plataforma para enviar spam o contenido
            ilegal. Las cuentas que incumplan podrán ser suspendidas.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Limitación de Responsabilidad
          </h2>
          <p className="text-gray-700">
            Nexus no se hace responsable por daños indirectos. La
            responsabilidad máxima será equivalente a los pagos realizados en
            los últimos 3 meses.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Modificación del Servicio
          </h2>
          <p className="text-gray-700">
            Nexus puede modificar el servicio o los términos en cualquier
            momento, notificando los cambios con anticipación.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            9. Protección de Datos
          </h2>
          <p className="text-gray-700">
            La recopilación y uso de datos se rige por nuestra Política de
            Privacidad. Los usuarios pueden solicitar la eliminación de sus
            datos.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">10. Jurisdicción</h2>
          <p className="text-gray-700">
            Estos términos se rigen por las leyes locales aplicables en la
            jurisdicción del usuario.
          </p>
        </div>
        <Button>
          <Link href="/">
          Volver al inicio
          </Link>
        </Button>
      </section>

      <footer className="mt-8 text-center text-sm text-gray-500">
        Si tienes preguntas, contáctanos a través de nuestro &nbsp;
        <Link href="/customer" className="text-blue-500 underline">
          Sericio al cliente
        </Link>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
