
import Nav from "../components/Nav"
import SignupForm from "../components/SignupForm"

import { Toaster } from "../components/ui/sonner";

const SignupPage = () => {
 
    
 
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
