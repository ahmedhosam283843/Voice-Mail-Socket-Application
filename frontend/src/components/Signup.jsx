import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const SignupHandel = async (data) => {
    const url = "http://localhost:5000/user";
    try {
      const res = await axios.post(url, data);
      const token = res.data.accessToken;
      console.log("token: " + token);
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");

      sessionStorage.setItem("token", token);
      localStorage.setItem("token", token);
      navigate("/mailbox");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: pass,
    };
    console.log(data);
    SignupHandel(data);
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Full Name"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit" className="btn btn-light">
          Register
        </button>
      </form>
      <Link className="link-btn" to="/">
        Already have an account? Login here.
      </Link>
    </div>
  );
};

export default Signup;
