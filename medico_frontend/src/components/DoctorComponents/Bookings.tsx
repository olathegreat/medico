import { BookTextIcon, CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { AppointmentType } from "../../utils/types";
import { useDispatch } from "react-redux";
import { toggleAdminDataReload } from "../../utils/appSlice";

const Bookings = () => {
  const [reload, setReload] = useState(false);
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


  useEffect(()=>{
    const getAppointments = async()=>{
      const response = await axiosInstance.get('/appointment/doctor-appointment/',{
        headers:{
          "Content-Type": "application/json",
            authorization: bearerToken,
        }
      })
      console.log(response);
      setAppointments(response.data)
    }

    getAppointments()
  },[reload])

  const dispatch = useDispatch();
  const cancelAppointment = async (appointment: AppointmentType) => {
    const patchUrl = "/appointment/admin-or-doctor/" + appointment._id;
    

    const response = await axiosInstance.patch(
      patchUrl,
      { cancelled: true },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: bearerToken,
        },
      }
    );
    setReload(!reload);
    dispatch(toggleAdminDataReload())

    console.log(response);
  };
  return (
    <div className="flex w-full border  shadow-md flex-col ">
      <div className="border flex items-center py-3 shadow-b-md px-3 ">
        <span className="mr-3 text-green-600">
          <BookTextIcon />
        </span>
        <span className="text-xs">Latest Booking</span>
      </div>

      <div className="flex flex-col ">
        {appointments?.slice(0,5).map((item, index) => (
          <div key={index} className="flex justify-between items-center py-3 px-2 md:px-5 duration-100 ease-linear hover:bg-gray-200">
            <div className="flex gap-3 items-center">
              {item?.user?.picture ? (
                <img
                  src={item?.doctor?.picture}
                  className="rounded-full w-8 h-8 object-cover"
                />
              ) : (
                <span className="rounded-full text-md flex items-center justify-center text-gray-800 w-8 h-8 bg-gray-300">
                { item?.user?.fullname &&  item?.user?.fullname.charAt(0).toUpperCase()}
                </span>
              )}

              <div className="flex flex-col">
                <div className="font-medium text-sm text-start"> {item?.user?.fullname}</div>
                <div className="text-xs text-start text-gray-400">Book on {item?.date + "," + item?.time}</div>
                </div>
            </div>

            <CircleXIcon onClick={() => cancelAppointment(item)} className="text-red-500 cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
