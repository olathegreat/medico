// type NavProps = {

import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MobileNavMenu from "./MobileNavMenu";

// }
type NavLinks = {
  title: string;
  link: string;
};

function Nav() {
  const navigate = useNavigate();
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
  return (
    <nav className=" font-sans w-full  flex justify-between items-center py-4 sticky top-0 z-10 bg-white">
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

      <div className="hidden md:block">
        <button className="bg-green-600 px-4 text-white font-normal py-2 rounded-full">
          Create Account
        </button>
      </div>

      <div className="block md:hidden">
        <MobileNavMenu/>
         

      </div>
    </nav>
  );
}

export default Nav;
