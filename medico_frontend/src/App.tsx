import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'

function App() {
  

  return (
    <Routes>
      <Route path="/" element= {<Homepage/>}/>
      <Route path="*" element= {<h1>You are lost, go back</h1>}/>
    </Routes>
  )
}

export default App
