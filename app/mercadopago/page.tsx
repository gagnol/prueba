"use client"
import { Button } from '@/components/ui/button';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useState } from 'react';


interface PreferenceResponse {
    id: string;
  }

  export default function MercadoPagoComponent() {

    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    initMercadoPago(process.env.MERCADOAGO_PUBLIC_KEY!,{
     locale:"es-AR",
      });

      const createMercadoPagoPreference = async (): Promise<string | null> => {
        try {
          const response = await axios.post<PreferenceResponse>('/api/mercadopago/preferences', {
            title: 'bananita',
            quantity: 1,
            price: 100
          });
      
          const { id } = response.data;
          return id;
        } catch (error) {
          console.error('Error al crar MercadoPago preference:', error);
          return null;
        }
      };
const HandleBuy=async ()=>{
    const id = await createMercadoPagoPreference();
    if (id){
        setPreferenceId(id);
    }
}

  return (
    <div>
       <div id="wallet_container"></div>
       <Button onClick={HandleBuy}>Pagar suscripción</Button>
       {preferenceId && 
       <Wallet initialization={{ preferenceId: preferenceId }}  />
       }
      
    </div>
  )
}


