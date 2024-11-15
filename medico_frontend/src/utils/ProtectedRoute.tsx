
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useDispatch, UseDispatch } from "react-redux";
import { toast } from "sonner";
import { Navigate, Outlet } from 'react-router-dom'
import { saveUser } from "./appSlice";

function ProtectedRoute() {
  const isAuthenticated = true;
  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get("/user/", {
        headers: {
          authorization: bearerToken,
        },
      });
      
      sessionStorage.setItem("sessionUserInfo", JSON.stringify(response?.data))
      dispatch(saveUser(response.data))

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

export default ProtectedRoute
