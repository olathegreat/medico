// type NavProps = {

import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import MobileNavMenu from "../MobileNavMenu";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { saveUser, toggleDarkMode } from "../../utils/appSlice";
import { Switch } from "../ui/switch";


// }
type NavLinks = {
  title: string;
  link: string;
};



function DoctorNav() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({})
  const existinguserInfo = useSelector((state: any)=>state.app.user);
  const savedUserData = sessionStorage.getItem("adminDoctorSessionInfo")
  ? JSON.parse(sessionStorage.getItem("adminDoctorSessionInfo")!)
  : {};

  

  useEffect(()=>{
     if(savedUserData.fullname){
      setUserInfo(savedUserData);
    
     }else{
      setUserInfo(existinguserInfo);
     }  
  },[existinguserInfo])

 
  const dispatch = useDispatch();
  
  const logOutFunction = () =>{
    dispatch(saveUser({}));
    navigate("/");
    sessionStorage.removeItem("adminDoctorSessionInfo")

  }

  const darkMode = useSelector((state: any)=>state.app.darkMode );
  const [darkModeState, setDarkModeState] = useState(false);
  

  useEffect(()=>{
       setDarkModeState(darkMode);


  },[darkMode])

  return (
    <nav className={` font-sans w-full  flex justify-between items-center py-4 sticky top-0 z-10 ${darkModeState ? "bg-gray-900" : "bg-white"}  border-b-2 border-gray-200`}>
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <Logo />

        {userInfo?.data?.name ? (
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


      {!userInfo?.data?.name ? (
        <div className="block">
          <div
            onClick={() => navigate("/admin-login")}
            className="bg-green-600 px-4 text-white font-normal py-2 rounded-full"
          >
            Admin Login
          </div>
        </div>
      ) : (
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 items-center">
              {userInfo?.data?.picture ? (
                <img
                  className="rounded-full w-10 h-10 object-cover cursor-pointer"
                  src={userInfo?.data?.picture}
                />
              ) : (
                <span className="border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-xl font-medium object-cover cursor-pointer border bg-gray-100">
                  {userInfo?.data?.name?.charAt(0).toUpperCase()}
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
      )}
{
          userInfo?.data?.name   &&(
      <div className="block md:hidden">
       <MobileNavMenu /> 
        
       
      </div>
          )}
    </nav>
  );
}

export default DoctorNav;