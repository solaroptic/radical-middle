import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import styles from "../App.module.css";

const DropDown = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className={styles.dropContainer}>
      <Link className={styles.dropLink} to="/about">
        <p>About</p>
      </Link>
      <Link className={styles.dropLink} to="/?cat=platform">
        <p>Platform</p>
      </Link>
      <Link className={styles.dropLink} to="/?cat=divide">
        <p>Divide</p>
      </Link>
      <Link className={styles.dropLink} to="/?cat=legislation">
        <p>Legislation</p>
      </Link>
      <Link className={styles.dropLink} to="/?cat=intl">
        <p>INTL/War</p>
      </Link>
      {currentUser ? (
        <span onClick={logout} className={styles.dropLink}>
          <p>Logout</p>
        </span>
      ) : (
        <Link to="/login" className={styles.dropLink}>
          <p>Login</p>
        </Link>
      )}
    </div>
  );
};

export default DropDown;
