import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useUserContext } from './UserContext'; // Import useUserContext

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setCurrentUserEmail } = useUserContext(); // Use the context to set the current user's email

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8800/people');
      const peopleData = response.data;

      // Find a user with matching email and password
      const user = peopleData.find(person => person.email === email && person.password === password);

      if (user) {
        console.log('Logged in successfully');
        setCurrentUserEmail(email); // Set the current user's email using the context
        navigate('/home'); // Redirect to the homepage
      } else {
        console.log('Invalid credentials');
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Login error', error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
      <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;