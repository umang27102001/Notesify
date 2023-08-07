import React, { useContext } from 'react'
import cardImg from "./cardImg.png"
import { Link } from "react-router-dom";
import NoteContext from '../context/NoteContext';
import '../About.css'; 
function FirstPage(props) {
    const {theme}=props;
    const {setLogin } = useContext(NoteContext);
    const signupBtn = () => {
        setLogin(false);
    }
    return (
        <div>
            <div className='container my-3 myBox comp-fade-in-up'>
                <div className="card" style={{ boxShadow:"0px 0px 9px grey", padding:"1rem", background:theme==="light"?"white":"rgb(255 255 255 / 12%)",width: "20rem", border: "none" }}>
                    <img src={cardImg} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title" style={{color:theme==="light"?"black":"rgba(189, 189, 189, 0.67)"}}>Welcome to Notesify</h5>
                        <p className="card-text" style={{color:theme==="light"?"black":"rgba(189, 189, 189, 0.67)"}}>Note down your notes on Notesify easily.</p>
                        <div className="myBox">
                            <Link className="btn btn-sm btn-outline-secondary" to="/Login">Login</Link>
                            <Link className="btn btn-sm btn-outline-secondary mx-1" onClick={signupBtn} to="/Signup">Sign-up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstPage
