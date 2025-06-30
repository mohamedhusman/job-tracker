import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface Data {
  author: string;
  companyName: string;
  jobTitle: string;
  description: string;
  location: string;
  status: string;
}

interface UseJobStore {
  jobsData: any | null;
  fetchJobs: (id: string) => void;
  addJob: (data: Data) => void;
  update: (id: string, data: any) => void;
  selectedUser: any | null;
  setSelectedUSer: (user: any) => void;
  deleteJob: (id: string) => void;
}

export const useJobStore = create<UseJobStore>((set, get) => ({
  jobsData: null,
  selectedUser: null,
  fetchJobs: async (id) => {
    try {
      const res = await axiosInstance.post("job/getjobs", { id: id });
      set({ jobsData: res.data });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      console.log(error);
      toast.error(message);
    }
  },

  addJob: async (data) => {
    try {
      const res = await axiosInstance.post("job/addjob", data);
      toast.success("Job added successfully");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      console.log(error);
      toast.error(message);
    }
  },

  update: async (id: string, data) => {
    try {
      const res = await axiosInstance.put(`job/updatejob/${id}`, data);
      console.log(res.data);
      toast.success(res?.data.message || "Job updated successfully");
    } catch (error: any) {
      // console.log(error, "Problem in updating job");
      toast.error(error.data.message || "something went wrong");
    }
  },

  deleteJob: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`job/deletejob/${id}`);
      toast.success(res?.data.message || "Job deleted successfully");
    } catch (error: any) {
      toast.error(error.data.message || "something went wrong");
    }
  },

  setSelectedUSer: (user) => set({ selectedUser: user }),
}));
