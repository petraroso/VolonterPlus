import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./style.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer} role="navigation">
        <NavLink to="/" className={styles.navLogo}>
          <Logo textColor="white" shadowColor="#111" />
        </NavLink>

        <div className={styles.socialIcons} aria-label="Social media links">
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
        <div className={styles.footerNav}>
          <ul>
            <li>
              <NavLink to="/" className={styles.navLink}>
                Početna
              </NavLink>
            </li>
            <li>
              <NavLink to="/activities" className={styles.navLink}>
                Aktivnosti
              </NavLink>
            </li>
            <li>
              <NavLink to="/volunteers" className={styles.navLink}>
                Volonteri
              </NavLink>
            </li>
            <li>
              <NavLink to="/associations" className={styles.navLink}>
                Udruge
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <p>
          Copyright &copy;2024
          <span className={styles.ownerName}> VolonterPlus</span>
        </p>
      </div>
    </footer>
  );
}
