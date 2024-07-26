"use client";

import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; 
import Cookies from "js-cookie";
import Navbar from '@/components/navbar';
import useUserStore from '@/store/store';
import { useRouter } from 'next/navigation';
import UserInfo from '@/components/userInfo';

// Type for user data
export interface UserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

// Function to fetch user data
const fetchUserData = async (): Promise<UserData | null> => {
    const token = Cookies.get("token");
    if (!token) {
        return null; // Handle the absence of token outside
    }
    const response = await axios.get<UserData>("/api/auth/getUser", {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// Loading component
const Loading: React.FC = () => (
    <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></div>
        </div>
    </div>
);

// UserInfo component to display user information


const DashboardPage: React.FC = () => {
    const { setFirstName, setLastName, setId, setEmail } = useUserStore();
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
        queryFn: fetchUserData,
        enabled: isTokenChecked, // Only run query after token check
    });

    useEffect(() => {
        if (data) {
            setId(data.id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
        }
    }, [data, setId, setFirstName, setLastName, setEmail]);

    useEffect(() => {
        if (isError) {
            console.log(error);
            router.push("/login");
        }
    }, [isError, error, router]);

    if (!isTokenChecked || isLoading) return <Loading />;

    if (!data) {
        // Return null to render nothing in case of no data
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 md:px-36">
                <UserInfo data={data} />
            </div>
        </>
    );
};

export default DashboardPage;
