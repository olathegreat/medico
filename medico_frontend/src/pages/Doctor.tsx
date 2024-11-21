import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { DoctorType } from "../utils/types";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {  BadgeCheckIcon, InfoIcon } from "lucide-react";

const Doctor = () => {
  const [doctorData, setDoctorData] = useState<DoctorType>({
    name: "", // Required field
    email: "", // Required field
    speciality: "", // Required field
    degree: "", // Required field
    fee: 0, // Required field
    about: "", // Required field
    password: "", // Required field
    address1: undefined, // Optional field
    address2: undefined, // Optional field
    experience: undefined, // Optional field
    picture: undefined, // Optional field
    _id: undefined, // Optional field
  });
  const { id } = useParams();

  useEffect(() => {
    const getDoctor = async () => {
      const response = await axiosInstance.get(`/doctor/${id}`);

      setDoctorData(response.data);
      // console.log(response)
    };
    getDoctor();
  }, []);
  return (
    <div className="flex flex-col gap-5 md:gap-10 text-gray-700">
      <Nav />

      <div className="flex gap-5">
        <div className="md:w-[320px] rounded-md bg-green-500 h:[320px] group">
          {doctorData?.picture ? (
            <img
              className="w-full rounded-md h-full bg-green-500 object-cover"
              src={doctorData?.picture}
            />
          ) : (
            <span>{doctorData.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex flex-col p-5 gap-3 rounded-md items-start border border-gray-300 flex-grow">
          <div className="flex gap-1 items-center">
            <span className="font-medium text-2xl">Dr. {doctorData?.name}</span> <BadgeCheckIcon  className="text-green-500"/> <span></span>{" "}
          </div>
          <div className="text-sm">
            <span>{doctorData?.degree}-</span>
            <span>{doctorData?.speciality}</span>
            <span className="border ml-2 border-gray-300 py-1 px-2  text-xs rounded-full">{doctorData?.experience}</span>
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="flex gap-1 items-center text-sm font-medium">About <span className="text-xs"><InfoIcon width={15} height={15} className="text-xs"/></span> </div>
            <p className="text-start ">
                {doctorData?.about} 
            </p>
          </div>

          <div className="font-medium">
            Appointment fee: ${doctorData?.fee}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Doctor;
