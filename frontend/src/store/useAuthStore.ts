import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { redirect } from "react-router";

interface Data {
  username: string;
  password: string;
}

interface AuthUser {
  message: string;
  username: { userId: string; username: string };
}

interface useAuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;

  isCheckingAuth: boolean;
  signUp: (data: Data) => Promise<void>;
  logIn: (data: Data) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<useAuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log(get().authUser?.username.username); //FIXME
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: Data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      if (get().authUser) redirect("/");
      toast.success(res.data.message);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Sign up failed";
      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data: Data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.username });
      if (get().authUser) redirect("/");
      toast.success(res.data.message);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
