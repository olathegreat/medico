import { Book, BriefcaseMedical, Users2 } from "lucide-react"
import LatestAppointment from "./LatestAppointment"
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";


type StatisticsType ={
    userNumber: number;
    appointmentNumber: number;
    doctorNumber: number;
  }
const Dashboard = () => {
    const [statistics, setStatistics] = useState<StatisticsType>({

        userNumber: 0,
        appointmentNumber: 0,
        doctorNumber:0
      });

    
      const token = sessionStorage.getItem("token");
      const bearerToken = token ? "Bearer " + token : "";
      const adminDataReload = useSelector((state:any)=>state.app.adminDataReload)
    
      useEffect(()=>{
    
        const getStats = async()=>{
          const response = await axiosInstance.get('/admin/user-doctor-appointment-statistics/',{
            headers:{
              "Content-Type": "application/json",
                authorization: bearerToken,
            }
          })
          console.log(response);
          setStatistics(response.data)
        }
    
        getStats()
    
      },[adminDataReload])
  return (
    <div className="flex  text-gray-700 flex-col p-5 px-10 items-start gap-10 ">
        <div className=" flex w-full gap-5 justify-center md:justify-start flex-wrap">

            <div className="flex items-center justify-start gap-2 bg-white p-4  rounded-md border shadow-sm flex-1">
                <BriefcaseMedical  className="text-green-500 w-16 h-16"/>

                <div className="flex flex-col items-start  ">
                    <div className="text-xl font-bold">{statistics?.doctorNumber ? statistics?.doctorNumber : "N/A"}</div>
                    <div className="-mt-1">doctor</div>

                </div>


            </div>

            <div className="flex items-center justify-start gap-2 bg-white p-4  rounded-md border shadow-sm flex-1">
                <Book  className="text-green-500 w-16 h-16"/>

                <div className="flex flex-col items-start  ">
                    <div className="text-xl font-bold">{statistics?.doctorNumber ? statistics?.appointmentNumber : "N/A"}</div>
                    <div className="-mt-1">Appointment</div>

                </div>


            </div>

            <div className="flex items-center justify-start gap-2 bg-white p-4 flex-1 rounded-md border shadow-sm">
                <Users2  className="text-green-500 w-16 h-16"/>

                <div className="flex flex-col items-start  ">
                    <div className="text-xl font-bold">{statistics?.userNumber ? statistics?.userNumber : "N/A"}</div>
                    <div className="-mt-1">Patient</div>

                </div>


            </div>

        </div>



        <LatestAppointment/>


      
    </div>
  )
}

export default Dashboard
