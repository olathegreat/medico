import { ArrowRight } from "lucide-react";
import groupProfile from "../assets/assets_frontend/group_profiles.png";
import headerImg from "../assets/assets_frontend/header_img.png";
import { useNavigate } from "react-router-dom";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";


const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className={`w-full  bg-gradient-to-br ${DarkModeSetterFunction() ? "from-green-500/20 to-green-600/20" : "from-green-500 to-green-600"}  rounded-md flex
     flex-col-reverse md:flex-row  pt-20 px-6 lg:px-20`}>
      <div className="flex flex-col flex-1 justify-center gap-1 md:gap-4 py-2 md:py-10 mb-10">
        <div className="font-normal text-white text-3xl md:text-5xl  flex flex-col gap-2  md:text-start ">
         
          <span> Book Appointment </span>
          <span> With Trusted Doctors</span>
       
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <img src={groupProfile} alt="" className="h-10" />
          <span className="text-white font-thin md:text-left ">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.

          </span>
        </div>

        <button className="bg-white px-4 text-green-500 font-normal py-2 hover:gap-2 rounded-full  flex justify-center md:w-fit ">
            <span onClick={(()=>navigate('/doctors'))}>Book Appointment</span>

          
          <ArrowRight/>
        </button>
      </div>

      <div className="flex-1  flex justify-center items-baseline">
       <img src={headerImg} alt="" className=" w-full h-full md:object-contain lg:object-cover rounded-md" />

      </div>

     
    </section>
  );
};

export default Hero;
