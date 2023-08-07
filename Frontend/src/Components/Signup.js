import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../About.css'; 
function Signup(props) {
  const {theme}=props;

  let navigate = useNavigate()

  const [SignupData, setSignupData] = useState({ "Name": "", "Email": "", "Password": "", "ConfirmPassword": "" })
  const submitHandle = async (e) => {
    e.preventDefault();
    if (SignupData.Password != SignupData.ConfirmPassword) {
      alert("Both Password did not match!!!")
    }
    else {
      try {
        const Response = await fetch(`http://localhost:5000/api/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ "Name": SignupData.Name, "Email": SignupData.Email, "Password": SignupData.Password })
        })
        const json = await Response.json();
        console.log(json)
        if (json.flag) {
          localStorage.setItem('auth-token', json["auth-token"]);
          navigate("/Login",{replace:true});
        }
        else {
          alert("User Already Exists!, Login to proceede.");
        }
      }
      catch (e) {
        console.log("E ", e)
      }
    }
  }
  const loginBtn=()=>{
    navigate("/Login");
  }
  const onChangeHandle = (e) => {
    setSignupData({ ...SignupData, [`${e.target.name}`]: e.target.value })
  }
  return (
    <div className='container' >
      <div className='container mt-4 comp-fade-in-up'  style={{
                transition: "0.5s", padding: "10px 20px 15px 20px",
                borderRadius: "3px",
                
                background: `${theme === "light" ? "rgb(201 246 255 / 0%)" : "#343a40"}`, boxShadow: `${theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)"} 0px 0px 5px`
            }}>
        <h1 className='my-3' style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}}>Sign-Up Here</h1>
        <form onSubmit={submitHandle}>
          <div className="mb-3">
            <label style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} htmlFor="Name" className="form-label">Name</label>
            <input style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} name="Name" required value={SignupData.Name} onChange={onChangeHandle} type="text" className="form-control" id="Name" aria-describedby="nameHelp" />
          </div>
          <div className="mb-3">
            <label style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} htmlFor="email" className="form-label">Email address</label>
            <input style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} name="Email" value={SignupData.Email} onChange={onChangeHandle} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} htmlFor="password" className="form-label">Password</label>
            <input style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} name="Password" required minLength={5} value={SignupData.Password} onChange={onChangeHandle} type="password" className="form-control" id="password" />
          </div>
          <div className="mb-3">
            <label style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
            <input style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }}name="ConfirmPassword" required minLength={5} value={SignupData.ConfirmPassword} onChange={onChangeHandle} type="password" className="form-control" id="ConfirmPassword" />
          </div>
          <button type="submit" className="btn btn-sm btn-outline-secondary">Sign-up</button>
          <button type="button" className="btn btn-sm btn-outline-secondary mx-1" onClick={loginBtn}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
