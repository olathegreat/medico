import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './utils/ProtectedRoute'
import UserProfilePage from './pages/UserProfilePage'
import ContactPage from './pages/ContactPage'
import {useState, useEffect} from "react"
import AboutPage from './pages/AboutPage'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from './utils/appSlice'
import AdminLoginPage from './pages/AdminPages/AdminLoginPage'
import DoctorLoginPage from './pages/DoctorPages/DoctorLoginPage'
import AdminProtectedRoute from './utils/AdminProtectedRoute'
import AdminProfilePage from './pages/AdminPages/AdminProfilePage'



function App() {
  const savedSessionDarkModeState = sessionStorage.getItem("darkmode")
  ? JSON.parse(sessionStorage.getItem("darkmode")!)
  : false;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(toggleDarkMode(savedSessionDarkModeState))
    

  },[])
  const darkMode = useSelector((state: any)=>state.app.darkMode );
  const [darkModeState, setDarkModeState] = useState(false);

  useEffect(()=>{
       setDarkModeState(darkMode);
       if(darkMode){
        document.body.classList.add('bg-gray-900', 'text-white'); // Dark mode classes
        document.body.classList.remove('bg-white', 'text-black'); // Remove light mode classes

       }else{
        document.body.classList.add('bg-white', 'text-black'); // Light mode classes
        document.body.classList.remove('bg-gray-900', 'text-white'); // Remove dark mode classes
       }
  },[darkMode])

  
  

  return (
    
    <Routes>
      
      <Route path="/" element= {<Homepage/>}/>
      <Route path="/signup" element= {<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={
            <UserProfilePage/>
          }
        />
      </Route>
      <Route path="*" element= {<h1>You are lost, go back</h1>}/>




      {/* admin page */}
      <Route path='/admin-login' element={<AdminLoginPage/>}/>
      <Route element={<AdminProtectedRoute/>}>
        <Route
          path="/admin-profile"
          element={
            <AdminProfilePage/>
          }
        />
      </Route>
      


      {/* doctor page */}
      <Route path='/doctor-login' element={<DoctorLoginPage/>}/>
    </Routes>
    
  )
}

export default App
