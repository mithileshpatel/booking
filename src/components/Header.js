import React, { useState } from 'react';
import './Header.css';
import LoginPage from '../LoginPage';

function Header() {
  const [activeLink, setActiveLink] = useState("#cab");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowAccountMenu(false);
    setShowLoginPage(true);
  };

  const closeLoginPage = () => {
    setShowLoginPage(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="LogoMain.png" alt="Cabbridge Logo" />
      </div>
      <nav className="nav">
        <a 
          href="#cab" 
          className={activeLink === "#cab" ? "active" : ""}
          onClick={() => handleSetActive("#cab")}
        >
          Cab/Taxi
        </a>
        <a 
          href="#bus" 
          className={activeLink === "#bus" ? "active" : ""}
          onClick={() => handleSetActive("#bus")}
        >
          Bus Booking
        </a>
        <a 
          href="#hotels" 
          className={activeLink === "#hotels" ? "active" : ""}
          onClick={() => handleSetActive("#hotels")}
        >
          Hotels
        </a>
        <a 
          href="#help" 
          className={activeLink === "#help" ? "active" : ""}
          onClick={() => handleSetActive("#help")}
        >
          Help
        </a>
        <a 
          href="#account" 
          className={activeLink === "#account" ? "active" : ""}
          onClick={toggleAccountMenu}
        >
          My Account
          <div className={`dropdown ${showAccountMenu ? 'show' : ''}`}>
            <a href="#login" onClick={handleLoginClick}>Login</a>
            <a href="#signup" onClick={() => setShowAccountMenu(false)}>Signup</a>
          </div>
        </a>
      </nav>
      {showLoginPage && <LoginPage onClose={closeLoginPage} />}
    </header>
  );
}

export default Header;
