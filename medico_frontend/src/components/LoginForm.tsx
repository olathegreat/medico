import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from "sonner";
import { UserType } from "../utils/types";
import LoadingButton from "./loadingButton";
import { ResponseType } from "./SignupForm";
import { useDispatch, useSelector } from "react-redux";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";
import { saveUser, setRedirectUrl } from "../utils/appSlice";

const LoginForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  const [errorMessages, setErrorMessages] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [apiRequest, setApiRequest] = useState(false);
  const navigate = useNavigate();
  const redirectUrl = useSelector((state: any) => state.app.redirectUrl);
  const dispatch = useDispatch();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiRequest(true);
    setErrorMessages("");

    try {
      if (userDetails) {
        const response = await axiosInstance.post("/user/login/", userDetails);

        const { token } = response.data as ResponseType;

        sessionStorage.setItem("token", token);
        
        
        dispatch(saveUser(response.data.data.user));
        
        setApiRequest(false);
        
        
        setTimeout(() => {
          navigate(`${redirectUrl}`); 
          console.log(redirectUrl);
        }, 1000);

        toast.success("login successful");
            dispatch(setRedirectUrl(""));
          
            // navigate("/profile");
          
        
      } else {
        toast.error("User details are missing");
        throw new Error("User details are missing");
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      setErrorMessages(err?.response?.data?.message);

      setApiRequest(false);
    }
  };

    const darkMode = DarkModeSetterFunction()
  return (
    <form
      onSubmit={formSubmit}
      className={`flex flex-col gap-4 rounded-md shadow p-4 md:p-12 border-gray-400 border w-full sm:w-[400px] ${darkMode && "bg-white text-gray-700"}`}
    >
      <div className="flex flex-col gap-0 items-start">
        <span className="text-green-700 font-medium text-xl">Login</span>
        <span className="text-gray-800 text-xs">
          Please login to book an appointment
        </span>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2 justify-start">
        <label
          className={`${
            errorMessages?.includes("email") ? "text-red-600" : "text-gray-800"
          } text-start text-xs`}
        >
          Email
        </label>
        <input
          type="email"
          value={userDetails?.email || ""}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              email: e.target.value,
            } as UserType)
          }
          className={`border p-1 rounded-md outline-none ${
            errorMessages?.includes("email")
              ? "border-red-500"
              : "border-gray-400"
          }`}
        />
        {errorMessages?.includes("email") && (
          <span className="text-red-600 text-xs text-start">
            {errorMessages}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1 justify-start">
        <label
          className={`${
            errorMessages?.includes("password")
              ? "text-red-600"
              : "text-gray-800"
          } text-start text-xs`}
        >
          Password
        </label>
        <div
          className={`flex  p-1 border rounded-md ${
            errorMessages?.includes("password")
              ? "border-red-500"
              : "border-gray-400"
          }`}
        >
          <input
            type={passwordShow ? "text" : "password"}
            value={userDetails?.password || ""}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              } as UserType)
            }
            className="flex-1 outline-none items-center"
          />
          <span className="cursor-pointer">
            {passwordShow ? (
              <EyeClosed
                className="mt-1 w-4 h-4 text-gray-500"
                onClick={() => setPasswordShow(false)}
              />
            ) : (
              <Eye
                className="w-4 h-4 mt-1 text-gray-500"
                onClick={() => setPasswordShow(true)}
              />
            )}
          </span>
        </div>

        {errorMessages?.includes("password") && (
          <span className="text-red-600 text-xs text-start">
            {errorMessages}
          </span>
        )}
      </div>

      <button
        className="bg-green-500 py-2 px-4 text-white rounded-md flex justify-center"
        disabled={apiRequest}
      >
        {apiRequest ? <LoadingButton /> : "Log In"}
      </button>

      <div className="text-gray-700">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-500">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
