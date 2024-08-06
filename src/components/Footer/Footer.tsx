import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
//import logo from "../../assets/logo-no-bg.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container" role="navigation">
        <NavLink to="/" className="nav-logo">
          <Logo textColor="white" shadowColor="#111"/>
        </NavLink>

        <div className="social-icons" aria-label="Social media links">
          <a
            href="https://www.facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            href="https://plus.google.com"
            aria-label="Google Plus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-google-plus"></i>
          </a>
          <a
            href="https://www.youtube.com"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
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
