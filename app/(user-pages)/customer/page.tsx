
import ContactForm from '@/components/User-navigation/contactForm';
import Faq from '@/components/User-navigation/faq';
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

 async function Customer() {
    const session = await getServerSession();

    if (!session?.user) {
        redirect("/signin")
    }
    return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4 ">
     <header className="relative flex justify-between 
     h-[60px] text-[16px] bg-gray-200
     p-5 m-5">
    <div className="cs-title">
      <a href="/hz/contact-us/foresight/hubgateway">
      Servicio al cliente
      </a>
      </div>
      </header>
      <div className="page-wrapper hero-banner">
          <div className="px-10">
                    <h1 className="text-2xl font-bold"  >
         Bienvenido al servicio al cliente de Nexus </h1>
                    <p className="header-subtext subtext-container">
         Contactate con nosotros y te responderemos a la brevedad.
                        <a className="hidden-link"  >
                        </a>
                    </p>
       
                    <ContactForm userEmail={session?.user?.email || ''} />
                
                    <div className="grid md:grid-cols-3 md:gap-5 m-8">
                        <div className="flex  p-[12px] rounded-md bg-[#999]">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_login_security_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full ">
                                    <Link href="/aviso">
              POLITICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS
                                    </Link>
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-[#999]">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_account_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full ">
                                    <Link href="/terminos">
                    TERMINOS Y CODICIONES DEL SERVICIO
                                    </Link>
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-[#999]">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_somethingelse_v3.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full  pt-5">
                                        <Link href="/cookies">
                                        POLITICA DE COOKIES
                                        </Link>
                                 </div></div>
                       </div></div></div>
                       
                       
                       </div>
                            <Faq/>                 
                       </div>
                  </div>
    )
}

export default Customer
