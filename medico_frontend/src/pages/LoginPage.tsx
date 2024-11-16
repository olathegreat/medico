import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm"
import Nav from "../components/Nav"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Toaster } from "../components/ui/sonner"

const LoginPage = () => {
 
  const savedUserInfo = useSelector((state: any)=>state.app.user)
  const navigate = useNavigate();

  if(savedUserInfo){
    toast.success("You are already logged in")
    
    setTimeout(()=>navigate("/profile"), 1000)
        
  }

  return (
    <div className="flex flex-col gap-20">
      
      <Nav/>
      <div className="flex justify-center">
        <LoginForm/>
      </div>
      {/* <Footer/> */}
      <Toaster/>
    </div>
  )
}

export default LoginPage
