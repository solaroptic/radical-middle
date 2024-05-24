import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.avif";
import styles from "../App.module.css";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const { login } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //note the parens above around the obj
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("🎗", "running the login call");
    try {
      await login(inputs);

      // console.log("lardo", document.cookie);
      nav("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  return (
    <div className={styles["auth"]}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <h1>Login</h1>
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
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{`Login Error! ${error}`}</p>}
        <span>
          Don't have an account? <Link to="/register">Sign up!</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
