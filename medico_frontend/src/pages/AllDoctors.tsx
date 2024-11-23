import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Circle } from "lucide-react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");

  const specialityArray = [
    "General Physician",
    "Gynaecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ];

  useEffect(() => {
    const getDoctors = async () => {
      const endpoint = selectedSpeciality
        ? `/doctor?speciality=${encodeURIComponent(selectedSpeciality)}`
        : "/doctor";
      const response = await axiosInstance.get(endpoint);
      console.log(response);
      setDoctors(response.data);
    };

    getDoctors();
  }, [selectedSpeciality]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 md:gap-10 text-gray-700">
      <Nav />
      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Browse through the specialists</p>
          <div className="flex flex-row justify-center md:justify-start flex-wrap md:flex-col text-xs md:text-[16px] gap-1 md:gap-3">
            {specialityArray.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedSpeciality(item)}
                className={`border ${
                  selectedSpeciality === item
                    ? "bg-green-100 border-green-800"
                    : "hover:bg-gray-100"
                } duration-100 ease-linear text-[8px] md:text-[16px] rounded-md py-1 md:py-2 px-2 md:px-8`}
              >
                {item}
              </button>
             

            
            ))}
             <button
              onClick={() => setSelectedSpeciality("")}
              className={`border ${
                selectedSpeciality === ""
                  ? "bg-green-100 border-green-800"
                  : "hover:bg-gray-100"
              } duration-100 ease-linear  text-[8px] md:text-[16px] rounded-md py-1 md:py-2 px-2 md:px-8`}
               
              >All</button>
          </div>
        </div>

        <div className="flex flex-wrap  gap-4 justify-center md:justify-start md:py-10 mb-10">
          {doctors.map((item, index) => {
            const { _id, name, speciality, availability, picture } = item;

            return (
              <div
               onClick={()=>navigate(`/doctors/${_id}`)}
                key={index}
                className="w-[200px] h-[300px] rounded-md cursor-pointer flex flex-col duration-300 ease-in-out hover:scale-105   border shadow-sm items-start group"
              >
                
                <img
                  src={picture}
                  alt="doctor"
                  className="w-full h-[200px] rounded-t-md group-hover:bg-green-500 hover:bg-green-500 object-cover"
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
      </div>
    </div>
  );
};

export default AllDoctors;
