import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { AppointmentType } from "../utils/types";
import axiosInstance from "../utils/axios";
import { Separator } from "../components/ui/separator";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import LoadingButton from "../components/loadingButton";

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
    console.log(activeAppointment);
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
    setReload(!reload);

    console.log(response);
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
    // onSuccess: () =>{
    //     // alert("Thanks for your payment!");
    //       updateAppointmentPayment();

    // },
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
  return (
    <div className="flex flex-col  gap-5">
      <Nav />
      <div className="text-gray-700 flex flex-col gap-3">
        <div className="text-start">My Appointments</div>
        <Separator />
        {
          
            requestLoading ? 
            <div className="flex justify-center"> 

            <LoadingButton color="#16a34a"/> 
            </div>
            : 
       
        <div className="flex flex-col gap-2">
          {userAppointments.map((item) => (
            <div className="flex flex-col md:flex-row gap-2 md:justify-between border-b border-b-gray-200 pb-2">
              <div className="flex gap-4">
                <div className="w-32 h-44 bg-gray-200 rounded-md">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={item?.doctor?.picture}
                  />
                </div>

                <div className="flex flex-col justify-between text-xs py-3">
                  <div className="flex flex-col items-start">
                    <span className="text-black text-xl mb-1 ">
                      {item?.doctor?.name}
                    </span>
                    <span className="text-xs">{item?.doctor?.speciality}</span>
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
                    <span className="mr-1 text-gray-900">Date & Time:</span>
                    <span>
                      {item?.date} | {item?.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2">
                {!item?.payment ? (
                  <div onClick={() => setActiveAppointment(item)}>
                    <PaystackButton
                      amount={item?.doctor?.fee ? item?.doctor.fee * 100 : 0}
                      onSuccess={() => {
                        updateAppointmentPayment(item);
                      }}
                      className="paystack-button w-full px-3 py-1 bg-green-600 text-white  cursor-pointer "
                      {...componentProps}
                    />
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-green-600 text-white border border-gray-400 cursor-pointer">
                    Paid
                  </div>
                )}
                {!item?.cancelled && item?._id && (
                  <button
                    onClick={() => cancelAppointment(item)}
                    className="px-3 py-1  border border-gray-400 cursor-pointer"
                  >
                    {cancelLoading && activeAppointment._id === item._id ? (
                      <LoadingButton color="gray" />
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item)}
                        className="px-3 py-1  cursor-pointer"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
         }
      </div>
    </div>
  );
};

export default MyAppointments;
