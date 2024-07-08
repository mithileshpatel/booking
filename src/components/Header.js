// Header.js
import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [activeLink, setActiveLink] = useState("#cab");

  const handleSetActive = (link) => {
    setActiveLink(link);
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
          onClick={() => handleSetActive("#account")}
        >
          My Account
        </a>
      </nav>
    </header>
  );
}

export default Header;
