import { React, useContext } from 'react'
import { Link,useNavigate,useLocation } from "react-router-dom";
import NoteContext from '../context/NoteContext';
function Navbar(props) {
  const navigate=useNavigate();

  const {isLogin,setLogin}=useContext(NoteContext);
  const location=useLocation();
  if(location.pathname=="/"){
    localStorage.removeItem("auth-token");
  }
  const signoutBtn=()=>{
    if(window.confirm("Do you really want to sign out?")){
      setLogin(false)
      localStorage.removeItem("auth-token")
      setTimeout(()=>{
        navigate("/",{replace:true});
      },100)
    }

  }
  const {theme}=props;
  return (
    <div>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary navbar-${props.theme==="light"?"light":"dark"} bg-${props.theme==="light"?"light":"dark"}`} data-bs-theme={`${props.theme==="light"?"light":"dark"}`} id='navCss' style={{ backgroundColor: props.theme === "light" ? "#80808005" : "#83a4ff1a" }}>
        <div className="container-fluid">
          <Link className="nav-link" to={`${isLogin?"/Home":"/"}`} style={{ fontSize: "2rem", color:theme==="light"?"rgb(100, 160, 255)":"rgba(189, 189, 189, 0.67)"}} id='home'>Notesify</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                
                <Link id='l2' className="nav-link" to="/Users" style={{color:theme==="light"?"rgb(100, 160, 255)":"rgba(189, 189, 189, 0.67)",fontSize:"1.24rem" ,display:!isLogin?"none":"block"}}>Tools</Link>
              </li>
              <li className="nav-item">
              <Link id='l1' className="nav-link active" to="/About" style={{color:theme==="light"?"rgb(100, 160, 255)":"rgba(189, 189, 189, 0.67)",fontSize:"1.24rem"}}>About</Link>
              </li>
            </ul>
            <div className="d-flex" role="search">
            <button className="btn btn-md btn-outline-secondary mx-1" style={{display:!isLogin?"none":"block"}} onClick={signoutBtn}>Sign-out</button>
            <button className="btn btn-md btn-outline-primary" onClick={props.changeTheme}><i className={`far fa-${props.theme==="light"?"moon":"sun"}`}></i></button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}



export default Navbar
