import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogoutClick() {
    dispatch({ type: "LOGOUT" });
  }

  function handleRegisterClick() {
    navigate("/register");
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <span className="logo">EasyBooking</span>
        </Link>

        <div className="navButtons">
          {user ? (
            <div className="isUserLogin">
              <FontAwesomeIcon icon={faUser} />
              <span>{user.username}</span>
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          ) : (
            <>
              <button onClick={handleRegisterClick} className="navButton">
                Register
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="navButton"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
