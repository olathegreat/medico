import { Book, BriefcaseMedical, Users2 } from "lucide-react"
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import Bookings from "./Bookings";


type StatisticsType ={
    appointment: number;
    earning: number;
    patientCount: number;
  }
const Dashboard = () => {
    const [statistics, setStatistics] = useState<StatisticsType>({

        appointment: 0,
        earning: 0,
        patientCount:0
      });

    
      const token = sessionStorage.getItem("token");
      const bearerToken = token ? "Bearer " + token : "";
      const adminDataReload = useSelector((state:any)=>state.app.adminDataReload);
      const doctorId = sessionStorage.getItem("doctorId");
    
      useEffect(()=>{
    
        const getStats = async()=>{
          const response = await axiosInstance.get(`/doctor/doctor-appointment-statistics/${doctorId}`,{
            headers:{
              "Content-Type": "application/json",
                authorization: bearerToken,
            }
          })
          console.log(response);
          setStatistics(response.data[0])
        }
    
        getStats()
    
      },[adminDataReload])
  return (
    <div className="flex  text-gray-700 flex-col py-5 p-2 md:p-5 md:px-10 items-start gap-10 ">
        <div className=" flex w-full gap-5 justify-center md:justify-start flex-wrap">

            <div className="flex items-center justify-start gap-2 bg-white p-4  rounded-md border shadow-sm flex-1">
                <BriefcaseMedical  className="text-green-500 w-16 h-16"/>

                <div className="flex flex-col items-start  ">
                    <div className="text-xl font-bold">{statistics?.earning ? "$" + statistics?.earning : "N/A"}</div>
                    <div className="-mt-1">Earning</div>

                </div>


            </div>

            <div className="flex items-center justify-start gap-2 bg-white p-4  rounded-md border shadow-sm flex-1">
                <Book  className="text-green-500 w-16 h-16"/>

                <div className="flex flex-col items-start  ">
                    <div className="text-xl font-bold">{statistics?.appointment ? statistics?.appointment : "N/A"}</div>
                    <div className="-mt-1">Appointment</div>

                </div>


            </div>

            <div className="flex items-center justify-start gap-2 bg-white p-4 flex-1 rounded-md border shadow-sm">
                <Users2  className="text-green-500 w-16 h-16"/>

                <div className="flex flex-col items-start  ">
                    <div className="text-xl font-bold">{statistics?.patientCount ? statistics?.patientCount : "N/A"}</div>
                    <div className="-mt-1">Patient</div>

                </div>


            </div>

        </div>

        <Bookings/>
        

        




      
    </div>
  )
}

export default Dashboard
