import { useEffect, useState } from "react";
import { AppointmentType } from "../../utils/types";
import axiosInstance from "../../utils/axios";

const AllAppointments = () => {
 
  const [appointments, setAppointments] = useState<AppointmentType[]>([

    {
      date: "",
      time: "",
      cancelled: false,
      payment: false,
      isCompleted: false,
      _id: "",
    },
  ]);

  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";

  function calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    // Check if the birthday has occurred this year
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    return isBirthdayPassed ? age : age - 1;
  }
  

  useEffect(()=>{

    const getAppointments = async()=>{
      const response = await axiosInstance.get('/appointment/',{
        headers:{
          "Content-Type": "application/json",
            authorization: bearerToken,
        }
      })
      console.log(response);
      setAppointments(response.data)
    }

    getAppointments()
  },[]);

  return (
    <div className="flex flex-col overflow-x-hidden w-inherit gap-5 px-8 py-4">
      <div className="text-start">All Appointments</div>

      {/* <div className="flex">
          

       </div> */}
       <div className="overflow-x-scroll  w-[90vw] bg-red-500 rounded-lg border border-gray-200 shadow-sm">

       
      <table className="w-content bg-white">
        <thead className="bg-gray-100 text-sm uppercase text-gray-600">
          <tr>
            <th className="px-4 py-2 text-start">#</th>
            <th className="px-4 py-2 text-start">Patient</th>
            <th className="px-4 py-2 text-start">Age</th>
            <th className="px-4 py-2 text-start text-nowrap">Date & Time</th>
            <th className="px-4 py-2 text-start">Doctor</th>
            <th className=" px-4 py-2 text-start">Fee</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50" >
              <td className="px-4 py-2 text-start text-sm">{index + 1}</td>
              <td className="px-4 py-2 flex gap-2 items-center text-sm">
                <div>
                  {item?.user?.picture ? (
                    <img
                      src={item?.user?.picture}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                  ) : (
                    <span className="rounded-full text-md flex items-center justify-center
                     text-gray-800 w-8 h-8 bg-gray-300 text-nowrap">
                      {item?.user?.fullname?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="text-nowrap"> {item?.user?.fullname}</div>
              </td>
              <td className="text-start text-nowrap px-4 py-2 text-sm">{item?.user?.birthday && calculateAge(item.user.birthday)} years</td>
              <td className="text-start text-nowrap px-4 py-2 text-sm">{item?.date + " " + item?.time}</td>
              <td className="flex gap-2 text-nowrap items-center px-4 py-2 text-sm">
                <div>
                  {item?.doctor?.picture ? (
                    <img
                      src={item?.doctor?.picture}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                  ) : (
                    <span className="rounded-full text-md flex items-center justify-center text-gray-800 w-8 h-8 bg-gray-300">
                      {item?.doctor?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div> {item?.doctor?.name}</div>
              </td>
              <td className="text-start px-4 py-2 text-sm">{item?.doctor?.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AllAppointments;
