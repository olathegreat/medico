import { useRef, useState } from "react";
import { Toaster } from "../ui/sonner";
import axiosInstance from "../../utils/axios";
import LoadingButton from "../loadingButton";
import { toast } from "sonner";
import { Eye, EyeClosed, UserCircle } from "lucide-react";
import DarkModeSetterFunction from "../../utils/DarkModeSetterFunction";

export type DoctorFormType = {
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
  password: string;
};

const AddDoctor = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [passwordShow, setPasswordShow] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorFormType>({
    email: "",
    name: "",
    speciality: "",
    degree: "",
    fee: 0,
    about: "",
    password: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const darkMode = DarkModeSetterFunction();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!doctorData) {
      toast.error("Fill form data before submit");

      return;
    }
    try {
      setFormLoading(true);

      const doctorFormData = new FormData();

      doctorFormData.append("name", doctorData.name);
      doctorFormData.append("email", doctorData.email);
      doctorFormData.append("speciality", doctorData.speciality);
      doctorFormData.append("degree", doctorData.degree);
      doctorFormData.append("fee", String(doctorData.fee));
      doctorFormData.append("about", doctorData.about);
      doctorFormData.append("password", doctorData.password);
      console.log(doctorFormData);

      if (doctorData.address1) {
        doctorFormData.append("address1", doctorData.address1);
      }
      if (doctorData.address2) {
        doctorFormData.append("address2", doctorData.address2);
      }
      if (doctorData.picture instanceof File) {
        doctorFormData.append("picture", doctorData.picture);
      }
      if (doctorData.experience) {
        doctorFormData.append("experience", doctorData.experience);
      }

    //   console.log(doctorFormData);
    //   console.log(doctorData);
    //   for (const pair of doctorFormData.entries()) {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    //   }
    //   return;
      const token = sessionStorage.getItem("token");
      const bearerToken = token ? "Bearer " + token : "";

      const res = await axiosInstance.post("/doctor/", doctorFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: bearerToken,
        },
      });
      console.log(res);
      toast.success("successfully saved");
      setDoctorData({
          email: "",
          name: "",
          speciality: "",
          degree: "",
          fee: 0,
          about: "",
          password: "",
        });

      setFormLoading(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Error , try again");
      setFormLoading(false);
      let messages: { [key: string]: string } = {};
      const errorDetails = err.response?.data?.errors;

      if (err.response?.data?.errors) {
        // Check for specific field errors and update the errorMessages state
        if (errorDetails.password) {
          messages.password = errorDetails.password.message;
        }
        if (errorDetails.email) {
          messages.email = errorDetails.email.message;
        }
        if (errorDetails.name) {
          messages.name = errorDetails.name.message;
        }
        if (errorDetails.address1) {
          messages.address1 = errorDetails.address1.message;
        }
        if (errorDetails.address2) {
          messages.address2 = errorDetails.address2.message;
        }
        if (errorDetails?.speciality) {
          messages.speciality = errorDetails.speciality.message;
        }
        if (errorDetails.experience) {
          messages.experience = errorDetails.experience.message;
        }
        if (errorDetails.degree) {
          messages.degree = errorDetails.degree.message;
        }
        if (errorDetails.fee) {
          messages.fee = errorDetails.fee.message;
        }
        if (errorDetails.about) {
          messages.about = errorDetails.about.message;
        }
        if (errorDetails.picture) {
          messages.picture = errorDetails.picture.message;
        }

        setErrorMessages(messages);
      }

      if (err.response?.data?.message) {
        if (err.response?.data?.message?.includes("Email")) {
          messages.email = err.response?.data?.message;
          setErrorMessages(messages);
          console.log(errorMessages);
        }
      }
    }
  };

  return (
    <div className="flex flex-col p-3 items-start text-gray-700">
      <Toaster />
      <div>Add Doctor</div>

      <form onSubmit={formSubmit} className="py-9 flex w-full flex-col gap-5">
        <div className="flex gap-2 items-center text-sm">
          <label
            htmlFor="picture"
            className="relative block cursor-pointer rounded-md w-20 bg-gray-200 border border-gray-200
                     h-20 group overflow-hidden"
          >
            {previewImage && (
              <img
                src={previewImage}
                className="w-20 h-20 rounded-md object-cover"
                alt="profile-pics"
                onClick={() => fileInputRef.current?.click()}
              />
            )}
            <span
              className="absolute bottom-0 z-30  flex items-center justify-center right-0 top-0 left-0 
            p-2  bg-white-600 opacity-50 group-hover:opacity-70"
            >
              <UserCircle
                color="gray"
                width={60}
                height={60}
                onClick={() => fileInputRef.current?.click()}
              />
            </span>
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="text-start"
          >
            Upload Doctor <br />
            Picture
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];

                const previewUrl = URL.createObjectURL(file);

                setPreviewImage(previewUrl); // Set the preview URL for display

                setDoctorData({ ...doctorData, picture: file });
              }
            }}
            name="picture"
            hidden
          />
        </div>

        <div className="flex  flex-col gap-4 md:flex-row">
          <div className="flex flex-col flex-1 gap-1 items-start">
            <label className="text-start text-sm "> Doctor name</label>
            <input
              type="text"
              placeholder="Name"
              value={doctorData?.name}
              onChange={(e) => {
                setDoctorData({
                  ...doctorData,
                  name: e.target.value,
                });
              }}
              className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200 text-black"
            } ${errorMessages.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errorMessages.name && (
              <span className="text-red-600 text-xs text-start">
                {errorMessages.name}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1 items-start">
            <label className="text-start text-sm "> Speciality</label>
            <select
              value={doctorData?.speciality}
              onChange={(e) => {
                setDoctorData({
                  ...doctorData,
                  speciality: e.target.value,
                });
              }}
              className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200 text-gray-600"
            }  ${
                errorMessages.speciality ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled selected>
                Select speciality
              </option>
              <option>General Physcian</option>

              <option>Gynaecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>

            {errorMessages.speciality && (
              <span className="text-red-600 text-xs text-start">
                {errorMessages.speciality}
              </span>
            )}
          </div>
        </div>

        <div className="flex  flex-col gap-4 md:flex-row">
          <div className="flex flex-col flex-1 gap-1 items-start">
            <label className="text-start text-sm "> Doctor email</label>
            <input
              type="email"
              placeholder="Doctor email"
              value={doctorData?.email}
              onChange={(e) => {
                setDoctorData({
                  ...doctorData,
                  email: e.target.value,
                });
              }}
              className={`w-full cursor-pointer rounded-md  b flex-1 ${
                errorMessages.email ? "border-red-500" : "border-gray-300"
              }
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode ? "bg-gray-800 text-white " : "border border-gray-200"
            }`}
            />
            {errorMessages.email && (
              <span className="text-red-600 text-xs text-start">
                {errorMessages.email}
              </span>
            )}
          </div>

          <div className="flex flex-col flex-1 gap-1 items-start">
            <label className="text-start text-sm "> Education</label>
            <input
              type="text"
              placeholder="Education degree e.g MBBS , RN, B.pharm"
              value={doctorData?.degree}
              onChange={(e) => {
                setDoctorData({
                  ...doctorData,
                  degree: e.target.value,
                });
              }}
              className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errorMessages.degree ? "border-red-500" : "border-gray-300"
            } ${
                darkMode
                  ? "bg-gray-800 text-white "
                  : "border border-gray-200 text-black"
              }`}
            />
            {errorMessages.email && (
              <span className="text-red-600 text-xs text-start">
                {errorMessages.degree}
              </span>
            )}
          </div>
        </div>

        <div className="flex  flex-col md:h-[85px] gap-4 md:flex-row">
          <div className="flex flex-col flex-1 gap-1 items-start">
            <label className="text-start text-sm "> Doctor password</label>
            <div
              className={`w-full flex justify-between cursor-pointer rounded-md    flex-1 ${
                errorMessages.password ? "border-red-500" : "border-gray-300"
              }
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 !h-6  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border bg-white border-gray-200"
            } `}
            >
              <input
                className="flex-grow h-6 focus:outline-none"
                type={passwordShow ? "text" : "password"}
                placeholder="Set password, min length of 8 characters"
                value={doctorData?.password}
                onChange={(e) => {
                  setDoctorData({
                    ...doctorData,
                    password: e.target.value,
                  });
                }}
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

          <div className=" flex flex-col flex-1 gap-4 items-start">
            <div className="flex  flex-col w-full  gap-1 items-start">
              <label className="text-start text-sm "> Address</label>
              <input
                type="text"
                placeholder="Adress1"
                value={doctorData?.address1}
                onChange={(e) => {
                  setDoctorData({
                    ...doctorData,
                    address1: e.target.value,
                  });
                }}
                className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200 text-black"
            } ${errorMessages.address1 ? "border-red-500" : "border-gray-300"}`}
              />
              {errorMessages.address1 && (
                <span className="text-red-600 text-xs text-start">
                  {errorMessages.address1}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full gap-1 items-start">
              <input
                type="text"
                placeholder="Adress2"
                value={doctorData?.address2}
                onChange={(e) => {
                  setDoctorData({
                    ...doctorData,
                    address2: e.target.value,
                  });
                }}
                className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200 text-black"
            } ${errorMessages.address2 ? "border-red-500" : "border-gray-300"}`}
              />
              {errorMessages.address2 && (
                <span className="text-red-600 text-xs text-start">
                  {errorMessages.address2}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex  flex-col w-full  md:w-[50%] gap-1 items-start">
          <label className="text-start text-sm "> Experience</label>
          <select
            value={doctorData?.experience}
            onChange={(e) => {
              setDoctorData({
                ...doctorData,
                experience: e.target.value,
              });
            }}
            className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200  text-gray-600"
            }  ${
              errorMessages.experience ? "border-red-500" : "border-gray-300"
            }`}
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

          {errorMessages.speciality && (
            <span className="text-red-600 text-xs text-start">
              {errorMessages.speciality}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full md:w-[50%] gap-1 items-start">
          <label className="text-start text-sm "> Fees</label>
          <input
            type="number"
            placeholder="Your Fees"
            value={doctorData?.fee}
            onChange={(e) => {
              setDoctorData({
                ...doctorData,
                fee: Number(e.target.value),
              });
            }}
            className={`w-full cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200 text-black"
            } ${errorMessages.fee ? "border-red-500" : "border-gray-300"}`}
          />

          {errorMessages.fee && (
            <span className="text-red-600 text-xs text-start">
              {errorMessages.fee}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full gap-1 min-h-[150px] items-start">
          <label className="text-start text-sm "> About</label>
          <textarea
            placeholder="Write about doctor"
            value={doctorData?.about}
            onChange={(e) => {
              setDoctorData({
                ...doctorData,
                about: e.target.value,
              });
            }}
            className={`w-full resize-none cursor-pointer rounded-md  b flex-1
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
              darkMode
                ? "bg-gray-800 text-white "
                : "border border-gray-200 text-black"
            } ${errorMessages.about ? "border-red-500" : "border-gray-300"}`}
          />

          {errorMessages.about && (
            <span className="text-red-600 text-xs text-start">
              {errorMessages.about}
            </span>
          )}
        </div>

        <button
          disabled={formLoading}
          className={`bg-green-600 flex text-white
         items-center justify-center sm:w-fit  rounded-full py-2 px-4`}
          type="submit"
        >
          {formLoading ? <LoadingButton /> : "  Add Doctor"}
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
