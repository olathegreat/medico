import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster} from "../../components/ui/sonner";
import AdminNav from "../../components/AdminComponents/AdminNav";
import AdminLoginForm from "../../components/AdminComponents/AdminLoginForm";



const AdminLoginPage = () => {
   

    const savedUserInfo = useSelector((state: any)=>state.app.admin)
    const navigate = useNavigate();
  
    if(savedUserInfo.name){
      toast.success("You are already logged in")
      
      setTimeout(()=>navigate("/admin-profile"), 1000)
          
    }




  return (
    <div className="flex flex-col gap-20">
        <AdminNav/>
        
        <div className="flex justify-center">
            <AdminLoginForm/>

        </div>
        
    
        <Toaster/>
      
    </div>
  )
}

export default AdminLoginPage
