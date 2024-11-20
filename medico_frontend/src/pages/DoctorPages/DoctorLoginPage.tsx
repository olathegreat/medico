import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster} from "../../components/ui/sonner";

import DoctorNav from "../../components/DoctorComponents/DoctorNav";
import DoctorLoginForm from "../../components/DoctorComponents/DoctorLoginForm";



const DoctorLoginPage = () => {
   

    const savedUserInfo = useSelector((state: any)=>state.app.doctor)
    const navigate = useNavigate();
  
    // if(savedUserInfo){
    //   toast.success("You are already logged in")
      
    //   setTimeout(()=>navigate("/profile"), 1000)
          
    // }




  return (
    <div className="flex flex-col gap-20">
        <DoctorNav/>
        
        <div className="flex justify-center">
            <DoctorLoginForm/>

        </div>
        
    
        <Toaster/>
      
    </div>
  )
}

export default DoctorLoginPage
