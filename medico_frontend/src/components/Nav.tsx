// type NavProps = {

import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MobileNavMenu from "./MobileNavMenu";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { saveUser } from "../utils/appSlice";

// }
type NavLinks = {
  title: string;
  link: string;
};

interface FormDataType {
  _id?: string | undefined;
  fullname: string;
  email: string;
  address?: string;
  gender?: "male" | "female" | "other";
  phone?: string;
  birthday?: string;
  picture?: File | string;
}

function Nav() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({})
  const existinguserInfo = useSelector((state: any)=>state.app.user);
  

  useEffect(()=>{
      setUserInfo(existinguserInfo);
      
  },[existinguserInfo])
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
  const dispatch = useDispatch();
  
  const logOutFunction = () =>{
    dispatch(saveUser({}));
    navigate("/");

  }
  return (
    <nav className=" font-sans w-full  flex justify-between items-center py-4 sticky top-0 z-10 bg-white border-b-2 border-gray-200">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <Logo />
      </div>

      <div className="hidden md:flex gap-6   ">
        {navLinks.map((navItem, index) => {
          const { title, link } = navItem;
          return (
            <span>
              <Link
                className="hover:border-b-green-600 hover:border-b-2 text-gray-700"
                key={index}
                to={link}
              >
                {title}
              </Link>
            </span>
          );
        })}
      </div>

      
      {
        !userInfo.fullname  ?
      

      <div className="hidden md:block">
        <button onClick={()=>navigate('/signup')} className="bg-green-600 px-4 text-white font-normal py-2 rounded-full">
          Create Account
        </button>
      </div>

      :

      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 items-center">
            <img className="rounded-full w-10 h-10 object-cover cursor-pointer" src={userInfo?.picture}/>
             <ChevronDown/>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white py-3 border rounded-md shadow">
            <DropdownMenuItem className="pl-2 pr-4">
              <Link to="/profile">
                Profile
              </Link>

            </DropdownMenuItem>

            <DropdownMenuItem className="pl-2 pr-4">
              <div>
                Dark Mode
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
      <div className="block md:hidden">
        <MobileNavMenu/>
        
         

      </div>
    </nav>
  );
}

export default Nav;
