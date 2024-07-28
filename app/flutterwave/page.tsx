"use client"
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Button } from '@/components/ui/button';

const PaymentComponent: React.FC = () => {
    const config = {
        public_key: process.env.FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-7a5d015bef4166879426e55fac57dbe7-X",
        tx_ref: `TX-${Date.now()}`, // Ensure the tx_ref does not have a period (.)
        amount: 500,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: 'esaduviedede@gmail.com',
            phone_number: '09018946396',
            name: 'john doe',
        },
        customizations: {
            title: 'Nexus',
            description: 'Fund your wallet',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    return (
        <div>
            <Button
                onClick={() => {
                    handleFlutterPayment({
                        callback: (response) => {
                            console.log(response);
                            if (response.status === 'successful') {
                                // Handle successful payment here
                            }
                            closePaymentModal(); // this will close the modal programmatically
                        },
                        onClose: () => {
                            console.log('Payment modal closed');
                        },
                    });
                }}
            >
                Pay Now
            </Button>
        </div>
    );
};

export default PaymentComponent;
