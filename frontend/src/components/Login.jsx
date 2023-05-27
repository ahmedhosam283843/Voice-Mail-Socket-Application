import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import './login.css'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("token")
        localStorage.removeItem("token")
      }, []);

    const LignupHandel = async (data)=>{
        const url = "http://localhost:5000/login"
        try{
          
          const res = await axios.post(url, data);
          console.log(res);
          const token = res.data.accessToken;
          console.log("token: " + token);
          sessionStorage.removeItem("token");
          localStorage.removeItem("token");
    
          sessionStorage.setItem("token", token);
          localStorage.setItem("token", token);
          navigate("/mailbox");
        }catch(error){
          console.error(error);
        }
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        const data = {
            "email": email,
            "password": pass
          };
          LignupHandel(data);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" className="btn btn-light">  Login </button>
            </form>
            <Link className="link-btn" to="/signup">Don't have an account? Register here.</Link>
        </div>
    )
}

export default Login;
