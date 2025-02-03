import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { AppointmentType, DoctorType } from "../utils/types";
import axiosInstance from "../utils/axios";
import { Separator } from "../components/ui/separator";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/loadingButton";
import { setRedirectUrl, setSelectedChatData } from "../utils/appSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";

const MyAppointments = () => {
  const [userAppointments, setUserAppointments] = useState<AppointmentType[]>([
    {
      date: "",
      time: "",
      cancelled: false,
      payment: false,
      isCompleted: false,
      _id: "",
    },
  ]);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const userInfo = useSelector((state: any) => state.app.user);
  const [requestLoading, setRequestLoading] = useState(true);
  const email = userInfo?.email;
  const name = userInfo?.fullname;
  const phone = "";
  const [reload, setReload] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<AppointmentType>({
    date: "",
    time: "",
    cancelled: false,
    payment: false,
    isCompleted: false,
    _id: "",
  });
  const updateAppointmentPayment = async (appointment: AppointmentType) => {
    
    const patchUrl = "/appointment/" + appointment._id;

    const response = await axiosInstance.patch(
      patchUrl,
      { payment: true },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: bearerToken,
        },
      }
    );
    console.log(response.status)
    setReload(!reload);

    
  };

  const componentProps = {
    email: email || "test@example.com",
    // amount,
    metadata: {
      name: name || "John Doe",
      phone: phone || "0000000000",
    },
    publicKey,
    text: "Pay Now with card",

    onClose: () => alert("Transaction closed!"),
  };

  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";

  useEffect(() => {
    const getUserAppointments = async () => {
      setRequestLoading(true);
      const response = await axiosInstance.get(
        "/appointment/user-appointment",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: bearerToken,
          },
        }
      );
      setRequestLoading(false);

      //   console.log(response);
      setUserAppointments(response.data);
    };

    getUserAppointments();
  }, [reload]);

  const cancelAppointment = async (appointment: AppointmentType) => {
    const patchUrl = "/appointment/" + appointment._id;
    setActiveAppointment(appointment);

    setCancelLoading(true);

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

    console.log(response);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const messageButtonClick = (doctorData: DoctorType) => {
    if (!userInfo?.fullname) {
      toast("sign in to perform action");
      dispatch(setRedirectUrl("/messages"));
      dispatch(setSelectedChatData(doctorData));
      navigate("/login");
    } else {
      navigate("/messages");
      dispatch(setSelectedChatData(doctorData));
    }
  };
  const darkMode = DarkModeSetterFunction()
  return (
    <div className="flex flex-col  gap-5">
      <Nav />
      <div className={`${darkMode && "text-gray-200/50"} text-gray-700 flex flex-col gap-3`}>
        <div className="text-start">My Appointments</div>
        <Separator />
        {requestLoading ? (
          <div className="flex justify-center">
            <LoadingButton color="#16a34a" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {userAppointments.map((item, index: any) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 md:justify-between border-b border-b-gray-200 pb-2"
              >
                <div className="flex gap-4">
                  <div className="w-32 h-44 bg-gray-200 rounded-md">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={item?.doctor?.picture}
                    />
                  </div>

                  <div className="flex flex-col justify-between text-xs py-3">
                    <div className="flex flex-col items-start">
                      <span className={`${darkMode && "text-white"} text-black text-xl mb-1 `}>
                        {item?.doctor?.name}
                      </span>
                      <span className="text-xs">
                        {item?.doctor?.speciality}
                      </span>
                    </div>

                    <div className="flex flex-col items-start">
                      <span>Address:</span>
                      <span className="text-sm text-start">
                        {item?.doctor?.address1}
                        <br />
                        {item?.doctor?.address2}
                      </span>
                    </div>

                    <div className="text-start">
                      <span className={`${darkMode ? "text-gray-500" : "text-gray-900"} mr-1 `}>Date & Time:</span>
                      <span>
                        {item?.date} | {item?.time}
                      </span>
                      
                        <div
                          onClick={() =>item?.doctor ? messageButtonClick(item!.doctor): console.log("no doctor")}
                          className="mt-3 text-green-500 cursor-pointer underline italic"
                        >
                          Message Doctor
                        </div>
                     
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-2">
                  {!item?.payment ? (
                    <Button className="bg-green-600" onClick={() => setActiveAppointment(item)}>
                      <PaystackButton
                        amount={item?.doctor?.fee ? item?.doctor.fee * 100 : 0}
                        onSuccess={() => {
                          updateAppointmentPayment(item);
                        }}
                        className="paystack-button w-full px-3 py-1 bg-green-600 text-white  cursor-pointer "
                        {...componentProps}
                      />
                    </Button>
                  ) : (
                    <Button className="px-3 py-1 bg-green-600 text-white border border-gray-400 cursor-pointer">
                      Paid
                    </Button>
                  )}
                  {!item?.cancelled && item?._id && (
                    <Button
                      onClick={() => cancelAppointment(item)}
                      className="px-3 py-3 bg-white text-gray-700  border border-gray-400 cursor-pointer"
                    >
                      {cancelLoading && activeAppointment._id === item._id ? (
                        <LoadingButton color="gray" />
                      ) : (
                        <div className="px-3  bg-white text-gray-700 cursor-pointer">
                          Cancel Appointment
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
