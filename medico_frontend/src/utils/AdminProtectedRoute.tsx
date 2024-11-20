
import { useState, useEffect } from "react";
import axiosInstance from "./axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Navigate, Outlet } from 'react-router-dom'
import { saveAdmin } from "./appSlice";

function AdminProtectedRoute() {
  const isAuthenticated = true;
  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get("/admin/", {
        headers: {
          authorization: bearerToken,
        },
      });
      
      sessionStorage.setItem("adminSessionInfo", JSON.stringify(response?.data))
      dispatch(saveAdmin(response.data));
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

export default AdminProtectedRoute
