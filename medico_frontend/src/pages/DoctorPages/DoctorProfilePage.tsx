import { Calendar, Home, User2Icon } from "lucide-react";
import { useState } from "react";
import DarkModeSetterFunction from "../../utils/DarkModeSetterFunction";
// import AddDoctor from "../../components/AdminComponents/AddDoctor";
// import AllAppointments from "../../components/AdminComponents/AllAppointments";
import DoctorNav from "../../components/DoctorComponents/DoctorNav";
import Dashboard from "../../components/DoctorComponents/Dashboard";
import DoctorProfileUpdateForm from "../../components/DoctorComponents/DoctorProfileUpdateForm";
import DoctorAllAppointments from "../../components/DoctorComponents/DoctorAllAppointments";

const DoctorProfilePage = () => {
  const [activeSideNav, setActiveSideNav] = useState("Dashboard");

  const sideNavArray = [
    {
      name: "Dashboard",
      icon: <Home />,
    },
    {
      name: "Appointment",
      icon: <Calendar />,
    },
    {
      name: "Profile",
      icon: <User2Icon />,
    },
  
  ];
  const darkMode = DarkModeSetterFunction();

  return (
    <div
      className={`flex w-full flex-col min-h-[100vh] ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <DoctorNav />
      <div className="flex w-full overflow-x-hidden">
        <section
          className="hidden  min-h-[88vh] lg:flex  
         flex-col md:min-w-[250px] py-5 gap-2 pt-3 border shadow-sm"
        >
          {sideNavArray.map((item) => (
            <div
              onClick={() => setActiveSideNav(item.name)}
              className={`cursor-pointer w-full ease-linear duration-100 
                flex gap-1 py-3 pl-5 ${
                  activeSideNav === item.name
                    ? " border-r-4 border-r-green-500 text-green-700  bg-gray-100"
                    : "text-gray-700"
                }`}
            >
              {item.icon}

              <span>{item.name}</span>
            </div>
          ))}
        </section>

        <section className=" flex flex-col w-full lg:flex-grow ">
          <section
            className="flex h-90vh lg:hidden bg-white justify-around
              py-5 gap-2 pt-3 border shadow-sm"
          >
            {sideNavArray.map((item) => (
              <div
                onClick={() => setActiveSideNav(item.name)}
                className={`cursor-pointer ease-linear duration-100 
                  flex items-center justify-center gap-1   h-12 ${
                    activeSideNav === item.name
                      ? " border-b-4 border-b-green-500 text-green-700 "
                      : "text-gray-400"
                  }`}
              >
                {item.icon}
              </div>
            ))}
          </section>
          {activeSideNav === "Dashboard" && <Dashboard />}

          

          {activeSideNav === "Profile" && <DoctorProfileUpdateForm />}
           {activeSideNav == "Appointment" && (
            <div className="w-full  md:w-inherit">
              <DoctorAllAppointments/>
            </div>
          )} 
        </section>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
