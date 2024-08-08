import React, { useState } from 'react';
import './LoginPage.css';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

function LoginPage({ onClose }) {
  const [activeTab, setActiveTab] = useState('signup');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = 'Mobile number must be 10 digits';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) {
      return;
    }

    const user = {
      username,
      mobile,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/signup/signup', { // Ensure endpoint matches
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccessMessage('Signup successful!');
        setErrorMessage('');
        onClose(); // Close the modal on successful signup
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Signup failed'); // Use `error` key
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('An unexpected error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <span className="close" onClick={onClose}>&times;</span>
        <img src="/logo.jpg" alt="Logo" className="logo" />
        <div className="tab-container">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            SignUp
          </button>
        </div>
        {activeTab === 'login' ? (
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Username/Mobile"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <button className="login-button">Login</button>
            <button className="forgot-password" onClick={() => alert('Forgot password functionality not implemented')}>Forgot password?</button>
          </div>
        ) : (
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className="input-field"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
            <input
              type="email"
              placeholder="Enter Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
            <button className="login-button" onClick={handleSignup}>SignUp</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
        <div className="social-login">
          <span>OR</span>
          <div className="social-icons">
            <FaFacebook className="icon facebook-icon" />
            <FaGoogle className="icon google-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
