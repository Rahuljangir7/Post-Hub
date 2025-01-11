import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer>
      <div className="footer-links">
        <ul>
          <li>
            <Link to={"/posts/categories/Agriculture"}>Agriculture</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Business"}>Business</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Education"}>Education</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Entertainment"}>Entertainment</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Art"}>Art</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Investment"}>Investment</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Uncategorized"}>Uncategorized</Link>
          </li>
          <li>
            <Link to={"/posts/categories/Weather"}>Weather</Link>
          </li>
        </ul>
      </div>
      <div className="copyright-content">
        <p>
          All Rights Reserved &copy; Copyright,
          <b style={{ textTransform: "capitalize" }}>Rahul Jangir</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
