
import './App.css';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import About from './Components/About';
import { useState } from 'react';
import StateNote from './context/StateNote';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Tools from './Components/Tools';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FirstPage from './Components/FirstPage';


function App() {
  const [theme, setTheme] = useState("light")
  localStorage.setItem(theme,"light");
  document.body.style.backgroundColor=theme==="light"?"white":"rgb(19 22 25 / 86%)";
  const changeTheme=()=>{
    if(theme==="light"){
      setTheme("dark");
      document.body.style.transition="0.8s";
    }
    else{
      setTheme("light");
      document.body.style.transition="0.8s";
    }
  }
  return(
   <StateNote>
     <BrowserRouter>
    
    <Navbar theme={theme} changeTheme={changeTheme}/>
    <div className='container'>
    <Routes>
      <Route path="/" element={<FirstPage theme={theme}/>} />
      <Route path="/Signup" element={<Signup theme={theme}/>} />
      <Route path="/About" element={<About theme={theme}/>} />
      <Route path="/Users" element={<Tools theme={theme}/>}/>
      <Route path="/Login" element={<Login theme={theme}/>}/>
      <Route path="/Home" element={<HomePage theme={theme}/>}/>

    </Routes>
    </div>

</BrowserRouter>
   </StateNote>
  )
}

export default App;
