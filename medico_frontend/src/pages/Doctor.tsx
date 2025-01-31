import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { DoctorType } from "../utils/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { BadgeCheckIcon, Circle, InfoIcon } from "lucide-react";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/loadingButton";
import { Button } from "../components/ui/button";
import { setSelectedChatData } from "../utils/appSlice";

type DayArrayType = {
  day: string;
  date: string | number;
  month: string | number;
  year: string | number;
};

type AppointmentDetails = {
  day?: string;
  date?: string | number;
  patient?: string;
  doctor?: string;
  time?: string;
};
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
  const [days, setDays] = useState<DayArrayType[]>([]);
  const [relatedDoctorsArray, setRelatedDoctorsArray] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetails>({
      day:"",
      time:"",
      doctor:""
    });
    const userInfo = useSelector((state:any)=>state.app.user);
    const navigate = useNavigate()
    const [requestLoading, setRequestLoading] = useState(true);
    const [requestDoctorsLoading, setRequestDoctorsLoading] = useState(true);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!userInfo?.fullname){
            navigate('/login')
    }
    
    console.log(appointmentDetails);
    const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";

    // Format the selected date
    const selectedDay = days.find(
      (day) => day.day === appointmentDetails.day && day.date === appointmentDetails.date
    );
  
    if (!selectedDay) {
      toast.error("Please select a valid date");
      return;
    }
  
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(
      new Date(
        Number(selectedDay.year),
        Number(selectedDay.month) - 1, // Convert month to a number and adjust (0-indexed)
        Number(selectedDay.date) // Convert date to a number
      )
    );
    
  

  try{

  
    const response = await axiosInstance.post('/appointment/',{
      // day: appointmentDetails.day ,
      date: formattedDate,
      time: appointmentDetails.time,
      doctor: id
    }, {
      headers: {
        "Content-Type": "application/json",
        authorization: bearerToken,
      },
    })
    console.log(response)

    toast.success("appointment set");
    setAppointmentDetails({
      day:"",
      time:"",
      doctor:""
    })
    navigate('/appointments')
  }catch(err){
    console.log(err)
  }
  };

  useEffect(() => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);

      const dayOfTheWeek = day.toLocaleString("en-us", { weekday: "short" });
      const dayOfTheMonth = day.getDate();
      const month = day.getMonth() + 1;
      const year = day.getFullYear();

      daysArray.push({ day: dayOfTheWeek, date: dayOfTheMonth , month ,year });
    }
    setDays(daysArray);
    
  }, []);

  const appointmentTimeArray = [
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
    "3:30 pm",
    "4:00 pm",
    "4:30 pm",
    "5:00 pm",
  ];

  useEffect(() => {
    const getDoctor = async () => {
      setRequestLoading(true);
      const response = await axiosInstance.get(`/doctor/${id}`);

      setDoctorData(response.data);
      // console.log(response)
      setSelectedSpeciality(response.data.speciality);
      setRequestLoading(false); 
    };
    getDoctor();
  }, [id]);

  useEffect(() => {
    const getDoctors = async () => {
      setRequestDoctorsLoading(true)
      const endpoint = selectedSpeciality
        ? `/doctor?speciality=${encodeURIComponent(selectedSpeciality)}`
        : "/doctor";
      const response = await axiosInstance.get(endpoint);
      console.log(response);
      const filteredDoctors = response.data.filter(
        (doctor: any) => doctor._id !== id
      );
      setRelatedDoctorsArray(filteredDoctors);
      setRequestDoctorsLoading(false);
    };

    getDoctors();
  }, [selectedSpeciality, id]);

  const dispatch  = useDispatch()

  const messageButtonClick = (doctorData:DoctorType) =>{

    navigate('/messages');
    dispatch(setSelectedChatData(doctorData))

  }



  return (
    <div className="flex flex-col gap-5 md:gap-10 text-gray-700">
      <Nav />

      {
         
          requestLoading ? 
          <div className="flex w-full h-[90vh] justify-center items-center">
            <LoadingButton color="#16a34a"/>

            </div>
           : 
      

      <div className="flex gap-5 flex-col md:flex-row">
        <div className=" rounded-md  group ">
          {doctorData?.picture ? (
            <div className="bg-green-500 w-full md:w-[300px] h-[300px] flex justify-center rounded-md">
              <img
                className=" rounded-md   object-cover"
                src={doctorData?.picture}
              />
            </div>
          ) : (
            <span>{doctorData.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex flex-col gap-10 items-start md:max-w-[900px] overflow-hidden">
          <div className="flex w-full flex-col p-5 gap-3 rounded-md items-start border  border-gray-300 flex-grow md:h-[300px]">
            <div className="flex gap-1 items-center">
              <span className="font-medium text-xl sm:text-2xl">
                Dr. {doctorData?.name}
              </span>{" "}
              <BadgeCheckIcon className="text-green-500" /> <span></span>{" "}
            </div>
            <div className="text-sm">
              <span>{doctorData?.degree}-</span>
              <span>{doctorData?.speciality}</span>
              <span className="border ml-2 border-gray-300 py-1 px-2  text-xs rounded-full">
                {doctorData?.experience}
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 md:mt-5">
              <div className="flex gap-1 items-center text-sm font-medium">
                About{" "}
                <span className="text-xs">
                  <InfoIcon width={15} height={15} className="text-xs" />
                </span>{" "}
              </div>
              <p className="text-start text-[14px] md:w-[90%] ">
                {doctorData?.about}
              </p>
            </div>

            <div className="font-medium md:mt-10">
              Appointment fee: ${doctorData?.fee}
            </div>
          </div>

          <div className="flex flex-col w-full gap-6 items-start">
            <div className="text-xl font-medium">Booking Slot</div>

            <form onSubmit={formSubmit} className="flex flex-col  w-full gap-8 ">
              <div className="flex gap-4 md:gap-6 flex-wrap ">
                {days?.map((item) => (
                  <div
                    onClick={() => {
                      setAppointmentDetails({
                        ...appointmentDetails,
                        day: item.day,
                        date: item.date,
                        
                      });
                    }}
                    className={` ${
                      item?.day === appointmentDetails.day &&
                      item.date === appointmentDetails.date &&
                      "bg-green-600 text-white"
                    } flex flex-col border items-center justify-center duration-100 ease-linear
                   hover:bg-green-500 hover:text-white border-green-500 cursor-pointer gap-2 rounded-full px-3 py-2 w-12 h-30`}
                  >
                    <div>{item.day}</div>
                    <div>{item.date}</div>
                  </div>
                ))}
              </div>

              <div className="w-full  overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-m scrollbar-track-gray-200">
                <div className="flex gap-3 w-fit mb-2">
                  {appointmentTimeArray.map((item) => (
                    <div
                    // onClick={() => {
                    //   setAppointmentDetails({
                    //     ...appointmentDetails,
                    //     time: item
                      
                    //   })
                    onClick={()=>setAppointmentDetails({...appointmentDetails, time:item})}
                      className={` ${
                      item === appointmentDetails.time &&
                      "bg-green-600 text-white"} border text-xs  duration-100 ease-linear hover:bg-green-500
                   hover:text-white cursor-pointer  border-green-500 py-1 w-[80px]  rounded-full flex items-center justify-center`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
             <div className="flex gap-5 flex-col sm:flex-row">

             
              <Button className="bg-green-700 text-white rounded-full py-4 px-8 md:w-fit cursor-pointer text-sm ">
                Book an appointment
              </Button>
              <Button  className="bg-white-700 text-gray-700 border-[1px] border-gray-500 rounded-full py-4 px-8 md:w-fit cursor-pointer text-sm "  onClick={()=>messageButtonClick(doctorData)}>
                Message Doctor
              </Button>

              </div>
            </form>
          </div>
        </div>
      </div>

                }

      <div className="flex flex-col my-10">
        <div className="text-xl">Related Doctors</div>

        {
        requestDoctorsLoading ? 
          <div className="flex w-full h-[20vh] justify-center items-center">

            
        <LoadingButton color="#16a34a"/> 
        </div>
        : 
     
 

        <div className="flex flex-wrap  gap-4 justify-center  md:py-10 mb-10">
          {relatedDoctorsArray.map((item, index) => {
            const { _id, name, speciality, availability, picture } = item;

            return (
              <Link
                to={`/doctors/${_id}`}
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
              </Link>
            );
          })}
        </div>
}
      </div>
        

      <Footer />
      <Toaster />
    </div>
  );
};

export default Doctor;
