import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ContactPage from "./pages/ContactPage";
import { useEffect } from "react";
import AboutPage from "./pages/AboutPage";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatData, toggleDarkMode } from "./utils/appSlice";
import AdminLoginPage from "./pages/AdminPages/AdminLoginPage";
import DoctorLoginPage from "./pages/DoctorPages/DoctorLoginPage";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import AdminProfilePage from "./pages/AdminPages/AdminProfilePage";
import AllDoctors from "./pages/AllDoctors";
import Doctor from "./pages/Doctor";
import MyAppointments from "./pages/MyAppointments";
import DoctorProtectedRoute from "./utils/DoctorProtectedRoute";
import DoctorProfilePage from "./pages/DoctorPages/DoctorProfilePage";
import MessagesPage from "./pages/MessagesPage";
// import MessagesPage from './pages/MessagesPage'

function App() {
  const dispatch = useDispatch();

  const savedSessionDarkModeState = JSON.parse(
    sessionStorage.getItem("darkmode") || "false"
  );
  const savedSessionSelectedChatData = JSON.parse(
    sessionStorage.getItem("sessionSelectedChatData") || "{}"
  );

  useEffect(() => {
    dispatch(toggleDarkMode(savedSessionDarkModeState));
    dispatch(setSelectedChatData(savedSessionSelectedChatData));
  }, []);
  const darkMode = useSelector((state: any) => state.app.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white"); // Dark mode classes
      document.body.classList.remove("bg-white", "text-black"); // Remove light mode classes
    } else {
      document.body.classList.add("bg-white", "text-black"); // Light mode classes
      document.body.classList.remove("bg-gray-900", "text-white"); // Remove dark mode classes
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/doctors" element={<AllDoctors />} />
      <Route path="/doctors/:id" element={<Doctor />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/messages" element={<MessagesPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/appointments" element={<MyAppointments />} />
      </Route>
      <Route path="*" element={<h1>You are lost, go back</h1>} />

      {/* admin page */}
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin-profile" element={<AdminProfilePage />} />
      </Route>

      {/* doctor page */}
      <Route path="/doctor-login" element={<DoctorLoginPage />} />
      <Route element={<DoctorProtectedRoute />}>
        <Route path="/doctor-profile" element={<DoctorProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
