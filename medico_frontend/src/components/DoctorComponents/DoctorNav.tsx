
import {  useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { saveDoctor,  toggleDarkMode } from "../../utils/appSlice";
import { Switch } from "../ui/switch";






function DoctorNav() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({})
  const existinguserInfo = useSelector((state: any)=>state.app.doctor);
  const savedUserData = sessionStorage.getItem("doctorSessionInfo")
  ? JSON.parse(sessionStorage.getItem("doctorSessionInfo")!)
  : {};

  

  

  useEffect(()=>{
     if(savedUserData.name){
      setUserInfo(savedUserData);
    
     }else{
      setUserInfo(existinguserInfo);
     }  
  },[existinguserInfo])

 
  const dispatch = useDispatch();
  
  const logOutFunction = () =>{
    dispatch(saveDoctor({}));
    navigate("/doctor-login");
    sessionStorage.removeItem("doctorSessionInfo");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("doctorId")
    sessionStorage.removeItem("darkmode")


  }

  const darkMode = useSelector((state: any)=>state.app.darkMode );
  const [darkModeState, setDarkModeState] = useState(false);
  

  useEffect(()=>{
       setDarkModeState(darkMode);


  },[darkMode])

  return (
    <nav className={` font-sans w-full  flex justify-between items-center py-4 sticky top-0 z-10 ${darkModeState ? "bg-gray-900" : "bg-white"}  border-b-2 border-gray-200`}>
      <div  className="cursor-pointer flex gap-2">
        <Logo />

        {userInfo?.name ? (
          <span
            onClick={() => navigate("/doctor-profile")}
            className="border border-green-500 py-1 px-3 rounded-full cursor-pointer"
          >
            Doctor
          </span>
        ) : (
          ""
        )}
      </div>


      {!userInfo?.name ? 
        <div className="block">
          <div
            onClick={() => navigate("/doctor-login")}
            className="bg-green-600 px-4 text-white font-normal py-2 rounded-full cursor-pointer"
          >
            Doctor Login
          </div>
        </div>
       : 
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 items-center">
              {userInfo?.picture ? (
                <img
                  className="rounded-full w-10 h-10 object-cover cursor-pointer"
                  src={userInfo?.picture}
                />
              ) : (
                <span className="border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-xl font-medium object-cover cursor-pointer border bg-gray-100">
                  {userInfo?.name?.charAt(0).toUpperCase()}
                </span>
              )}

              <ChevronDown />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={`${
                !darkModeState
                  ? "bg-white text-gray-700"
                  : "bg-gray-800 text-white"
              } py-3 border rounded-md shadow`}
            >
              <DropdownMenuItem className="pl-2 pr-4">
                <div className=" flex items-center gap-4">
                  Dark Mode{" "}
                  <span className="cursor-pointer mt-1">
                    {" "}
                    <Switch
                      className="border border-green-500"
                      checked={darkModeState}
                      onCheckedChange={() => {
                        dispatch(toggleDarkMode(!darkMode));
                      }}
                    />
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="pl-2 pr-4">
                <button className="text-red-600" onClick={logOutFunction}>
                  LogOut
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
{
          userInfo?.name   &&(
      <div className="block md:hidden">
       {/* <MobileNavMenu />  */}
       <button className="text-red-600" onClick={logOutFunction}>
                  LogOut
                </button>
       
      </div>
          )}
    </nav>
  );
}

export default DoctorNav;
