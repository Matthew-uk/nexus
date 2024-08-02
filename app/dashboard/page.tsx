"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Navbar from "@/components/navbar";
import useUserStore from "@/store/store";
import { useRouter } from "next/navigation";
import UserInfo from "@/components/userInfo";
import LoadingScreen from "@/components/loading";
import { getUserData } from "@/utils/getUser";
import BottomNav from "@/components/bottomNav";
import { toast } from "react-toastify";

// Type for user data
export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
}

const DashboardPage: React.FC = () => {
  const { setFirstName, setLastName, setId, setEmail, setBalance } =
    useUserStore();
  const router = useRouter();
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  // Check for token and update state
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsTokenChecked(true);
    }
  }, [router]);

  // Fetch user data
  const { data, isLoading, isError, error } = useQuery<UserData | null, Error>({
    queryKey: ["userdata"],
    queryFn: getUserData,
    enabled: isTokenChecked, // Only run query after token check
  });

  // Update user store with fetched data
  useEffect(() => {
    if (data) {
      updateUserStore(data);
    }
  }, [data]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error("Error fetching user data:");
      router.push("/login");
    }
  }, [isError, error, router]);

  // Update user store
  const updateUserStore = (userData: UserData) => {
    setId(userData.id);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setBalance(userData.balance);
  };

  if (!isTokenChecked || isLoading) return <LoadingScreen />;

  if (!data) {
    router.push("/login");
    return null; // Return null to render nothing in case of no data
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen bg-gray-100 md:px-36'>
        <UserInfo data={data} />
      </div>
      <BottomNav />
    </>
  );
};

export default DashboardPage;
