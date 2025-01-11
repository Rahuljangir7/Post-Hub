import React, { useEffect, useState } from "react";
import logoImg from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/useContext";
import { useContext } from "react";
import Infinite from "../logo.json";
import Lottie from "lottie-react";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const { pathname } = useLocation();
  const { currentUser } = useContext(UserContext);
  const [style, setStyle] = useState("");
  const [showNav, setShowNav] = useState("");

  const clickLink = () => {
    setStyle("");
    setShowNav("");
  };

  useEffect(() => {
    clickLink();
  }, [pathname === "/"]);

  const crossMenu = (e) => {
    if (style !== "open") {
      setStyle("open");
      setShowNav("show-nav");
    } else {
      setStyle("");
      setShowNav("");
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to={"/"}>
          <Lottie animationData={Infinite} />
        </Link>
      </div>
      <nav>
        {currentUser?.id && (
          <ul className={`login-nav ${showNav}`}>
            <li onClick={clickLink}>
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textTransform: "capitalize" }}
              >
                {currentUser?.name}
              </Link>
            </li>
            <li onClick={clickLink}>
              <Link to={`/create`}>Create Post</Link>
            </li>
            <li onClick={clickLink}>
              <Link to={`/authors`}>Authors</Link>
            </li>
            <li onClick={clickLink}>
              <Link to={`/logout`}>Logout</Link>
            </li>
          </ul>
        )}
        {!currentUser?.id ? (
          <ul>
            <li>
              <Link to={"/authors"}>Authors</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        ) : (
          <button className="nav_toggle-btn">
            <div id="nav-icon4" onClick={crossMenu} className={style}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
