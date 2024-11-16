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
import { useSelector } from 'react-redux'



function App() {
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
    </Routes>
    
  )
}

export default App
