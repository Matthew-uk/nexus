import { create } from "zustand";

interface StoreState {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  balance: number;
  isSubscribed: boolean;
  setEmail: (id: string) => void;
  setId: (id: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setBalance: (id: number) => void;
  setSubscribe: (id: boolean) => void;
}

const useUserStore = create<StoreState>((set) => ({
  email: "",
  id: "",
  firstName: "",
  lastName: "",
  balance: 0,
  isSubscribed: false,
  setEmail: (email) => set(() => ({ email })),
  setId: (id) => set(() => ({ id })),
  setFirstName: (firstName) => set(() => ({ firstName })),
  setLastName: (lastName) => set(() => ({ lastName })),
  setBalance: (balance) => set(() => ({ balance })),
  setSubscribe: (isSubscribed) => set(() => ({ isSubscribed })),
}));

export default useUserStore;
