"use client";
import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useUserStore from "@/store/store";

interface PaymentComponentInterface {
  email: string;
  phone_number: string;
  name: string;
  amount: number;
}

const PaymentComponent: React.FC<PaymentComponentInterface> = ({
  email,
  phone_number,
  name,
  amount,
}) => {
  const { id } = useUserStore();
  const config = {
    public_key:
      process.env.FLUTTERWAVE_PUBLIC_KEY ||
      "FLWPUBK_TEST-7a5d015bef4166879426e55fac57dbe7-X",
    tx_ref: `TX-${Date.now()}`, // Ensure the tx_ref does not have a period (.)
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number,
      name,
    },
    customizations: {
      title: "Nexus",
      description: "Fund your wallet",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const updateUserBalance = async () => {
    try {
      const response = await axios.post("/api/update/balance", {
        userId: id,
        amount,
      });

      if (response.status === 200) {
        console.log("Balance updated successfully");
      } else {
        console.error("Failed to update balance:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              if (response.status === "completed") {
                console.log("Payment successful:", response);
                updateUserBalance(); // Update the user's balance after successful payment
              } else {
                console.log("Payment failed:", response);
              }
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {
              console.log("Payment modal closed");
            },
          });
        }}>
        Pay Now
      </Button>
    </div>
  );
};

export default PaymentComponent;
