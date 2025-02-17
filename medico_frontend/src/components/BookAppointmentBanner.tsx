import { useNavigate } from "react-router-dom";
import appointmentImg from "../assets/assets_frontend/appointment_img.png";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";

const BookAppointmentBanner = () => {
  const navigate = useNavigate();
  return (
    <section className={`w-full md:h-[305px] 
     md:relative bg-gradient-to-br ${DarkModeSetterFunction() ? "from-green-500/30 to-green-600/20" : "from-green-500 to-green-600"} 
      rounded-md flex flex-col md:flex-row  pt-10 sm:pt-20 pb-10 md:pb-0 px-6 md:px-20  `}>
      <div className="flex flex-col md:w-[60%] justify-center gap-1 md:gap-4 py-2 md:py-10 mb-10">
        <div className="font-normal text-white text-3xl md:text-4xl  flex flex-col gap-2  md:text-start ">
          <span> Book Appointment </span>
          <span> With 100+ Trusted Doctors</span>
        </div>

        <button
          onClick={() => navigate("/signup")}
          className="bg-white px-4 text-green-500
           font-normal py-2 hover:gap-2 rounded-full  
           flex justify-center md:w-fit "
        >
          <span>Create Account</span>
        </button>
      </div>

      <div className="flex-1  md:absolute  md:right-5
       md:bottom-0 lg:right-20 hidden sm:flex justify-center items-center">
        <img
          src={appointmentImg}
          alt=""
          className=" w-[330px] h-full  object-cover rounded-md"
        />
      </div>
    </section>
  );
};

export default BookAppointmentBanner;
