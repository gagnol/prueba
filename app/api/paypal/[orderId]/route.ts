// app/api/paypal/[orderId]/route.ts
import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID || "";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const request = new paypal.orders.OrdersGetRequest(orderId);

  try {
    const response = await client.execute(request);
    const { id, status, purchase_units } = response.result;
    const { description, amount } = purchase_units[0];

    return NextResponse.json({
      id,
      status,
      description,
      amount: amount.value,
    });
  } catch (error) {
    console.error("Error fetching PayPal order:", error);
    return NextResponse.json({ error: "No se pudo obtener la orden" }, { status: 500 });
  }
}
