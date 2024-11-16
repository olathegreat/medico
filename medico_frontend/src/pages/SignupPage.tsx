import { useSelector } from "react-redux";
import Nav from "../components/Nav"
import SignupForm from "../components/SignupForm"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

const SignupPage = () => {
  const savedUserInfo = useSelector((state: any)=>state.app.user)
  const navigate = useNavigate();

  if(savedUserInfo){
    toast.success("You are already logged in")

    
    setTimeout(()=>navigate("/profile"), 1000)
        
  }
  return (
    <div className="flex flex-col gap-20 pb-20">
        <Nav/>
        <div className="flex justify-center">
        <SignupForm/>
        </div>

        <Toaster/>
       
       
    </div>
  )
}

export default SignupPage
