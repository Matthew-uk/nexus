import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUserData, UserData } from "@/utils/getUser";
import useUserStore from "@/store/store";

export const useAuth = () => {
  const {
    setFirstName,
    setLastName,
    setId,
    setEmail,
    setBalance,
    setSubscribe,
  } = useUserStore();
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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userdata"],
    queryFn: getUserData,
    enabled: isTokenChecked,
  });

  useEffect(() => {
    if (data) {
      updateUserStore(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    }
  }, [isError, error, router]);

  const updateUserStore = (userData: UserData) => {
    setId(userData.id);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setBalance(userData.balance);
    setSubscribe(userData.isSubscribed);
  };

  return { isTokenChecked, isLoading, data };
};
