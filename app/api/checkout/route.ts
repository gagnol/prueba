import paypal from "@paypal/checkout-server-sdk"
import { NextResponse } from "next/server"

const clientId=process.env.PAYPAL_CLIENT_ID || "";
const clientSecret=process.env.PAYPAL_CLIENT_SECRET || "";

const enviroment =new paypal.core.SandboxEnvironment(clientId,clientSecret)
new paypal.core.PayPalHttpClient(enviroment)
const client =  new paypal.core.PayPalHttpClient(enviroment)

export async function POST(){
 const request = new paypal.orders.OrdersCreateRequest()

request.requestBody({
 intent: "CAPTURE",
        purchase_units:[{
            amount:{
                currency_code:"USD",
                value:"100.00"
            },
            description:"Suscripción Nexus"
        }]
    })
    const response=await  client.execute(request)
    console.log(response)
    const orderId = response.result.id;
    
    return NextResponse.json({
    id:response.result.id
    
    })
}