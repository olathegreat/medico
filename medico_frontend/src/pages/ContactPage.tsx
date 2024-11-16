import Nav from "../components/Nav";
import contactImage from "../assets/assets_frontend/contact_image.png";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";

const ContactPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <Nav/>
    
            <div className="flex flex-col gap-10">
                <div className={`text-xl   ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                    CONTACT <span className="font-bold">US</span>
                </div>
    
                <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
                    <img src={contactImage} alt="img" className="w-80 h-80 rounded-md object-cover"/>
                    <div className="flex flex-col justify-start text-start text-xs gap-1 md:w-40">
                        <div className="font-medium  mb-1 ">OUR OFFICE</div>
                        <div className={`text-xs mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                        54709 Willms Station 
                        Suite 350, Washington, USA
                        </div>
    
                        <div className={`text-xs  ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                        Tel: +1 234 455 667
                        </div>
                        <div className={`text-xs ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                            Email: medico@olarotimi.com
    
                        </div>
                        <div className="font-medium mt-5">CAREERS AT MEDICO</div>
                        <div className={`text-xs mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                        Learn more about our teams and job openings
                        </div>
    
                        <button className="py-3 px-6 border border-gray-500">
                            EXPLORE JOBS
                        </button>
    
                        
    
                        
                        
                    </div>
                </div>
    
            </div>
          
        </div>
      )
};

export default ContactPage;
