import Footer from "../components/Footer"
import Nav from "../components/Nav"
import ProfileUpdateForm from "../components/ProfileUpdateForm";

const UserProfilePage = () => {

  


  return (
    <div className="flex flex-col gap-10">
      <Nav/>
      <div>
        <ProfileUpdateForm/>
        
      </div>
      
    </div>
  )
}

export default UserProfilePage
