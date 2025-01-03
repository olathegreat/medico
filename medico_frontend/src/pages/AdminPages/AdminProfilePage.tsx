import { Calendar, Home, PlusSquareIcon, Users } from "lucide-react";
import AdminNav from "../../components/AdminComponents/AdminNav";
import { useState } from "react";
import Dashboard from "../../components/AdminComponents/Dashboard";
import DarkModeSetterFunction from "../../utils/DarkModeSetterFunction";
import AddDoctor from "../../components/AdminComponents/AddDoctor";
import AllDoctors from "../../components/AdminComponents/AllDoctors";
import AllAppointments from "../../components/AdminComponents/AllAppointments";

const AdminProfilePage = () => {
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
      name: "Add Doctor",
      icon: <PlusSquareIcon />,
    },
    {
      name: "Doctors List",
      icon: <Users />,
    },
    // {
    //   name: "Patients",
    //   icon: <BookUser />,
    // },
  ];
  const darkMode = DarkModeSetterFunction();

  return (
    <div
      className={`flex w-full flex-col min-h-[100vh] ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <AdminNav />
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

          {activeSideNav === "Add Doctor" && <AddDoctor />}

          {activeSideNav == "Doctors List" && <AllDoctors />}
          {activeSideNav == "Appointment" && (
            <div className="w-full  md:w-inherit">
              <AllAppointments />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminProfilePage;
