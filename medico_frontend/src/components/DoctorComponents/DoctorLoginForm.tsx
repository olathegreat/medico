import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "sonner";
import { UserType } from "../../utils/types";
import LoadingButton from "../loadingButton";
import { Toaster } from "../ui/sonner";
import { ResponseType } from "../SignupForm";

const DoctorLoginForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  const [errorMessages, setErrorMessages] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [apiRequest, setApiRequest] = useState(false);
  const navigate = useNavigate();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiRequest(true);
    setErrorMessages(""); 

    try {
      if (userDetails) {
        const response = await axiosInstance.post("/doctor/login-doctor/", userDetails);
        
        const {token} = response.data as ResponseType
        
        sessionStorage.setItem("token", token )
       
        sessionStorage.setItem("doctorId", response.data.data.user._id)
        toast.success("login successful");
        setApiRequest(false);
        setTimeout(() => {
          navigate("/doctor-profile");
        }, 1000);   
      
      } else {
        toast.error("User details are missing")
        throw new Error("User details are missing");
        
      }
    } catch (err: any) {
        console.log(err?.response?.data?.message)
        setErrorMessages(err?.response?.data?.message);
        
      

      setApiRequest(false);
    }
  };

  return (
    <form
      onSubmit={formSubmit}
      className="flex flex-col gap-4 text-gray-700 rounded-md shadow p-4 md:p-12 border-gray-400 border w-full sm:w-[400px]"
    >
      <Toaster visibleToasts={1} position="top-right" richColors />
      <div className="flex ">
        <span className=" font-medium text-xl">Doctor</span>
        <span className="ml-2 text-green-700 font-medium text-xl">Login</span>
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
            errorMessages?.includes("email") ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errorMessages?.includes("email") && (
          <span className="text-red-600 text-xs text-start">{errorMessages}</span>
        )}
      </div>


      {/* Password Field */}
      <div className="flex flex-col gap-1 justify-start">
        <label
          className={`${
            errorMessages?.includes("password") ? "text-red-600" : "text-gray-800"
          } text-start text-xs`}
        >
          Password
        </label>
        <div
          className={`flex  p-1 border rounded-md ${
            errorMessages?.includes("password") ? "border-red-500" : "border-gray-400"
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
          <span className="text-red-600 text-xs text-start">{errorMessages}</span>
        )}
      </div>

      <button className="bg-green-500 py-1 px-4 text-white rounded-md flex justify-center" disabled={apiRequest}>
        {apiRequest ? <LoadingButton /> : "Log In"}
      </button>

      <div>
        Admin login
        <span onClick={()=>navigate("/admin-login")} className="ml-2 cursor-pointer text-green-500">
          Click here
        </span>
      </div>
    </form>
  );
};

export default DoctorLoginForm;
