import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUser((pre) => {
      return { ...pre, [e.target.id]: e.target.value };
    });
  }
  async function handleClick(e) {
    e.preventDefault();
    try {
      await axios.post("/auth/register", user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="login">
      <Navbar />
      <div className="lContainer">
        <div className="lWrapper">
          <input
            type="text"
            className="lInput"
            placeholder="username"
            id="username"
            onChange={handleChange}
          />
          <input
            type="password"
            className="lInput"
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
          <input
            type="email"
            className="lInput"
            placeholder="email"
            id="email"
            onChange={handleChange}
          />
          <button onClick={handleClick} className="lButton">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
