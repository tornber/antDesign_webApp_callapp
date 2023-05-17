import {create} from 'zustand'

interface Address {
    street: string;
    city: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    address: Address;
    phone: string;
}

interface StoreState {
    userData: User[];
    changeUserData: (userData: User[]) => void;
    isChanged: boolean;
    setIsChanged: (isChanged: boolean) => void;
}

const useUsersStore = create<StoreState>((set) => ({
    userData: [],
    changeUserData: (userData: User[]) => set({ userData }),
    isChanged: false,
    setIsChanged: (isChanged: boolean) => set({isChanged: !isChanged})
}))

export default useUsersStore;