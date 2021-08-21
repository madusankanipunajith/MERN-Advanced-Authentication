import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "./css/RegisterScreen.css"

function RegisterScreen({history}) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/")
        }
       
    }, [history])


    const registerHandler = async(e)=>{
        e.preventDefault();

        const config={
            headers:{
                "Content-Type": "application/json"
            }
        }

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(()=>{
                setError("Password don't match")
            },3000)
        }

        try{
            const {data} = await axios.post("http://localhost:8080/api/auth/register",{username,email,password}, config)
            localStorage.setItem("authToken", data.token)

            history.push("/")
        }catch(error){
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }
    return (
        <div className="register-screen">
            <form onSubmit={registerHandler} className="register-screen__form">
                <h3 className="register-screen__title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" required id="name" placeholder="Enter username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" required id="email" placeholder="Enter email address" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" required id="password" placeholder="Enter strong password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input type="password" required id="confirm password" placeholder="Enter password again" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>

                <span className="register-screen__subtext">Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default RegisterScreen
