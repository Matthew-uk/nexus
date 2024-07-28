"use client";
import React from "react";
import DashboardLayout from "@/components/dashboardLayout";
import EarnComponent from "@/components/earn";

const EarnPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EarnComponent />
    </DashboardLayout>
  );
};

export default EarnPage;
