import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import styles from '../styles/NavBar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`${styles.navbar} ${menuOpen ? styles.showMenu : ''}`}>
      <><div className={styles.navbarLeft}>
        <Link to="/" className={styles.logo}>Home</Link>
      </div><div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div></>

      {user && (
        <>
          <div className={styles.navbarCenter}>
            <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            {(user.role === 'Admin' || user.role === 'Engineer') && (
              <Link to="/jobs" className={styles.navLink}>Jobs</Link>
            )}
            {(user.role === 'Admin' || user.role === 'Inspector') && (
              <Link to="/ships" className={styles.navLink}>Ships</Link>
            )}
            
          </div>

          <div className={styles.navbarRight}>
            <NotificationCenter />
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;