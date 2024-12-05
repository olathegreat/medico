import Nav from "../components/Nav"
import aboutImage from "../assets/assets_frontend/about_image.png"
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";

const AboutPage = () => {
    return (
        <div className="flex flex-col gap-10">
          <Nav />
    
          <div className="flex flex-col gap-10 pb-10">
            <div className={`text-xl ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
              ABOUT <span className="font-bold">US</span>
            </div>
    
            <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
              <img
                src={aboutImage}
                alt="img"
                className="w-80 h-80 rounded-md object-cover"
              />
              <div className="flex flex-col justify-start text-start text-xs gap-1  md:w-80">
                <div className={`text-xs mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                  Welcome to Prescripto, your trusted partner in managing your
                  healthcare needs conveniently and efficiently. At Prescripto, we
                  understand the challenges individuals face when it comes to
                  scheduling doctor appointments and managing their health records
                </div>
    
                <div className={`text-xs mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                  Prescripto is committed to excellence in healthcare technology. We
                  continuously strive to enhance our platform, integrating the
                  latest advancements to improve user experience and deliver
                  superior service. Whether you're booking your first appointment or
                  managing ongoing care, Prescripto is here to support you every
                  step of the way.
                </div>
    
                <div className="text-xs font-bold mb-3">Our Vision</div>
                <div className={`text-xs mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>
                  Our vision at Prescripto is to create a seamless healthcare
                  experience for every user. We aim to bridge the gap between
                  patients and healthcare providers, making it easier for you to
                  access the care you need, when you need it.
                </div>
    
              
              </div>
            </div>
    
    
            <div className=" text-gray-700 text-start">
              WHY <span className={`text-xs font-bold mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>CHOOSE US</span>
            </div>
    
            <div className="flex flex-col gap-5 md:flex-row border border-gray-400 py-10 px-5  items-start md:justify-between ">
                <div className="flex flex-col  gap-3 md:w-[280px]  text-xs">
                    <div className={`text-xs text-start font-bold mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>EFFICIENCY</div>
                    <p className="text-start">
                    Streamlined appointment scheduling that fits into your busy lifestyle.
                    </p>
    
    
                </div>
    
                <div className="flex flex-col gap-3 md:w-[280px]   text-xs">
                    <div className={`text-xs text-start font-bold mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>CONVENIENCE</div>
                    <p className="text-start">
                    Access to a network of trusted healthcare professionals in your area.
                    </p>
    
    
                </div>
    
                <div className="flex flex-col gap-3 md:w-[280px]  text-xs">
                    <div className={`text-xs text-start font-bold mb-2 ${DarkModeSetterFunction() ? "text-gray-400" : "text-gray-700"}`}>PERSONALIZATION</div>
                    <p className="text-start">
                    Tailored recommendations and reminders to help you stay on top of your health.
                    </p>
    
    
                </div>
    
                
    
    
            </div>
          </div>
          {/* <Footer/> */}
        </div>
      );
    
}

export default AboutPage

