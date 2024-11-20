import { BookTextIcon, CircleXIcon } from "lucide-react";

const LatestAppointment = () => {
  const arrayAppointment = [
    {
      name: "Arjen Robben",
      picture: "",
    },
    {
      name: "Arjen Robben",
      picture: "",
    },
    {
      name: "Arjen Robben",
      picture: "",
    },
    {
      name: "Arjen Robben",
      picture: "",
    },
    {
      name: "Arjen Robben",
      picture: "",
    },
    {
      name: "Arjen Robben",
      picture: "",
    },
  ];
  return (
    <div className="flex w-full border  shadow-md flex-col ">
      <div className="border flex items-center py-3 shadow-b-md px-3 ">
        <span className="mr-3 text-green-600">
          <BookTextIcon />
        </span>
        <span className="text-xs">Latest Appointment</span>
      </div>

      <div className="flex flex-col ">
        {arrayAppointment.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-3 px-5 duration-100 ease-linear hover:bg-gray-200">
            <div className="flex gap-3 items-center">
              {item?.picture ? (
                <img
                  src={item?.picture}
                  className="rounded-full w-8 h-8 object-cover"
                />
              ) : (
                <span className="rounded-full text-md flex items-center justify-center text-gray-800 w-8 h-8 bg-gray-300">
                  {item?.name.charAt(0).toUpperCase()}
                </span>
              )}

              <div className="flex flex-col">
                <div className="font-medium text-sm text-start">Dr {item?.name}</div>
                <div className="text-xs text-gray-400">Book on 24th july,2024</div>
                </div>
            </div>

            <CircleXIcon className="text-red-500 cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestAppointment;
