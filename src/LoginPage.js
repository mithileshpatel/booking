import React, { useState } from 'react';
import './LoginPage.css';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/logo.jpg" alt="Logo" className="logo" />
        <div className="tab-container">
          <button  className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            Login
          </button>
          <button className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
            SignUp
          </button>
        </div>
        {activeTab === 'login' ? (
          <div className="input-container">
            <input type="text" placeholder="Enter Username/Mobile" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <button className="login-button">Login</button>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
        ) : (
          <div className="input-container">
            <input type="text" placeholder="Enter Username" className="input-field" />
            <input type="tel" placeholder="Enter Mobile Number" className="input-field" />
            <input type="email" placeholder="Enter Email" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <button className="login-button">SignUp</button>
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
