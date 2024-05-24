import React, { useState } from "react";
import styles from "../App.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../img/logo.avif";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //note the parens above around the obj
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("🎗", "running the call");
    try {
      const res = await axios.post(
        "https://radical-middle.onrender.com/api/auth/register",
        inputs
      );
      console.log(res);
      nav("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  // Basic form validation (can be enhanced further)
  // if (!username || !password) {
  //   setError("Please enter both username and password.");
  //   return;
  // }

  // // Simulate authentication (replace with actual Register logic)
  // const isValid = username === "user" && password === "password";

  // if (isValid) {
  //   console.log("hey");
  // } else {
  //   setError("Invalid username or password.");
  // }

  return (
    <div className={styles["auth"]}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <h1>Register</h1>
      <form>
        {error && <p className="error-message">{error}</p>}
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{`Registration Error! ${error}`}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
