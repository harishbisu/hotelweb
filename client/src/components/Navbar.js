import React, { useState } from "react";
import { Link } from "react-router-dom";
const user_icon = process.env.PUBLIC_URL + "/user_icon.png";

function DesktopNavbar({ user, logout }) {
  return (
    <nav className="desktop-navbar navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/home">
        <h3 className="ml-3">Home</h3>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{fontSize:'20px'}}
              >
                <img
                  src={user_icon}
                  alt=""
                  className="mr-2"
                  style={{ height: "20px" }}
                />
                {user.name}
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                <a className="dropdown-item" onClick={logout}>
                  Log Out
                </a>
              </div>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

function MobileNavbar({ user, logout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="mobile-navbar navbar navbar-dark bg-dark"style={{height:'57px',justifyContent:'space-between'}}>
      <Link className="navbar-brand" to="/home" onClick={closeMobileMenu} >
        <h3 className="ml-3">Home</h3>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleMobileMenuClick}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {user && mobileMenuOpen ? (
        <div className="mobile-menu">
          <ul className="mobile-menu-list">
            <li>
              <Link className="mobile-menu-link" to="/profile"  onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li>
              <a className="mobile-menu-link" onClick={() => { logout(); closeMobileMenu(); }}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      ):(mobileMenuOpen&& <div className="mobile-menu"style={{opacity:'1'}}>
      <ul className="mobile-menu-list">
        <li>
          <Link className="mobile-menu-link" to="/register" onClick={closeMobileMenu}>
            Register
          </Link>
        </li>
        <li>
        <Link className="mobile-menu-link" to="/login" onClick={closeMobileMenu}>
            Login
          </Link>
        </li>
      </ul>
    </div>)}
    </nav>
  );
}

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  const isMobile = window.innerWidth <= 991.98;

  return (
    <>
      {isMobile ? (
        <MobileNavbar user={user} logout={logout} />
      ) : (
        <DesktopNavbar user={user} logout={logout} />
      )}
    </>
  );
}

export default Navbar;
