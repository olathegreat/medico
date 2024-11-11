
import appointmentImg from "../assets/assets_frontend/appointment_img.png";

const BookAppointmentBanner = () => {
  return (
    <section className="w-full md:h-[305px]  md:relative bg-gradient-to-br from-green-500 to-green-600 rounded-md flex flex-col md:flex-row  pt-20 px-6 md:px-20  ">
      <div className="flex flex-col md:w-[60%] justify-center gap-1 md:gap-4 py-2 md:py-10 mb-10">
        <div className="font-normal text-white text-3xl md:text-4xl  flex flex-col gap-2  md:text-start ">
          <span> Book Appointment </span>
          <span> With 100+ Trusted Doctors</span>
        </div>

        <button className="bg-white px-4 text-green-500 font-normal py-2 hover:gap-2 rounded-full  flex justify-center md:w-fit ">
          <span>Create Account</span>
        </button>
      </div>

      <div className="flex-1  md:absolute  md:right-5 md:bottom-0 lg:right-20 flex justify-center items-center">
       <img src={appointmentImg} alt="" className=" w-[330px] h-full  object-cover rounded-md" />

      </div>
    </section>
  );
};

export default BookAppointmentBanner;
