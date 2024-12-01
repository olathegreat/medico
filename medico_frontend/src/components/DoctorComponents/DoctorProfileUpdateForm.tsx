import { useEffect, useRef, useState } from "react";
import { Toaster } from "../ui/sonner";
import { UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import LoadingButton from "../loadingButton";
import { toast } from "sonner";
import { saveDoctor } from "../../utils/appSlice";
import DarkModeSetterFunction from "../../utils/DarkModeSetterFunction";

interface FormDataType {
  _id?: string | undefined;
  name: string;
  email: string;
  address1?: string;
  address2?: string;
  speciality: string;
  experience?: string;
  degree: string;
  fee: number;
  about: string;
  picture?: File;
 
  availability?: string;
}

const DoctorProfileUpdateForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [existingUserData, setExistingUserData] = useState<FormDataType>({
    email: "",
    name: "",
    speciality: "",
    degree: "",
    fee: 0,
    about: "",
    
  });
  const [formActive, setFormActive] = useState(false);
  const storedUser = useSelector((state: any) => state.app.doctor);
  const [formLoading, setFormLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const darkMode = DarkModeSetterFunction();
  useEffect(() => {
    console.log("Dark mode active:", darkMode);
  }, [darkMode]);
  useEffect(() => {
    console.log(storedUser);
    setExistingUserData(storedUser);
    setPreviewImage(storedUser?.picture);
  }, [storedUser]);

  const profileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    if (existingUserData === storedUser) {
      toast.error("change a data");

      return;
    }

    setFormLoading(true);

    updatedFormData.append("name", existingUserData.name);

    updatedFormData.append("email", existingUserData.email);
    updatedFormData.append("speciality", existingUserData.speciality);
    updatedFormData.append("degree", existingUserData.degree);
    updatedFormData.append("fee", String(existingUserData.fee));
    updatedFormData.append("about", existingUserData.about);
    if (existingUserData.picture instanceof File) {
      updatedFormData.append("picture", existingUserData.picture);
    }
    if (existingUserData.address1) {
      updatedFormData.append("address1", existingUserData.address1);
    }
    if (existingUserData.address2) {
      updatedFormData.append("address2", existingUserData.address2);
    }
    if (existingUserData.experience) {
      updatedFormData.append("experience", existingUserData.experience);
    }
    if (existingUserData.availability) {
      updatedFormData.append("availability", existingUserData.availability);
    }

    try {
      const token = sessionStorage.getItem("token");
      const bearerToken = token ? "Bearer " + token : "";
      const res = await axiosInstance.patch(
        "/doctor/" + existingUserData._id,
        updatedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: bearerToken,
          },
        }
      );
      console.log(res);
      toast.success("Updated Successfully");
      dispatch(saveDoctor({ ...existingUserData, picture: previewImage }));

      setFormLoading(false);
      setFormActive(false);
    } catch (err) {
      console.log(err);
      setFormLoading(false);
    }
  };



  return (
    <form
      onSubmit={profileUpdate}
      className="md:w-[500px] px-4 md:px-10 flex flex-col gap-5"
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
            <span className="text-5xl w-full h-full  bg-green-600 flex items-center  justify-center">
              {existingUserData?.name?.charAt(0)}
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
        <div className="flex flex-col items-start gap-2">
          {/* <label className="font-semibold">Full Name</label> */}
          <input
            disabled={!formActive}
            type="text"
            placeholder="Fullname"
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                name: e.target.value,
              });
            }}
            value={existingUserData?.name}
            className={`w-full text-xl cursor-pointer ${
              formActive && "border-b border-gray-300"
            }  ${darkMode ? "bg-gray-800 text-white " : " text-gray-600"}
            px-3 py-2 focus:outline-none focus:ring-2 font-medium focus:ring-blue-500`}
          />
          <div className="flex justify-between text-gray-500 items-center gap-1">
            <input
              type="text"
              placeholder="degree"
              value={existingUserData?.degree}
              onChange={(e) => {
                setExistingUserData({
                  ...existingUserData,
                  degree: e.target.value,
                });
              }}
              className="w-14  pl-1 "
              disabled={!formActive}
            />
            -
            <select
              value={existingUserData?.speciality}
              onChange={(e) => {
                setExistingUserData({
                  ...existingUserData,
                  speciality: e.target.value,
                });
              }}
              className="disabled:appearance-none ml-2"
              disabled={!formActive}
            >
              <option value="" disabled selected>
                Select speciality
              </option>
              <option>General Physician</option>

              <option>Gynaecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
            <select
              value={existingUserData?.experience}
              onChange={(e) => {
                setExistingUserData({
                  ...existingUserData,
                  experience: e.target.value,
                });
              }}
              className="w-20 disabled:appearance-none text-sm"
              disabled={!formActive}
            >
              <option value="" disabled selected>
                Select experience
              </option>
              <option>1 year</option>

              <option>2 years</option>
              <option>3 years</option>
              <option>4 years</option>
              <option>5 years</option>
              <option>6 years</option>
              <option>7 years</option>
              <option>8 years</option>
              <option>9 years</option>
              <option>9+ years</option>
            </select>
          </div>
        </div>

        {/* <Separator /> */}

        <div className="flex  flex-col gap-1 items-start">
          <div>About:</div>

          <textarea
            value={existingUserData?.about}
            onChange={(e) => {
              setExistingUserData({
                ...existingUserData,
                about: e.target.value,
              });
            }}
            className="w-full resize-none text-gray-600 disabled:appearance-none text-sm"
            disabled={!formActive}
          />
        </div>

        <div className="flex items-start gap-2">
          <div className="text-nowrap">Appointment fee:</div>
          <div className="flex text-gray-600 items-center">
            <span className="mr-1 ">$</span>

            <input
              type="number"
              value={existingUserData?.fee}
              onChange={(e) => {
                setExistingUserData({
                  ...existingUserData,
                  fee: parseInt(e.target.value),
                });
              }}
              className="w-full resize-none text-gray-600 disabled:appearance-none t"
              disabled={!formActive}
            />
          </div>
        </div>

        <div className="flex gap-1">
          <label className="text-start w-16">Address</label>
          <div className="flex flex-col text-gray-600 gap-1">
            <input
              disabled={!formActive}
              type="text"
              placeholder="Address"
              value={existingUserData?.address1}
              onChange={(e) => {
                setExistingUserData({
                  ...existingUserData,
                  address1: e.target.value,
                });
              }}
              className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode ? "bg-gray-800 text-white " : "bg-white "
            }`}
            />

            <input
              disabled={!formActive}
              type="text"
              placeholder="Address"
              value={existingUserData?.address2}
              onChange={(e) => {
                setExistingUserData({
                  ...existingUserData,
                  address2: e.target.value,
                });
              }}
              className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode ? "bg-gray-800 text-white " : "bg-white "
            }`}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <input
          // disabled={!formActive}
            onChange={() => formActive &&
              existingUserData.availability === "Available"
                ? setExistingUserData({
                    ...existingUserData,
                    availability: "Not Available",
                  })
                : setExistingUserData({
                    ...existingUserData,
                    availability: "Available",
                  })
            }
            type="checkbox"
            checked={existingUserData.availability === "Available"}
          />
          {existingUserData?.availability}
        </div>
      </div>

      <div className="flex gap-5 justify-center ">
        {!formActive ? (
          <div
            className="border border-blue-600  rounded-full cursor-pointer py-2 px-6"
            onClick={() => setFormActive(true)}
          >
            Edit
          </div>
        ) : (
          <button
            disabled={!formActive || formLoading}
            className={`border border-blue-600 flex
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
  );
};

export default DoctorProfileUpdateForm;
