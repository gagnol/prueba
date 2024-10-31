"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, GripHorizontal } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">Demostración de la Aplicación Nexus</h1>

      {/* Sección de Inicio de Sesión/Registro */}
      <Card className="w-[400px] mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Inicia sesión o Regístrate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <Image 
                src="/thumb.png" 
                alt="Descripción de la imagen"
                width={200} 
                height={200} 
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="w-1/2">
              <p className="text-center">
                Comienza registrándote con tu nombre completo, correo electrónico y contraseña.
              </p>
              <Button className="w-full mt-4">
                <Link href="/register">Registrarse Gratis</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Panel de Control */}
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Panel de Control</h2>
        <p>
          Una vez que inicies sesión, tendrás acceso al panel de control para administrar tu cuenta 
          y tus comunicados.
        </p>
        <p>
          Nuestro software te ofrece herramientas avanzadas para la gestión de contactos, análisis 
          de cobertura, y distribución de comunicados con segmentación precisa.
        </p>

        <p className="mt-4 flex">
          En el panel, encontrarás un botón &nbsp;
          <GripHorizontal className="text-indigo-600 border-1" />
          &nbsp;para colapsar la barra lateral.
        </p>
        <ul className="list-disc list-inside ml-5 mt-2">
          <li>Registro de Periodista</li>
          <li>Registro de Comunicador</li>
          <li>Publicar Comunicado</li>
        </ul>

        <h2 className="text-xl font-semibold my-4">Directorio General</h2>
        <p>
          Descubre las publicaciones más recientes que coinciden con tus intereses. Usa nuestros 
          filtros inteligentes para explorar artículos, comunicados de prensa y noticias relevantes 
          para tu sector.
        </p>
        <p className="mt-2">
          Mantente al día con lo último que ocurre en tu industria y accede fácilmente a contenido 
          segmentado, asegurando que nunca te pierdas de información relevante.
        </p>
        <p>
          Podrás ver un directorio de los últimos comunicados con un botón <Eye /> para acceder a 
          los detalles.
        </p>
        <div className="flex justify-center mt-4">
          <Image 
            src="/com.jpg" 
            alt="Ajustes de perfil" 
            width={300} 
            height={300} 
            className="rounded-md"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Mis Comunicados</h2>
  <p>
    Gestiona tus propios comunicados con herramientas avanzadas que te permiten optimizar la distribución y el impacto de tus mensajes. 
    Personaliza cada comunicado con una foto de portada atractiva y utiliza opciones de segmentación por temática, ubicación y alcance 
    para asegurar que lleguen a la audiencia correcta.
  </p>

  <div className="flex justify-center mt-4">
    
  </div>

  <h3 className="mt-6 font-semibold">Opciones Disponibles</h3>
  <ul className="list-disc list-inside ml-5 mt-2">
    <li>
      <strong>Foto de Portada:</strong> Añade imágenes impactantes a cada comunicado para captar la atención de tu audiencia.
    </li>
    <li>
      <strong>Segmentación por Temática:</strong> Elige entre diversas categorías y temas relevantes para asegurar que tu mensaje 
      llegue a los interesados en esos asuntos.
    </li>
    <li>
      <strong>Segmentación por Ubicación:</strong> Filtra tu audiencia según región, país o ciudad para comunicarte con personas específicas.
    </li>
    <li>
      <strong>Alcance:</strong> Define si tu comunicado será de alcance local, nacional o internacional, ajustando la distribución según tus necesidades.
    </li>
    <li>
      <strong>Administración Completa:</strong> Opciones para <strong>ver</strong>, <strong>editar</strong>, o <strong>borrar</strong> cada comunicado con un solo clic.
    </li>
  </ul>

  <h3 className="mt-6 font-semibold">Funciones Adicionales</h3>
  <p>
    Además, puedes monitorear el rendimiento de tus comunicados a través de métricas clave y realizar ajustes en tiempo real para maximizar su efectividad. 
    Únete a nuestra plataforma y transforma la forma en que gestionas tus mensajes.
  </p>
 
      </div>

      {/* Sección de Barra Lateral */}
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold mb-4">Barra Lateral</h2>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <Image 
              src="/barra.png" 
              alt="Barra Lateral"
              width={200} 
              height={200} 
              className="w-[250px] h-[300px] rounded-md"
            />
          </div>
          <div className="w-1/2">
            <p>
              La barra lateral facilita la navegación. Aquí algunos de los íconos disponibles:
            </p>
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>**Dashboard**: Accede al panel de control.</li>
              <li>**Búsqueda de Periodistas**: Encuentra periodistas registrados.</li>
              <li>**Búsqueda de Comunicadores**: Busca comunicadores en la plataforma.</li>
              <li>**Ajustes**: Edita tu avatar y datos personales.</li>
              <li>**Ayuda**: Contacta al servicio al cliente.</li>
            </ul>
          </div>


          
        </div>
              {/* Nueva Sección: Búsqueda de Periodistas y Comunicadores */}
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Encuentra Periodistas y Comunicadores</h2>
        <p>
          Nexus pone a tu disposición una amplia base de datos de periodistas y comunicadores, 
          permitiéndote filtrar por especialización, sector, experiencia, y ubicación.
        </p>
        <p className="mt-2">
          Contacta con miles de usuarios a través de herramientas avanzadas, 
          que facilitan el envío de comunicados y la gestión de relaciones públicas.
        </p>
      </div>
       </div>
       <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajustes de Perfil</h2>
        <p>
          Personaliza tu cuenta editando tu imagen de perfil, actualizando tus datos personales 
          o cambiando tu contraseña. Mantén tu información siempre actualizada para disfrutar de 
          una mejor experiencia en Nexus.
        </p>

        <div className="flex justify-center mt-4">
          <Image 
            src="/settings.png" 
            alt="Ajustes de perfil" 
            width={300} 
            height={300} 
            className="rounded-md"
          />
        </div>

        <ul className="list-disc list-inside ml-5 mt-4">
          <li><strong>Imagen de Perfil:</strong> Sube o cambia tu foto de perfil para mantener una identidad visual coherente.</li>
          <li><strong>Datos Personales:</strong> Edita tu nombre, correo electrónico y otra información de contacto.</li>
          <li><strong>Contraseña:</strong> Cambia o actualiza tu contraseña fácilmente para mantener tu cuenta segura.</li>
        </ul>

        <p className="mt-4">
          Estos ajustes te permiten gestionar tu cuenta de forma sencilla y segura. Accede a la sección 
          de Ajustes desde la barra lateral o el panel de control.
        </p>
      </div>
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Ayuda y Soporte</h2>
        <p>
          ¿Tienes alguna duda o problema? Estamos aquí para ayudarte. En la sección de ayuda 
          puedes enviar un mensaje directo al equipo de soporte, revisar nuestras políticas y términos, 
          y explorar las preguntas frecuentes (FAQ) para obtener respuestas rápidas.
        </p>

        <div className="flex justify-center mt-4">
          <Image 
            src="/call.avif" 
            alt="Sección de Ayuda" 
            width={300} 
            height={300} 
            className="rounded-md"
          />
        </div>

        <div className="mt-6">
          <ul className="list-disc list-inside ml-5">
            <li>
              <strong>Enviar Mensaje:</strong> Ponte en contacto con nuestro equipo de soporte para 
              resolver cualquier duda.
              
            </li>
            <li>
              <strong>Políticas y Términos:</strong> Lee nuestras políticas de privacidad y términos 
              de uso.
              
            </li>
            <li>
              <span className="font-semibold">Preguntas Frecuentes (FAQ):</span> Encuentra respuestas rápidas a las preguntas 
              más comunes.
              
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
}
