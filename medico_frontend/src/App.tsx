import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './utils/ProtectedRoute'
import UserProfilePage from './pages/UserProfilePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'


function App() {
  

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
