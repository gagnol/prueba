import type { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Preference } from 'mercadopago';


// Configura MercadoPago con el access token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const body = {
      items: [
        {
          id: 'item-id-123', // Add a unique or placeholder 'id' to satisfy type requirements
          title: req.body.title,
          quantity: req.body.quantity,
          unit_price: req.body.price,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
      },
      auto_return: "approved",
    };

    // Crea la preferencia
    const preference = new Preference(client);
    const result = await preference.create({ body });

    return res.json({ id: result.id });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
