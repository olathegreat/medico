import { Link } from "react-router-dom";
import Logo from "./Logo";
import { CopyrightIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";

type NavLinks = {
  title: string;
  link: string;
};

const Footer = () => {
  const navLinks: NavLinks[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "All Doctors",

      link: "/doctors",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "Privacy Policy",
      link: "/privacy",
    },
  ];
  return (
    <footer
      className={`flex flex-col ${
        DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"
      }  bg-gray-100 p-5  gap-10  justify-between items-center md:items-start `}
    >
      <div className=" flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="flex md:w-[50%] flex-col gap-4 items-start">
          <Logo />
          <div className={` text-left  `}>
            Meet our dedicated team of specialists, offering expertise across
            various fields including General Medicine, Gynecology, Pediatrics,
            Dermatology, Neurology, and Gastroenterology. Our doctors are here
            to provide compassionate and personalized care, ensuring your health
            and well-being are always a priority.
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-1">
          <div className=" text-xl font-medium text-left">COMPANY</div>

          <div className="flex flex-col gap-2 items-start">
            {navLinks.map((navItem, index) => {
              const { title, link } = navItem;
              return (
                <span key={title}>
                  <Link
                    className="hover:border-b-green-600 hover:border-b-2 "
                    key={index}
                    to={link}
                  >
                    {title}
                  </Link>
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-1 text-700 items-start">
          <div className=" text-xl font-medium">GET IN TOUCH</div>

          <div className="flex flex-col gap-2 items-start ">
            <Link to="">+234-56789-1011</Link>
            <Link to="">medico@gmail.com</Link>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex gap-1  justify-center  w-full mb-10">
        <CopyrightIcon className="" />{" "}
        <span>2024 Medico by Olarotimi - All right reserved </span>
      </div>
    </footer>
  );
};

export default Footer;
