import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("username is required");
    if (!formData.password.trim()) return toast.error("password is required");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signUp(formData);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full ">
      <p className="text-purple-700 font-mono text-5xl text-center shadow-xs tracking-tight mb-5 sm:mb-10">
        Create New Account Track your Jobs!
      </p>

      <form
        className="bg-white rounded-sm w-[360px] sm:w-[450px] py-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col  py-2  mx-5  ">
          <label className="text-sm sm:text-lg font-sans">username</label>
          <input
            type="text"
            className=" h-[2rem] sm:h-[3rem] px-2 border-1 border-purple-900 rounded-lg py-1.5 text-xs sm:text-[1rem]"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col  py-2  mx-5 ">
          <label className="text-sm font-sans sm:text-lg">password</label>
          <input
            type="password"
            className=" h-[2rem] sm:h-[3rem]  px-2 border-1 border-purple-900 rounded-lg py-1.5 text-xs sm:text-[1rem]"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="flex mx-5 justify-center my-2">
          <button
            type="submit"
            className=" px-5 py-2 sm:py-3.5 bg-purple-500  w-full mx-2 rounded-xl text-white text-sm sm:text-lg hover:bg-purple-800 "
          >
            {isSigningUp ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        <div className="flex  justify-start my-2">
          <Link
            className=" px-5 text-purple-800 font-extralight text-xs sm:text-[1rem] underline"
            to="/login"
          >
            Already have an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
