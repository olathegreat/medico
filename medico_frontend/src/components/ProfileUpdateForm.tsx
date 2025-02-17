import { useEffect, useRef, useState } from "react";
import { Toaster } from "./ui/sonner";
import { UserCircle } from "lucide-react";

import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axios";
import LoadingButton from "./loadingButton";
import { toast } from "sonner";
import { saveUser } from "../utils/appSlice";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";

interface FormDataType {
  _id?: string | undefined;
  fullname: string;
  email: string;
  address?: string;
  gender?: "male" | "female" | "other";
  phone?: string;
  birthday?: string;
  picture?: File | string;
}

const ProfileUpdateForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [existingUserData, setExistingUserData] = useState<FormDataType>({
    email: "",
    fullname: "",
  });
  const [formActive, setFormActive] = useState(false);
  const storedUser = useSelector((state: any) => state.app.user);
  const [formLoading, setFormLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [requestLoading, setRequestLoading] = useState(true);
  const darkMode = DarkModeSetterFunction();
 

  useEffect(() => {
    setRequestLoading(true)
    setExistingUserData(storedUser);
    if(storedUser?.email !== undefined){
        setRequestLoading(false)
      
    }	
    setPreviewImage(storedUser?.picture);
  }, [storedUser]);

  const profileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const updatedFormData = new FormData();
    if(existingUserData === storedUser){
        toast.error("change a data");

        return;
    }

    setFormLoading(true);

    updatedFormData.append("fullname", existingUserData.fullname);

    updatedFormData.append("email", existingUserData.email);
    if (existingUserData.picture instanceof File) {
      updatedFormData.append("picture", existingUserData.picture);
    }
    if (existingUserData.address) {
      updatedFormData.append("address", existingUserData.address);
    }
    if (existingUserData.gender) {
      updatedFormData.append("gender", existingUserData.gender);
    }
    if (existingUserData.birthday) {
      updatedFormData.append("birthday", existingUserData.birthday);
    }
    if (existingUserData.phone) {
      updatedFormData.append("phone", existingUserData.phone);
    }

    try {
      const token = sessionStorage.getItem("token");
      const bearerToken = token ? "Bearer " + token : "";
      const res = await axiosInstance.patch("/user/", updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: bearerToken,
        },
      });
      console.log(res);
      toast.success("Updated Successfully");
      dispatch(saveUser({ ...existingUserData, picture: previewImage }));

      setFormLoading(false);
      setFormActive(false);
    } catch (err) {
      console.log(err);
      setFormLoading(false);
    }
  };

  // if(!storedUser){
  //   return <LoadingButton color="green"/>
  // }

  return (
  <div>
      {
      requestLoading ? <div className="flex justify-center items-center"> <LoadingButton color="#16a34a"/> </div> :
    
    
    <form
      onSubmit={profileUpdate}
      className="md:w-[400px] px-4 md:px-10 flex flex-col gap-5"
    >
      <Toaster />
      
       
      <div>
        <label
          htmlFor="picture"
          className="relative block cursor-pointer rounded-md w-40 border border-gray-500
          h-40 group overflow-hidden"
        >
          <span
            className="absolute bottom-0 z-30  flex items-center justify-center right-0 top-0 left-0 
           rounded-full p-2  bg-white-600 opacity-0 group-hover:opacity-50"
          >
            <UserCircle
              color="white"
              width={80}
              height={80}
              onClick={() => fileInputRef.current?.click()}
            />
          </span>

          {previewImage && typeof previewImage === "string" ? (
            <img
              src={previewImage}
              className="w-40 h-40 rounded-md object-cover"
              alt="profile-pics"
            />
          ) : (
            <span className=" text-8xl sm:text-5xl w-full h-full text-white  bg-green-600 flex items-center  justify-center">
              {existingUserData?.fullname?.charAt(0)}
            </span>
          )}
        </label>
        <input
          disabled={!formActive}
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];

              const previewUrl = URL.createObjectURL(file);

              setPreviewImage(previewUrl); // Set the preview URL for display

              setExistingUserData((prevData) => ({
                ...prevData,
                picture: file, // Store the actual file for backend upload
              }));
            }
          }}
          name="picture"
          hidden
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 sm:gap-10">
          {/* <label className="font-semibold">Full Name</label> */}
          <input
            disabled={!formActive}
            type="text"
            placeholder="Fullname"
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                fullname: e.target.value,
              });
            }}
            value={existingUserData?.fullname}
            className={`w-full text-md sm:text-xl cursor-pointer ${
              formActive && "border-b border-gray-300"
            }  ${
              darkMode ? "bg-gray-800 text-white " : "bg-white text-black"
            }
            px-3 py-2 focus:outline-none focus:ring-2 font-medium focus:ring-blue-500`}
          />
        </div>

        <Separator />

        <div className="underline text-start">CONTACT INFORMATION</div>

        <div className="flex gap-2 text-xs sm:text-sm sm:gap-10 flex-col sm:flex-row  sm:items-center">
          <label className="text-start text-xs sm:text-sm w-[70px]">Email Id</label>
          <input
            disabled
            type="email"
            placeholder="Email"
            value={existingUserData?.email}
            className={`w-full cursor-pointer rounded-md flex-1 border border-gray-500
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode ? "bg-gray-800 text-white " : "bg-white text-black"
            }`}
          />
        </div>

        <div className="flex text-xs sm:text-sm flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
          <label className="text-start text-xs sm:text-sm w-[70px]">Phone</label>
          <input
            disabled={!formActive}
            type="text"
            placeholder="Phone"
            value={existingUserData?.phone}
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                phone: e.target.value,
              });
            }}
            className={`w-full cursor-pointer rounded-md  border  border-gray-500 flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500   ${
              darkMode ? "bg-gray-800 text-white " : "bg-white text-black"
            }`}
          />
        </div>

        <div className="flex flex-col text-xs sm:text-sm sm:flex-row gap-2 sm:gap-10 sm:items-center">
          <label className="text-start text-xs sm:text-sm w-[70px]">Address</label>
          <input
            disabled={!formActive}
            type="text"
            placeholder="Address"
            value={existingUserData?.address}
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                address: e.target.value,
              });
            }}
            className={`w-full cursor-pointer rounded-md  border  border-gray-500 flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode ? "bg-gray-800  text-white " : "bg-white text-black"
            }`}
          />
        </div>

        <div className="underline text-start">BASIC INFORMATION</div>

        <div className="flex flex-col sm:flex-row  gap-2 sm:gap-10 text-xs sm:text-sm sm:items-center">
          <label className="text-start text-xs sm:text-sm w-[70px]">Gender</label>
          <select
            disabled={!formActive}
            value={existingUserData?.gender}
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                gender: e.target.value as "male" | "female" | "other",
              });
            }}
            className={`w-full cursor-pointer rounded-md  border border-gray-500 flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500   ${
              darkMode ? "bg-gray-800 text-white " : "bg-white text-black"
            }`}
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">Others</option>
          </select>
        </div>

        <div className="flex gap-2 sm:gap-10 flex-col sm:flex-row sm:items-center">
          <label className="text-start text-xs sm:text-sm w-[70px]">Birthday</label>
          <input
            disabled={!formActive}
            type="date"
            placeholder="Date of birth"
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                birthday: e.target.value,
              });
            }}
            value={existingUserData?.birthday}
            className={`w-full cursor-pointer rounded-md
                border border-gray-500 flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 text-white " : "bg-white text-black"
            }`}
          />
        </div>
      </div>

      <div className="flex gap-5 justify-center ">
        {!formActive ? (
          <div
            className="border border-green-600  rounded-full cursor-pointer py-2 px-6"
            onClick={() => setFormActive(true)}
          >
            Edit
          </div>
        ) : (
          <button
            disabled={!formActive || formLoading}
            className={`border border-green-600 flex
         items-center justify-center  ${
           formLoading && "bg-green-600"
         } rounded-full py-2 px-4`}
            type="submit"
          >
            {formLoading ? <LoadingButton /> : "  Save Information"}
          </button>
        )}
      </div>

    </form>
      }
      </div>
  );
};

export default ProfileUpdateForm;
