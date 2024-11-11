import { Circle } from "lucide-react";
import doc1 from  "../assets/assets_frontend/doc1.png"
import doc2 from  "../assets/assets_frontend/doc2.png";
import doc3 from  "../assets/assets_frontend/doc3.png";
import doc4 from  "../assets/assets_frontend/doc4.png";

import doc5 from  "../assets/assets_frontend/doc5.png";
import doc6 from  "../assets/assets_frontend/doc6.png";
import doc7 from  "../assets/assets_frontend/doc7.png";
import doc8 from  "../assets/assets_frontend/doc8.png";
import doc9 from  "../assets/assets_frontend/doc9.png";
import doc10 from  "../assets/assets_frontend/doc10.png";
import doc11 from "../assets/assets_frontend/doc11.png";
import doc12 from  "../assets/assets_frontend/doc12.png";
import doc13 from  "../assets/assets_frontend/doc13.png";
import doc14 from  "../assets/assets_frontend/doc14.png";
import doc15 from "../assets/assets_frontend/doc15.png";

type Doctors = {
  name: string;
  speciality: string;
  image: string;
  availability: boolean;
};
const TopDoctors = () => {
  const doctors: Doctors[] = [
    {
      name: "John Doe",
      speciality: "General Physician",
      image: doc1,
      availability: true,
    },
    {
      name: "Jane Smith",
      speciality: "Gynecologist",
      image: doc2,
      availability: true,
    },
    {
      name: "Michael Johnson",
      speciality: "Pediatrician",
      image: doc3,
      availability: false,
    },
    {
      name: "Emily White",
      speciality: "Dermatologist",
      image: doc4,
      availability: true,
    },
    {
      name: "Sarah Davis",
      speciality: "Neurologist",
      image: doc5,
      availability: true,
    },
    {
      name: "Robert Brown",
      speciality: "Gastroenterologist",
      image: doc6,
      availability: true,
    },
    {
      name: "Olivia Martin",
      speciality: "General Physician",
      image: doc7,
      availability: false,
    },
    {
      name: "David Lee",
      speciality: "Gynecologist",
      image: doc8,
      availability: true,
    },
    {
      name: "William Walker",
      speciality: "Pediatrician",
      image: doc9,
      availability: true,
    },
    {
      name: "Jessica Taylor",
      speciality: "Dermatologist",
      image: doc10,
      availability: false,
    },
    {
      name: "Brian Harris",
      speciality: "Neurologist",
      image: doc11,
      availability: true,
    },
    {
      name: "Rachel Clark",
      speciality: "Gastroenterologist",
      image: doc12,
      availability: true,
    },
    {
      name: "George Lewis",
      speciality: "General Physician",
      image: doc13,
      availability: false,
    },
    {
      name: "Anna Walker",
      speciality: "Gynecologist",
      image: doc14,
      availability: true,
    },
    {
      name: "Michael King",
      speciality: "Pediatrician",
      image:doc15,
      availability: true,
    },
  ];

  return (
    <section className="flex flex-col items-center py-10">
      <div className=" text-3xl mb-2 text-gray-700">Top Doctors to Book</div>
      <div className="text-center font-light text-gray-500 mb-8 md:w-[50%]">
        Simply browse through our extensive list of top doctors
      </div>

      <div className="flex flex-wrap  gap-4">
        {doctors.map((doctor, index) => {
          const { name, speciality, availability, image } = doctor;

          return (
            <div
              key={index}
              className="w-[274px] h-[385px] rounded-md cursor-pointer flex flex-col  shadow border shadow-sm items-start"
            >
            
              <img
                src={image}
                alt="doctor"
                className="w-full h-[272px] rounded-t-md hover:bg-green-500 object-cover"
              />

              <div className="p-4 flex flex-col gap-2 text-xs items-start">
                <div
                  className={` flex items-center justify-start gap-2  ${
                    availability ? "text-green-500" : "text-gray-500"
                  }  ` }
                >
                  <Circle size={14}/>
                  <span>{availability ? "Available" : "Not Available"}</span>
                </div>
                <div className="text-sm font-medium">Dr. {name}</div>
                <div>{speciality}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopDoctors;
