import { useSelector } from 'react-redux'
import {useState, useEffect} from "react"

 const DarkModeSetterFunction = () => {

    const darkMode = useSelector((state: any)=>state.app.darkMode );
  const [darkModeState, setDarkModeState] = useState(false);
  useEffect(()=>{
    setDarkModeState(darkMode)
},[darkMode])


  return darkModeState
}

export default DarkModeSetterFunction
