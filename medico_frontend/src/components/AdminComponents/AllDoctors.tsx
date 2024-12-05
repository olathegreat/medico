import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

type Doctors = {
  _id: string;
  name: string;
  speciality: string;
  picture: string;
  availability: string;
};

const AllDoctors = () => {
  const [doctors, setDoctors] = useState<Doctors[]>([]);


  useEffect(() => {
    const getDoctors = async () => {
      const response = await axiosInstance.get("/doctor/");
      console.log(response);
      setDoctors(response.data);
    };

    getDoctors();
  }, []);

  const updateDoctorAvailability = async (doctor: Doctors) => {
    const patchUrl = "/doctor/" + doctor._id;

    try {
      const newAvailability =
        doctor.availability === "Available" ? "Not Available" : "Available";

      const response = await axiosInstance.patch(
        patchUrl,
        { availability: newAvailability },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: bearerToken,
          },
        }
      );

      console.log(response);

      // Optimistically update the state
      setDoctors((prevDoctors) =>
        prevDoctors.map((d) =>
          d._id === doctor._id ? { ...d, availability: newAvailability } : d
        )
      );
    } catch (error) {
      console.error("Error updating doctor availability:", error);
    }
  };


  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";


  return (
    <div className="flex flex-col py-3 px-10 md:w-[70vw]   gap-3 items-start text-gray-700">
      <div>All Doctor</div>

      <div className="flex flex-wrap    gap-4 md:justify-start mb-10">
        {doctors.map((doctor, index) => {
          const { name, speciality, picture, availability } = doctor;

          return (
            <div
              key={index}
              className="w-[180px] h-[280px] rounded-md cursor-pointer flex flex-col duration-300 ease-in-out hover:scale-105   border shadow-sm items-start group"
            >
              <img
                src={picture}
                alt="doctor"
                className="w-full h-[180px] rounded-t-md group-hover:bg-green-500 hover:bg-green-500 object-cover"
              />

              <div className="p-4 flex flex-col gap-2 text-xs items-start">
                <div className="text-sm font-medium">Dr. {name}</div>
                <div>{speciality}</div>
                <div className="flex gap-1 items-center">
                  <input onChange={()=>updateDoctorAvailability(doctor)} type="checkbox" checked={availability === "Available"}/>
                  {availability}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllDoctors;
