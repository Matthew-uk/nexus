"use client";
import React from "react";
import DashboardLayout from "@/components/dashboardLayout";
import EarnComponent from "@/components/earn";
import PaymentComponent from "@/app/flutterwave/page";

const EarnPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EarnComponent />
      <PaymentComponent
        amount={5000}
        email='ukarionisofienm@gmail.com'
        name='Tesla Boss'
        phone_number='09018946396'
      />
    </DashboardLayout>
  );
};

export default EarnPage;
