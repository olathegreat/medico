
import {  useEffect } from "react";
import axiosInstance from "./axios";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'
import {  saveDoctor } from "./appSlice";

function DoctorProtectedRoute() {
  const isAuthenticated = true;
  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";
  const dispatch = useDispatch();

  useEffect(() => {
    const doctorId = sessionStorage.getItem("doctorId")
    const getUser = async () => {
      const response = await axiosInstance.get(`/doctor/${doctorId}`, {
        headers: {
          authorization: bearerToken,
        },
      });
      console.log(response.data)
      
      sessionStorage.setItem("doctorSessionInfo", JSON.stringify(response?.data))
      dispatch(saveDoctor(response.data));
      console.log(response.data)

      // setUserDetails(response);
    };
    getUser();
  }, []);

//   if(isLoading){
//     return <div>...loading</div>;
//   }

  if(isAuthenticated){
    return <Outlet/>
  }
 
    return   <Navigate to="/" replace/> 
    

   
}

export default DoctorProtectedRoute
