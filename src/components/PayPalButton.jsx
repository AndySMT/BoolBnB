import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, currency, onSuccess, onError }) => {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/config/paypal")
      .then((res) => res.json())
      .then((data) => setClientId(data.clientId))
      .catch((error) =>
        console.error("Errore nel caricamento di PayPal:", error)
      );
  }, []);

  if (!clientId) return <p>Caricamento...</p>;

  return (
    <PayPalScriptProvider
      options={{ "client-id": clientId, currency: currency || "EUR" }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency || "EUR", // Specifica sempre la valuta
                  value: String(amount), // Converte amount in stringa
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={onError}
        style={{ layout: "horizontal" }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
