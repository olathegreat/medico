import { MenuIcon } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { saveUser } from "../utils/appSlice";

type NavLinks = {
  title: string;
  link: string;
};

const MobileNavMenu = () => {
  const [userInfo, setUserInfo] = useState<any>({});
  const existinguserInfo = useSelector((state: any) => state.app.user);

  useEffect(() => {
    setUserInfo(existinguserInfo);
  }, [existinguserInfo]);
  const navLinks: NavLinks[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "All Doctors",

      link: "/doctors",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logOutFunction = () =>{
    dispatch(saveUser({}));
    navigate("/");
    sessionStorage.removeItem("sessionUserInfo")

  }
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-green-600" />
      </SheetTrigger>

      <SheetContent className="flex flex-col items-start">
        <SheetTitle>
          <Logo />
        </SheetTitle>
        {userInfo.fullname && (
          <div className="flex justify-center  w-full">
            {userInfo?.picture ? (
              <img
                className="rounded-full w-20 h-20 object-cover cursor-pointer"
                src={userInfo?.picture}
              />
            ) : (
              <span className="text-2xl w-20 h-20 rounded-full bg-green-600 flex items-center  justify-center">
                {userInfo?.fullname?.charAt(0)}
              </span>
            )}
          </div>
        )}
        <SheetDescription className="flex flex-col gap-4">
          {
            userInfo?.fullname && 
            <Link to="/profile">
              Profile
            </Link>
          }
           {
            userInfo?.fullname && 
            <Link to="/appointment">
              My Appointment
            </Link>
          }
          {navLinks.map((navItem, index) => {
            const { title, link } = navItem;
            return (
              <Link
                key={index}
                className="hover:border-b-green-600 hover:border-b-2 "
                to={link}
              >
                {title}
              </Link>
            );
          })}

{
            userInfo?.fullname && 
            <button onClick={logOutFunction} className="pl-0 ml-0 text-start text-red-600">
              Logout
            </button>
          }

          {!userInfo.fullname && (
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-600 px-4 flex text-white font-normal py-2 rounded-full"
            >
              Create Account
            </button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavMenu;
