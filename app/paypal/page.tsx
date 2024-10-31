"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PaypalPage() {
  const router = useRouter(); // Optional: Redirect after payment success

  return (
    <div className="w-full h-full flex items-center justify-center">
      <PayPalScriptProvider
        options={{
          clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
              }}
      >
        <PayPalButtons
          style={{ color: "black" }}
          createOrder={async () => {
            const res = await fetch("/api/checkout", {
              method: "POST",
            });
            if (!res.ok) {
              console.error("Failed to create order");
              return ""; // Prevent errors by returning an empty string
            }
            const order = await res.json();
            console.log(order);
            return order.id || ""; // Ensure 'orderID' is returned
          }}
          onApprove={async (data, actions) => {
            try {
              const capture = await actions?.order?.capture(); // Capture the order
              console.log("Order captured:", capture);
              router.push("/success"); 
            } catch (error) {
              console.error("Error capturing order:", error);
            }
          }}
          onCancel={(data)=>{
              console.log("cancelado:",data)
           }

          }
        />
      </PayPalScriptProvider>
    </div>
  );
}
