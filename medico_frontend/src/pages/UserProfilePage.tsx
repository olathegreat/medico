import {useState, useEffect} from "react"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import axiosInstance from "../utils/axios";
import ProfileUpdateForm from "../components/ProfileUpdateForm";

const UserProfilePage = () => {

  


  return (
    <div className="flex flex-col gap-20">
      <Nav/>
      <div>
        <ProfileUpdateForm/>
        
      </div>
      <Footer/>
    </div>
  )
}

export default UserProfilePage
