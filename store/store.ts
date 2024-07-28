import {create} from 'zustand';

interface StoreState {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    balance: number;
    setEmail: (id: string) => void;
    setId: (id: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setBalance: (id: number) => void;
}

const useUserStore = create<StoreState>((set) => ({
    email: "",
    id: '',
    firstName: '',
    lastName: '',
    balance: 0,
    setEmail: (email) => set(() => ({ email })),
    setId: (id) => set(() => ({ id })),
    setFirstName: (firstName) => set(() => ({ firstName })),
    setLastName: (lastName) => set(() => ({ lastName })),
    setBalance: (balance) => set(() => ({ balance })),
}));

export default useUserStore;
