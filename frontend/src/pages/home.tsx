import { useEffect, useState } from "react";
import "../index.css";
import { FaBriefcase, FaMapMarkerAlt, FaClipboardCheck } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useJobStore } from "../store/useJobStore";
import toast from "react-hot-toast";

const Home = () => {
  //store state
  const { authUser, logOut } = useAuthStore();
  const {
    jobsData,
    fetchJobs,
    addJob,
    setSelectedUSer,
    selectedUser,
    update,
    deleteJob,
  } = useJobStore();

  // states
  const [openAddField, setOpenAddField] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filteredJobs, setFilteredJobs] = useState<any>(jobsData);
  const [openEditJob, setOpenEditJob] = useState<boolean>(false);
  const [openDeleteJob, setOpenDeleteJob] = useState<boolean>(false);
  //add job data state
  const [jobData, setJobData] = useState({
    author: authUser?.username.userId ?? "",
    companyName: "",
    jobTitle: "",
    description: "",
    location: "",
    status: "applied",
  });
  //update job data state

  const [updateJobData, setUpdateJobData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredJobs(jobsData);
    } else {
      setFilteredJobs(
        jobsData.filter((job: any) => job.status === statusFilter)
      );
    }
  }, [statusFilter, jobsData]);

  //jobs fetching
  useEffect(() => {
    if (authUser) {
      fetchJobs(authUser?.username.userId ?? "");
    }
  }, [authUser]);

  const handleJobAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addJob(jobData);
      setJobData({
        author: authUser?.username.userId ?? "",
        companyName: "",
        jobTitle: "",
        description: "",
        location: "",
        status: "applied",
      });
      fetchJobs(authUser?.username.userId ?? "");
      setOpenAddField(!openAddField);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleJobUpdate = () => {
    try {
      update(selectedUser._id, updateJobData);
      setOpenEditJob(!openEditJob);
      fetchJobs(authUser?.username.userId ?? "");
    } catch (error: any) {
      toast.error(error.message || "something went wrong");
    }
  };

  const handleDeleteJob = () => {
    deleteJob(selectedUser._id);
    setOpenDeleteJob(false);
    fetchJobs(authUser?.username.userId ?? "");
  };

  return (
    <div className="flex flex-col gap-7  justify-center items-center">
      {/* hero section */}
      <div className="flex justify-center items-center w-[600px] max-h-[300px] sm:w-[700px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] max-sm:h-[250px] p-[3rem] bg-purple-700  shadow-2xl border-2  border-transparent rounded-b-[40%]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="sm:text-4xl text-2xl text-white font-bold">
            welcome back {authUser?.username.username}
          </h1>
          <p className="text-lg text-white mt-2">
            Keep an eye on your jobs and stay productive!
          </p>
          <div className="flex mt-4 gap-4">
            <button
              className="ml-4 bg-white text-purple-700 px-4 py-2 rounded-lg shadow-md hover:bg-purple-200 transition duration-300"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setOpenAddField(true);
              }}
            >
              Add Job
            </button>
            <div className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow-md hover:bg-purple-200 transition duration-300">
              <label htmlFor="status">
                <span>Filter by status:</span>
                <select
                  name="status "
                  className="text-red-500 outline-none"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/*logout button */}
        <div className="absolute top-4 right-4">
          <button
            className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow-md hover:bg-purple-200 transition duration-300"
            onClick={() => logOut()}
          >
            Logout
          </button>
        </div>
      </div>

      {/* job cards section */}
      <div className="flex flex-wrap flex-row max-w-[1400px] justify-center items-center gap-7 overflow-hidden">
        {filteredJobs &&
          filteredJobs.map((job: any) => (
            <div
              key={job._id}
              className="flex flex-col w-[300px] h-[400px] bg-purple-500 m-2 rounded-lg shadow-lg outline-4 outline-black outline-offset-3 outline-double relative"
              style={{
                clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 13%)",
              }}
            >
              <div className="flex flex-col items-start justify-center h-ful p-10">
                <h2 className="text-white text-2xl font-semibold mb-2">
                  {job.companyName}
                </h2>
                <div className="text-white flex gap-3 items-center text-sm mb-1">
                  <FaBriefcase />{" "}
                  <span className="font-medium">{job.jobTitle}</span>
                </div>
                <div className="text-white flex gap-3 items-center text-sm mb-1">
                  <FaMapMarkerAlt />{" "}
                  <span className="font-medium"> {job.location} </span>
                </div>
                <div className="text-white flex gap-3 items-center text-sm mb-3">
                  <FaClipboardCheck />{" "}
                  <span className="font-medium"> {job.status}</span>
                </div>

                <p className="text-white text-xl mt-2">{job.description}</p>
              </div>
              <div
                className="flex gap-4 absolute bottom-4 right-4
            "
              >
                <button
                  className="text-2xl text-white hover:text-gray-200"
                  onClick={() => {
                    setOpenEditJob(true);
                    setSelectedUSer(job);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-2xl text-red-200 hover:text-red-400"
                  onClick={() => {
                    setOpenDeleteJob(true);
                    setSelectedUSer(job);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* job adding field */}
      {openAddField && (
        <>
          <div className="fixed inset-0  flex justify-center items-center">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-10">
              <h2 className="text-2xl font-semibold mb-4">Add New Job</h2>
              <form className="flex flex-col gap-4" onSubmit={handleJobAdd}>
                <input
                  type="text"
                  placeholder="Job Title"
                  className="p-2 border border-gray-300 rounded focus:outline-purple-500 "
                  value={jobData.jobTitle}
                  onChange={(e) =>
                    setJobData({ ...jobData, jobTitle: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="p-2 border border-gray-300 rounded focus:outline-purple-500"
                  value={jobData.companyName}
                  onChange={(e) =>
                    setJobData({ ...jobData, companyName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="p-2 border border-gray-300 rounded focus:outline-purple-500"
                  value={jobData.location}
                  onChange={(e) =>
                    setJobData({ ...jobData, location: e.target.value })
                  }
                />
                <div>
                  <label htmlFor="status">Status: </label>
                  <select
                    id="status"
                    className="p-2 border border-gray-300 rounded focus:outline-purple-500"
                    value={jobData.status}
                    onChange={(e) =>
                      setJobData({ ...jobData, status: e.target.value })
                    }
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <textarea
                  placeholder="Job Description"
                  className="p-2 border border-gray-300 rounded h-[100px] focus:outline-purple-500"
                  value={jobData.description}
                  onChange={(e) =>
                    setJobData({ ...jobData, description: e.target.value })
                  }
                ></textarea>
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition duration-300"
                >
                  Add Job
                </button>
              </form>
              <button
                className="mt-4 text-red-500 hover:text-red-700"
                onClick={() => setOpenAddField(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* job edit field */}
      {openEditJob && (
        <>
          <div className="fixed inset-0  flex justify-center items-center">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-10">
              <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
              <form className="flex flex-col gap-4" onSubmit={handleJobUpdate}>
                <input
                  type="text"
                  placeholder={selectedUser.jobTitle}
                  className="p-2 border border-gray-300 rounded focus:outline-purple-500 "
                  value={updateJobData.jobTitle}
                  onChange={(e) =>
                    setUpdateJobData({
                      ...updateJobData,
                      jobTitle: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder={selectedUser.companyName}
                  className="p-2 border border-gray-300 rounded focus:outline-purple-500"
                  value={updateJobData.companyName}
                  onChange={(e) =>
                    setUpdateJobData({
                      ...updateJobData,
                      companyName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder={selectedUser.location}
                  className="p-2 border border-gray-300 rounded focus:outline-purple-500"
                  value={updateJobData.location}
                  onChange={(e) =>
                    setUpdateJobData({
                      ...updateJobData,
                      location: e.target.value,
                    })
                  }
                />
                <div>
                  <label htmlFor="status">Status: </label>
                  <select
                    id="status"
                    className="p-2 border border-gray-300 rounded focus:outline-purple-500"
                    value={updateJobData.status}
                    onChange={(e) =>
                      setUpdateJobData({
                        ...updateJobData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <textarea
                  placeholder={selectedUser.description}
                  className="p-2 border border-gray-300 rounded h-[100px] focus:outline-purple-500"
                  value={updateJobData.description}
                  onChange={(e) =>
                    setUpdateJobData({
                      ...updateJobData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition duration-300"
                >
                  Save Changes
                </button>
              </form>
              <button
                className="mt-4 text-red-500 hover:text-red-700"
                onClick={() => setOpenEditJob(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* job delete field */}
      {openDeleteJob && (
        <>
          <div className="fixed inset-0  flex justify-center items-center">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-10">
              <form onSubmit={handleDeleteJob}>
                <h2 className="text-2xl font-semibold mb-4">Delete Job</h2>
                <p className="mb-4">
                  Are you sure you want to delete this job?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    type="submit"
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                    onClick={() => setOpenDeleteJob(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
