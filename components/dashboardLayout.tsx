import React, { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/loading";
import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isTokenChecked, isLoading, data } = useAuth();

  if (!isTokenChecked || isLoading) return <LoadingScreen />;

  if (!data) return null;

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen bg-gray-100 md:px-36 font-poppins'>
        {children}
      </div>
      <BottomNav />
    </>
  );
};

export default DashboardLayout;
