import create from 'zustand';

interface StoreState {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    setEmail: (id: string) => void;
    setId: (id: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;

}

const useUserStore = create<StoreState>((set) => ({
    email: "",
    id: '',
    firstName: '',
    lastName: '',
    setEmail: (email) => set(() => ({ email })),
    setId: (id) => set(() => ({ id })),
    setFirstName: (firstName) => set(() => ({ firstName })),
    setLastName: (lastName) => set(() => ({ lastName })),
}));

export default useUserStore;
