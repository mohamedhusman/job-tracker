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
}

export const useJobStore = create<UseJobStore>((set, get) => ({
  jobsData: [],
  fetchJobs: async (id) => {
    try {
      const res = await axiosInstance.post("job/getjobs", { id: id });
      set({ jobsData: res.data });
    } catch (error) {
      console.log(error, "Problem in fetching jobs");
    }
  },

  addJob: async (data) => {
    try {
      const res = await axiosInstance.post("job/addjob", data);
      console.log(res.data);
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
      toast.success("Job updated successfully");
    } catch (error) {
      console.log(error, "Problem in updating job");
      toast.error("something went wrong");
    }
  },
}));
