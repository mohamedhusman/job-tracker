import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface Data {
  username: string;
  password: string;
}

interface useAuthStore {
  authUser: string | null;
  isSigningUp: boolean;
  signUp: (data: Data) => Promise<void>;
}

export const useAuthStore = create<useAuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,

  signUp: async (data: Data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res.data.message);
      set({ authUser: res.data.username });

      toast.success("your account successfully created");
    } catch (error) {
      toast.error("signup failed!");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
