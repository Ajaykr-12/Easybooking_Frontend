import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleChange(e) {
    setCredentials((pre) => {
      return { ...pre, [e.target.id]: e.target.value };
    });
  }

  async function handleClick(e) {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
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
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
