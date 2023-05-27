import React,{ useState } from "react";
import {Link} from 'react-router-dom'
import './login.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
          <Link to='/'>  <button type="submit" className="btn btn-light">Register</button></Link>
      </form>
      <Link className="link-btn" to="/" >Already have an account? Login here.</Link>
    </div>
  )
};

export default Signup;
