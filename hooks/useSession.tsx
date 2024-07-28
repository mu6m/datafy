import { create } from "zustand";
import { persist, StateStorage } from "zustand/middleware";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";

interface UserStore {
	user: any | null;
	setUser: (user: any | null) => void;
}

const cookiesStorage: StateStorage = {
	getItem: (name: string) => {
		const value = getCookie(name);
		return value ? JSON.parse(value) : null;
	},
	setItem: (name: string, value: string) => {
		setCookie(name, JSON.stringify(value));
	},
	removeItem: (name: string) => {
		removeCookie(name);
	},
};

const useSession = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{
			storage: cookiesStorage,
			name: "user-storage",
		}
	)
);

export default useSession;
