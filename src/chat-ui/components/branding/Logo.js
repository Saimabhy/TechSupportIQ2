import React from 'react';
import './Header.css';
import logo from '../../assets/my_logo.svg'; // Assurez-vous que le chemin est correct

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Tech SupportIQ Chat</h1>
    </div>
  );
};

export default Header;
