
import LoginForm from "../components/LoginForm"
import Nav from "../components/Nav"

const LoginPage = () => {
 
  

  return (
    <div className="flex flex-col gap-20">
      
      <Nav/>
      <div className="flex justify-center">
        <LoginForm/>
      </div>
     
      
    </div>
  )
}

export default LoginPage
