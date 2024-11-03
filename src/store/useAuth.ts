import { create } from "zustand";

interface AuthState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}
export const useAuth = create<AuthState>((set) => ({
  accessToken: "",
  setAccessToken: (token: string) => set({ accessToken: token }),
}));
