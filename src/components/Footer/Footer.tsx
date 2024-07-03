import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-no-bg.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <NavLink to="/" className="nav-logo">
          <img src={logo} className="logo" alt={"logo"} />
        </NavLink>

        <div className="social-icons">
          <a href="">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-google-plus"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className="footer-nav">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Početna
              </NavLink>
            </li>
            <li>
              <NavLink to="/activities" className="nav-link">
                Aktivnosti
              </NavLink>
            </li>
            <li>
              <NavLink to="/volunteers" className="nav-link">
                Volonteri
              </NavLink>
            </li>
            <li>
              <NavLink to="/associations" className="nav-link">
                Udruge
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          Copyright &copy;2024
          <span className="owner-name"> VolonterPlus</span>
        </p>
      </div>
    </footer>
  );
}
