// MenuCard.js
import React from 'react';
import './MenuCard.css'; // Add CSS styles for the card

const MenuCard = ({ title, description, onClick }) => {
  return (
    <div className="menu-card" onClick={onClick}>
      <h3 className="menu-card-title">{title}</h3>
      <p className="menu-card-description">{description}</p>
    </div>
  );
};

export default MenuCard;
