import Nav from "../components/Nav"
import SignupForm from "../components/SignupForm"

const SignupPage = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
        <Nav/>
        <div className="flex justify-center">
        <SignupForm/>
        </div>
       
       
    </div>
  )
}

export default SignupPage
