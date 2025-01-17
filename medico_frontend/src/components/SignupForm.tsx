import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from "sonner";
import { UserType } from "../utils/types";
import LoadingButton from "./loadingButton";
import { Toaster } from "./ui/sonner";
import { AxiosResponse } from "axios";

export interface ResponseType extends AxiosResponse {
  token: string;
}

const SignupForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [passwordShow, setPasswordShow] = useState(false);
  const [apiRequest, setApiRequest] = useState(false);
  const navigate = useNavigate();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiRequest(true);
    setErrorMessages({}); // Clear previous errors on form submission

    try {
      if (userDetails) {
        const response = await axiosInstance.post("/user/", userDetails);
        
        const  token  = response.data.token;
        sessionStorage.setItem("token", token);
        toast.success("Registration successful");
        setApiRequest(false);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        throw new Error("User details are missing");
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
      let messages: { [key: string]: string } = {};
      const errorDetails = err.response?.data?.errors;
      if (err.response?.data?.message) {
        if (err.response?.data?.message?.includes("Email")) {
          messages.email = err.response?.data?.message;
          setErrorMessages(messages);
          console.log(errorMessages);
        }
      }
      if (err.response?.data?.errors) {
        // Check for specific field errors and update the errorMessages state
        if (errorDetails.password) {
          messages.password = errorDetails.password.message;
        }
        if (errorDetails.email) {
          messages.email = errorDetails.email.message;
        }
        if (errorDetails.fullname) {
          messages.fullname = errorDetails.fullname.message;
        }
        if (errorDetails.phone) {
          messages.phone = errorDetails.phone.message;
        }

        setErrorMessages(messages);
      }
      // else {
      //   setErrorMessages({ general: "An error occurred during registration." });
      // }

      setApiRequest(false);
    }
  };

  return (
    <form
      onSubmit={formSubmit}
      className="flex flex-col gap-4 rounded-md shadow p-4 md:p-12 border-gray-400 border w-full sm:w-[400px]"
    >
      <Toaster visibleToasts={1} position="top-right" richColors />
      <div className="flex flex-col gap-0 items-start">
        <span className="text-green-700 font-medium text-xl">
          Create Account
        </span>
        <span className="text-gray-800 text-xs">
          Please sign up to book an appointment
        </span>
      </div>

      {/* Full Name Field */}
      <div className="flex flex-col gap-2 justify-start">
        <label
          className={`${
            errorMessages.fullname ? "text-red-600" : "text-gray-800"
          } text-start text-xs`}
        >
          Full Name
        </label>
        <input
          type="text"
          value={userDetails?.fullname || ""}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              fullname: e.target.value,
            } as UserType)
          }
          className={`p-1 border rounded-md outline-none ${
            errorMessages.fullname ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errorMessages.fullname && (
          <span className="text-red-600 text-xs text-start">
            {errorMessages.fullname}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2 justify-start">
        <label
          className={`${
            errorMessages.email ? "text-red-600" : "text-gray-800"
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
            errorMessages.email ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errorMessages.email && (
          <span className="text-red-600 text-xs text-start">
            {errorMessages.email}
          </span>
        )}
      </div>

      {/* Phone Field */}
      <div className="flex flex-col gap-2 justify-start">
        <label
          className={`${
            errorMessages.phone ? "text-red-600" : "text-gray-800"
          } text-start text-xs`}
        >
          Phone
        </label>
        <input
          type="text"
          value={userDetails?.phone || ""}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              phone: e.target.value,
            } as UserType)
          }
          className={`p-1 border rounded-md outline-none ${
            errorMessages.phone ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errorMessages.phone && (
          <span className="text-red-600 text-xs text-start">
            {errorMessages.phone}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1 justify-start">
        <label
          className={`${
            errorMessages.password ? "text-red-600" : "text-gray-800"
          } text-start text-xs`}
        >
          Password
        </label>
        <div
          className={`flex p-1 border rounded-md ${
            errorMessages.password ? "border-red-500" : "border-gray-400"
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

        {errorMessages.password && (
          <span className="text-red-600 text-xs text-start">
            {errorMessages.password}
          </span>
        )}
      </div>

      <button
        className="bg-green-500 py-2 px-4 text-white rounded-md flex justify-center"
        disabled={apiRequest}
      >
        {apiRequest ? <LoadingButton /> : "Create Account"}
      </button>

      <div>
        Already have an account?{" "}
        <Link to="/login" className="text-green-500">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
