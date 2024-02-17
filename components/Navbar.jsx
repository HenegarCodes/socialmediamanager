// components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link from next/link

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state
    const [showNotification, setShowNotification] = useState(false); // Track notification state
    const menuRef = useRef(null);
  
    // Function to handle logout
    const handleLogout = () => {
      setIsLoggedIn(false); // Update authentication state
    };
  
    // Function to show notification
    const showLoginNotification = () => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Hide the notification after 3 seconds
    };
  
    useEffect(() => {
        const handleClickOutside = (event) => {
          const clickedOutsideNavbar = (
            isOpen &&
            menuRef.current &&
            !menuRef.current.contains(event.target)
          );
      
          const clickedExitButton = (
            event.target.classList.contains('exit-button')
          );
      
          if (clickedOutsideNavbar || clickedExitButton) {
            setIsOpen(false);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen]);
  
    const toggleMenu = () => {
      setIsOpen((prevState) => !prevState); // Toggle isOpen
    };
  
    const closeMenu = () => {
      setIsOpen(false);
    };


  return (
    <div>
      <nav className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        </div>
        {isOpen && (
          <ul className="menu-items" ref={menuRef}>
            <li className='background-nav-container'><Link href="/Homepage">Home</Link></li>
            <li className='background-nav-container'><Link href="/Dashboard">Dashboard</Link></li>
            <li className='background-nav-container'><Link href="/Account">Account</Link></li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
