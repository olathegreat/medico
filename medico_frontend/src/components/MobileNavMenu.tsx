import { MenuIcon } from "lucide-react"

  
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import Logo from "./Logo";


type NavLinks = {
    title: string;
    link: string;
  };


const MobileNavMenu = () => {
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
    <Sheet>
        <SheetTrigger>
            <MenuIcon className="text-green-600"/>  
        </SheetTrigger>

        <SheetContent className="flex flex-col items-start">
            <SheetTitle>
                <Logo/>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-4">

           
            
           {
            navLinks.map((navItem, index) => {
                const { title, link } = navItem;
                return (
                
                    <Link key={index} className="hover:border-b-green-600 hover:border-b-2 " to={link}>{title}</Link>
            
                );
              })
           }
            </SheetDescription>
           
        </SheetContent>
        </Sheet>
  
  )
}

export default MobileNavMenu