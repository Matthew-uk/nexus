"use client";
import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Navbar from '@/components/navbar';
import useUserStore from '@/store/store';
import { useRouter } from 'next/navigation';
import UserInfo from '@/components/userInfo';
import LoadingScreen from '@/components/loading';
import { getUserData } from '@/utils/getUser';
import BottomNav from '@/components/bottomNav';

// Type for user data
export interface UserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    balance: number;
}

const DashboardPage: React.FC = () => {
    const { setFirstName, setLastName, setId, setEmail, setBalance } = useUserStore();
    const router = useRouter();
    const [isTokenChecked, setIsTokenChecked] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
        } else {
            setIsTokenChecked(true);
        }
    }, [router]);

    const { data, isLoading, isError, error } = useQuery<UserData | null, Error>({
        queryKey: ["userdata"],
        queryFn: getUserData,
        enabled: isTokenChecked, // Only run query after token check
    });

    useEffect(() => {
        if (data) {
            setId(data.id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setBalance(data.balance);
        }
    }, [data, setId, setFirstName, setLastName, setEmail]);

    useEffect(() => {
        if (isError) {
            console.log(error);
            router.push("/login");
        }
    }, [isError, error, router]);

    if (!isTokenChecked || isLoading) return <LoadingScreen />;

    if (!data) {
        router.push("/login");
        // Return null to render nothing in case of no data
        return null;
    }

    return (
        <>
            <Navbar />
                <div className="flex justify-center items-center min-h-screen bg-gray-100 md:px-36">
                    <UserInfo data={data} />
                </div>
            <BottomNav />
        </>
    );
};

export default DashboardPage;
