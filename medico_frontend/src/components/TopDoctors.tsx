import { ChevronRight, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./loadingButton";

type Doctors = {
  name: string;
  speciality: string;
  picture: string;
  availability: string;
  _id: string;
};
const TopDoctors = () => {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [requestLoading, setRequestLoading] = useState(true);

  useEffect(() => {
    const getDoctors = async () => {
      const response = await axiosInstance.get("/doctor/");
      setRequestLoading(true)
      console.log(response);
      setDoctors(response.data);
      setRequestLoading(false);
    };


    getDoctors();
  }, []);

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center py-10">
      <div
        className={`${
          DarkModeSetterFunction() ? "text-gray-200" : "text-gray-700"
        } text-3xl mb-2 `}
      >
        Top Doctors to Book
      </div>
      <div className="text-center font-light text-gray-500 mb-8 md:w-[50%]">
        Simply browse through our extensive list of top doctors
      </div>

      {
        requestLoading ? <LoadingButton color="#16a34a"/> : 
     

      <div className="flex flex-wrap  gap-4 justify-center mb-10">
        {doctors.slice(0, 6).map((doctor, index) => {
          const { _id, name, speciality, availability, picture } = doctor;

          return (
            <div
              onClick={() => navigate(`/doctors/${_id}`)}
              key={index}
              className="w-[274px] h-[385px] rounded-md cursor-pointer flex flex-col duration-300 ease-in-out hover:scale-105  border shadow-sm items-start group"
            >
              <img
                src={picture}
                alt="doctor"
                className="w-full h-[272px] rounded-t-md group-hover:bg-green-500 hover:bg-green-500 object-cover"
              />

              <div className="p-4 flex flex-col gap-2 text-xs items-start">
                <div
                  className={` flex items-center justify-start gap-2  ${
                    availability === "Available"
                      ? "text-green-500"
                      : "text-gray-500"
                  }  `}
                >
                  <Circle size={14} />
                  <span>
                    {availability === "Available"
                      ? "Available"
                      : "Not Available"}
                  </span>
                </div>
                <div className="text-sm font-medium">Dr. {name}</div>
                <div>{speciality}</div>
              </div>
            </div>
          );
        })}
      </div>

}

{
  !requestLoading && 


      <div
        className="flex  gap-4 justify-center items-center cursor-pointer bg-gray-200 rounded-full py-2 px-4 text-gray-700"
        onClick={() => navigate("/doctors")}
      >
        <span>more</span>
        <ChevronRight />
      </div>
      }
    </section>
  );
};

export default TopDoctors;
