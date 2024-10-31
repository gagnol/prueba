'use client';

import { useState } from 'react';

const faqs = [
  { question: '¿Qué es Nexus?', answer: 'Nexus es una plataforma que conecta periodistas y comunicadores con empresas para gestionar comunicados y cobertura mediática.' },
  { question: '¿Cómo registro un comunicado de prensa?', answer: 'Inicia sesión en tu cuenta y accede al área de comunicados para subir y distribuir tu comunicado.' },
  { question: '¿Qué tipo de medios pueden acceder?', answer: 'Nexus trabaja con medios de comunicación nacionales e internacionales en diferentes áreas.' },
  { question: '¿Puedo contactar directamente con un periodista?', answer: 'Sí, siempre que ambos estén registrados y se acepte la solicitud de contacto.' },
  { question: '¿Cómo verifico la recepción de mis comunicados?', answer: 'Cada comunicado tiene un historial de entrega y apertura disponible en tu dashboard.' },
  { question: '¿Qué sectores cubre Nexus?', answer: 'Cubrimos sectores como tecnología, economía, salud, entretenimiento y más.' },
  { question: '¿Nexus ofrece reportes de impacto?', answer: 'Sí, generamos reportes automáticos del alcance e impacto de cada comunicado.' },
  { question: '¿Puedo editar un comunicado después de enviarlo?', answer: 'Sí, siempre que el comunicado aún no haya sido distribuido.' },
  { question: '¿Cómo me registro como periodista?', answer: 'Ve a la sección de registro de periodistas, completa tus datos y espera la validación.' },
  { question: '¿Qué debo hacer si tengo problemas con mi cuenta?', answer: 'Contacta a nuestro equipo de soporte a través del formulario de contacto o envíanos un correo.' },
];

export default function Faq() {
  

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
        <section className="faq-section bg-gray-100 p-10 mt-10 rounded-md">
        <h2 className="text-2xl font-semibold mb-5">
            Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-2">
              <button
                className="w-full text-left text-lg font-medium flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>    
  );
}


