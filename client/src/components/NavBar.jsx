import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.avif";
import { AuthContext } from "../context/authContext";
import { useMediaQuery, useClickAway } from "@uidotdev/usehooks";
import DropDown from "./DropDown";
import { LuMenu } from "react-icons/lu";
import styles from "../App.module.css";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 790px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useClickAway(() => {
    setIsMenuOpen(false);
  });

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        {!isSmallDevice && (
          <div className={styles.links}>
            <Link className={styles.link} to="/about">
              <h6>About</h6>
            </Link>
            <Link className={styles.link} to="/?cat=platform">
              <h6>Platform</h6>
            </Link>
            <Link className={styles.link} to="/?cat=divide">
              <h6>Divide</h6>
            </Link>
            <Link className={styles.link} to="/?cat=legislation">
              <h6>Legislation</h6>
            </Link>
            <Link className={styles.link} to="/?cat=intl">
              <h6>INTL/War</h6>
            </Link>
            <span>{currentUser?.username}</span>
            {currentUser && (
              <span className={styles.write}>
                <Link className={styles.link} to="/write">
                  Write
                </Link>
              </span>
            )}
            {currentUser ? (
              <span onClick={logout} className={styles.link}>
                <h6>Logout</h6>
              </span>
            ) : (
              <Link to="/login" className={styles.link}>
                <h6>Login</h6>
              </Link>
            )}
          </div>
        )}
        {isSmallDevice && (
          <div className={styles.links}>
            <span>{currentUser?.username}</span>

            {currentUser && (
              <span className={styles.write}>
                <Link className={styles.link} to="/write">
                  Write
                </Link>
              </span>
            )}
            <span className={styles.navHamburgerContain} ref={ref}>
              <LuMenu
                onClick={handleMenuToggle}
                className={styles.navHamburger}
              />
              {isMenuOpen && <DropDown />}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
