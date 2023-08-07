import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import '../About.css'; 
function Login(props) {
    const { theme } = props;
    const { setLogin } = useContext(NoteContext);
    let navigate = useNavigate()
    const [LoginData, setLoginData] = useState({ "Email": "", "Password": "" })
    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const Response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ "Email": LoginData.Email, "Password": LoginData.Password })
            })
            const json = await Response.json();

            if (json.flag) {
                localStorage.setItem('auth-token', json["auth-token"]);
                setLogin(true);
                navigate("/Home",{replace:true});
            }
            else {
                alert("Invalid Email/Password")
            }
        }
        catch (e) {
            console.log("E ", e)
        }
    }
    const signupBtn=()=>{
        navigate("/Signup");
    }
    const onChangeHandle = (e) => {
        setLoginData({ ...LoginData, [`${e.target.name}`]: e.target.value })
    }
    return (
        <div className='container mt-5 comp-fade-in-up'>
            <div className='container mt-5' style={{
                transition: "0.5s", padding: "10px 20px 15px 20px",
                borderRadius: "3px",

                background: `${theme === "light" ? "rgb(201 246 255 / 0%)" : "#343a40"}`, boxShadow: `${theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)"} 0px 0px 5px`
            }}>
                <h1 className='my-3' style={{ color: theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}>Login Here</h1>
                <form onSubmit={submitHandle}>
                    <div className="mb-3">
                        <label style={{ color: theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)" }} htmlFor="email" className="form-label">Email address</label>
                        <input style={{ borderRadius: "3px", backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} name="Email" value={LoginData.Email} onChange={onChangeHandle} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label style={{ color: theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)" }} htmlFor="password" className="form-label">Password</label>
                        <input style={{ borderRadius: "3px", backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} name="Password" value={LoginData.Password} onChange={onChangeHandle} type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-sm btn-outline-secondary">Login</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary mx-1" onClick={signupBtn}>Sign-up</button>
                </form>
            </div>
        </div>
    )
}

export default Login
