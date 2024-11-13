

import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
  const isAuthenticated = true;

//   if(isLoading){
//     return <div>...loading</div>;
//   }

  if(isAuthenticated){
    return <Outlet/>
  }
 
    return   <Navigate to="/" replace/> 
    

   
}

export default ProtectedRoute
